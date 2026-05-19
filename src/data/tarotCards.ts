export interface TarotCard {
  id: number;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number: number; // 0-77
  numerologyNumber?: number; // Pythagorean link
  keywords: string[];
  keywordsReversed: string[];
  meaning: string;
  meaningReversed: string;
  element?: string;
  planet?: string;
  zodiac?: string;
  emoji: string; // visual stand-in for card art
  color: string; // tailwind gradient
}

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0, name: 'The Fool', arcana: 'major', number: 0, numerologyNumber: 0,
    keywords: ['new beginnings', 'spontaneity', 'leap of faith', 'potential'],
    keywordsReversed: ['recklessness', 'naivety', 'poor judgment', 'risk'],
    meaning: 'A new journey begins. Trust in the universe and take that leap of faith. Infinite potential awaits.',
    meaningReversed: 'Recklessness and poor planning. Look before you leap. Ground yourself before moving forward.',
    element: 'Air', planet: 'Uranus', zodiac: 'Aquarius',
    emoji: '🌟', color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 1, name: 'The Magician', arcana: 'major', number: 1, numerologyNumber: 1,
    keywords: ['willpower', 'manifestation', 'skill', 'resourcefulness'],
    keywordsReversed: ['manipulation', 'untapped talent', 'illusion', 'trickery'],
    meaning: 'You have all the tools needed to manifest your desires. Channel your willpower and take decisive action.',
    meaningReversed: 'Skills are being misused or suppressed. Beware of manipulation — yours or others\'.',
    element: 'Air', planet: 'Mercury', zodiac: 'Gemini',
    emoji: '⚡', color: 'from-red-500 to-orange-500'
  },
  {
    id: 2, name: 'The High Priestess', arcana: 'major', number: 2, numerologyNumber: 2,
    keywords: ['intuition', 'mystery', 'inner knowledge', 'subconscious'],
    keywordsReversed: ['hidden agendas', 'withdrawn', 'ignoring intuition'],
    meaning: 'Trust your intuition. The answers lie within. Be still and listen to your inner wisdom.',
    meaningReversed: 'You\'re ignoring your gut instincts. Hidden information may be kept from you.',
    element: 'Water', planet: 'Moon', zodiac: 'Cancer',
    emoji: '🌙', color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 3, name: 'The Empress', arcana: 'major', number: 3, numerologyNumber: 3,
    keywords: ['fertility', 'abundance', 'nurturing', 'creation'],
    keywordsReversed: ['dependence', 'creative block', 'smothering', 'neglect'],
    meaning: 'Abundance, creativity, and nurturing energy. Growth is flourishing. Embrace beauty and sensuality.',
    meaningReversed: 'Creative blocks or codependency. Over-nurturing may be smothering growth.',
    element: 'Earth', planet: 'Venus', zodiac: 'Taurus',
    emoji: '🌸', color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4, name: 'The Emperor', arcana: 'major', number: 4, numerologyNumber: 4,
    keywords: ['authority', 'structure', 'stability', 'leadership'],
    keywordsReversed: ['domination', 'rigidity', 'inflexibility', 'loss of control'],
    meaning: 'Take charge with authority and structure. Build a solid foundation. Leadership is called for now.',
    meaningReversed: 'Rigidity, tyranny, or loss of control. Examine whether structure has become a prison.',
    element: 'Fire', planet: 'Mars', zodiac: 'Aries',
    emoji: '👑', color: 'from-red-600 to-red-800'
  },
  {
    id: 5, name: 'The Hierophant', arcana: 'major', number: 5, numerologyNumber: 5,
    keywords: ['tradition', 'spiritual wisdom', 'conformity', 'education'],
    keywordsReversed: ['rebellion', 'subversiveness', 'new approaches', 'challenging norms'],
    meaning: 'Seek established wisdom, mentorship, or spiritual guidance. Tradition holds value here.',
    meaningReversed: 'Challenge convention. New approaches may serve better than tradition.',
    element: 'Earth', planet: 'Venus', zodiac: 'Taurus',
    emoji: '🔮', color: 'from-amber-600 to-yellow-600'
  },
  {
    id: 6, name: 'The Lovers', arcana: 'major', number: 6, numerologyNumber: 6,
    keywords: ['love', 'harmony', 'choice', 'alignment', 'relationships'],
    keywordsReversed: ['disharmony', 'imbalance', 'misalignment', 'broken relationship'],
    meaning: 'A meaningful choice involving love or values. Deep alignment with what you truly desire.',
    meaningReversed: 'Misalignment in relationships or values. An important decision is being avoided.',
    element: 'Air', planet: 'Venus', zodiac: 'Gemini',
    emoji: '💞', color: 'from-rose-500 to-pink-500'
  },
  {
    id: 7, name: 'The Chariot', arcana: 'major', number: 7, numerologyNumber: 7,
    keywords: ['control', 'willpower', 'victory', 'determination'],
    keywordsReversed: ['self-discipline failure', 'aggression', 'lack of direction'],
    meaning: 'Victory through determination and focus. Keep moving forward despite obstacles. You will prevail.',
    meaningReversed: 'Lack of direction or self-control. Aggression or forcefulness is creating friction.',
    element: 'Water', planet: 'Moon', zodiac: 'Cancer',
    emoji: '🏆', color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 8, name: 'Strength', arcana: 'major', number: 8, numerologyNumber: 8,
    keywords: ['courage', 'inner strength', 'patience', 'compassion'],
    keywordsReversed: ['self-doubt', 'weakness', 'raw emotion', 'insecurity'],
    meaning: 'True power comes from compassion and inner courage, not force. You have more strength than you know.',
    meaningReversed: 'Self-doubt or fear is undermining your power. Inner work is needed.',
    element: 'Fire', planet: 'Sun', zodiac: 'Leo',
    emoji: '🦁', color: 'from-orange-500 to-amber-600'
  },
  {
    id: 9, name: 'The Hermit', arcana: 'major', number: 9, numerologyNumber: 9,
    keywords: ['introspection', 'solitude', 'guidance', 'inner wisdom'],
    keywordsReversed: ['isolation', 'loneliness', 'withdrawal', 'exile'],
    meaning: 'Retreat inward for answers. Seek solitude and introspection. Inner guidance is available.',
    meaningReversed: 'Unhealthy isolation or cutting yourself off from needed support.',
    element: 'Earth', planet: 'Mercury', zodiac: 'Virgo',
    emoji: '🏮', color: 'from-slate-500 to-slate-700'
  },
  {
    id: 10, name: 'Wheel of Fortune', arcana: 'major', number: 10, numerologyNumber: 1,
    keywords: ['luck', 'fate', 'turning point', 'cycles', 'destiny'],
    keywordsReversed: ['bad luck', 'resistance to change', 'breaking cycles'],
    meaning: 'A major turning point. The wheel turns in your favour. Embrace change and go with the flow.',
    meaningReversed: 'Fighting against inevitable change. Cycles of bad luck may persist until you adapt.',
    element: 'Fire', planet: 'Jupiter', zodiac: 'Sagittarius',
    emoji: '🎡', color: 'from-blue-500 to-teal-500'
  },
  {
    id: 11, name: 'Justice', arcana: 'major', number: 11, numerologyNumber: 2,
    keywords: ['fairness', 'truth', 'cause and effect', 'law', 'clarity'],
    keywordsReversed: ['injustice', 'dishonesty', 'bias', 'unfairness'],
    meaning: 'Truth and fairness prevail. Legal matters resolve fairly. Account for your actions honestly.',
    meaningReversed: 'Injustice or bias is at play. Someone is not being truthful.',
    element: 'Air', planet: 'Venus', zodiac: 'Libra',
    emoji: '⚖️', color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 12, name: 'The Hanged Man', arcana: 'major', number: 12, numerologyNumber: 3,
    keywords: ['pause', 'surrender', 'new perspective', 'sacrifice'],
    keywordsReversed: ['stalling', 'resistance', 'unnecessary delay', 'martyrdom'],
    meaning: 'Surrender and gain a new perspective. What feels like a pause is actually profound spiritual insight.',
    meaningReversed: 'Unnecessary stalling. What are you resisting? The sacrifice may not be worth it.',
    element: 'Water', planet: 'Neptune', zodiac: 'Pisces',
    emoji: '🔄', color: 'from-cyan-600 to-blue-700'
  },
  {
    id: 13, name: 'Death', arcana: 'major', number: 13, numerologyNumber: 4,
    keywords: ['transformation', 'endings', 'transition', 'release'],
    keywordsReversed: ['resistance to change', 'inability to move on', 'stagnation'],
    meaning: 'A major transformation. Something must end so something new can begin. Embrace this transition.',
    meaningReversed: 'Resistance to necessary change is causing stagnation. Let go.',
    element: 'Water', planet: 'Pluto', zodiac: 'Scorpio',
    emoji: '🦋', color: 'from-slate-700 to-slate-900'
  },
  {
    id: 14, name: 'Temperance', arcana: 'major', number: 14, numerologyNumber: 5,
    keywords: ['balance', 'moderation', 'patience', 'alchemy', 'harmony'],
    keywordsReversed: ['imbalance', 'excess', 'lacking long-term vision', 'disharmony'],
    meaning: 'Balance and moderation bring alchemy. Patience and purpose aligned create extraordinary results.',
    meaningReversed: 'Imbalance and excess disrupt flow. Return to moderation.',
    element: 'Fire', planet: 'Jupiter', zodiac: 'Sagittarius',
    emoji: '⚗️', color: 'from-blue-400 to-teal-500'
  },
  {
    id: 15, name: 'The Devil', arcana: 'major', number: 15, numerologyNumber: 6,
    keywords: ['bondage', 'materialism', 'shadow self', 'restriction', 'addiction'],
    keywordsReversed: ['releasing limiting beliefs', 'detachment', 'reclaiming power'],
    meaning: 'You may be bound by material concerns, addictions, or shadow aspects. Awareness is the first step to freedom.',
    meaningReversed: 'Breaking free from chains. Reclaiming power from what has held you captive.',
    element: 'Earth', planet: 'Saturn', zodiac: 'Capricorn',
    emoji: '⛓️', color: 'from-red-800 to-slate-900'
  },
  {
    id: 16, name: 'The Tower', arcana: 'major', number: 16, numerologyNumber: 7,
    keywords: ['sudden change', 'upheaval', 'revelation', 'chaos', 'awakening'],
    keywordsReversed: ['avoiding disaster', 'fear of change', 'delaying inevitable'],
    meaning: 'Sudden upheaval dismantles what was built on false foundations. This destruction makes way for truth.',
    meaningReversed: 'Avoiding necessary upheaval. The change is coming — resistance only prolongs suffering.',
    element: 'Fire', planet: 'Mars', zodiac: 'Aries',
    emoji: '⚡', color: 'from-red-600 to-orange-700'
  },
  {
    id: 17, name: 'The Star', arcana: 'major', number: 17, numerologyNumber: 8,
    keywords: ['hope', 'inspiration', 'serenity', 'renewal', 'faith'],
    keywordsReversed: ['faithlessness', 'discouragement', 'insecurity', 'lost hope'],
    meaning: 'Hope and renewal follow the storm. Have faith — the universe is guiding you toward healing and peace.',
    meaningReversed: 'Hope feels distant. Reconnect with what inspires you. Faith in self needs rebuilding.',
    element: 'Air', planet: 'Uranus', zodiac: 'Aquarius',
    emoji: '⭐', color: 'from-blue-400 to-sky-500'
  },
  {
    id: 18, name: 'The Moon', arcana: 'major', number: 18, numerologyNumber: 9,
    keywords: ['illusion', 'fear', 'subconscious', 'dreams', 'confusion'],
    keywordsReversed: ['releasing fears', 'repressed emotions', 'confusion lifting'],
    meaning: 'The unconscious is active. Things are not what they seem. Trust your intuition through uncertainty.',
    meaningReversed: 'Confusion is lifting. Fears and illusions that blocked progress are releasing.',
    element: 'Water', planet: 'Neptune', zodiac: 'Pisces',
    emoji: '🌕', color: 'from-slate-600 to-blue-800'
  },
  {
    id: 19, name: 'The Sun', arcana: 'major', number: 19, numerologyNumber: 1,
    keywords: ['success', 'joy', 'vitality', 'optimism', 'clarity'],
    keywordsReversed: ['temporary depression', 'inner child blocked', 'lack of clarity'],
    meaning: 'Success, joy, and vitality radiate. Everything is illuminated. Celebrate and embrace this bright period.',
    meaningReversed: 'Joy is temporarily blocked. Reconnect with your inner light and childlike wonder.',
    element: 'Fire', planet: 'Sun', zodiac: 'Leo',
    emoji: '☀️', color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 20, name: 'Judgement', arcana: 'major', number: 20, numerologyNumber: 2,
    keywords: ['reflection', 'reckoning', 'awakening', 'inner calling', 'absolution'],
    keywordsReversed: ['self-doubt', 'ignoring the call', 'self-judgment', 'refusing change'],
    meaning: 'A profound awakening and reckoning. Answer your inner calling. Forgive and release the past.',
    meaningReversed: 'Harshly judging yourself or others. Ignoring a significant inner calling.',
    element: 'Fire', planet: 'Pluto', zodiac: 'Scorpio',
    emoji: '🔔', color: 'from-amber-500 to-red-600'
  },
  {
    id: 21, name: 'The World', arcana: 'major', number: 21, numerologyNumber: 3,
    keywords: ['completion', 'integration', 'accomplishment', 'wholeness', 'fulfilment'],
    keywordsReversed: ['incompletion', 'shortcuts', 'delayed success', 'lack of closure'],
    meaning: 'A cycle completes in triumphant wholeness. You have achieved something significant. Celebrate fully.',
    meaningReversed: 'A cycle is close to completion but feels delayed. Avoid shortcuts — see it through.',
    element: 'Earth', planet: 'Saturn', zodiac: 'Capricorn',
    emoji: '🌍', color: 'from-emerald-500 to-teal-600'
  },
];

// Minor Arcana (abbreviated — key cards from each suit)
export const MINOR_ARCANA: TarotCard[] = [
  // WANDS
  { id: 22, name: 'Ace of Wands', arcana: 'minor', suit: 'wands', number: 1, numerologyNumber: 1, keywords: ['inspiration', 'new idea', 'growth', 'potential'], keywordsReversed: ['delays', 'lack of motivation', 'misdirection'], meaning: 'Spark of new inspiration or creative potential. The seed of a bold new beginning.', meaningReversed: 'Creative blocks or delays in a new venture.', element: 'Fire', emoji: '🔥', color: 'from-orange-500 to-red-500' },
  { id: 23, name: '2 of Wands', arcana: 'minor', suit: 'wands', number: 2, numerologyNumber: 2, keywords: ['planning', 'future vision', 'boldness', 'discovery'], keywordsReversed: ['fear of unknown', 'lack of planning', 'playing safe'], meaning: 'Bold planning for the future. You hold the world in your hands. Commit to your vision.', meaningReversed: 'Fear of taking the next step is holding back expansion.', element: 'Fire', emoji: '🌐', color: 'from-orange-500 to-red-500' },
  { id: 24, name: '3 of Wands', arcana: 'minor', suit: 'wands', number: 3, numerologyNumber: 3, keywords: ['expansion', 'foresight', 'overseas', 'leadership'], keywordsReversed: ['delays', 'frustration', 'obstacles to plans'], meaning: 'Your plans are in motion. Look ahead with confidence — expansion and foreign opportunity beckons.', meaningReversed: 'Delays to plans or lack of foresight causing frustration.', element: 'Fire', emoji: '⛵', color: 'from-orange-500 to-red-500' },
  { id: 25, name: '7 of Wands', arcana: 'minor', suit: 'wands', number: 7, numerologyNumber: 7, keywords: ['perseverance', 'defensiveness', 'competition', 'challenge'], keywordsReversed: ['giving up', 'overwhelm', 'exhaustion'], meaning: 'Hold your ground. You are being challenged, but you have the advantage. Persevere.', meaningReversed: 'Exhaustion from constant defence. Is this battle worth fighting?', element: 'Fire', emoji: '🛡️', color: 'from-orange-500 to-red-500' },
  { id: 26, name: 'King of Wands', arcana: 'minor', suit: 'wands', number: 14, numerologyNumber: 5, keywords: ['natural leader', 'vision', 'entrepreneur', 'bold'], keywordsReversed: ['impulsive', 'overbearing', 'arrogance'], meaning: 'Lead with vision and charisma. You have the power to make bold things happen.', meaningReversed: 'Impulsiveness or arrogance undermines natural authority.', element: 'Fire', emoji: '👑', color: 'from-orange-500 to-red-500' },

  // CUPS
  { id: 27, name: 'Ace of Cups', arcana: 'minor', suit: 'cups', number: 1, numerologyNumber: 1, keywords: ['new love', 'compassion', 'creativity', 'emotional beginning'], keywordsReversed: ['emotional blocked', 'repressed feelings', 'emptiness'], meaning: 'An overflowing cup of love, joy, and emotional renewal. Open your heart.', meaningReversed: 'Emotions are blocked or suppressed. Healing the heart is needed.', element: 'Water', emoji: '💧', color: 'from-blue-500 to-cyan-500' },
  { id: 28, name: '2 of Cups', arcana: 'minor', suit: 'cups', number: 2, numerologyNumber: 2, keywords: ['partnership', 'connection', 'mutual attraction', 'union'], keywordsReversed: ['misalignment', 'broken bonds', 'imbalance'], meaning: 'A beautiful union or partnership. Mutual attraction and shared values create a powerful bond.', meaningReversed: 'Imbalance in a relationship. One person gives more than the other.', element: 'Water', emoji: '🤝', color: 'from-blue-500 to-cyan-500' },
  { id: 29, name: '6 of Cups', arcana: 'minor', suit: 'cups', number: 6, numerologyNumber: 6, keywords: ['nostalgia', 'past', 'childhood', 'innocence', 'reunion'], keywordsReversed: ['being stuck in past', 'naivety', 'unrealistic'], meaning: 'Revisiting joyful memories or a reunion with someone from the past. Innocence and giving freely.', meaningReversed: 'Stuck in the past or idealising what was. Move forward.', element: 'Water', emoji: '🌼', color: 'from-blue-500 to-cyan-500' },
  { id: 30, name: 'The High Queen of Cups', arcana: 'minor', suit: 'cups', number: 13, numerologyNumber: 4, keywords: ['emotional intelligence', 'intuitive', 'compassionate', 'nurturing'], keywordsReversed: ['emotional insecurity', 'manipulation', 'co-dependency'], meaning: 'Lead from a place of deep compassion and intuition. Emotional mastery guides all decisions.', meaningReversed: 'Emotional manipulation or insecurity clouds judgment.', element: 'Water', emoji: '🧿', color: 'from-blue-500 to-cyan-500' },

  // SWORDS
  { id: 31, name: 'Ace of Swords', arcana: 'minor', suit: 'swords', number: 1, numerologyNumber: 1, keywords: ['clarity', 'breakthrough', 'truth', 'new idea'], keywordsReversed: ['confusion', 'brutal truth', 'misinformation'], meaning: 'A breakthrough of clarity cuts through confusion. Truth and mental power are at their peak.', meaningReversed: 'Confusion or destructive thinking clouding clarity.', element: 'Air', emoji: '⚔️', color: 'from-slate-400 to-slate-600' },
  { id: 32, name: '3 of Swords', arcana: 'minor', suit: 'swords', number: 3, numerologyNumber: 3, keywords: ['heartbreak', 'grief', 'sorrow', 'betrayal'], keywordsReversed: ['recovery from grief', 'forgiveness', 'moving on'], meaning: 'Pain and heartbreak demand acknowledgement. Grief is valid. Allow yourself to feel and heal.', meaningReversed: 'Recovery and healing after a painful period. Forgiveness enables progress.', element: 'Air', emoji: '💔', color: 'from-slate-400 to-slate-600' },
  { id: 33, name: '5 of Swords', arcana: 'minor', suit: 'swords', number: 5, numerologyNumber: 5, keywords: ['conflict', 'defeat', 'winning at all cost', 'tension'], keywordsReversed: ['reconciliation', 'past resentment', 'moving on'], meaning: 'A conflict where winning has come at significant cost. Is the victory truly worth the fallout?', meaningReversed: 'Reconciliation after conflict. Old resentments can now be released.', element: 'Air', emoji: '⚡', color: 'from-slate-400 to-slate-600' },
  { id: 34, name: '9 of Swords', arcana: 'minor', suit: 'swords', number: 9, numerologyNumber: 9, keywords: ['anxiety', 'nightmares', 'worry', 'despair', 'mental anguish'], keywordsReversed: ['hope', 'reaching out for help', 'anxiety releasing'], meaning: 'Mental anguish and worry amplified at night. Most of what you fear is a product of the mind — not reality.', meaningReversed: 'The worst is passing. Seek support — you do not have to carry this alone.', element: 'Air', emoji: '😰', color: 'from-slate-400 to-slate-600' },
  { id: 35, name: 'King of Swords', arcana: 'minor', suit: 'swords', number: 14, numerologyNumber: 5, keywords: ['intellectual power', 'authority', 'clarity', 'truth-seeker'], keywordsReversed: ['manipulation', 'coldness', 'abusive power'], meaning: 'Lead with intellect, ethics, and clarity. Truth is your authority. Strategic thinking prevails.', meaningReversed: 'Intellectual power wielded coldly or manipulatively.', element: 'Air', emoji: '👁️', color: 'from-slate-400 to-slate-600' },

  // PENTACLES
  { id: 36, name: 'Ace of Pentacles', arcana: 'minor', suit: 'pentacles', number: 1, numerologyNumber: 1, keywords: ['new opportunity', 'prosperity', 'abundance', 'security'], keywordsReversed: ['lost opportunity', 'poor financial planning', 'instability'], meaning: 'A new material opportunity or financial seed. Plant it wisely and it will grow abundantly.', meaningReversed: 'A promising opportunity squandered through poor planning.', element: 'Earth', emoji: '🪙', color: 'from-emerald-500 to-green-600' },
  { id: 37, name: '4 of Pentacles', arcana: 'minor', suit: 'pentacles', number: 4, numerologyNumber: 4, keywords: ['security', 'control', 'conservatism', 'hoarding'], keywordsReversed: ['generosity', 'releasing control', 'financial insecurity'], meaning: 'Financial security through stability. However, excessive control or hoarding blocks natural abundance flow.', meaningReversed: 'Releasing excessive control over money or possessions allows greater abundance.', element: 'Earth', emoji: '🏦', color: 'from-emerald-500 to-green-600' },
  { id: 38, name: '8 of Pentacles', arcana: 'minor', suit: 'pentacles', number: 8, numerologyNumber: 8, keywords: ['diligence', 'skill', 'craftsmanship', 'learning'], keywordsReversed: ['lack of focus', 'mediocrity', 'perfectionism'], meaning: 'Dedicated practice and craftsmanship. Master your skills through consistent effort. The work is paying off.', meaningReversed: 'Lack of focus or perfectionism blocking practical progress.', element: 'Earth', emoji: '⚒️', color: 'from-emerald-500 to-green-600' },
  { id: 39, name: '10 of Pentacles', arcana: 'minor', suit: 'pentacles', number: 10, numerologyNumber: 1, keywords: ['legacy', 'wealth', 'family', 'stability', 'long-term success'], keywordsReversed: ['financial failure', 'family conflict', 'impermanence'], meaning: 'Lasting wealth, family harmony, and legacy. You are building something that endures beyond you.', meaningReversed: 'Instability in family or finances. What was built may not last without care.', element: 'Earth', emoji: '🏠', color: 'from-emerald-500 to-green-600' },
  { id: 40, name: 'Queen of Pentacles', arcana: 'minor', suit: 'pentacles', number: 13, numerologyNumber: 4, keywords: ['practicality', 'nurturing', 'financial abundance', 'resourcefulness'], keywordsReversed: ['work-life imbalance', 'financial dependency', 'smothering'], meaning: 'Practical, nurturing abundance. You create security through warmth and resourcefulness.', meaningReversed: 'Imbalance between material security and emotional needs.', element: 'Earth', emoji: '🌿', color: 'from-emerald-500 to-green-600' },
];

export const ALL_CARDS: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export interface SpreadPosition {
  id: number;
  label: string;
  description: string;
  numerologyLink?: string; // e.g., 'lifePath', 'expression', 'soulUrge'
  x: number; // % position
  y: number; // % position
}

export interface SpreadTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  cardCount: number;
  positions: SpreadPosition[];
  category: 'general' | 'relationship' | 'career' | 'spiritual' | 'numerology';
}

export const SPREAD_TEMPLATES: SpreadTemplate[] = [
  {
    id: 'single',
    name: 'Single Card',
    description: 'Quick daily guidance, clarifier, or oracle message',
    icon: '1',
    cardCount: 1,
    category: 'general',
    positions: [
      { id: 0, label: 'Your Message', description: 'The card speaks directly to your question or energy right now', x: 50, y: 50 }
    ]
  },
  {
    id: 'three-card-ppf',
    name: 'Past · Present · Future',
    description: '3-card timeline spread for situation clarity',
    icon: '3',
    cardCount: 3,
    category: 'general',
    positions: [
      { id: 0, label: 'Past', description: 'What has shaped the current situation', numerologyLink: 'birthday', x: 20, y: 50 },
      { id: 1, label: 'Present', description: 'The core energy around you right now', numerologyLink: 'lifePath', x: 50, y: 50 },
      { id: 2, label: 'Future', description: 'Where things are heading if current path continues', numerologyLink: 'personalYear', x: 80, y: 50 }
    ]
  },
  {
    id: 'three-card-sca',
    name: 'Situation · Challenge · Advice',
    description: 'Practical 3-card spread for any decision',
    icon: '3',
    cardCount: 3,
    category: 'general',
    positions: [
      { id: 0, label: 'Situation', description: 'Current state of affairs', numerologyLink: 'expression', x: 20, y: 50 },
      { id: 1, label: 'Challenge', description: 'What is blocking or testing you', numerologyLink: 'lifePath', x: 50, y: 50 },
      { id: 2, label: 'Advice', description: 'Guidance for the highest outcome', numerologyLink: 'soulUrge', x: 80, y: 50 }
    ]
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'The classic 10-card deep-dive spread for comprehensive insight',
    icon: '✦',
    cardCount: 10,
    category: 'general',
    positions: [
      { id: 0, label: 'The Heart', description: 'Core of the matter', numerologyLink: 'lifePath', x: 40, y: 50 },
      { id: 1, label: 'The Cross', description: 'What crosses or challenges you', x: 40, y: 50 },
      { id: 2, label: 'Foundation', description: 'Root cause beneath the situation', numerologyLink: 'birthday', x: 40, y: 70 },
      { id: 3, label: 'Recent Past', description: 'What is passing away', x: 20, y: 50 },
      { id: 4, label: 'Potential', description: 'Best possible outcome', x: 40, y: 30 },
      { id: 5, label: 'Near Future', description: 'What approaches soon', x: 60, y: 50 },
      { id: 6, label: 'Your Stance', description: 'How you see yourself', numerologyLink: 'expression', x: 80, y: 70 },
      { id: 7, label: 'External Forces', description: 'How others see the situation', x: 80, y: 55 },
      { id: 8, label: 'Hopes & Fears', description: 'Your inner desires and anxieties', numerologyLink: 'soulUrge', x: 80, y: 40 },
      { id: 9, label: 'Outcome', description: 'Most likely outcome given current energies', numerologyLink: 'personalYear', x: 80, y: 25 }
    ]
  },
  {
    id: 'relationship',
    name: 'Relationship Spread',
    description: 'Deep 5-card insight into any relationship or connection',
    icon: '♥',
    cardCount: 5,
    category: 'relationship',
    positions: [
      { id: 0, label: 'You', description: 'Your energy in this connection', numerologyLink: 'expression', x: 20, y: 60 },
      { id: 1, label: 'Them', description: 'Their energy in this connection', x: 80, y: 60 },
      { id: 2, label: 'The Bond', description: 'The nature of the connection itself', numerologyLink: 'lifePath', x: 50, y: 30 },
      { id: 3, label: 'Challenge', description: 'The friction point between you', x: 50, y: 60 },
      { id: 4, label: 'Potential', description: 'What this relationship can become', numerologyLink: 'soulUrge', x: 50, y: 85 }
    ]
  },
  {
    id: 'career',
    name: 'Career & Business',
    description: '5-card spread for career, business, and abundance decisions',
    icon: '◆',
    cardCount: 5,
    category: 'career',
    positions: [
      { id: 0, label: 'Current Path', description: 'Where you are professionally right now', numerologyLink: 'expression', x: 50, y: 20 },
      { id: 1, label: 'Strengths', description: 'Your greatest asset to leverage', numerologyLink: 'birthday', x: 20, y: 50 },
      { id: 2, label: 'Obstacles', description: 'What stands between you and success', x: 80, y: 50 },
      { id: 3, label: 'Action', description: 'The most powerful step to take now', numerologyLink: 'personalYear', x: 35, y: 80 },
      { id: 4, label: 'Outcome', description: 'The likely result of this path', numerologyLink: 'lifePath', x: 65, y: 80 }
    ]
  },
  {
    id: 'name-correction',
    name: 'Name Correction Validation',
    description: 'Validate a proposed name correction through tarot guidance',
    icon: '✍',
    cardCount: 3,
    category: 'numerology',
    positions: [
      { id: 0, label: 'Current Name Energy', description: 'The vibration of the existing name', numerologyLink: 'expression', x: 20, y: 50 },
      { id: 1, label: 'Transition Energy', description: 'The journey of changing the name', x: 50, y: 50 },
      { id: 2, label: 'New Name Potential', description: 'What the corrected name can bring', numerologyLink: 'soulUrge', x: 80, y: 50 }
    ]
  },
  {
    id: 'personal-year',
    name: 'Personal Year Forecast',
    description: 'Map your Personal Year energy with tarot guidance for each quarter',
    icon: '◉',
    cardCount: 4,
    category: 'numerology',
    positions: [
      { id: 0, label: 'Q1 Theme', description: 'Jan–Mar energy and focus', numerologyLink: 'personalYear', x: 25, y: 30 },
      { id: 1, label: 'Q2 Theme', description: 'Apr–Jun energy and focus', x: 75, y: 30 },
      { id: 2, label: 'Q3 Theme', description: 'Jul–Sep energy and focus', x: 25, y: 70 },
      { id: 3, label: 'Annual Lesson', description: 'The overarching theme of your Personal Year', numerologyLink: 'personalYear', x: 75, y: 70 }
    ]
  },
];

export type ToneType = 'empowering' | 'direct' | 'spiritual' | 'practical' | 'vedic';

export interface TarotReadingRequest {
  question: string;
  spreadId: string;
  cards: Array<{ positionId: number; cardId: number; reversed: boolean }>;
  numerologyContext?: {
    name?: string;
    lifePath?: string;
    expression?: string;
    soulUrge?: string;
    personalYear?: number;
    birthday?: string | number;
  };
  tone: ToneType;
}

export interface TarotReadingResult {
  narrative: string;
  cardBreakdowns: Array<{
    positionLabel: string;
    cardName: string;
    reversed: boolean;
    interpretation: string;
    numerologyBridge?: string;
  }>;
  overallTheme: string;
  actionableGuidance: string;
  numerologyIntegration?: string;
  generatedAt: string;
}
