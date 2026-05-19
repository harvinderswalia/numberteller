export function generatePersonalYearForecast(
  lifePath: number,
  expression: number,
  soulUrge: number,
  essence: number,
  personalYear: number,
  desireCategory?: string
): string {
  const forecasts: Record<number, Record<string, string>> = {
    1: {
      'Career Growth': 'New career beginnings, leadership opportunities, and bold initiatives. With EX {ex}, you\'ll approach this through {exStyle}. Essence {essence} adds {essenceEffect}.',
      'Relationships/Harmony': 'New relationships or fresh starts in existing ones. Independence balanced with partnership needs. With EX {ex}, you\'ll express {exStyle}. Essence {essence} brings {essenceEffect}.',
      'Wealth/Abundance': 'New income streams, entrepreneurial ventures. Taking financial initiative. With EX {ex}, manifesting through {exStyle}. Essence {essence} creates {essenceEffect}.',
      'Health/Wellness': 'Starting new health routines, physical activity focus. Personal vitality. With EX {ex}, implementing {exStyle}. Essence {essence} supports {essenceEffect}.',
      'Spirituality/Growth': 'New spiritual path, self-discovery journey begins. Independent exploration. With EX {ex}, discovering {exStyle}. Essence {essence} reveals {essenceEffect}.',
    },
    2: {
      'Career Growth': 'Collaborations, partnerships, diplomatic opportunities. Building alliances. With EX {ex}, working through {exStyle}. Essence {essence} facilitates {essenceEffect}.',
      'Relationships/Harmony': 'Deep partnerships, emotional connections deepen. Harmony and balance emphasized. With EX {ex}, relating through {exStyle}. Essence {essence} enhances {essenceEffect}.',
      'Wealth/Abundance': 'Joint ventures, partnership income. Cooperative financial growth. With EX {ex}, partnering via {exStyle}. Essence {essence} attracts {essenceEffect}.',
      'Health/Wellness': 'Emotional healing, balance focus. Partnership in wellness journey. With EX {ex}, balancing {exStyle}. Essence {essence} heals {essenceEffect}.',
      'Spirituality/Growth': 'Intuitive development, receptive spiritual experiences. Connection with others. With EX {ex}, sensing {exStyle}. Essence {essence} deepens {essenceEffect}.',
    },
    3: {
      'Career Growth': 'Creative expression in work, communication opportunities, networking success. With EX {ex}, creating through {exStyle}. Essence {essence} amplifies {essenceEffect}.',
      'Relationships/Harmony': 'Social expansion, joyful connections, expressive communication. With EX {ex}, connecting via {exStyle}. Essence {essence} brings {essenceEffect}.',
      'Wealth/Abundance': 'Creative income, communication-based earnings. Joyful abundance. With EX {ex}, earning through {exStyle}. Essence {essence} multiplies {essenceEffect}.',
      'Health/Wellness': 'Joyful movement, social wellness activities. Creative self-care. With EX {ex}, enjoying {exStyle}. Essence {essence} vitalizes {essenceEffect}.',
      'Spirituality/Growth': 'Joyful spirituality, creative expression of beliefs. Sharing wisdom. With EX {ex}, expressing {exStyle}. Essence {essence} illuminates {essenceEffect}.',
    },
    4: {
      'Career Growth': 'Building solid foundations, practical work, systems and structure. With EX {ex}, organizing through {exStyle}. Essence {essence} stabilizes {essenceEffect}.',
      'Relationships/Harmony': 'Commitment, building stable relationships, practical support. With EX {ex}, supporting via {exStyle}. Essence {essence} grounds {essenceEffect}.',
      'Wealth/Abundance': 'Financial stability, building wealth foundations, practical investments. With EX {ex}, building through {exStyle}. Essence {essence} secures {essenceEffect}.',
      'Health/Wellness': 'Routine establishment, physical strength building, disciplined wellness. With EX {ex}, implementing {exStyle}. Essence {essence} strengthens {essenceEffect}.',
      'Spirituality/Growth': 'Grounded spiritual practice, disciplined development. Practical application. With EX {ex}, practicing {exStyle}. Essence {essence} anchors {essenceEffect}.',
    },
    5: {
      'Career Growth': 'Career changes, variety in work, freedom and flexibility. New opportunities. With EX {ex}, adapting through {exStyle}. Essence {essence} energizes {essenceEffect}.',
      'Relationships/Harmony': 'Exciting connections, freedom in relationships, social expansion. With EX {ex}, exploring via {exStyle}. Essence {essence} liberates {essenceEffect}.',
      'Wealth/Abundance': 'Variable income, diverse revenue streams, risk-taking opportunities. With EX {ex}, diversifying through {exStyle}. Essence {essence} attracts {essenceEffect}.',
      'Health/Wellness': 'Active lifestyle, varied fitness approaches, adventure in wellness. With EX {ex}, exploring {exStyle}. Essence {essence} activates {essenceEffect}.',
      'Spirituality/Growth': 'Spiritual exploration, diverse practices, freedom in beliefs. With EX {ex}, discovering {exStyle}. Essence {essence} expands {essenceEffect}.',
    },
    6: {
      'Career Growth': 'Service-oriented work, responsibility increases, nurturing leadership. With EX {ex}, serving through {exStyle}. Essence {essence} supports {essenceEffect}.',
      'Relationships/Harmony': 'Family focus, deepening commitments, nurturing relationships. With EX {ex}, caring via {exStyle}. Essence {essence} harmonizes {essenceEffect}.',
      'Wealth/Abundance': 'Financial responsibility, family wealth, providing for others. With EX {ex}, providing through {exStyle}. Essence {essence} nurtures {essenceEffect}.',
      'Health/Wellness': 'Family health, nurturing self and others, balanced wellness. With EX {ex}, healing through {exStyle}. Essence {essence} restores {essenceEffect}.',
      'Spirituality/Growth': 'Service spirituality, compassionate development, family harmony. With EX {ex}, serving {exStyle}. Essence {essence} balances {essenceEffect}.',
    },
    7: {
      'Career Growth': 'Expertise development, research, analytical work, specialization. With EX {ex}, analyzing through {exStyle}. Essence {essence} clarifies {essenceEffect}.',
      'Relationships/Harmony': 'Deepening connections, introspective relating, quality over quantity. With EX {ex}, understanding via {exStyle}. Essence {essence} reveals {essenceEffect}.',
      'Wealth/Abundance': 'Strategic finances, research investments, wisdom-based income. With EX {ex}, strategizing through {exStyle}. Essence {essence} focuses {essenceEffect}.',
      'Health/Wellness': 'Mind-body connection, introspective wellness, spiritual healing. With EX {ex}, understanding {exStyle}. Essence {essence} integrates {essenceEffect}.',
      'Spirituality/Growth': 'Deep spiritual insights, meditation, inner wisdom development. With EX {ex}, contemplating {exStyle}. Essence {essence} awakens {essenceEffect}.',
    },
    8: {
      'Career Growth': 'Career advancement, authority positions, financial success, power. With EX {ex}, achieving through {exStyle}. Essence {essence} empowers {essenceEffect}.',
      'Relationships/Harmony': 'Powerful partnerships, mutual success, balanced give-and-take. With EX {ex}, partnering via {exStyle}. Essence {essence} strengthens {essenceEffect}.',
      'Wealth/Abundance': 'Major financial gains, abundance manifestation, material success. With EX {ex}, earning through {exStyle}. Essence {essence} multiplies {essenceEffect}.',
      'Health/Wellness': 'Physical strength, vitality peak, powerful wellness results. With EX {ex}, empowering {exStyle}. Essence {essence} energizes {essenceEffect}.',
      'Spirituality/Growth': 'Spiritual power, manifesting abilities, material-spiritual balance. With EX {ex}, manifesting {exStyle}. Essence {essence} actualizes {essenceEffect}.',
    },
    9: {
      'Career Growth': 'Completion of career cycles, humanitarian work, leadership through service. With EX {ex}, completing through {exStyle}. Essence {essence} transforms {essenceEffect}.',
      'Relationships/Harmony': 'Compassionate connections, letting go, universal love. Endings and new beginnings. With EX {ex}, loving via {exStyle}. Essence {essence} releases {essenceEffect}.',
      'Wealth/Abundance': 'Generous abundance, completing financial cycles, charitable giving. With EX {ex}, sharing through {exStyle}. Essence {essence} circulates {essenceEffect}.',
      'Health/Wellness': 'Holistic healing, release of old patterns, transformative wellness. With EX {ex}, transforming {exStyle}. Essence {essence} purifies {essenceEffect}.',
      'Spirituality/Growth': 'Spiritual completion, wisdom integration, universal consciousness. With EX {ex}, transcending {exStyle}. Essence {essence} elevates {essenceEffect}.',
    },
  };

  const expressionStyles: Record<number, string> = {
    1: 'independent action and leadership',
    2: 'collaboration and diplomacy',
    3: 'creative expression and communication',
    4: 'practical organization and structure',
    5: 'adaptability and diverse approaches',
    6: 'nurturing care and responsibility',
    7: 'analytical thinking and wisdom',
    8: 'strategic power and achievement',
    9: 'compassionate service and completion',
  };

  const essenceEffects: Record<number, string> = {
    1: 'pioneering energy and new initiatives',
    2: 'partnership opportunities and sensitivity',
    3: 'creative inspiration and joyful expression',
    4: 'practical implementation and stability',
    5: 'dynamic change and exciting opportunities',
    6: 'harmonizing influence and responsibilities',
    7: 'deep insights and spiritual awareness',
    8: 'power multiplication and material success',
    9: 'completion energy and wisdom integration',
  };

  const category = desireCategory || 'Career Growth';
  const template = forecasts[personalYear]?.[category] || 'Significant developments aligned with your goals.';

  return template
    .replace('{ex}', expression.toString())
    .replace('{exStyle}', expressionStyles[expression] || 'your unique approach')
    .replace('{essence}', essence.toString())
    .replace('{essenceEffect}', essenceEffects[essence] || 'unique influences');
}
