/**
 * Native Tarot Reading Engine
 * Generates contextual, numerology-integrated tarot readings entirely in-browser.
 * No external API required.
 */

import { TarotCard, SpreadTemplate, ToneType, TarotReadingResult, ALL_CARDS } from '../data/tarotCards';

// ─── NUMEROLOGY KNOWLEDGE BASE ─────────────────────────────────────────────

const NUMBER_ESSENCE: Record<number, { theme: string; shadow: string; gift: string; element: string }> = {
  1: { theme: 'independence, leadership, pioneering action', shadow: 'ego, isolation, impatience', gift: 'the power to initiate and lead', element: 'Fire' },
  2: { theme: 'partnership, diplomacy, emotional sensitivity', shadow: 'co-dependency, indecision, self-doubt', gift: 'deep empathy and the ability to unite', element: 'Water' },
  3: { theme: 'creativity, self-expression, joy, communication', shadow: 'scattered energy, superficiality, gossip', gift: 'the ability to inspire and illuminate', element: 'Air' },
  4: { theme: 'stability, discipline, building foundations, loyalty', shadow: 'rigidity, limitation, fear of change', gift: 'the power to create lasting structures', element: 'Earth' },
  5: { theme: 'freedom, change, adventure, versatility', shadow: 'restlessness, excess, inconsistency', gift: 'adaptability and the courage to transform', element: 'Air' },
  6: { theme: 'responsibility, harmony, nurturing, service', shadow: 'perfectionism, martyrdom, control', gift: 'unconditional love and the power to heal', element: 'Earth' },
  7: { theme: 'introspection, wisdom, spiritual seeking, analysis', shadow: 'isolation, suspicion, overthinking', gift: 'penetrating insight and inner knowing', element: 'Water' },
  8: { theme: 'power, abundance, material mastery, ambition', shadow: 'greed, control, workaholism', gift: 'the ability to build empires and transform lives', element: 'Earth' },
  9: { theme: 'completion, compassion, universal wisdom, release', shadow: 'martyrdom, bitterness, holding on', gift: 'the wisdom to serve humanity and let go', element: 'Water' },
  11: { theme: 'illumination, spiritual mastery, heightened intuition', shadow: 'nervous tension, self-doubt, paralysis', gift: 'the gift of spiritual vision and inspiration', element: 'Air' },
  22: { theme: 'mastery on the material plane, building for all', shadow: 'overwhelm, grandiosity, impracticality', gift: 'the power to manifest great visions into reality', element: 'Earth' },
  33: { theme: 'selfless service, master healer, universal compassion', shadow: 'self-sacrifice, burnout, martyrdom', gift: 'the highest expression of love in action', element: 'Water' },
};

const PERSONAL_YEAR_THEMES: Record<number, string> = {
  1: 'new beginnings, planting seeds, asserting your independence and launching fresh chapters',
  2: 'patience, partnership, emotional deepening and cooperative building',
  3: 'creative expansion, social connection, joy and self-expression blooming',
  4: 'disciplined work, laying foundations, practical effort and building security',
  5: 'major change, freedom, breaking old patterns and embracing transformation',
  6: 'responsibility, home and family focus, nurturing relationships and service',
  7: 'inner reflection, spiritual study, solitude and deepening self-knowledge',
  8: 'material achievement, financial decisions, claiming authority and power',
  9: 'completion, release, clearing what no longer serves to make space for the new',
};

const SUIT_DOMAINS: Record<string, string> = {
  wands: 'ambition, passion, creative fire, and career drive',
  cups: 'emotions, relationships, intuition, and the inner life',
  swords: 'thoughts, communication, conflict, truth, and mental clarity',
  pentacles: 'material world, finances, physical health, and practical achievement',
};

const ELEMENT_COMPATIBILITY: Record<string, Record<string, string>> = {
  Fire: { Fire: 'amplifying', Water: 'tension', Air: 'supportive', Earth: 'grounding' },
  Water: { Water: 'amplifying', Fire: 'tension', Earth: 'nurturing', Air: 'challenging' },
  Air: { Air: 'amplifying', Earth: 'tension', Fire: 'energising', Water: 'clarifying' },
  Earth: { Earth: 'amplifying', Air: 'tension', Water: 'stable', Fire: 'balancing' },
};

// ─── TONE TEMPLATES ────────────────────────────────────────────────────────

type ToneConfig = {
  opener: string[];
  bridge: string[];
  challengePrefix: string[];
  advicePrefix: string[];
  closer: string[];
};

const TONE_CONFIGS: Record<ToneType, ToneConfig> = {
  empowering: {
    opener: ['The cards reveal a powerful message of growth', 'This spread speaks to your capacity for transformation', 'A clear path of empowerment emerges from these cards'],
    bridge: ['What makes this reading especially meaningful is', 'At the heart of this spread lies', 'The deeper thread connecting these cards is'],
    challengePrefix: ['A growth edge appears here —', 'This card invites you to look honestly at', 'The invitation is to move through'],
    advicePrefix: ['Your greatest leverage point right now is', 'The most empowering step you can take is', 'Channel your energy into'],
    closer: ['You have everything you need. Trust yourself and move forward.', 'The path is illuminated. Step into your power.', 'This is your moment. Every challenge carries a gift.'],
  },
  spiritual: {
    opener: ['The universe speaks through these cards with profound clarity', 'A sacred message unfolds across this spread', 'The cosmic field is illuminated through these symbols'],
    bridge: ['On a soul level, this reading reveals', 'The deeper karmic thread here is', 'The universe is orchestrating'],
    challengePrefix: ['The soul is being tested in the realm of', 'A karmic pattern asks to be released —', 'The divine invitation here is to surrender'],
    advicePrefix: ['Your soul\'s call in this moment is to', 'The spiritual prescription is', 'Align with your highest self by'],
    closer: ['Trust the divine timing. What is meant for you will not pass you by.', 'The universe always conspires in your favour. Have faith.', 'You are exactly where your soul needs to be.'],
  },
  practical: {
    opener: ['This spread provides clear, actionable insight', 'The cards identify exactly where attention is needed', 'A practical roadmap emerges from this reading'],
    bridge: ['The key factor shaping everything here is', 'The critical variable to address is', 'The data from this spread shows'],
    challengePrefix: ['A specific obstacle is present —', 'There is friction in the area of', 'The bottleneck right now is'],
    advicePrefix: ['The most impactful action step is', 'To move forward effectively, focus on', 'The practical priority is'],
    closer: ['Take the first step today. Momentum creates clarity.', 'Action over analysis. Start with what you can control.', 'Review, adjust, act. Progress is built one decision at a time.'],
  },
  direct: {
    opener: ['These cards are clear and direct in their message', 'The reading is honest: here is what the cards show', 'No ambiguity here — the spread speaks plainly'],
    bridge: ['The central truth is', 'What this actually means is', 'The bottom line from these cards is'],
    challengePrefix: ['There is a real challenge here:', 'This needs to be addressed honestly —', 'The card does not soften this:'],
    advicePrefix: ['The direct guidance is', 'What needs to happen is', 'The straightforward answer is'],
    closer: ['The path is clear. Decide and act.', 'Honest self-assessment leads to real progress. Use it.', 'You already know what needs to be done. This confirms it.'],
  },
  vedic: {
    opener: ['The cosmic order reveals its wisdom through these sacred symbols', 'Karma and dharma interweave through this spread', 'The planetary forces echo through every card drawn here'],
    bridge: ['The karmic thread connecting this reading is', 'In the language of dharma, this spread reveals', 'The cosmic lesson embedded here is'],
    challengePrefix: ['A karmic debt or lesson surfaces here —', 'The prarabdha karma being activated is', 'The cosmic test in this area is'],
    advicePrefix: ['The dharmic action called for is', 'In alignment with your life\'s purpose, act by', 'To honour your karma and dharma, focus on'],
    closer: ['What is written in the akashic record will unfold in perfect timing. Align your dharma.', 'The cosmic cycle turns. Your karma responds to conscious, righteous action.', 'Nishkama karma — act without attachment to outcome. The universe handles the rest.'],
  },
};

// ─── CROSS-CARD INTERACTION PATTERNS ──────────────────────────────────────

function detectCardInteractions(cards: Array<{ card: TarotCard; reversed: boolean; positionLabel: string }>): string[] {
  const insights: string[] = [];
  const names = cards.map(c => c.card.name);
  const suits = cards.map(c => c.card.suit).filter(Boolean);
  const arcanas = cards.map(c => c.card.arcana);
  const numerologyNums = cards.map(c => c.card.numerologyNumber).filter(Boolean);

  // Dominant suit
  const suitCount: Record<string, number> = {};
  suits.forEach(s => { if (s) suitCount[s] = (suitCount[s] || 0) + 1; });
  const dominantSuit = Object.entries(suitCount).sort((a, b) => b[1] - a[1])[0];
  if (dominantSuit && dominantSuit[1] >= 2) {
    insights.push(`The prevalence of ${dominantSuit[0].charAt(0).toUpperCase() + dominantSuit[0].slice(1)} cards concentrates the reading's energy in the domain of ${SUIT_DOMAINS[dominantSuit[0]]}.`);
  }

  // All major arcana
  if (arcanas.every(a => a === 'major')) {
    insights.push('All Major Arcana cards signal that this situation carries deep karmic weight and significant life-lesson energy — these are not minor circumstances, but pivotal turning points.');
  }

  // Mix of major and minor
  const majorCount = arcanas.filter(a => a === 'major').length;
  if (majorCount > 0 && majorCount < cards.length) {
    insights.push(`The ${majorCount} Major Arcana card${majorCount > 1 ? 's' : ''} in this spread indicate${majorCount === 1 ? 's' : ''} that while day-to-day circumstances play a role, deeper soul-level forces are also at work here.`);
  }

  // Repeating numerology numbers
  const numCount: Record<number, number> = {};
  numerologyNums.forEach(n => { if (n) numCount[n] = (numCount[n] || 0) + 1; });
  const repeatingNum = Object.entries(numCount).find(([, count]) => count >= 2);
  if (repeatingNum && NUMBER_ESSENCE[parseInt(repeatingNum[0])]) {
    const ne = NUMBER_ESSENCE[parseInt(repeatingNum[0])];
    insights.push(`The vibration of ${repeatingNum[0]} appears multiple times across this spread, amplifying the theme of ${ne.theme}. This number's energy is unmistakably central to the situation.`);
  }

  // Multiple reversals
  const reversalCount = cards.filter(c => c.reversed).length;
  if (reversalCount >= Math.ceil(cards.length / 2) && cards.length > 1) {
    insights.push('The significant number of reversed cards suggests internal resistance, blocked energy, or a need to look beneath surface appearances before acting.');
  }

  // Transformation pair: Death + Tower or similar
  if (names.includes('Death') && names.includes('The Tower')) {
    insights.push('The presence of both Death and The Tower is a rare and powerful combination — it signals a profound, double-layered transformation where old structures must fall for a completely new chapter to emerge.');
  }

  // Love/harmony pair
  if (names.includes('The Lovers') && names.includes('2 of Cups')) {
    insights.push('The Lovers alongside the 2 of Cups creates one of the most harmonious relationship combinations in the deck — deep soul recognition and mutual commitment are highlighted.');
  }

  // Strength after challenges
  if ((names.includes('9 of Swords') || names.includes('3 of Swords')) && names.includes('Strength')) {
    insights.push('The presence of Strength alongside a card of difficulty is deeply encouraging — it confirms that inner courage and compassionate resolve are the direct path through current pain.');
  }

  return insights;
}

// ─── NUMEROLOGY BRIDGE GENERATOR ──────────────────────────────────────────

function buildNumerologyBridge(
  card: TarotCard,
  reversed: boolean,
  positionLink: string | undefined,
  numCtx: Record<string, string | number | undefined>
): string {
  const bridges: string[] = [];

  const getValue = (key: string): string | undefined => {
    const v = numCtx[key];
    return v !== undefined && v !== '' ? String(v) : undefined;
  };

  const lp = getValue('lifePath');
  const ex = getValue('expression');
  const su = getValue('soulUrge');
  const py = getValue('personalYear');
  const bd = getValue('birthday');

  const cardNum = card.numerologyNumber;

  // Card number matches a core number
  if (cardNum && lp) {
    const lpNum = parseInt(lp.split('/').pop() || lp);
    if (cardNum === lpNum) {
      const ne = NUMBER_ESSENCE[lpNum];
      bridges.push(`${card.name} carries the vibration of ${cardNum}, which mirrors your Life Path ${lp} — ${ne ? 'the theme of ' + ne.theme + ' is being directly activated in this position' : 'amplifying your core life purpose'}. This is the universe speaking in your native frequency.`);
    }
  }

  if (cardNum && py) {
    const pyNum = parseInt(String(py));
    if (cardNum === pyNum && NUMBER_ESSENCE[pyNum]) {
      const ne = NUMBER_ESSENCE[pyNum];
      bridges.push(`${card.name}'s numerological root of ${cardNum} aligns precisely with your Personal Year ${pyNum} — both carry the energy of ${ne.theme}. The timing encoded in this card is not coincidental.`);
    }
  }

  if (cardNum && ex) {
    const exNum = parseInt(ex.split('/').pop() || ex);
    if (cardNum === exNum) {
      bridges.push(`This card vibrates at ${cardNum}, echoing your Expression number ${ex}. Your outward gifts and the message of this card are speaking the same language right now.`);
    }
  }

  // Position-specific bridges
  if (positionLink === 'lifePath' && lp) {
    const ne = NUMBER_ESSENCE[parseInt(lp.split('/').pop() || lp)];
    if (ne) bridges.push(`In the Life Path position, ${card.name} ${reversed ? '(reversed)' : ''} meets your LP ${lp}'s journey of ${ne.theme}. ${reversed ? 'The reversal suggests resistance in fully embodying this path right now.' : 'This card affirms the direction your life force is moving.'}`);
  }

  if (positionLink === 'soulUrge' && su) {
    const ne = NUMBER_ESSENCE[parseInt(su.split('/').pop() || su)];
    if (ne) bridges.push(`At the Soul Urge level — your deepest desire for ${ne ? ne.theme : 'fulfilment'} (SU ${su}) — ${card.name} speaks directly to what your heart truly needs, not just what the mind requests.`);
  }

  if (positionLink === 'personalYear' && py) {
    const pyTheme = PERSONAL_YEAR_THEMES[parseInt(String(py))];
    if (pyTheme) bridges.push(`Your Personal Year ${py} is a year of ${pyTheme}. ${card.name} in this position confirms and colours that annual theme with its specific energy.`);
  }

  if (positionLink === 'expression' && ex) {
    bridges.push(`Your Expression number ${ex} defines how you show up in the world. ${card.name} in this position reflects the external circumstances and opportunities that align with your natural gifts.`);
  }

  if (bridges.length === 0 && cardNum && NUMBER_ESSENCE[cardNum]) {
    const ne = NUMBER_ESSENCE[cardNum];
    bridges.push(`${card.name} carries the numerological frequency of ${cardNum} — the vibration of ${ne.theme}. ${reversed ? 'Reversed, this energy is either blocked or expressing through its shadow of ' + ne.shadow + '.' : 'This energy is alive and available to you.'}`);
  }

  return bridges[0] || '';
}

// ─── POSITION INTERPRETATION LAYER ────────────────────────────────────────

function interpretCardInPosition(
  card: TarotCard,
  reversed: boolean,
  position: { label: string; description: string },
  question: string,
  tone: ToneType
): string {
  const baseMeaning = reversed ? card.meaningReversed : card.meaning;
  const keywords = (reversed ? card.keywordsReversed : card.keywords).slice(0, 3);
  const tc = TONE_CONFIGS[tone];

  const positionContext: Record<string, string> = {
    'Past': 'The foundation of where this situation began',
    'Present': 'The current energy you are navigating right now',
    'Future': 'The trajectory ahead if current patterns continue',
    'Situation': 'The landscape of what is actually occurring',
    'Challenge': 'What is creating friction or asking for growth',
    'Advice': 'The wisdom the universe offers for your highest outcome',
    'The Heart': 'The core essence of this entire matter',
    'The Cross': 'The opposing force or complicating energy',
    'Foundation': 'The deep root from which this situation grew',
    'Recent Past': 'What is now fading from the field',
    'Potential': 'The highest possible outcome available',
    'Near Future': 'What approaches on the horizon',
    'Your Stance': 'How you are perceiving and approaching this',
    'External Forces': 'Energies outside your direct control',
    'Hopes & Fears': 'The dual pull of what you want and what you dread',
    'Outcome': 'The most likely resolution given current energies',
    'You': 'Your energy and stance within this dynamic',
    'Them': 'The energy and position of the other person',
    'The Bond': 'The nature and quality of the connection itself',
    'Current Path': 'Where your professional journey currently stands',
    'Strengths': 'The assets and capabilities at your disposal',
    'Obstacles': 'What stands between current position and desired outcome',
    'Action': 'The most potent step to take in this moment',
    'Your Message': 'The single most important message for you right now',
    'Q1 Theme': 'The energy and focus for the first quarter of your year',
    'Q2 Theme': 'The energy and focus for the second quarter',
    'Q3 Theme': 'The energy and focus for the third quarter',
    'Annual Lesson': 'The overarching theme your soul is working with this year',
    'Current Name Energy': 'The vibration your current name carries',
    'Transition Energy': 'The energy of the name change process itself',
    'New Name Potential': 'What the corrected name can bring into your life',
  };

  const posCtx = positionContext[position.label] || position.description;

  // Detect question theme for contextual adaptation
  const qLower = question.toLowerCase();
  const isCareer = qLower.includes('career') || qLower.includes('job') || qLower.includes('business') || qLower.includes('work') || qLower.includes('money') || qLower.includes('financial');
  const isRelationship = qLower.includes('relationship') || qLower.includes('love') || qLower.includes('partner') || qLower.includes('marriage');
  const isSpiritual = qLower.includes('spiritual') || qLower.includes('purpose') || qLower.includes('soul') || qLower.includes('path');

  let contextLayer = '';
  if (isCareer && card.suit === 'pentacles') contextLayer = ' In the context of your career question, this Pentacles energy speaks directly to material outcomes and practical progress.';
  else if (isCareer && card.suit === 'wands') contextLayer = ' The Wands energy here brings passion and drive into your career question — ambition and creative fire are the relevant forces.';
  else if (isRelationship && card.suit === 'cups') contextLayer = ' The Cups energy here speaks directly to the emotional undercurrents of your relationship question.';
  else if (isSpiritual && card.arcana === 'major') contextLayer = ' As a Major Arcana card in a spiritual reading, this carries particular weight — the universe is making its message clear.';

  const prefix = reversed ? tc.challengePrefix[0] : '';

  return `${posCtx}: ${prefix} ${baseMeaning}${contextLayer} The key energies at play here are ${keywords.join(', ')}.`.trim();
}

// ─── NARRATIVE SYNTHESISER ────────────────────────────────────────────────

function synthesiseNarrative(
  cards: Array<{ card: TarotCard; reversed: boolean; position: { label: string; description: string; numerologyLink?: string } }>,
  question: string,
  spreadName: string,
  numCtx: Record<string, string | number | undefined>,
  tone: ToneType,
  interactions: string[]
): string {
  const tc = TONE_CONFIGS[tone];
  const paragraphs: string[] = [];

  // Opening paragraph — question + overall energy
  const opener = tc.opener[Math.floor(Math.random() * tc.opener.length)];
  const cardNames = cards.map(c => `${c.card.name}${c.reversed ? ' (reversed)' : ''}`);
  const overallEnergy = cards.filter(c => !c.reversed).length > cards.length / 2 ? 'largely supportive and forward-moving' : 'complex and inward-turning';
  paragraphs.push(`${opener} in response to your question: "${question}". The ${spreadName} draws ${cardNames.join(', ')} — an ${overallEnergy} combination of energies.`);

  // Card-by-card flow paragraph
  if (cards.length === 1) {
    const c = cards[0];
    const meaning = c.reversed ? c.card.meaningReversed : c.card.meaning;
    paragraphs.push(`${c.card.name}${c.reversed ? ', in its reversed position,' : ''} delivers a singular, focused message: ${meaning} ${c.card.arcana === 'major' ? 'As a Major Arcana card, this carries the weight of a universal principle operating in your life.' : `The ${c.card.suit} energy grounds this message in the domain of ${c.card.suit ? SUIT_DOMAINS[c.card.suit] : 'daily experience'}.`}`);
  } else if (cards.length <= 3) {
    const bridge = tc.bridge[Math.floor(Math.random() * tc.bridge.length)];
    const flowParts = cards.map((c, i) => {
      const meaning = c.reversed ? c.card.meaningReversed : c.card.meaning;
      const posLabel = c.position.label;
      return `in the ${posLabel} position, ${c.card.name}${c.reversed ? ' reversed' : ''} brings the energy of ${(c.reversed ? c.card.keywordsReversed : c.card.keywords).slice(0, 2).join(' and ')} — ${meaning.split('.')[0]}`;
    });
    paragraphs.push(`${bridge} the interplay between all three positions. ${flowParts[0].charAt(0).toUpperCase() + flowParts[0].slice(1)}. ${cards.length > 1 ? (flowParts[1].charAt(0).toUpperCase() + flowParts[1].slice(1) + '.') : ''} ${cards.length > 2 ? (flowParts[2].charAt(0).toUpperCase() + flowParts[2].slice(1) + '.') : ''}`);
  } else {
    // Larger spreads — group by energy type
    const challengeCards = cards.filter(c => c.reversed || ['The Tower', '9 of Swords', '3 of Swords', '5 of Swords', 'The Devil', 'Death'].includes(c.card.name));
    const strengthCards = cards.filter(c => !c.reversed && !challengeCards.includes(c));

    if (strengthCards.length > 0) {
      const sc = strengthCards[0];
      const meaning = sc.card.meaning;
      paragraphs.push(`The supportive current running through this spread flows from ${sc.card.name} in the ${sc.position.label} position — ${meaning.split('.')[0]}. ${strengthCards.length > 1 ? `This supportive energy is reinforced by ${strengthCards[1].card.name} in the ${strengthCards[1].position.label} position.` : ''}`);
    }

    if (challengeCards.length > 0) {
      const cc = challengeCards[0];
      const challengePrefix = tc.challengePrefix[Math.floor(Math.random() * tc.challengePrefix.length)];
      const meaning = cc.reversed ? cc.card.meaningReversed : cc.card.meaning;
      paragraphs.push(`${challengePrefix} ${cc.card.name} in the ${cc.position.label} position signals that ${meaning.split('.')[0].toLowerCase()}. This is not a sign to retreat — it is an invitation to meet this energy with clarity and intention.`);
    }
  }

  // Cross-card interactions
  if (interactions.length > 0) {
    paragraphs.push(interactions.slice(0, 2).join(' '));
  }

  // Numerology integration paragraph
  const lp = numCtx.lifePath ? String(numCtx.lifePath) : null;
  const py = numCtx.personalYear ? String(numCtx.personalYear) : null;
  const su = numCtx.soulUrge ? String(numCtx.soulUrge) : null;

  if (lp || py) {
    const numParts: string[] = [];
    if (lp) {
      const lpNum = parseInt(lp.split('/').pop() || lp);
      const ne = NUMBER_ESSENCE[lpNum];
      if (ne) numParts.push(`your Life Path ${lp} (the path of ${ne.theme})`);
    }
    if (py) {
      const pyNum = parseInt(py);
      const pyTheme = PERSONAL_YEAR_THEMES[pyNum];
      if (pyTheme) numParts.push(`your Personal Year ${py} (a year of ${pyTheme})`);
    }
    if (su) {
      const suNum = parseInt(su.split('/').pop() || su);
      const ne = NUMBER_ESSENCE[suNum];
      if (ne) numParts.push(`your Soul Urge ${su} (the deep desire for ${ne.theme})`);
    }

    if (numParts.length > 0) {
      const bridge = tc.bridge[Math.floor(Math.random() * tc.bridge.length)];
      paragraphs.push(`${bridge} the way these cards interact with ${numParts.join(', ')}. The universe rarely delivers messages in isolation — your numerological blueprint provides the personalised lens through which these archetypes speak directly to you, not just as universal symbols, but as specific guidance for your unique journey.`);
    }
  }

  // Closing paragraph
  const closer = tc.closer[Math.floor(Math.random() * tc.closer.length)];
  paragraphs.push(closer);

  return paragraphs.join('\n\n');
}

// ─── ACTIONABLE GUIDANCE GENERATOR ────────────────────────────────────────

function generateActionableGuidance(
  cards: Array<{ card: TarotCard; reversed: boolean; position: { label: string } }>,
  question: string,
  numCtx: Record<string, string | number | undefined>,
  tone: ToneType
): string {
  const tc = TONE_CONFIGS[tone];
  const actions: string[] = [];

  // Extract the most actionable card (prefer advice/outcome positions)
  const adviceCard = cards.find(c =>
    ['Advice', 'Outcome', 'Action', 'Near Future', 'Your Message', 'Annual Lesson'].includes(c.position.label)
  ) || cards[cards.length - 1];

  const challengeCard = cards.find(c =>
    ['Challenge', 'Obstacles', 'The Cross'].includes(c.position.label)
  );

  const py = numCtx.personalYear ? parseInt(String(numCtx.personalYear)) : null;
  const lp = numCtx.lifePath ? String(numCtx.lifePath) : null;

  // Primary action from advice card
  if (adviceCard) {
    const keywords = (adviceCard.reversed ? adviceCard.card.keywordsReversed : adviceCard.card.keywords);
    const prefix = tc.advicePrefix[Math.floor(Math.random() * tc.advicePrefix.length)];

    if (adviceCard.card.suit === 'pentacles' || keywords.some(k => ['abundance', 'wealth', 'financial', 'security', 'work', 'skill'].includes(k))) {
      actions.push(`${prefix} making one concrete, practical decision this week. Write down the specific material or financial step the cards are guiding you toward.`);
    } else if (adviceCard.card.suit === 'cups' || keywords.some(k => ['love', 'emotion', 'relationship', 'intuition', 'healing'].includes(k))) {
      actions.push(`${prefix} an honest emotional inventory. Journal or speak aloud what you are truly feeling about this situation — the body knows before the mind does.`);
    } else if (adviceCard.card.suit === 'swords' || keywords.some(k => ['truth', 'clarity', 'communication', 'decision', 'cut', 'boundary'].includes(k))) {
      actions.push(`${prefix} having the conversation you have been avoiding, or making the decision you have been delaying. Mental clarity comes from action, not more analysis.`);
    } else if (adviceCard.card.suit === 'wands' || keywords.some(k => ['action', 'passion', 'fire', 'ambition', 'move', 'create'].includes(k))) {
      actions.push(`${prefix} directing your energy into one bold, creative act. Momentum is built by moving, not waiting.`);
    } else {
      const meaning = adviceCard.reversed ? adviceCard.card.meaningReversed : adviceCard.card.meaning;
      actions.push(`${prefix} ${meaning.split('.')[0].toLowerCase()}.`);
    }
  }

  // Challenge card → specific response action
  if (challengeCard) {
    const ckw = (challengeCard.reversed ? challengeCard.card.keywordsReversed : challengeCard.card.keywords)[0];
    actions.push(`To address the challenge energy (${challengeCard.card.name}): identify one specific instance of "${ckw}" in your current situation and write down a single, concrete response to it.`);
  }

  // Numerology-based timing action
  if (py) {
    const pyTheme = PERSONAL_YEAR_THEMES[py];
    if (pyTheme) {
      actions.push(`Align your next major decision with your Personal Year ${py} energy — a year of ${pyTheme}. Ask yourself: does the action I am considering move with or against this annual current?`);
    }
  }

  // Question-specific action
  const qLower = question.toLowerCase();
  if (qLower.includes('should i') || qLower.includes('shall i')) {
    actions.push(`Create a simple pros/cons list, then sit with it for 24 hours before deciding. Notice which column feels heavier in your body, not just your mind.`);
  } else if (qLower.includes('relationship') || qLower.includes('partner')) {
    actions.push(`Have one honest, vulnerability-led conversation with the person in question this week. Speak your truth without agenda — the cards suggest transparency is the key.`);
  } else if (qLower.includes('career') || qLower.includes('business')) {
    actions.push(`Identify the single highest-leverage action in your career or business right now and commit to completing it within 72 hours. Energy follows commitment.`);
  }

  // LP-based life alignment action
  if (lp) {
    const lpNum = parseInt(lp.split('/').pop() || lp);
    const ne = NUMBER_ESSENCE[lpNum];
    if (ne) actions.push(`Reconnect with your Life Path ${lp} gift of ${ne.gift}. Ask: how can the action I am considering express this gift more fully?`);
  }

  return actions.slice(0, 4).map((a, i) => `${i + 1}. ${a.charAt(0).toUpperCase() + a.slice(1)}`).join('\n\n');
}

// ─── YES / NO ORACLE ──────────────────────────────────────────────────────

// Traditional yes/no polarity for each card (upright). Reversed flips the polarity.
// YES cards: positive, expansive, affirming energy
// NO cards: challenging, blocking, cautionary energy
// CONDITIONAL: inherently ambiguous cards
const CARD_YES_NO: Record<number, 'YES' | 'NO' | 'CONDITIONAL'> = {
  // Major Arcana
  0: 'YES',   // The Fool — new beginnings, yes
  1: 'YES',   // The Magician — yes, manifesting
  2: 'CONDITIONAL', // High Priestess — wait, reflect
  3: 'YES',   // The Empress — yes, abundant
  4: 'YES',   // The Emperor — yes, stable
  5: 'CONDITIONAL', // Hierophant — depends on context
  6: 'YES',   // The Lovers — yes, aligned
  7: 'YES',   // The Chariot — yes, victory
  8: 'YES',   // Strength — yes, with courage
  9: 'CONDITIONAL', // The Hermit — not yet, wait
  10: 'YES',  // Wheel of Fortune — yes, turning in your favour
  11: 'YES',  // Justice — yes, if aligned with truth
  12: 'NO',   // Hanged Man — no, pause needed
  13: 'CONDITIONAL', // Death — transformation required first
  14: 'YES',  // Temperance — yes, with balance
  15: 'NO',   // The Devil — no, examine motivations
  16: 'NO',   // The Tower — no, change is forced
  17: 'YES',  // The Star — yes, hope and renewal
  18: 'CONDITIONAL', // The Moon — unclear, hidden forces
  19: 'YES',  // The Sun — YES, highest affirmation
  20: 'YES',  // Judgement — yes, a new chapter
  21: 'YES',  // The World — YES, completion and success
  // Wands (22-35) — fire energy, mostly yes
  22: 'YES',  // Ace of Wands
  23: 'YES',  // 2 of Wands
  24: 'YES',  // 3 of Wands
  25: 'YES',  // 4 of Wands
  26: 'NO',   // 5 of Wands (conflict)
  27: 'YES',  // 6 of Wands (victory)
  28: 'CONDITIONAL', // 7 of Wands (defensive)
  29: 'YES',  // 8 of Wands (fast movement)
  30: 'NO',   // 9 of Wands (exhaustion)
  31: 'NO',   // 10 of Wands (burden)
  32: 'YES',  // Page of Wands
  33: 'YES',  // Knight of Wands
  34: 'YES',  // Queen of Wands
  35: 'YES',  // King of Wands
  // Cups (36-49) — emotional energy, mostly yes for relationships
  36: 'YES',  // Ace of Cups
  37: 'YES',  // 2 of Cups
  38: 'YES',  // 3 of Cups
  39: 'NO',   // 4 of Cups (withdrawal)
  40: 'NO',   // 5 of Cups (loss)
  41: 'YES',  // 6 of Cups (nostalgia, warmth)
  42: 'CONDITIONAL', // 7 of Cups (illusion, choices)
  43: 'NO',   // 8 of Cups (walking away)
  44: 'YES',  // 9 of Cups (wish card — YES)
  45: 'YES',  // 10 of Cups
  46: 'YES',  // Page of Cups
  47: 'CONDITIONAL', // Knight of Cups
  48: 'YES',  // Queen of Cups
  49: 'YES',  // King of Cups
  // Swords (50-63) — air/conflict, mostly no or conditional
  50: 'YES',  // Ace of Swords (clarity — yes)
  51: 'CONDITIONAL', // 2 of Swords (stalemate)
  52: 'NO',   // 3 of Swords (heartbreak)
  53: 'NO',   // 4 of Swords (rest, not yet)
  54: 'NO',   // 5 of Swords (defeat)
  55: 'YES',  // 6 of Swords (moving forward)
  56: 'NO',   // 7 of Swords (deception)
  57: 'CONDITIONAL', // 8 of Swords (trapped)
  58: 'NO',   // 9 of Swords (anxiety)
  59: 'NO',   // 10 of Swords (endings)
  60: 'YES',  // Page of Swords
  61: 'CONDITIONAL', // Knight of Swords (impulsive)
  62: 'YES',  // Queen of Swords
  63: 'YES',  // King of Swords
  // Pentacles (64-77) — earth energy, grounded, mostly yes for material matters
  64: 'YES',  // Ace of Pentacles
  65: 'YES',  // 2 of Pentacles
  66: 'YES',  // 3 of Pentacles
  67: 'CONDITIONAL', // 4 of Pentacles (holding on)
  68: 'NO',   // 5 of Pentacles (hardship)
  69: 'YES',  // 6 of Pentacles
  70: 'YES',  // 7 of Pentacles (patience — conditional growth)
  71: 'YES',  // 8 of Pentacles
  72: 'YES',  // 9 of Pentacles
  73: 'YES',  // 10 of Pentacles
  74: 'YES',  // Page of Pentacles
  75: 'CONDITIONAL', // Knight of Pentacles (slow)
  76: 'YES',  // Queen of Pentacles
  77: 'YES',  // King of Pentacles
};

const YES_NO_BRIEFS: Record<string, Record<'YES' | 'NO' | 'CONDITIONAL', string[]>> = {
  YES: {
    YES: [
      'The oracle is clear: yes. The energy is aligned and the timing is favourable.',
      'A resounding yes — the cards confirm this path is open.',
      'Yes. The universe is green-lighting this direction.',
      'The oracle affirms it: yes. Move forward.',
    ],
    NO: [],
    CONDITIONAL: [],
  },
  NO: {
    YES: [],
    NO: [
      'The oracle speaks plainly: no. Something is not yet aligned. Trust the pause.',
      'No — not this way, not right now. The energy is blocked or misdirected.',
      'The oracle advises against it. There are forces not yet in your favour.',
      'No. The cards urge you to reconsider before proceeding.',
    ],
    CONDITIONAL: [],
  },
  CONDITIONAL: {
    YES: [],
    NO: [],
    CONDITIONAL: [
      'The answer is conditional. Yes, but only if a specific condition is met first.',
      'Not a clear yes or no — something must shift before this can resolve positively.',
      'The oracle says: maybe. The outcome depends on choices you have not yet made.',
      'Yes, with a caveat. The cards see potential but also a condition that must be addressed.',
    ],
  },
};

const YES_NO_CONDITIONS: Record<number, string> = {
  2: 'Trust your intuition over logic before deciding.',
  5: 'Only if aligned with established tradition or expert guidance.',
  9: 'After a period of solitude and inner reflection.',
  12: 'After surrendering the need to control the outcome.',
  13: 'After accepting the necessary ending or transformation.',
  18: 'Once hidden information comes to light.',
  42: 'After gaining clarity on which option you truly desire.',
  43: 'Only if you are willing to release what is no longer serving you.',
  47: 'If you can slow the pace and approach with genuine intention.',
  51: 'Once the indecision is resolved by gathering more information.',
  57: 'After removing the self-imposed limitations blocking you.',
  67: 'If you can release the grip of fear around loss or scarcity.',
  70: 'After patient, sustained effort — the harvest is not yet ready.',
  75: 'With steady, methodical action over an extended timeframe.',
};

function generateYesNoAnswer(
  card: TarotCard,
  reversed: boolean,
  question: string,
  numCtx: Record<string, string | number | undefined>
): TarotReadingResult['yesNoAnswer'] {
  // Get base polarity, then flip if reversed
  const basePolarity = CARD_YES_NO[card.id] ?? 'CONDITIONAL';
  let verdict: 'YES' | 'NO' | 'CONDITIONAL';

  if (reversed) {
    if (basePolarity === 'YES') verdict = 'NO';
    else if (basePolarity === 'NO') verdict = 'YES';
    else verdict = 'CONDITIONAL';
  } else {
    verdict = basePolarity;
  }

  // Numerology can influence conditional cards to lean YES or NO
  if (verdict === 'CONDITIONAL' && numCtx.lifePath) {
    const lpNum = parseInt(String(numCtx.lifePath).split('/').pop() || '0');
    const ne = NUMBER_ESSENCE[lpNum];
    // LP in action-oriented numbers (1, 3, 5, 8) tips toward YES on conditional
    if ([1, 3, 5, 8].includes(lpNum) && ne) verdict = 'YES';
    // LP in reflective numbers (2, 7, 9) keeps CONDITIONAL or tips NO
    if ([2, 7, 9].includes(lpNum)) verdict = 'CONDITIONAL';
  }

  const verdictColor: Record<'YES' | 'NO' | 'CONDITIONAL', 'emerald' | 'rose' | 'amber'> = {
    YES: 'emerald', NO: 'rose', CONDITIONAL: 'amber'
  };

  // Pick brief
  const briefPool = YES_NO_BRIEFS[verdict][verdict] || [];
  const brief = briefPool[Math.floor(Math.random() * briefPool.length)] ||
    `The ${card.name} ${reversed ? '(reversed) ' : ''}speaks: ${verdict.toLowerCase()}.`;

  // Condition if applicable
  const condition = verdict === 'CONDITIONAL'
    ? (YES_NO_CONDITIONS[card.id] || 'Reflect deeply on whether the timing and circumstances are truly right.')
    : undefined;

  return { verdict, verdictColor: verdictColor[verdict], brief, condition };
}

// ─── MAIN ENGINE FUNCTION ─────────────────────────────────────────────────

export interface ReadingInput {
  question: string;
  spread: SpreadTemplate;
  drawnCards: Array<{ cardId: number; reversed: boolean } | null>;
  numerologyContext: Record<string, string | number | undefined>;
  tone: ToneType;
}

export function generateReading(input: ReadingInput): TarotReadingResult {
  const { question, spread, drawnCards, numerologyContext, tone } = input;

  // Build enriched card objects
  const enrichedCards = drawnCards
    .filter((d): d is { cardId: number; reversed: boolean } => d !== null)
    .map((drawn, i) => {
      const card = ALL_CARDS.find(c => c.id === drawn.cardId)!;
      const position = spread.positions[i];
      return { card, reversed: drawn.reversed, position };
    });

  // Detect cross-card interactions
  const interactions = detectCardInteractions(enrichedCards);

  // Build card breakdowns
  const cardBreakdowns = enrichedCards.map(({ card, reversed, position }) => {
    const interpretation = interpretCardInPosition(card, reversed, position, question, tone);
    const numerologyBridge = buildNumerologyBridge(card, reversed, position.numerologyLink, numerologyContext);

    return {
      positionLabel: position.label,
      cardName: card.name,
      reversed,
      interpretation,
      numerologyBridge: numerologyBridge || undefined,
    };
  });

  // Overall theme
  const majorCards = enrichedCards.filter(c => c.card.arcana === 'major');
  const reversedCount = enrichedCards.filter(c => c.reversed).length;
  const dominantSuit = (() => {
    const suitCount: Record<string, number> = {};
    enrichedCards.forEach(c => { if (c.card.suit) suitCount[c.card.suit] = (suitCount[c.card.suit] || 0) + 1; });
    return Object.entries(suitCount).sort((a, b) => b[1] - a[1])[0]?.[0];
  })();

  let overallTheme = `This ${spread.name} reading for "${question}" `;
  if (majorCards.length === enrichedCards.length) {
    overallTheme += `is dominated entirely by Major Arcana energy — ${majorCards.map(c => c.card.name).join(', ')} — indicating that this situation operates at the level of major life lessons and soul-directed experience, not surface-level circumstances.`;
  } else if (majorCards.length > 0) {
    overallTheme += `carries a blend of Major Arcana depth (${majorCards.map(c => c.card.name).join(', ')}) and ${dominantSuit ? dominantSuit + '-domain' : 'day-to-day'} practical energy. `;
    overallTheme += reversedCount > 0 ? `With ${reversedCount} reversed card${reversedCount > 1 ? 's' : ''}, internal resistance or review is part of this journey.` : 'The predominantly upright energy signals readiness for forward movement.';
  } else {
    overallTheme += `works through the everyday world — ${dominantSuit ? 'primarily the domain of ' + SUIT_DOMAINS[dominantSuit] : 'across multiple life domains'}. `;
    overallTheme += reversedCount > 0 ? 'Some internal blocks need addressing before outer progress flows freely.' : 'The energy is available and actionable right now.';
  }

  // Full narrative
  const narrative = synthesiseNarrative(enrichedCards, question, spread.name, numerologyContext, tone, interactions);

  // Numerology integration section
  let numerologyIntegration: string | undefined;
  const lp = numerologyContext.lifePath ? String(numerologyContext.lifePath) : null;
  const py = numerologyContext.personalYear ? String(numerologyContext.personalYear) : null;
  const ex = numerologyContext.expression ? String(numerologyContext.expression) : null;
  const su = numerologyContext.soulUrge ? String(numerologyContext.soulUrge) : null;
  const name = numerologyContext.name ? String(numerologyContext.name) : null;

  if (lp || py || ex || su) {
    const parts: string[] = [];

    if (name && lp) {
      const lpNum = parseInt(lp.split('/').pop() || lp);
      const ne = NUMBER_ESSENCE[lpNum];
      parts.push(`${name}'s Life Path ${lp} carries the vibration of ${ne ? ne.theme : 'unique soul purpose'}. ${ne ? 'The gift embedded in this path is ' + ne.gift + '.' : ''} The cards drawn today are in direct conversation with this core life direction.`);
    } else if (lp) {
      const lpNum = parseInt(lp.split('/').pop() || lp);
      const ne = NUMBER_ESSENCE[lpNum];
      if (ne) parts.push(`The Life Path ${lp} carries the central theme of ${ne.theme}. Its gift is ${ne.gift}, and its shadow asks for vigilance around ${ne.shadow}.`);
    }

    if (py) {
      const pyNum = parseInt(py);
      const pyTheme = PERSONAL_YEAR_THEMES[pyNum];
      if (pyTheme) parts.push(`Operating in a Personal Year ${py} (a year of ${pyTheme}), the timing of this reading is particularly significant. The cards are speaking into a cycle that already carries specific cosmic momentum.`);
    }

    if (ex && su) {
      const exNum = parseInt(ex.split('/').pop() || ex);
      const suNum = parseInt(su.split('/').pop() || su);
      const exNe = NUMBER_ESSENCE[exNum];
      const suNe = NUMBER_ESSENCE[suNum];
      if (exNe && suNe) {
        parts.push(`The dynamic between Expression ${ex} (outer gifts of ${exNe.theme}) and Soul Urge ${su} (inner desire for ${suNe.theme}) creates a specific tension that this spread is illuminating. The cards are showing where these two forces are aligned — and where they may be in conflict.`);
      }
    }

    // Find any card numerology resonance
    const resonantCards = enrichedCards.filter(c => {
      const num = c.card.numerologyNumber;
      if (!num) return false;
      return [lp, py, ex, su].some(v => v && parseInt(v.split('/').pop() || v) === num);
    });
    if (resonantCards.length > 0) {
      parts.push(`Notably, ${resonantCards.map(c => c.card.name).join(' and ')} share${resonantCards.length === 1 ? 's' : ''} numerological resonance with the core numbers in this profile — this synchronicity suggests the universe is speaking with particular precision in this reading.`);
    }

    numerologyIntegration = parts.join('\n\n');
  }

  // Actionable guidance
  const actionableGuidance = generateActionableGuidance(enrichedCards, question, numerologyContext, tone);

  // Yes/No oracle logic — only for yes-no spreads
  let yesNoAnswer: TarotReadingResult['yesNoAnswer'];
  if (spread.yesNo && enrichedCards.length === 1) {
    const { card, reversed } = enrichedCards[0];
    yesNoAnswer = generateYesNoAnswer(card, reversed, question, numerologyContext);
  }

  return {
    narrative,
    cardBreakdowns,
    overallTheme,
    actionableGuidance,
    numerologyIntegration: numerologyIntegration || undefined,
    yesNoAnswer,
    generatedAt: new Date().toISOString(),
  };
}
