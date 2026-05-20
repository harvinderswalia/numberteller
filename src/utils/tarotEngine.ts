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

// ─── QUESTION INTENT CLASSIFIER ───────────────────────────────────────────

type QuestionDomain =
  | 'marriage_decision'
  | 'reconciliation'
  | 'new_relationship'
  | 'relationship_future'
  | 'breakup_divorce'
  | 'ex_return'
  | 'cheating_trust'
  | 'unrequited_love'
  | 'soulmate_timing'
  | 'general_love'
  | 'job_change'
  | 'business_start'
  | 'career_growth'
  | 'financial_decision'
  | 'money_abundance'
  | 'investment_risk'
  | 'job_loss'
  | 'general_career'
  | 'health_recovery'
  | 'mental_health'
  | 'general_health'
  | 'life_purpose'
  | 'spiritual_awakening'
  | 'past_life'
  | 'grief_loss'
  | 'family_conflict'
  | 'moving_travel'
  | 'housing_decision'
  | 'legal_matter'
  | 'pregnancy_fertility'
  | 'education_study'
  | 'addiction_habit'
  | 'general_guidance';

interface QuestionIntent {
  domain: QuestionDomain;
  subject: string;
  verbForm: string;
  positionLenses: Record<string, string>;
  narrativeFrame: string;
  actionFrame: string;
  outcomeLanguage: string;
  cardContextualiser: (cardName: string, suit: string | undefined, reversed: boolean, positionLabel: string) => string;
}

const INTENT_PATTERNS: Array<{
  domain: QuestionDomain;
  patterns: RegExp[];
  subject: string;
  verbForm: string;
  narrativeFrame: string;
  actionFrame: string;
  outcomeLanguage: string;
  positionLenses: Record<string, string>;
}> = [
  {
    domain: 'marriage_decision',
    patterns: [/should\s+(i|we)\s+(get\s+)?marr/i, /marr(y|ied|iage)/i, /propose|proposal/i, /will\s+(we|they|he|she)\s+(ever\s+)?marr/i, /ready\s+for\s+marriage/i],
    subject: 'marriage',
    verbForm: 'marrying this person',
    narrativeFrame: 'whether marriage is the right next step in this relationship',
    actionFrame: 'making this lifelong commitment',
    outcomeLanguage: 'for this union',
    positionLenses: {
      'Past': 'The foundation this relationship has been built upon — and whether that foundation is strong enough to support a lifelong union',
      'Present': 'The current state of the bond between you — is there genuine readiness for marriage in both hearts right now',
      'Future': 'What marriage or the path toward it would bring — the trajectory ahead if this commitment is made',
      'Situation': 'The true state of this relationship and its readiness for the commitment of marriage',
      'Challenge': 'What stands between you and a truly fulfilling marriage — the obstacle to address before committing',
      'Advice': 'The wisest counsel the universe offers on the question of marriage at this time',
      'The Heart': 'The core truth at the centre of whether this marriage would truly serve both souls',
      'The Cross': 'The complicating force — what may need to be resolved or accepted before a marriage can thrive',
      'Foundation': 'The bedrock this potential marriage stands on — its deep roots',
      'Outcome': 'The most likely outcome of this marriage if you proceed given current energies',
      'You': 'Your deepest readiness and true feelings about this marriage',
      'Them': 'Their inner energy, readiness and true feelings about marrying you',
      'The Bond': 'The soul-level compatibility and quality of this connection for a lifelong partnership',
      'Hopes & Fears': 'What you most desire and most fear about committing to this marriage',
    },
  },
  {
    domain: 'reconciliation',
    patterns: [/get\s+back\s+together/i, /reconcil/i, /should\s+(i|we)\s+try\s+again/i, /second\s+chance/i, /restart\s+(our\s+)?relationship/i, /rekindle/i],
    subject: 'reconciliation',
    verbForm: 'getting back together',
    narrativeFrame: 'whether reconciliation is possible and wise',
    actionFrame: 'attempting to reconcile',
    outcomeLanguage: 'for this reconciliation',
    positionLenses: {
      'Past': 'What originally broke this connection — the pattern or wound that caused the separation',
      'Present': 'The current energy between you both — whether the conditions for genuine reconciliation exist now',
      'Future': 'What reuniting would actually bring — the honest trajectory of a rekindled relationship',
      'Situation': 'The true state of this potential reconciliation — what is actually possible between you',
      'Challenge': 'The unresolved issue or pattern that must be addressed for reconciliation to be real, not just repetition',
      'Advice': 'The cards\' honest counsel on whether and how to pursue getting back together',
      'Outcome': 'The most likely outcome if you pursue reconciliation given current energies',
      'You': 'Your true motivation and readiness for reconciliation — what is driving this desire',
      'Them': 'Their true inner state regarding the possibility of getting back together',
      'The Bond': 'Whether the connection between you is genuinely revivable or has run its course',
    },
  },
  {
    domain: 'ex_return',
    patterns: [/will\s+(he|she|they)\s+(come\s+back|return)/i, /ex\s+(come|coming|return|back)/i, /is\s+(he|she)\s+thinking\s+of\s+(me|coming)/i, /miss\s+(me|them)/i],
    subject: 'their return',
    verbForm: 'whether your ex will return',
    narrativeFrame: 'whether this person will come back and whether that is truly what you want',
    actionFrame: 'this situation with your ex',
    outcomeLanguage: 'regarding their possible return',
    positionLenses: {
      'Past': 'The connection you shared — what drew you together and what drove you apart',
      'Present': 'The energy between you right now — whether there is a real pull from their side',
      'Future': 'The honest trajectory — whether a return is coming and what it would actually mean',
      'Situation': 'The real state of this dynamic — what is truly happening between you and your ex',
      'Challenge': 'What stands in the way — either of their return or of your own healing and moving forward',
      'Advice': 'The wisest path: whether to remain open, let go, or focus your energy elsewhere',
      'You': 'Your own energy and what you are energetically broadcasting toward this person',
      'Them': 'Their actual inner state — what they feel and whether return is genuinely on their mind',
      'The Bond': 'The nature of the soul tie between you — whether it is truly alive or a memory you are holding onto',
      'Outcome': 'The most honest prediction of how this situation will unfold',
    },
  },
  {
    domain: 'new_relationship',
    patterns: [/will\s+(i|we)\s+(find|meet|start)/i, /new\s+(love|relationship|partner)/i, /is\s+(he|she|this\s+person)\s+right\s+for\s+me/i, /should\s+i\s+(date|go\s+out|pursue)/i, /is\s+this\s+the\s+one/i, /falling\s+in\s+love/i],
    subject: 'this new connection',
    verbForm: 'pursuing this new relationship',
    narrativeFrame: 'whether to pursue this new connection and what it truly holds',
    actionFrame: 'moving forward with this new person',
    outcomeLanguage: 'for this new relationship',
    positionLenses: {
      'Past': 'The love history and patterns you bring into this new connection',
      'Present': 'The current chemistry and potential between you — what is genuinely here',
      'Future': 'Where this connection leads if you pursue it — the honest trajectory',
      'Situation': 'The true nature of this connection and whether it has real potential',
      'Challenge': 'What might complicate or test this new relationship',
      'Advice': 'Whether and how to move forward with this person',
      'You': 'Your true readiness for a new relationship and what you bring to it',
      'Them': 'Their energy, intentions and genuine interest in you',
      'The Bond': 'The soul-level compatibility and true nature of this new connection',
      'Outcome': 'Where this new relationship is most likely heading',
    },
  },
  {
    domain: 'breakup_divorce',
    patterns: [/should\s+i\s+(leave|break\s+up|end|divorce)/i, /break\s+up/i, /end\s+(this|the|our)\s+(relationship|marriage)/i, /divorce/i, /is\s+it\s+(over|done)/i, /leave\s+(him|her|them)/i],
    subject: 'this ending',
    verbForm: 'ending this relationship',
    narrativeFrame: 'whether leaving this relationship is the right path',
    actionFrame: 'the decision to end this relationship',
    outcomeLanguage: 'if you choose to leave',
    positionLenses: {
      'Past': 'The history and deep roots of this relationship — what you built together and what eroded',
      'Present': 'The honest current state — the real energy between you right now',
      'Future': 'What staying versus leaving truly holds — the honest path ahead in both directions',
      'Situation': 'The core truth about where this relationship actually stands',
      'Challenge': 'The hardest part of this decision — what makes leaving or staying so difficult',
      'Advice': 'The wisest guidance the cards offer on this ending or continuation',
      'You': 'Your true feelings beneath the confusion or exhaustion — what your soul knows',
      'Them': 'Their inner state and the energy they bring to this relationship dynamic',
      'The Bond': 'The true quality of what remains between you — whether it is worth preserving',
      'Outcome': 'The most honest reading of how this situation will resolve',
    },
  },
  {
    domain: 'cheating_trust',
    patterns: [/cheat(ing)?/i, /is\s+(he|she|they)\s+(loyal|faithful|honest)/i, /trust/i, /lying|lied/i, /affair/i, /unfaithful/i, /hiding\s+something/i],
    subject: 'trust and fidelity',
    verbForm: 'navigating this trust issue',
    narrativeFrame: 'the truth about fidelity and trust in this relationship',
    actionFrame: 'addressing this trust issue',
    outcomeLanguage: 'for the trustworthiness of this relationship',
    positionLenses: {
      'Past': 'The history of trust in this relationship — what patterns have been established',
      'Present': 'The honest energy in this relationship right now — what is actually happening',
      'Situation': 'The truth the cards are willing to illuminate about this situation',
      'Challenge': 'What is genuinely at stake and what is being hidden or unaddressed',
      'Advice': 'How to navigate this situation with wisdom — whether to confront, investigate, or step back',
      'You': 'Your own instincts and what your gut is already telling you',
      'Them': 'Their energy and the honesty or deception present in their actions',
      'Outcome': 'Where this trust situation is likely to lead',
    },
  },
  {
    domain: 'soulmate_timing',
    patterns: [/when\s+will\s+i\s+(find|meet)\s+(love|my\s+soulmate|the\s+one)/i, /soulmate/i, /twin\s+flame/i, /divine\s+timing/i, /am\s+i\s+(going\s+to|ever)\s+(find|meet)/i],
    subject: 'love and soulmate connection',
    verbForm: 'finding your soulmate',
    narrativeFrame: 'the timing and conditions for meeting your soulmate',
    actionFrame: 'opening yourself to love',
    outcomeLanguage: 'for meeting your soulmate',
    positionLenses: {
      'Past': 'The love lessons and wounds you are bringing into this next chapter of your love life',
      'Present': 'Where you stand energetically in terms of readiness to receive love',
      'Future': 'The timing and conditions under which love is most likely to arrive',
      'Situation': 'Your current energetic state as it relates to attracting your soulmate',
      'Challenge': 'What is energetically blocking or delaying the arrival of deep love',
      'Advice': 'What you need to do, release or embody to draw your soulmate closer',
      'Outcome': 'The love story the cards see on the horizon for you',
    },
  },
  {
    domain: 'job_change',
    patterns: [/should\s+i\s+(quit|leave|change|switch)\s+(my\s+)?(job|career|work|position)/i, /new\s+job\s+offer/i, /accept\s+(the\s+)?(offer|position|role)/i, /resign/i, /job\s+(change|switch|offer)/i],
    subject: 'this career change',
    verbForm: 'making this career change',
    narrativeFrame: 'whether to make this career move and what it truly holds',
    actionFrame: 'taking this new role or leaving your current position',
    outcomeLanguage: 'for this career change',
    positionLenses: {
      'Past': 'The professional journey that has brought you to this decision point',
      'Present': 'The honest energy at your current workplace and within you professionally right now',
      'Future': 'What this career change would bring — the true trajectory of the new path',
      'Situation': 'The real state of this career decision and what is driving it',
      'Challenge': 'The risk, fear or obstacle that makes this career change difficult',
      'Advice': 'The wisest course of action regarding this job change',
      'Current Path': 'Where your current professional path actually stands and where it is heading',
      'Outcome': 'The most likely career outcome given the energies present',
    },
  },
  {
    domain: 'business_start',
    patterns: [/start\s+(a|my|the)\s+business/i, /launch/i, /entrepreneur/i, /my\s+(own\s+)?(business|company|venture|startup)/i, /should\s+i\s+(start|open|launch)/i],
    subject: 'this business',
    verbForm: 'launching this business',
    narrativeFrame: 'the potential and timing of launching this business',
    actionFrame: 'starting this business venture',
    outcomeLanguage: 'for this business',
    positionLenses: {
      'Past': 'The experience, skills and patterns you bring to this entrepreneurial venture',
      'Present': 'The current market energy and your own readiness to launch this business now',
      'Future': 'The potential trajectory of this business — what it could become',
      'Situation': 'The true state of this business idea and its timing',
      'Challenge': 'The primary risk or obstacle this business needs to navigate',
      'Advice': 'The strategic wisdom the cards offer for launching and growing this business',
      'Strengths': 'The genuine competitive advantages and assets you bring to this venture',
      'Obstacles': 'What could derail or delay this business if not addressed',
      'Outcome': 'The most likely business outcome given current energies and timing',
    },
  },
  {
    domain: 'financial_decision',
    patterns: [/invest(ment|ing)?/i, /should\s+i\s+(buy|sell|invest|put\s+money)/i, /financial\s+(decision|choice|move)/i, /real\s+estate/i, /property/i, /stock|crypto|bitcoin/i],
    subject: 'this financial decision',
    verbForm: 'making this financial move',
    narrativeFrame: 'the wisdom and timing of this financial decision',
    actionFrame: 'committing to this investment or financial move',
    outcomeLanguage: 'for this financial decision',
    positionLenses: {
      'Past': 'Your financial patterns and relationship with money — what has shaped your current situation',
      'Present': 'The honest state of this financial opportunity right now — is the timing right',
      'Future': 'The financial trajectory if you proceed with this decision',
      'Situation': 'The true energetic quality of this investment or financial opportunity',
      'Challenge': 'The primary financial risk or blind spot that needs to be addressed',
      'Advice': 'The cards\' counsel on whether and how to proceed with this financial move',
      'Outcome': 'The most likely financial outcome given current energies',
    },
  },
  {
    domain: 'money_abundance',
    patterns: [/money|finances|wealth|abundance|prosperity/i, /financial\s+(situation|stability|freedom)/i, /will\s+i\s+(be\s+)?(rich|wealthy|financially)/i, /attract\s+money/i, /debt/i],
    subject: 'your financial life',
    verbForm: 'improving your financial situation',
    narrativeFrame: 'your financial abundance and the path to prosperity',
    actionFrame: 'transforming your relationship with money and abundance',
    outcomeLanguage: 'for your financial future',
    positionLenses: {
      'Past': 'The financial patterns, beliefs and history you carry — the roots of your current money situation',
      'Present': 'The honest state of your finances and your energy around money right now',
      'Future': 'The financial trajectory ahead — where your current money patterns are leading',
      'Situation': 'The true energetic state of your finances and what is influencing them',
      'Challenge': 'The primary block or limiting belief that is restricting your financial abundance',
      'Advice': 'The most powerful action or shift to unlock greater financial flow',
      'Outcome': 'The financial picture the cards see ahead for you',
    },
  },
  {
    domain: 'career_growth',
    patterns: [/promot(ion|ed)/i, /career\s+(growth|advancement|progress)/i, /will\s+i\s+(get|be)\s+(promoted|successful)/i, /professional\s+success/i, /move\s+up/i, /leadership/i],
    subject: 'your career advancement',
    verbForm: 'advancing in your career',
    narrativeFrame: 'your professional growth and the path to career advancement',
    actionFrame: 'pursuing this promotion or career growth',
    outcomeLanguage: 'for your career advancement',
    positionLenses: {
      'Past': 'The professional foundation you have built — the experience and reputation you have established',
      'Present': 'Your current professional standing and the opportunities genuinely available to you now',
      'Future': 'The career trajectory ahead — the growth and advancement that is possible',
      'Situation': 'The real dynamics at play in your professional environment right now',
      'Challenge': 'What is blocking or delaying your advancement — the obstacle to navigate',
      'Advice': 'The strategic guidance for accelerating your career growth',
      'Strengths': 'The genuine professional strengths and advantages you bring',
      'Obstacles': 'What you need to overcome or change to achieve the promotion or growth you desire',
      'Outcome': 'The career outcome the cards see as most likely given current conditions',
    },
  },
  {
    domain: 'health_recovery',
    patterns: [/health|illness|sick|healing|recover/i, /will\s+i\s+(heal|get\s+better|recover)/i, /medical|surgery|treatment/i, /chronic/i, /pain/i],
    subject: 'your health and healing',
    verbForm: 'healing and recovery',
    narrativeFrame: 'your health situation and the path to healing',
    actionFrame: 'supporting your body\'s healing',
    outcomeLanguage: 'for your health and recovery',
    positionLenses: {
      'Past': 'The root causes or history that has contributed to this health situation',
      'Present': 'The current state of your body\'s energy and healing process',
      'Future': 'The health trajectory ahead — where this healing journey is heading',
      'Situation': 'The deeper energetic or emotional component of this health situation',
      'Challenge': 'What is impeding healing — the physical, emotional or lifestyle factor to address',
      'Advice': 'The holistic guidance for supporting your body and accelerating recovery',
      'Outcome': 'The health picture the cards see ahead for you',
    },
  },
  {
    domain: 'life_purpose',
    patterns: [/purpose|calling|mission|destiny|path\s+in\s+life/i, /what\s+am\s+i\s+(supposed\s+to|meant\s+to)\s+do/i, /meaning\s+of\s+(my\s+)?life/i, /right\s+direction/i, /true\s+path/i],
    subject: 'your life purpose',
    verbForm: 'finding and living your purpose',
    narrativeFrame: 'your soul\'s purpose and the direction of your path',
    actionFrame: 'aligning with your true life purpose',
    outcomeLanguage: 'for living your purpose',
    positionLenses: {
      'Past': 'The experiences, skills and soul lessons that have been shaping you for your purpose',
      'Present': 'Where you stand right now on your path — how close or far you are from your true direction',
      'Future': 'The path of purpose that is opening ahead — where your soul is being drawn',
      'Situation': 'The true state of your alignment with your soul\'s mission right now',
      'Challenge': 'What is pulling you away from your purpose — the distraction or fear to overcome',
      'Advice': 'The most powerful step toward living in alignment with your soul\'s calling',
      'Outcome': 'The life the cards see opening before you as you step into your purpose',
    },
  },
  {
    domain: 'grief_loss',
    patterns: [/grief|griev|mourn|loss|lost\s+(someone|a\s+(friend|family|pet))/i, /death\s+of/i, /passed\s+away/i, /bereavement/i, /dealing\s+with\s+loss/i],
    subject: 'this grief and loss',
    verbForm: 'healing from this loss',
    narrativeFrame: 'your grief journey and the path toward healing',
    actionFrame: 'moving through this grief',
    outcomeLanguage: 'for your healing from this loss',
    positionLenses: {
      'Past': 'The bond you shared and the love that makes this loss so profound',
      'Present': 'Where you are in your grief right now — the energy of this moment in your mourning',
      'Future': 'The path of healing ahead — not forgetting, but finding your way through',
      'Situation': 'The emotional landscape you are navigating in this time of loss',
      'Challenge': 'The part of grief that is hardest for you to move through right now',
      'Advice': 'The gentlest and wisest guidance for honouring your grief while continuing to live',
      'Outcome': 'How your heart and life will look as you emerge through this grief',
    },
  },
  {
    domain: 'family_conflict',
    patterns: [/family|parent|mother|father|sibling|brother|sister|in-law/i, /family\s+(conflict|issue|problem|drama)/i, /relationship\s+with\s+my/i, /toxic\s+family/i],
    subject: 'this family situation',
    verbForm: 'navigating this family dynamic',
    narrativeFrame: 'the family situation and how to navigate it wisely',
    actionFrame: 'addressing this family conflict or dynamic',
    outcomeLanguage: 'for this family relationship',
    positionLenses: {
      'Past': 'The root of this family pattern or conflict — where it originated',
      'Present': 'The current energy within this family dynamic — what is actually happening between you',
      'Future': 'Where this family situation is heading — the direction it is moving in',
      'Situation': 'The deeper truth of what is at play in this family relationship',
      'Challenge': 'The hardest aspect of this family situation to navigate or resolve',
      'Advice': 'The wisest way to approach this family situation',
      'Outcome': 'How this family situation is most likely to resolve',
    },
  },
  {
    domain: 'pregnancy_fertility',
    patterns: [/pregnan|baby|conceiv|fertility|ivf|trying\s+to\s+conceive|will\s+i\s+(have\s+a\s+baby|get\s+pregnant)/i],
    subject: 'pregnancy and fertility',
    verbForm: 'this fertility journey',
    narrativeFrame: 'fertility, pregnancy and the possibility of new life',
    actionFrame: 'supporting this fertility journey',
    outcomeLanguage: 'for this fertility path',
    positionLenses: {
      'Past': 'The journey you have already walked to get to this point — what has been part of your story',
      'Present': 'The energetic conditions around fertility and new life right now',
      'Future': 'The possibility of new life and what the path ahead holds',
      'Situation': 'The deeper energetic and emotional landscape of this fertility journey',
      'Challenge': 'What may be creating difficulty in this area — the block or obstacle to address',
      'Advice': 'The guidance for supporting your body, mind and spirit on this journey',
      'Outcome': 'What the cards see ahead on this fertility and new life path',
    },
  },
  {
    domain: 'moving_travel',
    patterns: [/should\s+i\s+(move|relocate|travel)/i, /moving\s+(to|away)/i, /relocation/i, /new\s+(city|country|place)/i, /living\s+abroad/i],
    subject: 'this move or relocation',
    verbForm: 'making this move',
    narrativeFrame: 'whether to move and what the new location holds',
    actionFrame: 'committing to this relocation',
    outcomeLanguage: 'for this move or new chapter in a new place',
    positionLenses: {
      'Past': 'What you are truly leaving behind — the roots and the ties that will be affected',
      'Present': 'The honest state of readiness — is this the right time to make this move',
      'Future': 'What the new location or chapter holds — the life that awaits you there',
      'Situation': 'The real driver behind this desire to move — what is pushing or pulling you',
      'Challenge': 'The primary difficulty or risk of this move to navigate consciously',
      'Advice': 'The wisest approach to this decision about moving',
      'Outcome': 'The life trajectory most likely to unfold if you make this move',
    },
  },
  {
    domain: 'spiritual_awakening',
    patterns: [/spiritual|awakening|enlighten|consciousness|meditation|higher\s+self/i, /soul\s+(growth|journey|purpose)/i, /karma|dharma/i, /past\s+life/i],
    subject: 'your spiritual path',
    verbForm: 'deepening your spiritual journey',
    narrativeFrame: 'your spiritual evolution and soul growth',
    actionFrame: 'advancing your spiritual practice and consciousness',
    outcomeLanguage: 'for your spiritual evolution',
    positionLenses: {
      'Past': 'The spiritual experiences and awakenings that have shaped your soul\'s current level of consciousness',
      'Present': 'Where you stand on your spiritual path right now — the growth and the work at hand',
      'Future': 'The next level of spiritual evolution opening before you',
      'Situation': 'The deeper spiritual lesson or initiation currently active in your life',
      'Challenge': 'The spiritual obstacle, ego pattern or shadow material asking to be worked through',
      'Advice': 'The spiritual practice, shift or surrender most needed right now',
      'Outcome': 'The state of consciousness and spiritual development the cards see ahead for you',
    },
  },
  {
    domain: 'general_love',
    patterns: [/love|relationship|partner|romantic/i],
    subject: 'your love life',
    verbForm: 'navigating this relationship',
    narrativeFrame: 'your love life and the relationship energies at play',
    actionFrame: 'this relationship situation',
    outcomeLanguage: 'for your love life',
    positionLenses: {},
  },
  {
    domain: 'general_career',
    patterns: [/career|work|job|professional|business/i],
    subject: 'your career',
    verbForm: 'navigating this professional situation',
    narrativeFrame: 'your career and professional direction',
    actionFrame: 'this career situation',
    outcomeLanguage: 'for your professional life',
    positionLenses: {},
  },
  {
    domain: 'general_guidance',
    patterns: [/.*/],
    subject: 'this situation',
    verbForm: 'navigating this situation',
    narrativeFrame: 'what is most important in your life right now',
    actionFrame: 'this situation',
    outcomeLanguage: 'ahead',
    positionLenses: {},
  },
];

const GENERIC_POSITION_LENSES: Record<string, string> = {
  'Past': 'The foundation and history underlying this situation',
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

function classifyQuestionIntent(question: string): typeof INTENT_PATTERNS[0] {
  for (const intent of INTENT_PATTERNS) {
    for (const pattern of intent.patterns) {
      if (pattern.test(question)) return intent;
    }
  }
  return INTENT_PATTERNS[INTENT_PATTERNS.length - 1];
}

// Produces a contextual sentence linking a card's energy to the specific question intent
function buildCardQuestionBridge(
  cardName: string,
  suit: string | undefined,
  reversed: boolean,
  positionLabel: string,
  intent: typeof INTENT_PATTERNS[0]
): string {
  const { domain, subject, verbForm } = intent;

  // Position-specific bridges for key positions
  const marriagePositionBridges: Record<string, string> = {
    'You': `In the context of ${verbForm}, this card reflects your authentic inner state — are you truly ready for this commitment, or is something still unresolved within you`,
    'Them': `This card speaks to your partner's energy regarding ${verbForm} — their true readiness, their fears, and what they are genuinely bringing to this decision`,
    'The Bond': `In a marriage reading, this card describes the actual quality of your soul connection — whether it has the depth to sustain a lifetime partnership`,
    'Outcome': `This is the cards' answer to your question about ${verbForm} — the energy of the outcome if current conditions hold`,
    'Challenge': `In your question about ${verbForm}, this card names the specific issue that must be addressed — it would be the fault line in the marriage if left unresolved`,
    'Advice': `The cards' direct counsel on ${verbForm} is carried here — this is what wisdom requires of you before you decide`,
  };

  const reconciliationPositionBridges: Record<string, string> = {
    'You': `Your true motivation for reconciliation shows here — ${reversed ? 'there may be unhealed wounds or unhealthy patterns driving this desire' : 'your heart is coming from a genuine place'}`,
    'Them': `This reveals the other person's actual energy toward getting back together — ${reversed ? 'they may not be in a genuine place of change or openness' : 'there is authentic energy from their side worth paying attention to'}`,
    'Outcome': `This is the honest answer to whether reconciliation will succeed — read it carefully`,
    'Challenge': `This names exactly what caused the original break and what must change for a reunion to be different from the first time`,
  };

  if (domain === 'marriage_decision' && marriagePositionBridges[positionLabel]) {
    return marriagePositionBridges[positionLabel] + '.';
  }
  if (domain === 'reconciliation' && reconciliationPositionBridges[positionLabel]) {
    return reconciliationPositionBridges[positionLabel] + '.';
  }

  // Suit-based bridges tailored to the question domain
  const suitBridges: Partial<Record<typeof domain, Partial<Record<string, string>>>> = {
    marriage_decision: {
      cups: `In the context of your marriage question, this Cups card speaks directly to the emotional and soul-level readiness for this union`,
      pentacles: `This Pentacles energy addresses the practical and financial foundations of the marriage — stability, security, and shared material values`,
      swords: `The Swords energy here brings a sharp, honest message about communication and truth-telling within this potential marriage`,
      wands: `This Wands card speaks to the passion and long-term vitality of the relationship — whether the fire will sustain a lifetime`,
    },
    ex_return: {
      cups: `In the context of your question about their return, this Cups card speaks to the emotional current between you — whether love is genuinely flowing back`,
      swords: `This Swords energy carries a clear message about the truth of this situation — sometimes what we miss was never really what we thought it was`,
      wands: `The Wands card here speaks to desire and passion — whether the spark is genuinely reignitable`,
    },
    business_start: {
      pentacles: `For your business question, this Pentacles card speaks directly to financial viability, practical foundations, and tangible return on this venture`,
      wands: `This Wands energy addresses the entrepreneurial fire and vision — whether the passion that drives this business will sustain the hard work ahead`,
      swords: `The Swords energy here calls for clear thinking and honest risk assessment about this business`,
    },
    financial_decision: {
      pentacles: `For your investment question, this Pentacles card speaks directly to the material and financial quality of this decision`,
      cups: `Interestingly, a Cups card here in your financial question suggests that emotions — hope, fear, or desire — may be influencing this financial decision more than pure logic`,
    },
  };

  const domainBridges = suitBridges[domain];
  if (domainBridges && suit && domainBridges[suit]) {
    return domainBridges[suit] + '.';
  }

  // Fallback: generic subject reference
  if (positionLabel === 'Outcome' || positionLabel === 'Future') {
    return `This card carries the answer to your question about ${subject} — read its energy as the most likely trajectory.`;
  }
  if (positionLabel === 'Advice') {
    return `In the context of your question about ${subject}, this is the most important guidance the cards offer you right now.`;
  }

  return '';
}

// ─── POSITION INTERPRETATION LAYER ────────────────────────────────────────

function interpretCardInPosition(
  card: TarotCard,
  reversed: boolean,
  position: { label: string; description: string },
  question: string,
  tone: ToneType,
  intent: ReturnType<typeof classifyQuestionIntent>
): string {
  const baseMeaning = reversed ? card.meaningReversed : card.meaning;
  const keywords = (reversed ? card.keywordsReversed : card.keywords).slice(0, 3);
  const tc = TONE_CONFIGS[tone];

  // Use intent-specific position lens if available, fall back to generic
  const posCtx = intent.positionLenses[position.label]
    || GENERIC_POSITION_LENSES[position.label]
    || position.description;

  // Build question-specific card bridge
  const questionBridge = buildCardQuestionBridge(card.name, card.suit, reversed, position.label, intent);

  // Major arcana in spiritual or purpose questions gets extra weight
  const arcanaLayer = card.arcana === 'major' && (intent.domain === 'life_purpose' || intent.domain === 'spiritual_awakening')
    ? ` As a Major Arcana card, this carries the weight of a soul-level truth directly relevant to your question about ${intent.subject}.`
    : '';

  const prefix = reversed ? tc.challengePrefix[0] : '';

  const parts = [
    `${posCtx}: ${prefix} ${baseMeaning}`.trim(),
    questionBridge,
    arcanaLayer,
    `The key energies at play here are ${keywords.join(', ')}.`,
  ].filter(Boolean);

  return parts.join(' ');
}

// ─── NARRATIVE SYNTHESISER ────────────────────────────────────────────────

// Domain-specific narrative openers that speak directly to the question's purpose
const DOMAIN_OPENERS: Partial<Record<string, string[]>> = {
  marriage_decision: [
    'The cards have been asked a profound question — whether this marriage is truly the right path — and their answer is layered, honest, and specific',
    'A question about marriage asks the cards to weigh the full weight of a lifelong union, and they do not take this lightly',
    'When we ask the cards about marriage, we are asking about one of life\'s most significant commitments — the spread speaks directly to this',
  ],
  reconciliation: [
    'The question of getting back together is one of the most common — and most emotionally charged — questions asked of the cards, and they answer with characteristic honesty',
    'Reconciliation asks whether a love that has been broken can be truly rebuilt, and the cards address this with nuance',
    'The cards have been asked whether a second chance is worth taking — and their answer is neither simply yes nor no',
  ],
  ex_return: [
    'The question of whether someone will come back is perhaps the most asked question in all of tarot — and the cards answer it honestly, which means neither with false hope nor unnecessary cruelty',
    'When we ask "will they return", we are really asking two questions: will they come back, and if they do, should we want them to',
    'The cards have been asked to look at the energy between you and your ex — and what they reveal may shift the question itself',
  ],
  marriage_decision_answer: [],
  job_change: [
    'A career change is both a practical and a soul-level question — the cards address both dimensions simultaneously',
    'The question of whether to make this career move has a practical answer and a deeper answer — the cards speak to both',
    'Career decisions of this magnitude carry the weight of not just income but identity — the cards recognise this',
  ],
  business_start: [
    'The question of whether to start this business is one of both timing and readiness — the cards assess both honestly',
    'Entrepreneurship requires both external opportunity and internal readiness — the spread speaks to both',
    'Launching a business is a question of vision, timing and foundation — the cards address all three',
  ],
  financial_decision: [
    'The cards have been asked to weigh in on a financial decision — and they bring both practical and intuitive intelligence to bear',
    'Financial decisions benefit from both rational analysis and intuitive wisdom — the spread offers both',
  ],
  health_recovery: [
    'Health questions ask the cards to address both body and soul — and they answer at both levels',
    'The cards have been asked about healing — they speak not only to symptoms but to root causes and conditions',
  ],
  life_purpose: [
    'Questions about life purpose are the deepest questions the cards can be asked — and they answer from the deepest level',
    'The soul\'s purpose is not always obvious from the outside — the cards illuminate what the rational mind cannot easily see',
  ],
  grief_loss: [
    'Grief questions ask the cards to speak into one of the most profound human experiences — they do so with compassion and honesty',
    'The cards cannot undo loss, but they can illuminate the path through it — which is what was asked',
  ],
  pregnancy_fertility: [
    'Questions of fertility and new life carry tremendous emotional weight — the cards hold this with you and respond with care',
    'The possibility of new life is one of the most sacred questions — the cards approach this reading with reverence',
  ],
};

function synthesiseNarrative(
  cards: Array<{ card: TarotCard; reversed: boolean; position: { label: string; description: string; numerologyLink?: string } }>,
  question: string,
  spreadName: string,
  numCtx: Record<string, string | number | undefined>,
  tone: ToneType,
  interactions: string[],
  intent: ReturnType<typeof classifyQuestionIntent>
): string {
  const tc = TONE_CONFIGS[tone];
  const paragraphs: string[] = [];

  const cardNames = cards.map(c => `${c.card.name}${c.reversed ? ' (reversed)' : ''}`);
  const uprightCount = cards.filter(c => !c.reversed).length;
  const overallEnergy = uprightCount > cards.length / 2 ? 'largely supportive' : 'complex and inward-turning';

  // Opening — use domain-specific opener when available, then address the question directly
  const domainOpeners = DOMAIN_OPENERS[intent.domain];
  let opener: string;
  if (domainOpeners && domainOpeners.length > 0) {
    opener = domainOpeners[Math.floor(Math.random() * domainOpeners.length)];
  } else {
    opener = tc.opener[Math.floor(Math.random() * tc.opener.length)];
  }

  paragraphs.push(
    `${opener}. You asked: "${question}". The ${spreadName} reveals ${cardNames.join(', ')} — ${overallEnergy} energy. Here is what the cards are specifically saying about ${intent.narrativeFrame}.`
  );

  // Second paragraph: directly address the question's core concern using the cards
  const outcomeCard = cards.find(c => ['Outcome', 'Future', 'Near Future', 'Potential', 'Your Message'].includes(c.position.label));
  const adviceCard = cards.find(c => ['Advice', 'Action', 'Annual Lesson'].includes(c.position.label));
  const challengeCard = cards.find(c => ['Challenge', 'Obstacles', 'The Cross'].includes(c.position.label));
  const youCard = cards.find(c => c.position.label === 'You');
  const themCard = cards.find(c => c.position.label === 'Them');
  const bondCard = cards.find(c => c.position.label === 'The Bond');

  // Domain-specific focused paragraph
  if (intent.domain === 'marriage_decision') {
    const readinessParts: string[] = [];
    if (youCard) {
      const ym = youCard.reversed ? youCard.card.meaningReversed : youCard.card.meaning;
      readinessParts.push(`Your own energy in this question is shown by ${youCard.card.name}${youCard.reversed ? ' reversed' : ''}: ${ym.split('.')[0].toLowerCase()}`);
    }
    if (themCard) {
      const tm = themCard.reversed ? themCard.card.meaningReversed : themCard.card.meaning;
      readinessParts.push(`your partner's energy is represented by ${themCard.card.name}${themCard.reversed ? ' reversed' : ''}: ${tm.split('.')[0].toLowerCase()}`);
    }
    if (bondCard) {
      const bm = bondCard.reversed ? bondCard.card.meaningReversed : bondCard.card.meaning;
      readinessParts.push(`the bond between you carries the energy of ${bondCard.card.name}${bondCard.reversed ? ' reversed' : ''}: ${bm.split('.')[0].toLowerCase()}`);
    }
    if (readinessParts.length > 0) {
      paragraphs.push(`On the specific question of whether to marry: ${readinessParts.join('; and ')}. These three elements — your readiness, their readiness, and the quality of the bond — are the three pillars the cards are asking you to weigh before committing.`);
    }
  } else if (intent.domain === 'reconciliation' || intent.domain === 'ex_return') {
    const them = themCard || cards.find(c => c.position.label === 'Them');
    const you = youCard || cards.find(c => c.position.label === 'You');
    if (them && you) {
      const ym = you.reversed ? you.card.meaningReversed : you.card.meaning;
      const tm = them.reversed ? them.card.meaningReversed : them.card.meaning;
      paragraphs.push(`Looking at the two energies in this situation: your energy (${you.card.name}${you.reversed ? ' reversed' : ''}) shows ${ym.split('.')[0].toLowerCase()}. Their energy (${them.card.name}${them.reversed ? ' reversed' : ''}) shows ${tm.split('.')[0].toLowerCase()}. Whether these two energies can genuinely meet is the question the remaining cards will answer.`);
    }
  } else if (intent.domain === 'job_change' || intent.domain === 'business_start' || intent.domain === 'career_growth') {
    const currentCard = cards.find(c => c.position.label === 'Current Path' || c.position.label === 'Present' || c.position.label === 'Situation');
    const futureCard = cards.find(c => ['Future', 'Near Future', 'Outcome', 'Potential'].includes(c.position.label));
    if (currentCard && futureCard) {
      const cm = currentCard.reversed ? currentCard.card.meaningReversed : currentCard.card.meaning;
      const fm = futureCard.reversed ? futureCard.card.meaningReversed : futureCard.card.meaning;
      paragraphs.push(`The cards address your question about ${intent.verbForm} with a clear before-and-after picture. Where you stand now (${currentCard.card.name}${currentCard.reversed ? ' reversed' : ''}): ${cm.split('.')[0].toLowerCase()}. Where this move leads (${futureCard.card.name}${futureCard.reversed ? ' reversed' : ''}): ${fm.split('.')[0].toLowerCase()}. The distance between these two cards tells the story.`);
    }
  } else if (cards.length === 1) {
    const c = cards[0];
    const meaning = c.reversed ? c.card.meaningReversed : c.card.meaning;
    paragraphs.push(`In the context of your question about ${intent.subject}, ${c.card.name}${c.reversed ? ' in its reversed position' : ''} delivers this specific message: ${meaning} ${c.card.arcana === 'major' ? `As a Major Arcana card, this is a soul-level answer — not just a circumstantial reading but a deeper truth about ${intent.subject}.` : ''}`);
  } else if (cards.length <= 3) {
    const bridge = tc.bridge[Math.floor(Math.random() * tc.bridge.length)];
    const flowParts = cards.map(c => {
      const meaning = c.reversed ? c.card.meaningReversed : c.card.meaning;
      return `in the ${c.position.label} position — directly relevant to ${intent.positionLenses[c.position.label] || intent.subject} — ${c.card.name}${c.reversed ? ' reversed' : ''} carries ${(c.reversed ? c.card.keywordsReversed : c.card.keywords).slice(0, 2).join(' and ')}: ${meaning.split('.')[0]}`;
    });
    paragraphs.push(`${bridge} the way each card speaks to your specific question about ${intent.subject}. ${flowParts.map(f => f.charAt(0).toUpperCase() + f.slice(1) + '.').join(' ')}`);
  } else {
    // Larger spreads — group by supportive vs challenging energy
    const challengeCards = cards.filter(c => c.reversed || ['The Tower', '9 of Swords', '3 of Swords', '5 of Swords', 'The Devil', 'Death'].includes(c.card.name));
    const strengthCards = cards.filter(c => !c.reversed && !challengeCards.includes(c));

    if (strengthCards.length > 0) {
      const sc = strengthCards[0];
      const meaning = sc.card.meaning;
      paragraphs.push(`In your question about ${intent.subject}, the supportive energy flows from ${sc.card.name} in the ${sc.position.label} position — ${meaning.split('.')[0]}. ${strengthCards.length > 1 ? `This is reinforced by ${strengthCards[1].card.name} in the ${strengthCards[1].position.label} position, amplifying the positive current around ${intent.subject}.` : ''}`);
    }

    if (challengeCards.length > 0) {
      const cc = challengeCards[0];
      const challengePrefix = tc.challengePrefix[Math.floor(Math.random() * tc.challengePrefix.length)];
      const meaning = cc.reversed ? cc.card.meaningReversed : cc.card.meaning;
      paragraphs.push(`${challengePrefix} in your question about ${intent.subject}: ${cc.card.name} in the ${cc.position.label} position signals that ${meaning.split('.')[0].toLowerCase()}. The cards are not saying this to discourage — they are identifying the exact issue that, if addressed, clears the path toward ${intent.outcomeLanguage}.`);
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

// Intent-specific action sets that speak directly to what was asked
const DOMAIN_ACTIONS: Partial<Record<string, string[]>> = {
  marriage_decision: [
    'Before making this decision, have one completely honest conversation with your partner about your individual expectations for marriage — not the wedding, but the life. What do each of you expect day-to-day? What are your non-negotiables? The cards suggest this conversation will clarify more than any amount of internal deliberation.',
    'Write down three things you are genuinely afraid of about this marriage, and three things you deeply desire from it. Show it to no one — this is for you to see what you are actually carrying into this decision.',
    'Ask yourself this single question and sit with it quietly: "If this marriage were exactly as it is right now — no change — would I still choose it?" Your first, unchosen answer is the one that matters.',
    'If there is a specific unresolved issue showing in the Challenge card, address it directly and explicitly before any engagement or proposal. The cards identify it as the fault line — it does not disappear after marriage, it amplifies.',
  ],
  reconciliation: [
    'Before any contact, write down specifically what has genuinely changed — in you, in them, or in the circumstances — since the original breakup. If the list is empty or vague, the cards are warning against repetition.',
    'Give yourself a 7-day no-contact period to observe what your desire for reconciliation feels like without the distraction of communication. Is it love, loneliness, habit, or genuine incompleteness?',
    'If you do reach out, lead with acknowledgement of what went wrong — not a pitch for getting back together. The cards suggest that genuine accountability from both sides is the only foundation for a real second chapter.',
    'Distinguish clearly between "I miss them" and "this relationship is genuinely right for me." These are different feelings and they lead to different outcomes.',
  ],
  ex_return: [
    'Redirect your energy from waiting and watching for signs from them, to building something you are genuinely excited about in your own life. The cards consistently show that those who attract their exes back are not the ones waiting — they are the ones moving forward.',
    'Ask yourself: "If they called me right now and wanted to meet, what specific issues would we need to address for this to be genuinely different?" Have those conversations ready. If you cannot name them clearly, the desire may be more about comfort than genuine compatibility.',
    'Give yourself a clear time boundary: "I will not contact them or wait for them beyond [date]." This is not giving up — it is respecting yourself enough to create space for what is truly meant for you.',
    'Focus on one meaningful improvement in your own life this week that has nothing to do with them. This shifts your energy from passive waiting to active living — which is both healthier and, ironically, more attractive.',
  ],
  job_change: [
    'Before making this career move, get crystal clear on what you are running toward versus what you are running from. A change made primarily to escape is less likely to succeed than one made toward something genuinely compelling.',
    'Have one direct conversation with someone who has already made a similar career move — not for validation, but for the specific unexpected challenges they encountered. The cards suggest the information gap is where the real risk lives.',
    'Set a clear decision deadline — give yourself 7-14 days maximum to decide, then commit. The cards indicate prolonged indecision drains the energy needed for the transition itself.',
    'If you proceed with this change, identify the single most important relationship to nurture in the new professional context. Career transitions succeed or fail on relationships more than on skills.',
  ],
  business_start: [
    'Identify your first paying customer before you invest significantly in infrastructure, branding, or systems. If you cannot find one paying customer for the core offer, the market is telling you something important before you spend.',
    'Write down the single riskiest assumption in your business plan — the one that, if wrong, would make the whole thing fail. Then design a small, cheap experiment to test that assumption within the next 30 days.',
    'Separate "I am passionate about this" from "people will pay money for this." The cards suggest your passion is real, but the business will only survive if both are true.',
    'Identify the one person you know whose opinion about this business idea you most respect and have most avoided asking. Ask them this week — specifically asking for concerns, not encouragement.',
  ],
  financial_decision: [
    'Before committing to this financial decision, apply the 72-hour rule: wait 72 hours and then revisit it. Note whether the desire to proceed has increased, decreased, or changed in quality.',
    'Identify the maximum amount you can afford to lose in this investment without it materially affecting your life. Only invest up to that amount. The cards suggest protection of downside is the priority right now.',
    'Speak to someone with direct, recent experience with this specific type of investment — not a general financial advisor, but someone who has actually done this. Their lived experience is worth more than any projected return.',
    'Ask yourself what story you are telling yourself about why this investment is right. Then ask what the counter-story would be. Both are probably partially true, and the decision should account for both.',
  ],
  money_abundance: [
    'Identify the single largest financial leak in your life right now — the one expense or pattern that, if addressed, would create the most immediate improvement. Address it this week, not next month.',
    'Write down your honest beliefs about money — what you actually believe about wealth, people who have it, and whether you deserve it. These beliefs are active in your financial life whether you acknowledge them or not.',
    'Identify one specific skill or value you possess that you are currently undercharging for or not monetising at all. The cards point toward undervalued assets as the most accessible path to greater financial flow.',
    'Create a simple 30-day financial tracking practice: record every inflow and outflow for one month without judgment. Clarity about what is actually happening is the foundation of any meaningful change.',
  ],
  breakup_divorce: [
    'Before making a final decision, have one completely honest conversation — with yourself or in writing — about what you would need to see change for this relationship to actually work. If the list is impossible or unwilling to be met, you have your answer.',
    'Speak to one person who knows both you and the situation well, and ask them specifically: "What do you see that I might not be seeing?" This is not about getting permission — it is about closing blind spots.',
    'Give yourself a specific transition timeline and begin taking one practical step toward independence or change now, even if the final decision is not yet made. Action creates clarity that deliberation cannot.',
    'Separate grief from regret. Missing what a relationship could have been is not the same as the relationship being right for you. Sit with which one you are experiencing.',
  ],
  health_recovery: [
    'Identify the one lifestyle factor — sleep, movement, nutrition, or stress — that is most out of balance right now, and make one specific, sustainable change to it this week. Not a dramatic overhaul, one thing.',
    'Notice the emotional pattern or life circumstance that is most often present when your symptoms are worst. The cards suggest the emotional-physical connection in your situation is significant.',
    'Ensure you have at least one healthcare professional whose opinion you fully trust for this condition. If you do not, finding that person is the first priority.',
    'Build in one genuinely restorative practice daily — even 10 minutes — that has no purpose other than to let your body and mind recover. Not productivity recovery, actual recovery.',
  ],
  life_purpose: [
    'Look back at the last five years and identify the three moments when you felt most alive, most useful, or most yourself. The intersection of those moments often points directly toward purpose.',
    'Identify the one thing you do that makes time disappear — where you lose track of hours. That is not a coincidence — it is directional information.',
    'Speak your purpose out loud to one person you trust this week, even if it feels premature or uncertain. The act of articulating it will reveal what is genuinely there and what is still unclear.',
    'Ask yourself: "What would I do if money were not a factor and I could not fail?" Then ask: "What version of that could I begin in the next 30 days with the resources I actually have?" That second question is where purpose becomes a path.',
  ],
  grief_loss: [
    'Allow yourself to grieve without a timeline. The cards are not asking you to move on quickly — they are asking you to move through. There is a difference. Give yourself explicit permission to feel what you feel.',
    'Find one ritual or act of remembrance that honours what was lost — not to hold on, but to acknowledge. This might be a letter, a visit, a piece of music, or a recurring act of kindness done in their memory.',
    'Identify one person in your life who is genuinely comfortable sitting with grief without trying to fix it. Spend time with them.',
    'Notice when you are pushing grief down in order to function. When it is safe to do so, allow it to rise. Grief unexpressed does not disappear — it accumulates.',
  ],
  general_love: [
    'Have the conversation you have been having internally about this relationship out loud — with the person it concerns, or at minimum with yourself on paper. The cards suggest clarity requires expression.',
    'Identify what you most need from this relationship that you are not currently receiving. Then identify whether you have actually communicated this need clearly, or only hoped it would be understood.',
    'Give the relationship or decision 7 days of intentional presence — not analysis, but genuine attention. Often the answer is already visible once we stop overthinking and start noticing.',
    'Ask yourself what the most loving version of yourself would do in this situation. Not the most fearful version, not the most logical version — the most loving.',
  ],
  general_career: [
    'Identify the one career decision you have been putting off and give it a deadline of 14 days. Research what you need, make the decision, and move.',
    'Have one direct conversation with someone who is where you want to be professionally in 5 years. Ask specifically what they would do differently at your current stage. Listen without defending.',
    'Identify your single highest-value professional skill right now and find one way to express or leverage it more visibly this month.',
    'Write down the three professional outcomes you most want in the next 12 months, then identify the one action that most influences all three. Do that action first.',
  ],
};

function generateActionableGuidance(
  cards: Array<{ card: TarotCard; reversed: boolean; position: { label: string } }>,
  question: string,
  numCtx: Record<string, string | number | undefined>,
  tone: ToneType,
  intent: ReturnType<typeof classifyQuestionIntent>
): string {
  const tc = TONE_CONFIGS[tone];
  const actions: string[] = [];

  const adviceCard = cards.find(c =>
    ['Advice', 'Outcome', 'Action', 'Near Future', 'Your Message', 'Annual Lesson'].includes(c.position.label)
  ) || cards[cards.length - 1];

  const challengeCard = cards.find(c =>
    ['Challenge', 'Obstacles', 'The Cross'].includes(c.position.label)
  );

  const py = numCtx.personalYear ? parseInt(String(numCtx.personalYear)) : null;
  const lp = numCtx.lifePath ? String(numCtx.lifePath) : null;

  // Domain-specific actions get priority — they speak directly to what was asked
  const domainActionPool = DOMAIN_ACTIONS[intent.domain] || DOMAIN_ACTIONS['general_guidance'];
  if (domainActionPool && domainActionPool.length >= 2) {
    // Shuffle and pick 2 domain-specific actions
    const shuffled = [...domainActionPool].sort(() => Math.random() - 0.5);
    actions.push(shuffled[0]);
    if (shuffled[1]) actions.push(shuffled[1]);
  }

  // Challenge card → specific named card response
  if (challengeCard && actions.length < 3) {
    const ckw = (challengeCard.reversed ? challengeCard.card.keywordsReversed : challengeCard.card.keywords)[0];
    actions.push(`The ${challengeCard.card.name} in your Challenge position names "${ckw}" as the specific energy creating difficulty in this situation. Write down one concrete action that addresses this directly — not in general, but in the specific context of your question about ${intent.subject}.`);
  }

  // Advice card — specific card-based guidance
  if (adviceCard && actions.length < 3) {
    const keywords = (adviceCard.reversed ? adviceCard.card.keywordsReversed : adviceCard.card.keywords);
    const prefix = tc.advicePrefix[Math.floor(Math.random() * tc.advicePrefix.length)];
    const meaning = adviceCard.reversed ? adviceCard.card.meaningReversed : adviceCard.card.meaning;
    actions.push(`The ${adviceCard.card.name} in the ${adviceCard.position.label} position carries the most direct guidance for your question about ${intent.subject}: ${prefix} ${meaning.split('.')[0].toLowerCase()}. The key energy is ${keywords.slice(0, 2).join(' and ')}.`);
  }

  // Numerology timing action
  if (py && actions.length < 4) {
    const pyTheme = PERSONAL_YEAR_THEMES[py];
    if (pyTheme) {
      actions.push(`Your Personal Year ${py} is a year of ${pyTheme}. Ask yourself: does the action I am considering around ${intent.subject} move with this annual current, or against it? Decisions made in alignment with the Personal Year energy carry significantly more momentum.`);
    }
  }

  // LP-based alignment action
  if (lp && actions.length < 4) {
    const lpNum = parseInt(lp.split('/').pop() || lp);
    const ne = NUMBER_ESSENCE[lpNum];
    if (ne) actions.push(`Your Life Path ${lp} carries the gift of ${ne.gift}. In the context of your question about ${intent.subject}: how does the choice you are facing either honour or compromise this core gift? That alignment question often holds the answer.`);
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

  // Classify the question intent — used throughout the reading
  const intent = classifyQuestionIntent(question);

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
    const interpretation = interpretCardInPosition(card, reversed, position, question, tone, intent);
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

  let overallTheme = `This ${spread.name} reading on the question of ${intent.subject} `;
  if (majorCards.length === enrichedCards.length) {
    overallTheme += `is dominated entirely by Major Arcana energy — ${majorCards.map(c => c.card.name).join(', ')} — indicating that your question about ${intent.subject} operates at the level of major life lessons and soul-directed forces, not surface-level circumstances.`;
  } else if (majorCards.length > 0) {
    overallTheme += `carries Major Arcana depth (${majorCards.map(c => c.card.name).join(', ')}) alongside ${dominantSuit ? dominantSuit + '-domain' : 'everyday'} energy. `;
    overallTheme += reversedCount > 0 ? `The ${reversedCount} reversed card${reversedCount > 1 ? 's' : ''} suggest internal resistance or something unresolved that is directly relevant to ${intent.outcomeLanguage}.` : `The predominantly upright energy indicates the conditions ${intent.outcomeLanguage} are more open than blocked.`;
  } else {
    overallTheme += `works through practical, day-to-day energies — ${dominantSuit ? 'specifically in the domain of ' + SUIT_DOMAINS[dominantSuit] : 'across multiple life domains'}. `;
    overallTheme += reversedCount > 0 ? `Some internal blocks are affecting ${intent.subject} — these need attention before the outer situation can shift.` : `The energy around ${intent.subject} is available and actionable right now.`;
  }

  // Full narrative
  const narrative = synthesiseNarrative(enrichedCards, question, spread.name, numerologyContext, tone, interactions, intent);

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
  const actionableGuidance = generateActionableGuidance(enrichedCards, question, numerologyContext, tone, intent);

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
