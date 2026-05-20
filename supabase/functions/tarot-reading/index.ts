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

  // Detect question intent for smarter prompt priming
  const q = question.toLowerCase();
  let questionIntent = '';
  if (/marr(y|ied|iage)|propose|proposal/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Marriage decision. The querent is asking specifically whether to marry or about the future of marriage with this person. EVERY card interpretation and the narrative must speak directly to marriage readiness, compatibility for a lifelong union, and whether this commitment is wise. Do NOT give generic relationship advice — speak specifically to the marriage question. The Outcome/Future positions must directly address whether marriage is advised.`;
  } else if (/get back together|reconcil|second chance|rekindle/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Reconciliation. The querent wants to know if getting back together is possible and wise. Every card must address the specific question of whether this reunion would be genuine and lasting, what caused the original break, and whether real change has occurred. Do not give generic love advice.`;
  } else if (/will (he|she|they) come back|ex (come|return)|miss me/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Ex returning. The querent wants to know if their ex will come back. Address this directly and honestly. The Outcome/Future cards must speak to whether a return is likely. Also address whether a return would be healthy for the querent.`;
  } else if (/should i (quit|leave|change|switch) (my )?(job|career|work)|new job offer|accept the (offer|position)|resign/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Career change decision. Every card must be interpreted through the lens of this specific career move — whether to take it, what it will bring, and what the risks are. The Outcome card must directly address whether the career change is wise.`;
  } else if (/start (a|my|the) business|launch|entrepreneur|my own (business|company|venture)/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Business launch decision. Interpret every card through the lens of this business venture — its viability, timing, risks, and potential. Give specific, actionable business guidance, not generic encouragement.`;
  } else if (/invest|should i (buy|sell)|financial decision|real estate|property|stock|crypto/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Financial investment decision. Every card must address this specific financial decision — the timing, the risk, the likely return, and whether to proceed. Be specific and honest, not vague.`;
  } else if (/pregnant|baby|conceiv|fertility|ivf|trying to conceive/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Fertility and pregnancy. This is a deeply personal and emotionally significant question. Address fertility, the timing of new life, and the emotional journey with both honesty and compassion. Speak directly to the likelihood and conditions of pregnancy.`;
  } else if (/should i (leave|break up|end|divorce)|break up|end (this|the|our) (relationship|marriage)|divorce/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Breakup or divorce decision. Speak directly to whether ending this relationship is the right path. The cards must address both what staying and leaving would mean, with honest assessment of the relationship's true state.`;
  } else if (/cheat(ing)?|is (he|she|they) (loyal|faithful)|affair|unfaithful|hiding something/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Trust and fidelity question. Address the truth of this situation as clearly as the cards allow. The querent needs honesty, not reassurance. Speak to what the cards reveal about the other person's behaviour and intentions.`;
  } else if (/soulmate|twin flame|when will i (find|meet)|divine timing/.test(q)) {
    questionIntent = `\nQUESTION INTENT: Soulmate timing. Address when and under what conditions love is likely to arrive. Speak to what the querent needs to release or embody to draw their soulmate closer. Be specific about timing indicators in the cards.`;
  }

  return `SPREAD: ${spreadName}
QUESTION / INTENTION: "${question}"
${questionIntent}
${numCtx}

CARDS DRAWN:
${cardList}

TONE: ${tone}

CRITICAL RULE — QUESTION RELEVANCE: Every single sentence of this reading must be directly relevant to the specific question asked: "${question}". Do NOT give a generic reading that could apply to anyone. The querent asked this specific question — answer it. Use the exact words and framing of their question when interpreting key cards, especially the Outcome, Advice, and central positions.

INSTRUCTIONS:
Generate a complete, deeply contextual tarot reading. Structure your response as valid JSON matching this exact schema:
{
  "overallTheme": "2-3 sentences that directly address the central message of this spread IN RELATION TO THE SPECIFIC QUESTION ASKED. Name what the cards are collectively saying about the querent's question.",
  "cardBreakdowns": [
    {
      "positionLabel": "exact label of position",
      "cardName": "exact card name",
      "reversed": true/false,
      "interpretation": "2-4 sentences interpreting this card in its position, SPEAKING DIRECTLY to the question asked. The interpretation must feel like it was written specifically for this question, not as a generic card meaning.",
      "numerologyBridge": "1-2 sentences connecting this card to the numerology context (omit if no numerology provided)"
    }
  ],
  "narrative": "A flowing 3-5 paragraph narrative that speaks DIRECTLY to the querent's question throughout. Open by restating what was asked and what the cards are collectively saying about it. Connect every card reference back to the specific question. The narrative should feel like a wise advisor who has genuinely considered this exact situation, not a generic reading.",
  "numerologyIntegration": "1-2 paragraphs specifically about how the numerology core numbers interact with the question and spread — only include if numerology context was provided",
  "actionableGuidance": "3-5 concrete, specific action steps that are directly relevant to the querent's specific question. If they asked about marriage, give marriage-specific guidance. If about a career change, give career-change-specific guidance. NEVER give generic advice that could apply to any situation."
}

Rules:
- Return ONLY valid JSON — no text before or after
- Reversed cards should always acknowledge the reversed meaning, not the upright
- Never use phrases like "As an AI" or "I should note"
- Never predict death, serious illness, or catastrophe — reframe as transformation
- Keep the tone consistent throughout with the specified tone
- The narrative must open by speaking directly to the question asked
- Numerology bridges must be specific and insightful, not generic
- The actionableGuidance must be specific to the question's domain and situation`;
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
