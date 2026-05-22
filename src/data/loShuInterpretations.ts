export const LO_SHU_NUMBER_MEANINGS = {
  1: {
    title: 'Sun - Communication & Expression',
    traits: 'Independent, confident, leadership qualities, self-motivation',
    career: 'Leadership roles, public speaking, entrepreneurship',
    excessive: 'Ego issues, stubbornness, dominating behavior',
    missing: 'Lack of confidence, difficulty in self-expression, dependency on others',
  },
  2: {
    title: 'Moon - Intuition & Sensitivity',
    traits: 'Diplomatic, intuitive, emotionally sensitive, cooperative',
    career: 'Psychology, counseling, diplomatic services, creative arts',
    excessive: 'Over-sensitivity, mood swings, indecisiveness',
    missing: 'Lack of intuition, difficulty in relationships, insensitivity',
  },
  3: {
    title: 'Jupiter - Creativity & Intelligence',
    traits: 'Creative, optimistic, good memory, analytical thinking',
    career: 'Teaching, writing, arts, analytical fields',
    excessive: 'Overthinking, scattered energy, restlessness',
    missing: 'Poor memory, lack of creativity, difficulty in learning',
  },
  4: {
    title: 'Rahu - Practicality & Discipline',
    traits: 'Practical, organized, disciplined, patient',
    career: 'Engineering, construction, systematic work, management',
    excessive: 'Rigidity, stubbornness, resistance to change',
    missing: 'Lack of organization, impracticality, poor planning',
  },
  5: {
    title: 'Mercury - Balance & Intelligence',
    traits: 'Balanced, versatile, quick-thinking, adaptable',
    career: 'Business, communication, versatile roles, problem-solving',
    excessive: 'Restlessness, inconsistency, nervousness',
    missing: 'Lack of balance, difficulty in decision-making, instability',
  },
  6: {
    title: 'Venus - Love & Harmony',
    traits: 'Loving, nurturing, artistic, harmonious',
    career: 'Arts, hospitality, healthcare, family business',
    excessive: 'Over-attachment, possessiveness, materialism',
    missing: 'Difficulty in relationships, lack of empathy, domestic issues',
  },
  7: {
    title: 'Ketu - Spirituality & Analysis',
    traits: 'Spiritual, analytical, introspective, philosophical',
    career: 'Research, spirituality, occult sciences, investigation',
    excessive: 'Isolation, excessive introspection, detachment',
    missing: 'Lack of spiritual awareness, superficiality, trust issues',
  },
  8: {
    title: 'Saturn - Power & Ambition',
    traits: 'Ambitious, powerful, patient, determined',
    career: 'Business, politics, administration, long-term projects',
    excessive: 'Materialism, ruthlessness, workaholic tendencies',
    missing: 'Lack of ambition, financial struggles, impatience',
  },
  9: {
    title: 'Mars - Energy & Courage',
    traits: 'Energetic, courageous, passionate, competitive',
    career: 'Military, sports, surgery, competitive fields',
    excessive: 'Aggression, impatience, impulsiveness',
    missing: 'Lack of energy, procrastination, fear',
  },
};

// ── FIVE ELEMENT SYSTEM ──────────────────────────────────────────────────────
// Each Lo Shu number maps to a Five Element (Wood / Fire / Earth / Metal / Water)
// Productive cycle: Wood→Fire→Earth→Metal→Water→Wood
// Exhaustive cycle: each element exhausts the one before it in the productive cycle

export type FiveElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

export interface ElementProfile {
  element: FiveElement;
  producedBy: FiveElement;   // what strengthens this element (productive cycle parent)
  produces: FiveElement;     // what this element feeds into (productive cycle child)
  exhaustedBy: FiveElement;  // what draws energy from this element (exhaustive cycle)
  exhausts: FiveElement;     // what this element draws energy from
  color: string;
  direction: string;
  season: string;
  planetSymbol: string;
}

export const ELEMENT_PROFILES: Record<FiveElement, ElementProfile> = {
  Wood: {
    element: 'Wood',
    producedBy: 'Water',
    produces: 'Fire',
    exhaustedBy: 'Fire',   // Fire exhausts Wood
    exhausts: 'Water',     // Wood exhausts Water
    color: 'Green, Teal',
    direction: 'East, Southeast',
    season: 'Spring',
    planetSymbol: 'Jupiter / Venus',
  },
  Fire: {
    element: 'Fire',
    producedBy: 'Wood',
    produces: 'Earth',
    exhaustedBy: 'Earth',  // Earth exhausts Fire
    exhausts: 'Wood',      // Fire exhausts Wood
    color: 'Red, Orange, Purple, Pink',
    direction: 'South',
    season: 'Summer',
    planetSymbol: 'Sun / Mars',
  },
  Earth: {
    element: 'Earth',
    producedBy: 'Fire',
    produces: 'Metal',
    exhaustedBy: 'Metal',  // Metal exhausts Earth
    exhausts: 'Fire',      // Earth exhausts Fire
    color: 'Yellow, Beige, Brown',
    direction: 'Centre, Southwest, Northeast',
    season: 'Late Summer (transitions)',
    planetSymbol: 'Saturn / Mercury',
  },
  Metal: {
    element: 'Metal',
    producedBy: 'Earth',
    produces: 'Water',
    exhaustedBy: 'Water',  // Water exhausts Metal
    exhausts: 'Earth',     // Metal exhausts Earth
    color: 'White, Gold, Silver',
    direction: 'West, Northwest',
    season: 'Autumn',
    planetSymbol: 'Venus / Rahu',
  },
  Water: {
    element: 'Water',
    producedBy: 'Metal',
    produces: 'Wood',
    exhaustedBy: 'Wood',   // Wood exhausts Water
    exhausts: 'Metal',     // Water exhausts Metal
    color: 'Black, Navy, Dark Blue',
    direction: 'North',
    season: 'Winter',
    planetSymbol: 'Moon / Ketu',
  },
};

// Map each Lo Shu grid number to its primary element
export const NUMBER_ELEMENT_MAP: Record<number, FiveElement> = {
  1: 'Water',   // Moon / Water energy
  2: 'Earth',   // Moon (Lo Shu 2 is SW Earth)
  3: 'Wood',    // Jupiter / East Wood
  4: 'Wood',    // Rahu / SE Wood
  5: 'Earth',   // Centre Earth
  6: 'Metal',   // Venus / NW Metal
  7: 'Metal',   // Ketu / West Metal
  8: 'Earth',   // Saturn / NE Earth
  9: 'Fire',    // Mars / South Fire
};

// ── PRODUCTIVE CYCLE REMEDIES ────────────────────────────────────────────────
// For MISSING or WEAK energy of a number: use the productive parent element to feed it
// For EXCESSIVE energy: use the exhaustive element to drain excess

export interface ElementRemedySet {
  productiveCycle: {
    explanation: string;
    remedies: string[];
  };
  exhaustiveCycle: {
    explanation: string;
    remedies: string[];
  };
}

export const ELEMENT_CYCLE_REMEDIES: Record<FiveElement, ElementRemedySet> = {
  Water: {
    productiveCycle: {
      explanation: 'Metal produces Water — introduce Metal to strengthen Water energy',
      remedies: [
        'Place metal objects (bowls, wind chimes, coins) in the North area',
        'Use white, gold, or silver decor and clothing',
        'Add round or oval metallic shapes to your space',
        'Wear white or silver-toned gemstones (white sapphire, moonstone)',
        'Display metal wind chimes near the entry',
      ],
    },
    exhaustiveCycle: {
      explanation: 'Wood exhausts Water — reduce Wood to stop draining Water energy',
      remedies: [
        'Reduce heavy plant life and wooden furniture in the North zone',
        'Avoid green and brown colors in Water-direction spaces',
        'Remove tall columnar wooden objects from the North',
        'Replace live plants with metal or water-themed objects',
      ],
    },
  },
  Wood: {
    productiveCycle: {
      explanation: 'Water produces Wood — introduce Water to strengthen Wood energy',
      remedies: [
        'Place a small water feature or aquarium in the East or Southeast',
        'Use dark blue or black accents in East-facing areas',
        'Display wavy or flowing artwork in wooden spaces',
        'Wear dark blue, black, or deep teal gemstones (sapphire, lapis lazuli)',
        'Keep the East zone well-watered and alive',
      ],
    },
    exhaustiveCycle: {
      explanation: 'Fire exhausts Wood — reduce Fire to stop draining Wood energy',
      remedies: [
        'Reduce candles and bright lighting in the East or Southeast',
        'Avoid red, orange, and pink in Wood-direction zones',
        'Limit triangular, pointed shapes in Wood areas',
        'Replace fire-themed decor with water elements',
      ],
    },
  },
  Fire: {
    productiveCycle: {
      explanation: 'Wood produces Fire — introduce Wood to strengthen Fire energy',
      remedies: [
        'Place live plants or wooden objects in the South area',
        'Use green and brown colors in the South zone',
        'Add vertical or columnar wood pieces to support Fire',
        'Wear green gemstones (emerald, jade) to strengthen Fire',
        'Display healthy, upright plants facing South',
      ],
    },
    exhaustiveCycle: {
      explanation: 'Earth exhausts Fire — reduce Earth to stop draining Fire energy',
      remedies: [
        'Remove ceramic, stone, or earthen objects from the South',
        'Avoid yellow and beige colors in Fire-direction zones',
        'Reduce square shapes and heavy pottery in the South',
        'Replace crystals and stones with wooden pieces',
      ],
    },
  },
  Earth: {
    productiveCycle: {
      explanation: 'Fire produces Earth — introduce Fire to strengthen Earth energy',
      remedies: [
        'Place candles, lamps, or fire symbols in the Centre, Southwest, or Northeast',
        'Use red, orange, or purple accents in Earth-direction spaces',
        'Add triangular or pointed shapes in Earth zones',
        'Wear red, orange, or fire-energy gemstones (ruby, carnelian)',
        'Increase lighting and brightness in Earth-direction areas',
      ],
    },
    exhaustiveCycle: {
      explanation: 'Metal exhausts Earth — reduce Metal to stop draining Earth energy',
      remedies: [
        'Remove excessive metal objects from Centre, Southwest, Northeast zones',
        'Avoid white, silver, and metallic colors in Earth areas',
        'Reduce round or oval metal shapes in Earth zones',
        'Replace metal decor with fire or earth-themed pieces',
      ],
    },
  },
  Metal: {
    productiveCycle: {
      explanation: 'Earth produces Metal — introduce Earth to strengthen Metal energy',
      remedies: [
        'Place crystals, stones, or ceramics in the West or Northwest',
        'Use yellow, beige, and earthy tones in Metal-direction zones',
        'Add square shapes and flat earthenware surfaces',
        'Wear yellow, earthy, or stone-energy gemstones (citrine, tiger eye)',
        'Display ceramic or clay objects near the West',
      ],
    },
    exhaustiveCycle: {
      explanation: 'Water exhausts Metal — reduce Water to stop draining Metal energy',
      remedies: [
        'Remove water features and aquariums from the West or Northwest',
        'Avoid dark blue, black, or navy in Metal-direction zones',
        'Reduce wavy or flowing shapes in Metal areas',
        'Replace water-themed decor with Earth-supporting pieces',
      ],
    },
  },
};

// Number-specific elemental remedies combining the five-element system
export function getElementRemediesForNumber(num: number, isExcessive: boolean) {
  const element = NUMBER_ELEMENT_MAP[num];
  const profile = ELEMENT_PROFILES[element];
  const cycles = ELEMENT_CYCLE_REMEDIES[element];

  if (isExcessive) {
    // Use exhaustive cycle — introduce the element that drains excess
    const drainingElement = profile.exhaustedBy;
    return {
      title: `Balance Excess ${element} Energy (Number ${num})`,
      cycleType: 'Exhaustive Cycle' as const,
      explanation: `Number ${num} carries ${element} energy. ${cycles.exhaustiveCycle.explanation}.`,
      drainingElement,
      remedies: cycles.exhaustiveCycle.remedies,
    };
  } else {
    // Use productive cycle — introduce the parent element to strengthen
    const feedingElement = profile.producedBy;
    return {
      title: `Strengthen ${element} Energy (Number ${num})`,
      cycleType: 'Productive Cycle' as const,
      explanation: `Number ${num} carries ${element} energy. ${cycles.productiveCycle.explanation}.`,
      feedingElement,
      remedies: cycles.productiveCycle.remedies,
    };
  }
}

export const PLANE_INTERPRETATIONS = {
  mental: {
    title: 'Mental Plane (4-9-2)',
    balanced: 'Strong analytical abilities, clear thinking, good decision-making',
    weak: 'Difficulty in analysis, scattered thoughts, poor concentration',
    missing: 'Lacks mental clarity, struggles with logical thinking',
    strong: 'Exceptional intellectual abilities, overthinking tendencies',
  },
  emotional: {
    title: 'Emotional Plane (3-5-7)',
    balanced: 'Emotionally stable, good intuition, balanced relationships',
    weak: 'Emotional instability, sensitivity issues, mood swings',
    missing: 'Emotionally detached, difficulty expressing feelings',
    strong: 'Highly emotional, may be overly sensitive or dramatic',
  },
  practical: {
    title: 'Practical Plane (8-1-6)',
    balanced: 'Good at implementation, practical approach, grounded',
    weak: 'Struggles with practical matters, difficulty in execution',
    missing: 'Impractical, difficulty manifesting ideas into reality',
    strong: 'Highly practical, may be too materialistic or rigid',
  },
  thought: {
    title: 'Thought Plane (4-3-8)',
    balanced: 'Good planning abilities, organized thinking',
    weak: 'Difficulty in planning, disorganized thoughts',
    missing: 'Poor planning skills, acts without thinking',
    strong: 'Excellent planner, may overthink or delay action',
  },
  will: {
    title: 'Will Plane (9-5-1)',
    balanced: 'Strong willpower, determined, focused',
    weak: 'Weak willpower, easily influenced, lacks determination',
    missing: 'Difficulty in persisting, gives up easily',
    strong: 'Extremely strong-willed, may be stubborn or inflexible',
  },
  action: {
    title: 'Action Plane (2-7-6)',
    balanced: 'Takes appropriate action, good at execution',
    weak: 'Difficulty taking action, procrastination',
    missing: 'Rarely takes action, prefers thinking over doing',
    strong: 'Very action-oriented, may act impulsively',
  },
  golden: {
    title: 'Golden Yog (4-5-6)',
    balanced: 'Material success, prosperity, good fortune',
    weak: 'Struggles with material success, financial challenges',
    missing: 'Difficulty achieving material goals',
    strong: 'Great potential for wealth and material success',
  },
  silver: {
    title: 'Silver Yog (2-5-8)',
    balanced: 'Spiritual and material balance, wisdom',
    weak: 'Imbalance between spiritual and material pursuits',
    missing: 'Difficulty finding balance in life',
    strong: 'Strong potential for spiritual and material growth',
  },
};

export const ARROW_INTERPRETATIONS = {
  present: {
    'Arrow of Determination': 'Strong willpower, achieves goals, persistent',
    'Arrow of Intellect': 'Highly intelligent, good memory, analytical',
    'Arrow of Activity': 'Hardworking, practical, organized',
    'Arrow of Spirituality': 'Spiritual inclination, intuitive, balanced',
    'Arrow of Planning': 'Excellent planner, creative thinker',
    'Arrow of Will': 'Strong determination, practical approach',
    'Arrow of Action': 'Action-oriented, ambitious, achieves goals',
    'Arrow of Passivity': 'Calm, patient, thoughtful',
    'Arrow of Balance': 'Balanced personality, intuitive',
    'Arrow of Materialization': 'Manifests ideas into reality, practical success',
  },
  missing: {
    'Arrow of Frustration': 'May face obstacles in achieving material success',
    'Arrow of Hesitation': 'Indecisive, hesitates before taking action',
    'Arrow of Poor Memory': 'Difficulty retaining information, forgetfulness',
    'Arrow of Emotional Sensitivity': 'Emotionally vulnerable, sensitive to criticism',
    'Arrow of Skepticism': 'Doubts self and others, trust issues',
    'Arrow of Confusion': 'Confused about life direction, lacks clarity',
  },
};

export const REMEDIES = {
  missingNumbers: {
    1: [
      'Wear ruby or garnet gemstone',
      'Chant Surya mantra daily',
      'Spend time in sunlight',
      'Practice leadership activities',
      'Use orange or red colors in daily life',
    ],
    2: [
      'Wear pearl or moonstone',
      'Chant Chandra mantra',
      'Practice meditation near water',
      'Develop emotional intelligence',
      'Use white or cream colors',
    ],
    3: [
      'Wear yellow sapphire',
      'Chant Guru mantra',
      'Engage in learning activities',
      'Practice memory exercises',
      'Use yellow colors in environment',
    ],
    4: [
      'Use hessonite garnet',
      'Organize your living space',
      'Practice discipline and routine',
      'Engage in practical tasks',
      'Use brown or earthy tones',
    ],
    5: [
      'Wear emerald',
      'Chant Mercury mantra',
      'Practice balance exercises',
      'Develop communication skills',
      'Use green colors',
    ],
    6: [
      'Wear diamond or white sapphire',
      'Chant Venus mantra',
      'Practice acts of love and service',
      'Develop artistic skills',
      'Use pink or white colors',
    ],
    7: [
      "Use cat's eye gemstone",
      'Practice spiritual activities',
      'Engage in introspection',
      'Study metaphysics',
      'Use violet colors',
    ],
    8: [
      'Wear blue sapphire (with caution)',
      'Chant Shani mantra',
      'Practice patience and discipline',
      'Engage in long-term planning',
      'Use black or dark blue colors',
    ],
    9: [
      'Wear red coral',
      'Chant Mars mantra',
      'Practice physical exercises',
      'Develop courage',
      'Use red colors',
    ],
  },
  excessiveNumbers: {
    1: 'Practice humility, avoid ego, work in teams',
    2: 'Strengthen emotional boundaries, practice assertiveness',
    3: 'Focus thoughts, practice mindfulness, complete tasks',
    4: 'Embrace flexibility, welcome change, think creatively',
    5: 'Develop consistency, practice focus, commit to decisions',
    6: 'Practice detachment, focus on self-care, set boundaries',
    7: 'Engage socially, practice trust, balance solitude',
    8: 'Practice generosity, work-life balance, spiritual activities',
    9: 'Practice patience, anger management, peaceful activities',
  },
  planes: {
    mental: 'Practice meditation, solve puzzles, read regularly, engage in intellectual discussions',
    emotional: 'Practice emotional regulation, journaling, therapy, mindfulness',
    practical: 'Engage in hands-on activities, set practical goals, learn practical skills',
    thought: 'Practice planning, use organizers, think before acting',
    will: 'Set small achievable goals, practice persistence, build discipline',
    action: 'Take small action steps daily, practice decisiveness, avoid overthinking',
    golden: 'Focus on financial planning, develop business skills, practice abundance mindset',
    silver: 'Balance material and spiritual pursuits, practice meditation, charitable activities',
  },
};

export const DIRECTION_RECOMMENDATIONS = {
  1: {
    favorable: ['East', 'North'],
    colors: ['Orange', 'Red', 'Gold'],
    elements: ['Fire', 'Sun'],
  },
  2: {
    favorable: ['North', 'Northeast'],
    colors: ['White', 'Cream', 'Silver'],
    elements: ['Water', 'Moon'],
  },
  3: {
    favorable: ['Northeast', 'East'],
    colors: ['Yellow', 'Gold'],
    elements: ['Ether', 'Space'],
  },
  4: {
    favorable: ['Southwest', 'South'],
    colors: ['Brown', 'Earthy tones'],
    elements: ['Earth', 'Air'],
  },
  5: {
    favorable: ['North', 'East'],
    colors: ['Green', 'Light Blue'],
    elements: ['Air', 'Earth'],
  },
  6: {
    favorable: ['Southeast', 'East'],
    colors: ['Pink', 'White', 'Pastel'],
    elements: ['Water', 'Earth'],
  },
  7: {
    favorable: ['South', 'Southwest'],
    colors: ['Violet', 'White'],
    elements: ['Fire', 'Earth'],
  },
  8: {
    favorable: ['West', 'Southwest'],
    colors: ['Black', 'Dark Blue', 'Navy'],
    elements: ['Earth', 'Metal'],
  },
  9: {
    favorable: ['South', 'East'],
    colors: ['Red', 'Maroon', 'Orange'],
    elements: ['Fire'],
  },
};

export const ELEMENT_REMEDIES = {
  water: {
    element: 'Water',
    enhanceWith: ['Metal (Productive)', 'Water (Supportive)'],
    weakenedBy: ['Earth (Destructive)', 'Wood (Exhaustive)'],
    remedies: [
      'Place water features like fountains or aquariums in the North',
      'Use black, dark blue, or navy colors in decor',
      'Keep metal objects to strengthen Water element',
      'Add flowing, wavy patterns in artwork',
      'Keep the area clean and clutter-free',
    ],
  },
  wood: {
    element: 'Wood',
    enhanceWith: ['Water (Productive)', 'Wood (Supportive)'],
    weakenedBy: ['Metal (Destructive)', 'Fire (Exhaustive)'],
    remedies: [
      'Place plants and wooden furniture in the East or Southeast',
      'Use green, brown, and natural wood tones',
      'Add water elements to strengthen Wood',
      'Use vertical lines and columnar shapes',
      'Keep live plants healthy and thriving',
    ],
  },
  fire: {
    element: 'Fire',
    enhanceWith: ['Wood (Productive)', 'Fire (Supportive)'],
    weakenedBy: ['Water (Destructive)', 'Earth (Exhaustive)'],
    remedies: [
      'Enhance lighting in the South area',
      'Use red, orange, purple, and pink colors',
      'Add candles, lamps, or fire-related imagery',
      'Use triangular and pointed shapes',
      'Display certificates, awards, and recognition',
    ],
  },
  earth: {
    element: 'Earth',
    enhanceWith: ['Fire (Productive)', 'Earth (Supportive)'],
    weakenedBy: ['Wood (Destructive)', 'Metal (Exhaustive)'],
    remedies: [
      'Use crystals, stones, and earthenware in the Centre, Southwest, or Northeast',
      'Apply yellow, beige, brown, and earthy tones',
      'Add ceramic or clay objects',
      'Use square shapes and flat surfaces',
      'Keep the area stable and grounded',
    ],
  },
  metal: {
    element: 'Metal',
    enhanceWith: ['Earth (Productive)', 'Metal (Supportive)'],
    weakenedBy: ['Fire (Destructive)', 'Water (Exhaustive)'],
    remedies: [
      'Place metal objects like bells, coins, or wind chimes in the West or Northwest',
      'Use white, gold, silver, and metallic colors',
      'Add round and oval shapes',
      'Display metal frames and fixtures',
      'Keep the area organized and precise',
    ],
  },
};

export const MISSING_NUMBER_REMEDIES = {
  1: {
    element: 'Fire/Sun',
    weaknesses: ['Lack of confidence', 'Leadership challenges', 'Self-identity issues'],
    remedies: [
      'Meditate facing East during sunrise',
      'Wear ruby or red gemstones',
      'Use the number 1 in important decisions',
      'Practice leadership roles in small groups',
      'Strengthen Fire element in your environment',
    ],
  },
  2: {
    element: 'Water/Moon',
    weaknesses: ['Emotional instability', 'Relationship difficulties', 'Sensitivity issues'],
    remedies: [
      'Meditate on Monday or during full moon',
      'Wear pearl or moonstone',
      'Use the number 2 in phone numbers or addresses',
      'Practice patience and emotional balance',
      'Strengthen Water element in your space',
    ],
  },
  3: {
    element: 'Ether/Jupiter',
    weaknesses: ['Communication problems', 'Lack of creativity', 'Spiritual disconnect'],
    remedies: [
      'Meditate on Thursdays',
      'Wear yellow sapphire or citrine',
      'Express yourself through writing or speaking',
      'Study spiritual texts',
      'Strengthen Wood element to support growth',
    ],
  },
  4: {
    element: 'Earth/Rahu',
    weaknesses: ['Instability', 'Confusion', 'Lack of grounding'],
    remedies: [
      'Meditate during Rahu kaal (specific times)',
      'Wear hessonite garnet',
      'Practice grounding exercises',
      'Maintain stable routines',
      'Strengthen Earth element for stability',
    ],
  },
  5: {
    element: 'Earth/Mercury',
    weaknesses: ['Communication issues', 'Analytical problems', 'Mental stress'],
    remedies: [
      'Meditate on Wednesdays',
      'Wear emerald or green gemstones',
      'Engage in intellectual activities',
      'Practice clear communication',
      'Balance Earth element in your surroundings',
    ],
  },
  6: {
    element: 'Water/Venus',
    weaknesses: ['Relationship challenges', 'Artistic blocks', 'Material struggles'],
    remedies: [
      'Meditate on Fridays',
      'Wear diamond or white sapphire',
      'Cultivate beauty in your environment',
      'Practice gratitude and love',
      'Enhance Water and Metal elements',
    ],
  },
  7: {
    element: 'Fire/Ketu',
    weaknesses: ['Spiritual confusion', 'Isolation', 'Lack of intuition'],
    remedies: [
      'Meditate during Ketu kaal',
      "Wear cat's eye gemstone",
      'Practice spiritual disciplines',
      'Spend time in introspection',
      'Balance Fire element with Earth',
    ],
  },
  8: {
    element: 'Earth/Saturn',
    weaknesses: ['Delays and obstacles', 'Hard work without reward', 'Discipline issues'],
    remedies: [
      'Meditate on Saturdays',
      'Wear blue sapphire (with caution) or amethyst',
      'Practice patience and perseverance',
      'Help those less fortunate',
      'Strengthen Earth element with Fire support',
    ],
  },
  9: {
    element: 'Fire/Mars',
    weaknesses: ['Anger issues', 'Lack of courage', 'Aggression or passivity'],
    remedies: [
      'Meditate on Tuesdays',
      'Wear red coral or carnelian',
      'Practice physical exercise',
      'Channel energy constructively',
      'Balance Fire element with Water',
    ],
  },
};
