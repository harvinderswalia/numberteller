import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CardInput {
  positionId: number;
  positionLabel: string;
  positionDescription: string;
  cardName: string;
  reversed: boolean;
  cardMeaning: string;
  cardKeywords: string[];
  numerologyLink?: string;
  numerologyNumber?: number;
}

interface ReadingRequest {
  question: string;
  spreadName: string;
  cards: CardInput[];
  numerologyContext?: {
    name?: string;
    lifePath?: string;
    expression?: string;
    soulUrge?: string;
    personalYear?: number;
    birthday?: string | number;
  };
  tone: string;
}

function buildSystemPrompt(tone: string): string {
  const toneGuides: Record<string, string> = {
    empowering: "You are an empowering, uplifting tarot reader. Always frame readings in terms of the querent's agency, strengths, and potential. Never induce fear. Turn challenging cards into opportunities for growth. Use warm, encouraging language.",
    direct: "You are a precise, clear tarot reader. Deliver insights directly without hedging. Be honest about challenges while remaining respectful. Use concise, professional language. Avoid flowery prose.",
    spiritual: "You are a spiritually attuned tarot reader with deep metaphysical knowledge. Speak to the soul's journey, karmic patterns, and higher purpose. Connect to universal energies, divine guidance, and spiritual evolution.",
    practical: "You are a practical, actionable tarot reader. Focus on concrete steps, real-world implications, and tangible outcomes. Every reading should end with clear action steps the querent can take today.",
    vedic: "You are a tarot reader with deep Vedic sensibility — you understand karma, dharma, planetary influences, and the cyclical nature of life. Weave Sanskrit concepts naturally where relevant. Speak to cosmic timing and soul contracts.",
  };
  return toneGuides[tone] || toneGuides.empowering;
}

function buildUserPrompt(req: ReadingRequest): string {
  const { question, spreadName, cards, numerologyContext, tone } = req;

  const numCtx = numerologyContext && Object.values(numerologyContext).some(v => v !== undefined && v !== '')
    ? `\n\nNUMEROLOGY CONTEXT (integrate this deeply — do NOT just mention it superficially):
${numerologyContext.name ? `• Full Name: ${numerologyContext.name}` : ''}
${numerologyContext.lifePath ? `• Life Path: ${numerologyContext.lifePath}` : ''}
${numerologyContext.expression ? `• Expression Number: ${numerologyContext.expression}` : ''}
${numerologyContext.soulUrge ? `• Soul Urge: ${numerologyContext.soulUrge}` : ''}
${numerologyContext.personalYear ? `• Current Personal Year: ${numerologyContext.personalYear}` : ''}
${numerologyContext.birthday ? `• Birthday Number: ${numerologyContext.birthday}` : ''}

When mentioning numerology numbers, ALWAYS explain what they mean in context — don't just state them. Show how they interact with the cards drawn. For example: "The Tower aligns powerfully with your Personal Year 9 — both signal the end of a cycle and the clearing of what no longer serves your LP 7's path of wisdom."` : '';

  const cardList = cards.map((c, i) =>
    `Position ${i + 1} — "${c.positionLabel}" (${c.positionDescription}):
  Card: ${c.cardName}${c.reversed ? ' (REVERSED)' : ' (Upright)'}
  Base Meaning: ${c.reversed ? 'N/A — use reversed meaning' : c.cardMeaning}
  Keywords: ${c.cardKeywords.join(', ')}
  ${c.numerologyLink ? `Numerology Link: This position is connected to the querent's ${c.numerologyLink}` : ''}`
  ).join('\n\n');

  return `SPREAD: ${spreadName}
QUESTION / INTENTION: "${question}"
${numCtx}

CARDS DRAWN:
${cardList}

TONE: ${tone}

INSTRUCTIONS:
Generate a complete, deeply contextual tarot reading. Structure your response as valid JSON matching this exact schema:
{
  "overallTheme": "2-3 sentence overview of the central message of this spread",
  "cardBreakdowns": [
    {
      "positionLabel": "exact label of position",
      "cardName": "exact card name",
      "reversed": true/false,
      "interpretation": "2-4 sentences interpreting this card in its position, connected to the question",
      "numerologyBridge": "1-2 sentences connecting this card to the numerology context (omit if no numerology provided)"
    }
  ],
  "narrative": "A flowing 3-5 paragraph narrative that weaves all cards together into a cohesive story. This should feel like a master reader speaking. Connect cards to each other. Connect to the question. Integrate numerology naturally.",
  "numerologyIntegration": "1-2 paragraphs specifically about how the numerology core numbers interact with the spread — only include if numerology context was provided",
  "actionableGuidance": "3-5 concrete, specific action steps or insights the querent can act on immediately. Be practical and specific, not vague."
}

Rules:
- Return ONLY valid JSON — no text before or after
- Reversed cards should always acknowledge the reversed meaning, not the upright
- Never use phrases like "As an AI" or "I should note"
- Never predict death, serious illness, or catastrophe — reframe as transformation
- Keep the tone consistent throughout with the specified tone
- The narrative should be the richest, most immersive section
- Numerology bridges must be specific and insightful, not generic`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI reading service not configured. Please add your OpenAI API key in settings." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const readingRequest: ReadingRequest = await req.json();

    if (!readingRequest.question?.trim() || !readingRequest.cards?.length) {
      return new Response(
        JSON.stringify({ error: "Question and card selections are required." }),
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
        temperature: 0.85,
        max_tokens: 2000,
        messages: [
          { role: "system", content: buildSystemPrompt(readingRequest.tone) },
          { role: "user", content: buildUserPrompt(readingRequest) }
        ]
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "AI service error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty response from AI service");

    // Parse and validate JSON response
    const parsed = JSON.parse(content);

    return new Response(
      JSON.stringify({ ...parsed, generatedAt: new Date().toISOString() }),
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
