import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface VastuAnalysisRequest {
  imageBase64: string;
  mimeType: string;
  propertyType: string;
}

interface DetectedRoom {
  roomType: string;
  zone: string;
  confidence: 'high' | 'medium' | 'low';
  notes?: string;
}

interface VastuAnalysisResponse {
  detectedRooms: DetectedRoom[];
  entranceDirection: string;
  entranceConfidence: 'high' | 'medium' | 'low';
  structuralIssues: string[];
  slopeDirection: string;
  propertyNotes: string;
  rawDescription: string;
  analysisQuality: 'clear' | 'partial' | 'unclear';
}

const SYSTEM_PROMPT = `You are an expert Vastu Shastra consultant and architect with deep knowledge of floor plan analysis. Your task is to analyze floor plan images and extract Vastu-relevant spatial data.

You must identify:
1. Rooms and their approximate compass zone positions (N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW, or Center)
2. Main entrance direction
3. Structural issues relevant to Vastu (cut corners, heavy walls, etc.)
4. Property slope if discernible
5. Overall layout description

COMPASS ZONE RULES:
- The floor plan typically has North indicated by an arrow or compass symbol. If not shown, make your best estimate from context clues.
- Divide the floor plan into a 3x3 grid: SW corner = SW zone, S center = S zone, SE corner = SE zone, etc.
- The CENTER of the property = Brahmasthan — very important in Vastu
- Look for labels, text, symbols, and layout patterns to identify rooms

ROOM IDENTIFICATION — match these exactly when possible:
- "Master Bedroom", "Bedroom 2", "Bedroom 3"
- "Kitchen", "Pantry"
- "Living Room / Hall", "Drawing Room", "Dining Room"
- "Prayer Room / Puja", "Pooja Room"
- "Toilet / Bathroom (Master)", "Toilet / Bathroom 2", "Toilet", "Bathroom", "WC"
- "Study Room", "Home Office"
- "Store Room / Utility", "Garage / Parking"
- "Balcony (Main)", "Terrace"
- "Staircase"
- "Well / Borewell / Underground Water", "Overhead Water Tank"

STRUCTURAL ISSUES — use these exact dosha IDs when you detect them:
- "ne-toilet" = toilet/bathroom in NE
- "ne-kitchen" = kitchen in NE
- "ne-cut" = NE corner appears cut/missing
- "ne-heavy-wall" = tall/heavy wall on the north or east side
- "se-water" = water feature/tank in SE
- "sw-entrance" = main entrance in SW
- "sw-cut" = SW corner appears cut/missing
- "s-entrance" = main entrance in S
- "n-heavy-wall" = tall/heavy wall on north side
- "bs-staircase" = staircase in center/Brahmasthan
- "e-heavy-wall" = tall/heavy wall on east side
- "slope-sw-high" = plot appears to slope down toward NE (SW high)

Respond ONLY with a valid JSON object. No preamble, no explanation, no markdown.`;

function buildUserPrompt(propertyType: string): string {
  return `Analyze this ${propertyType} floor plan image carefully.

Extract all Vastu-relevant information and return it as JSON matching this exact schema:
{
  "detectedRooms": [
    {
      "roomType": "exact room name (use the standard names from the system prompt)",
      "zone": "compass zone code (N/NNE/NE/ENE/E/ESE/SE/SSE/S/SSW/SW/WSW/W/WNW/NW/NNW/Center)",
      "confidence": "high|medium|low",
      "notes": "optional brief note about this detection"
    }
  ],
  "entranceDirection": "compass zone code or empty string if unclear",
  "entranceConfidence": "high|medium|low",
  "structuralIssues": ["array of dosha IDs from the list in system prompt"],
  "slopeDirection": "NE-high|SW-high|flat|",
  "propertyNotes": "2-3 sentences describing what you can see in the floor plan, any unique features, and any limitations of the analysis",
  "rawDescription": "Brief description of the floor plan layout as you see it",
  "analysisQuality": "clear|partial|unclear"
}

Rules:
- Only include rooms you can actually detect — do not guess
- If you cannot clearly identify a room's zone, use a lower confidence and your best estimate
- If North is not marked in the image, note this in propertyNotes and do your best
- For analysisQuality: "clear" = floor plan is readable with labels; "partial" = some rooms visible but labels unclear; "unclear" = image is too small, blurry, or not a floor plan
- Return ONLY valid JSON — nothing else`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI analysis service not configured. Please add your OpenAI API key in settings." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: VastuAnalysisRequest = await req.json();
    const { imageBase64, mimeType, propertyType } = body;

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Image data is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.1,
        max_tokens: 2000,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${imageBase64}`,
                  detail: "high"
                }
              },
              {
                type: "text",
                text: buildUserPrompt(propertyType)
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "AI vision service error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty response from AI service");

    // Strip markdown code blocks if present
    const cleaned = content.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed: VastuAnalysisResponse = JSON.parse(cleaned);

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
