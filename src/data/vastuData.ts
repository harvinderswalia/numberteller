// ─── VASTU SHASTRA DATA ────────────────────────────────────────────────────

export type VastuDirection =
  | 'N' | 'NNE' | 'NE' | 'ENE' | 'E' | 'ESE' | 'SE' | 'SSE'
  | 'S' | 'SSW' | 'SW' | 'WSW' | 'W' | 'WNW' | 'NW' | 'NNW';

export interface DirectionZone {
  code: VastuDirection;
  name: string;
  degrees: [number, number]; // start, end
  element: string;
  planet: string;
  devta: string;
  quality: string;
  idealFor: string[];
  avoidFor: string[];
  color: string; // tailwind
  energy: string;
}

export const DIRECTION_ZONES: DirectionZone[] = [
  {
    code: 'N', name: 'North', degrees: [337.5, 22.5],
    element: 'Water', planet: 'Mercury/Budh', devta: 'Kubera (Lord of Wealth)',
    quality: 'Wealth, Prosperity, New Opportunities',
    idealFor: ['Living room', 'Home office', 'Treasury/Safe', 'Main entrance (secondary)'],
    avoidFor: ['Kitchen', 'Septic tank', 'Heavy storage'],
    color: 'text-blue-400', energy: 'Magnetic North — draws prosperity and career opportunities',
  },
  {
    code: 'NNE', name: 'North-North-East', degrees: [22.5, 45],
    element: 'Water', planet: 'Moon/Chandra', devta: 'Shiva (Transformation)',
    quality: 'Health, Healing, Mental Clarity',
    idealFor: ['Meditation space', 'Prayer room extension', 'Children\'s study'],
    avoidFor: ['Toilet', 'Kitchen', 'Staircase'],
    color: 'text-blue-300', energy: 'Purifying energy — supports physical and mental wellbeing',
  },
  {
    code: 'NE', name: 'North-East (Ishan)', degrees: [45, 67.5],
    element: 'Space/Akash', planet: 'Jupiter/Guru', devta: 'Ishan/Shiva (Divine Wisdom)',
    quality: 'Spirituality, Wisdom, Blessings, Divine Grace',
    idealFor: ['Prayer room', 'Meditation corner', 'Water body', 'Main entrance (ideal)'],
    avoidFor: ['Toilet', 'Kitchen', 'Master bedroom', 'Heavy walls', 'Stairs'],
    color: 'text-cyan-400', energy: 'Most sacred corner — governs divine blessings and spiritual clarity',
  },
  {
    code: 'ENE', name: 'East-North-East', degrees: [67.5, 90],
    element: 'Air', planet: 'Jupiter/Guru', devta: 'Parjanya (Rain God)',
    quality: 'Social connections, Auspicious events',
    idealFor: ['Guest room', 'Dining', 'Bathroom (not toilet)'],
    avoidFor: ['Toilet', 'Heavy storage'],
    color: 'text-cyan-300', energy: 'Social and auspicious energy — supports positive events',
  },
  {
    code: 'E', name: 'East', degrees: [90, 112.5],
    element: 'Air', planet: 'Sun/Surya', devta: 'Indra (King of Gods)',
    quality: 'Growth, Fame, Social Standing, Morning Energy',
    idealFor: ['Main entrance', 'Living room', 'Children\'s room', 'Windows'],
    avoidFor: ['Toilet', 'Master bedroom wall'],
    color: 'text-yellow-400', energy: 'Solar energy — brings name, fame and vitality',
  },
  {
    code: 'ESE', name: 'East-South-East', degrees: [112.5, 135],
    element: 'Fire', planet: 'Venus/Shukra', devta: 'Anil (Wind God)',
    quality: 'Confidence, Intelligence, Digestion',
    idealFor: ['Study room', 'Bathroom'],
    avoidFor: ['Bedroom', 'Main entrance'],
    color: 'text-yellow-300', energy: 'Confidence and intelligence boosting zone',
  },
  {
    code: 'SE', name: 'South-East (Agneya)', degrees: [135, 157.5],
    element: 'Fire', planet: 'Venus/Shukra', devta: 'Agni (Fire God)',
    quality: 'Energy, Passion, Transformation, Cooking',
    idealFor: ['Kitchen', 'Power/electrical equipment', 'Generator'],
    avoidFor: ['Master bedroom', 'Prayer room', 'Water body', 'Main entrance'],
    color: 'text-orange-400', energy: 'Agni corner — governs vitality, digestion and financial transformation',
  },
  {
    code: 'SSE', name: 'South-South-East', degrees: [157.5, 180],
    element: 'Fire', planet: 'Mars/Mangal', devta: 'Vitatha (Transformation)',
    quality: 'Success through effort, Competition',
    idealFor: ['Storage', 'Garage', 'Gym'],
    avoidFor: ['Master bedroom (main)', 'Prayer room'],
    color: 'text-orange-300', energy: 'Competitive fire — drives achievement through hard work',
  },
  {
    code: 'S', name: 'South', degrees: [180, 202.5],
    element: 'Earth', planet: 'Mars/Mangal', devta: 'Yama (Dharma)',
    quality: 'Karma, Prosperity (when strong), Discipline',
    idealFor: ['Master bedroom', 'Heavy storage', 'Stairs going up'],
    avoidFor: ['Main entrance', 'Prayer room', 'Water features'],
    color: 'text-red-400', energy: 'Yama zone — karmic energy, must be strong and heavy',
  },
  {
    code: 'SSW', name: 'South-South-West', degrees: [202.5, 225],
    element: 'Earth', planet: 'Saturn/Shani', devta: 'Grahakshata (Keeper)',
    quality: 'Character, Relationships, Disposal',
    idealFor: ['Store room', 'Utility'],
    avoidFor: ['Main entrance', 'Children\'s room'],
    color: 'text-red-300', energy: 'Character and disposal energy',
  },
  {
    code: 'SW', name: 'South-West (Nairitya)', degrees: [225, 247.5],
    element: 'Earth', planet: 'Saturn/Shani (Rahu)', devta: 'Nairita/Nirrti (Stability)',
    quality: 'Stability, Relationships, Longevity, Leadership',
    idealFor: ['Master bedroom', 'Heavy furniture', 'Stairs', 'Safe/locker', 'Owner\'s room'],
    avoidFor: ['Main entrance', 'Prayer room', 'Water body', 'Toilet opening'],
    color: 'text-amber-600', energy: 'Stability corner — anchors the entire property, must be heaviest',
  },
  {
    code: 'WSW', name: 'West-South-West', degrees: [247.5, 270],
    element: 'Earth', planet: 'Saturn/Shani', devta: 'Duwarika (Keeper of Education)',
    quality: 'Education, Analysis, Scientific thinking',
    idealFor: ['Study room', 'Library', 'Children\'s bedroom'],
    avoidFor: ['Kitchen', 'Prayer room'],
    color: 'text-amber-500', energy: 'Knowledge and analytical energy zone',
  },
  {
    code: 'W', name: 'West', degrees: [270, 292.5],
    element: 'Air', planet: 'Saturn/Shani', devta: 'Varuna (Lord of Water & Cosmic Order)',
    quality: 'Gains, Returns, Profits, Sunset Energy',
    idealFor: ['Dining room', 'Children\'s bedroom', 'Guest room'],
    avoidFor: ['Prayer room (main)', 'Kitchen'],
    color: 'text-slate-400', energy: 'Varuna zone — governs returns on investments and efforts',
  },
  {
    code: 'WNW', name: 'West-North-West', degrees: [292.5, 315],
    element: 'Air', planet: 'Moon/Chandra', devta: 'Roga (Health)',
    quality: 'Change, Mental activity, Short trips',
    idealFor: ['Guest bedroom', 'Study room'],
    avoidFor: ['Master bedroom', 'Prayer room'],
    color: 'text-slate-300', energy: 'Mental activity and travel zone',
  },
  {
    code: 'NW', name: 'North-West (Vayavya)', degrees: [315, 337.5],
    element: 'Air', planet: 'Moon/Chandra', devta: 'Vayu (Wind God)',
    quality: 'Support, Banking, Business help, Movement',
    idealFor: ['Guest room', 'Bathroom', 'Garage', 'Banking/finance room'],
    avoidFor: ['Master bedroom', 'Owner\'s cabin (business)'],
    color: 'text-teal-400', energy: 'Vayu corner — brings helpful support, banking and business aid',
  },
  {
    code: 'NNW', name: 'North-North-West', degrees: [315, 337.5],
    element: 'Air', planet: 'Moon/Chandra', devta: 'Naga (Serpent Power)',
    quality: 'Attraction, Desire, Sensual energy',
    idealFor: ['Guest bedroom', 'Bathroom'],
    avoidFor: ['Children\'s study', 'Prayer room'],
    color: 'text-teal-300', energy: 'Attraction and magnetism energy',
  },
];

// ─── VASTU DOSHAS ──────────────────────────────────────────────────────────

export type DoshaSeverity = 'mild' | 'moderate' | 'severe';

export interface VastuDosha {
  id: string;
  name: string;
  zone: VastuDirection;
  category: 'placement' | 'structural' | 'elemental' | 'entrance' | 'slope';
  severity: DoshaSeverity;
  devtaDisturbed: string;
  effect: string;
  lifeArea: string[];
  shortDescription: string;
}

export const ALL_DOSHAS: VastuDosha[] = [
  // NE Doshas
  { id: 'ne-toilet', name: 'Toilet in NE (Ishan)', zone: 'NE', category: 'placement', severity: 'severe', devtaDisturbed: 'Ishan/Shiva', effect: 'Blocks divine blessings, causes financial losses, mental stress, spiritual disconnect', lifeArea: ['finances', 'spirituality', 'health', 'mental clarity'], shortDescription: 'Toilet in the sacred Ishan corner — most severe dosha' },
  { id: 'ne-kitchen', name: 'Kitchen in NE', zone: 'NE', category: 'placement', severity: 'severe', devtaDisturbed: 'Ishan/Shiva', effect: 'Agni energy pollutes the sacred space, causing health issues, legal problems, spiritual blockage', lifeArea: ['health', 'spirituality', 'finances'], shortDescription: 'Fire element in divine water/space zone' },
  { id: 'ne-master-bed', name: 'Master Bedroom in NE', zone: 'NE', category: 'placement', severity: 'moderate', devtaDisturbed: 'Ishan/Shiva', effect: 'Unstable sleep, relationship conflicts, health issues for couple', lifeArea: ['relationships', 'health', 'sleep'], shortDescription: 'Heavy bedroom energy disturbs the spiritual NE' },
  { id: 'ne-cut', name: 'Missing/Cut NE Corner', zone: 'NE', category: 'structural', severity: 'severe', devtaDisturbed: 'Ishan/Shiva', effect: 'Severe financial losses, health deterioration, spiritual blockage, family conflicts', lifeArea: ['finances', 'health', 'family', 'spirituality'], shortDescription: 'Truncated NE corner — cuts divine energy' },
  { id: 'ne-heavy-wall', name: 'Heavy/Tall Wall in NE', zone: 'NE', category: 'structural', severity: 'moderate', devtaDisturbed: 'Parjanya', effect: 'Blocks positive energy inflow, slows growth and opportunities', lifeArea: ['growth', 'opportunities', 'finances'], shortDescription: 'Heavy NE wall blocks incoming positive energy' },

  // SE Doshas
  { id: 'se-water', name: 'Water Body in SE', zone: 'SE', category: 'elemental', severity: 'severe', devtaDisturbed: 'Agni', effect: 'Extinguishes the fire element, causing financial loss, health issues, loss of vitality', lifeArea: ['finances', 'health', 'energy'], shortDescription: 'Water conflicts with Agni (fire) in SE' },
  { id: 'se-master-bed', name: 'Master Bedroom in SE', zone: 'SE', category: 'placement', severity: 'moderate', devtaDisturbed: 'Agni', effect: 'Relationship conflicts, anger issues, health problems, unstable sleep', lifeArea: ['relationships', 'health', 'temper'], shortDescription: 'Fire energy causes relationship heat and conflict' },
  { id: 'se-entrance', name: 'Main Entrance in SE', zone: 'SE', category: 'entrance', severity: 'moderate', devtaDisturbed: 'Agni', effect: 'Financial instability, arguments at home, health issues', lifeArea: ['finances', 'family harmony', 'health'], shortDescription: 'SE entrance draws instability and arguments' },

  // SW Doshas
  { id: 'sw-entrance', name: 'Main Entrance in SW', zone: 'SW', category: 'entrance', severity: 'severe', devtaDisturbed: 'Nairita', effect: 'Severe instability, accidents, legal troubles, relationship breakdown, financial ruin', lifeArea: ['stability', 'finances', 'relationships', 'safety'], shortDescription: 'Worst entrance placement — invites Nirrti energy inside' },
  { id: 'sw-toilet', name: 'Toilet in SW', zone: 'SW', category: 'placement', severity: 'severe', devtaDisturbed: 'Nairita', effect: 'Relationship instability, health crises, financial losses, accidents', lifeArea: ['relationships', 'health', 'finances', 'stability'], shortDescription: 'SW toilet drains stability and relationship energy' },
  { id: 'sw-cut', name: 'Missing/Cut SW Corner', zone: 'SW', category: 'structural', severity: 'severe', devtaDisturbed: 'Nairita', effect: 'Extreme instability, accidents, relationship collapse, financial ruin', lifeArea: ['stability', 'relationships', 'finances', 'health'], shortDescription: 'Cut SW — no anchoring energy for the property' },
  { id: 'sw-open', name: 'SW Lower than Rest of Property', zone: 'SW', category: 'slope', severity: 'moderate', devtaDisturbed: 'Nairita', effect: 'Financial drain, instability, difficulty in holding gains', lifeArea: ['finances', 'stability'], shortDescription: 'Low SW drains wealth and stability southward' },

  // S Doshas
  { id: 's-entrance', name: 'Main Entrance in South', zone: 'S', category: 'entrance', severity: 'severe', devtaDisturbed: 'Yama', effect: 'Health crises, accidents, karmic difficulties, chronic illness', lifeArea: ['health', 'karma', 'longevity'], shortDescription: 'South entrance activates Yama — mortality energy' },
  { id: 's-open', name: 'South Open/No Wall', zone: 'S', category: 'structural', severity: 'moderate', devtaDisturbed: 'Yama', effect: 'Financial drain, health issues, instability', lifeArea: ['finances', 'health', 'stability'], shortDescription: 'Weak south boundary creates energy drain' },

  // N Doshas
  { id: 'n-heavy-wall', name: 'Heavy/Tall Wall in North', zone: 'N', category: 'structural', severity: 'moderate', devtaDisturbed: 'Kubera', effect: 'Blocks wealth and career opportunities, financial stagnation', lifeArea: ['wealth', 'career', 'opportunities'], shortDescription: 'Blocks Kubera\'s wealth energy from entering' },
  { id: 'n-toilet', name: 'Toilet in North', zone: 'N', category: 'placement', severity: 'moderate', devtaDisturbed: 'Kubera', effect: 'Financial leakage, career setbacks, wealth flowing out', lifeArea: ['finances', 'career', 'wealth'], shortDescription: 'Toilet in North flushes away Kubera\'s blessings' },

  // Brahmasthan
  { id: 'bs-toilet', name: 'Toilet in Brahmasthan (Center)', zone: 'N', category: 'placement', severity: 'severe', devtaDisturbed: 'Brahma', effect: 'Disrupts entire property energy, affects all life areas simultaneously', lifeArea: ['health', 'finances', 'relationships', 'spirituality'], shortDescription: 'Center toilet — disrupts the soul of the property' },
  { id: 'bs-staircase', name: 'Staircase in Brahmasthan', zone: 'N', category: 'structural', severity: 'severe', devtaDisturbed: 'Brahma', effect: 'Endless upward struggle, heavy overhead burden, health and financial decline', lifeArea: ['all areas'], shortDescription: 'Central staircase depletes the navel of the property' },
  { id: 'bs-heavy-column', name: 'Heavy Column/Pillar in Center', zone: 'N', category: 'structural', severity: 'moderate', devtaDisturbed: 'Brahma', effect: 'Creates pressure and blocks natural energy flow through the space', lifeArea: ['health', 'finances', 'clarity'], shortDescription: 'Heavy load at the heart of the property' },

  // E Doshas
  { id: 'e-heavy-wall', name: 'Heavy/Tall Wall in East', zone: 'E', category: 'structural', severity: 'moderate', devtaDisturbed: 'Indra', effect: 'Blocks solar energy, reduces name and fame, health deterioration', lifeArea: ['fame', 'health', 'growth'], shortDescription: 'East heavy wall blocks Indra and solar vitality' },
  { id: 'e-toilet', name: 'Toilet in East', zone: 'E', category: 'placement', severity: 'moderate', devtaDisturbed: 'Indra', effect: 'Social setbacks, health issues, reputation damage', lifeArea: ['fame', 'health', 'social'], shortDescription: 'East toilet diminishes name, fame and social standing' },

  // NW Doshas
  { id: 'nw-kitchen', name: 'Kitchen in NW', zone: 'NW', category: 'placement', severity: 'mild', devtaDisturbed: 'Vayu', effect: 'Mild financial instability, guests/visitors creating drain', lifeArea: ['finances', 'support'], shortDescription: 'NW kitchen creates mild support instability' },

  // Slope doshas
  { id: 'slope-sw-high', name: 'Property Slopes Down NE to SW', zone: 'SW', category: 'slope', severity: 'moderate', devtaDisturbed: 'Nairita', effect: 'Energy drains toward instability, financial losses', lifeArea: ['finances', 'stability'], shortDescription: 'Wrong slope — energy flows to unstable SW' },
  { id: 'slope-ne-high', name: 'Property Slopes Down SW to NE', zone: 'NE', category: 'slope', severity: 'mild', devtaDisturbed: 'None', effect: 'Positive slope — auspicious energy flows toward divine NE', lifeArea: [], shortDescription: 'Auspicious slope — positive energy flows to NE (good)' },
];

// ─── 45 DEVTAS OF VASTU PURUSHA MANDALA ───────────────────────────────────

export interface Devta {
  id: number;
  name: string;
  domain: string;
  zone: string;
  padaPosition: string;
  affectedAreas: string[];
  offeringRemedy: string;
}

export const VASTU_DEVTAS: Devta[] = [
  { id: 1, name: 'Isa (Shiva)', domain: 'Divine wisdom, spirituality, liberation', zone: 'NE', padaPosition: 'Corner NE', affectedAreas: ['spirituality', 'wisdom', 'liberation'], offeringRemedy: 'White flowers, milk offering, Shiva mantra' },
  { id: 2, name: 'Parjanya', domain: 'Rain, fertility, abundance', zone: 'ENE', padaPosition: 'N-NE boundary', affectedAreas: ['prosperity', 'fertility', 'abundance'], offeringRemedy: 'Blue flowers, water offering, Varuna mantra' },
  { id: 3, name: 'Jayanta', domain: 'Victory, success', zone: 'NNE', padaPosition: 'N-E inner', affectedAreas: ['victory', 'success', 'competition'], offeringRemedy: 'Yellow flowers, honey offering' },
  { id: 4, name: 'Mahendra (Indra)', domain: 'Kingship, leadership, rain', zone: 'E', padaPosition: 'E boundary center', affectedAreas: ['leadership', 'fame', 'authority'], offeringRemedy: 'White rice, Indra mantra, east-facing prayer' },
  { id: 5, name: 'Surya', domain: 'Sun, vitality, health, fame', zone: 'E', padaPosition: 'E center-south', affectedAreas: ['health', 'vitality', 'fame'], offeringRemedy: 'Red flowers, Surya namaskar, copper vessel with water' },
  { id: 6, name: 'Satya', domain: 'Truth, integrity', zone: 'ESE', padaPosition: 'E-SE boundary', affectedAreas: ['integrity', 'truth', 'trust'], offeringRemedy: 'White candles, truth mantra' },
  { id: 7, name: 'Bhrisha', domain: 'Strength, power', zone: 'ESE', padaPosition: 'SE inner', affectedAreas: ['physical strength', 'power'], offeringRemedy: 'Red flowers, physical exercise dedicated to Bhrisha' },
  { id: 8, name: 'Agni', domain: 'Fire, transformation, purification', zone: 'SE', padaPosition: 'SE corner', affectedAreas: ['transformation', 'finances', 'vitality', 'digestion'], offeringRemedy: 'Ghee lamp, Agni mantra, red/orange in SE' },
  { id: 9, name: 'Pusha', domain: 'Nourishment, care', zone: 'SSE', padaPosition: 'S-SE boundary', affectedAreas: ['nourishment', 'care', 'growth'], offeringRemedy: 'Food offering, nurturing practices' },
  { id: 10, name: 'Vitatha', domain: 'Music, arts, creativity', zone: 'SSE', padaPosition: 'S inner', affectedAreas: ['creativity', 'arts', 'expression'], offeringRemedy: 'Musical instrument dedication, creative arts' },
  { id: 11, name: 'Grihakshata', domain: 'Physical body, health maintenance', zone: 'S', padaPosition: 'S boundary center', affectedAreas: ['physical health', 'body', 'maintenance'], offeringRemedy: 'Physical fitness, health practices, red cloth' },
  { id: 12, name: 'Yama', domain: 'Dharma, law, karma, death', zone: 'S', padaPosition: 'S center-west', affectedAreas: ['karma', 'dharma', 'law', 'health'], offeringRemedy: 'Dharmic action, black sesame offering, Saturn mantra' },
  { id: 13, name: 'Gandharva', domain: 'Music, sensuality, beauty', zone: 'SSW', padaPosition: 'S-SW boundary', affectedAreas: ['beauty', 'romance', 'arts'], offeringRemedy: 'Perfume, music, beautiful objects' },
  { id: 14, name: 'Bhringaraj', domain: 'Hair, beauty, luxury', zone: 'SSW', padaPosition: 'SW inner', affectedAreas: ['luxury', 'beauty', 'wellness'], offeringRemedy: 'Oil offerings, self-care rituals' },
  { id: 15, name: 'Nairita (Nirrti)', domain: 'Dissolution, obstacles, stability', zone: 'SW', padaPosition: 'SW corner', affectedAreas: ['stability', 'obstacles', 'relationships'], offeringRemedy: 'Black cloth offering, Durga mantra, heavy objects in SW' },
  { id: 16, name: 'Dauvarika', domain: 'Doorkeeper, protection', zone: 'WSW', padaPosition: 'W-SW boundary', affectedAreas: ['protection', 'security', 'boundaries'], offeringRemedy: 'Door deity worship, protective yantras at entrance' },
  { id: 17, name: 'Sugriva', domain: 'Research, analysis, depth', zone: 'WSW', padaPosition: 'W inner', affectedAreas: ['research', 'analysis', 'education'], offeringRemedy: 'Books, knowledge offerings' },
  { id: 18, name: 'Pushpadanta', domain: 'Teeth, speech, communication', zone: 'W', padaPosition: 'W boundary center', affectedAreas: ['speech', 'communication', 'teeth'], offeringRemedy: 'Communication practices, white flowers' },
  { id: 19, name: 'Varuna', domain: 'Water, cosmic order, law', zone: 'W', padaPosition: 'W center-north', affectedAreas: ['water element', 'finances', 'cosmic order'], offeringRemedy: 'Water offering, Varuna mantra, blue cloth' },
  { id: 20, name: 'Asura', domain: 'Demons, shadow forces', zone: 'WNW', padaPosition: 'W-NW boundary', affectedAreas: ['shadow work', 'obstacles'], offeringRemedy: 'Protective mantras, Hanuman stotra' },
  { id: 21, name: 'Shosha', domain: 'Drying, purification', zone: 'WNW', padaPosition: 'NW inner', affectedAreas: ['purification', 'drying excess'], offeringRemedy: 'Salt lamps, drying/purifying rituals' },
  { id: 22, name: 'Vayu', domain: 'Wind, movement, breath, lungs', zone: 'NW', padaPosition: 'NW corner', affectedAreas: ['movement', 'support', 'breath', 'travel'], offeringRemedy: 'Wind chimes, Vayu mantra, open NW for air flow' },
  { id: 23, name: 'Naga', domain: 'Serpent power, kundalini', zone: 'NNW', padaPosition: 'N-NW boundary', affectedAreas: ['kundalini', 'hidden power', 'sexuality'], offeringRemedy: 'Naga Panchami rituals, serpent yantra' },
  { id: 24, name: 'Mukhya', domain: 'Main energy, principal force', zone: 'N', padaPosition: 'N boundary center', affectedAreas: ['main energy', 'opportunities'], offeringRemedy: 'Main entry maintenance, Kubera yantra' },
  { id: 25, name: 'Bhallata', domain: 'Strength, fortune', zone: 'N', padaPosition: 'N center-east', affectedAreas: ['fortune', 'strength'], offeringRemedy: 'Green plants in North, Mercury mantra' },
  { id: 26, name: 'Soma (Kubera)', domain: 'Wealth, treasure, abundance', zone: 'N', padaPosition: 'N-NE boundary', affectedAreas: ['wealth', 'treasury', 'abundance'], offeringRemedy: 'Kubera yantra, green items, Mercury stone' },
  // Central Devtas
  { id: 27, name: 'Brahma', domain: 'Creation, cosmic order, center', zone: 'Center', padaPosition: 'Brahmasthan (center 9 padas)', affectedAreas: ['all life areas', 'overall harmony'], offeringRemedy: 'Keep center open, Brahma mantra, no heavy load at center' },
  { id: 28, name: 'Aryama', domain: 'Social contracts, friendships', zone: 'Center-NE', padaPosition: 'Inner NE', affectedAreas: ['friendships', 'social bonds'], offeringRemedy: 'Social harmony practices' },
  { id: 29, name: 'Vivasvan', domain: 'Light, clarity, understanding', zone: 'Center-E', padaPosition: 'Inner E', affectedAreas: ['clarity', 'understanding', 'light'], offeringRemedy: 'East-facing windows, natural light' },
  { id: 30, name: 'Mitra', domain: 'Friendship, alliances, sun deity', zone: 'Center-SE', padaPosition: 'Inner SE', affectedAreas: ['alliances', 'partnerships', 'support'], offeringRemedy: 'Partnership altars, orange flowers' },
  { id: 31, name: 'Indra', domain: 'Power, thunder, rainfall', zone: 'E', padaPosition: 'E center pada', affectedAreas: ['power', 'authority', 'vitality'], offeringRemedy: 'Indra mantra, east-facing activities' },
  { id: 32, name: 'Rudra', domain: 'Destruction and healing', zone: 'NE-Center', padaPosition: 'Inner NE-Center', affectedAreas: ['healing', 'transformation'], offeringRemedy: 'Rudra abhishek, Shiva mantra' },
];

// ─── REMEDY DATABASE ───────────────────────────────────────────────────────

export type RemedyType = 'non-structural' | 'structural';
export type RemedyCategory = 'yantra' | 'color' | 'plant' | 'crystal' | 'element' | 'mantra' | 'structural-fix' | 'furniture';

export interface VastuRemedy {
  id: string;
  doshId: string;
  type: RemedyType;
  category: RemedyCategory;
  title: string;
  description: string;
  effectiveness: number; // 0-100
  budget: 'low' | 'medium' | 'high';
  timeToEffect: string;
  instructions: string;
}

export const REMEDY_DATABASE: VastuRemedy[] = [
  // NE Toilet remedies
  { id: 'ne-toilet-1', doshId: 'ne-toilet', type: 'non-structural', category: 'yantra', title: 'Shri Yantra in NE', description: 'Place a copper or gold Shri Yantra on the wall outside the toilet facing the NE', effectiveness: 70, budget: 'low', timeToEffect: '1–3 months', instructions: 'Energise the yantra on a full moon, place at eye level on NE wall facing inward. Recite Om Shrim Hreem Shreem 108 times.' },
  { id: 'ne-toilet-2', doshId: 'ne-toilet', type: 'non-structural', category: 'crystal', title: 'Crystal Pyramid in NE Bathroom', description: 'Place a 3-inch clear quartz pyramid in the NE corner of the bathroom pointing upward', effectiveness: 55, budget: 'low', timeToEffect: '1–2 months', instructions: 'Cleanse crystal with Ganga jal, place in NE corner of bathroom. Replace every 6 months.' },
  { id: 'ne-toilet-3', doshId: 'ne-toilet', type: 'non-structural', category: 'plant', title: 'Tulsi Plant at NE', description: 'Place a living Tulsi (Holy Basil) plant just outside the NE toilet door', effectiveness: 60, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Keep Tulsi in a copper or clay pot. Water daily, avoid Sundays and Ekadashi. Pray before watering.' },
  { id: 'ne-toilet-4', doshId: 'ne-toilet', type: 'structural', category: 'structural-fix', title: 'Relocate Toilet', description: 'If renovation is possible, relocate toilet to NW, W, or SE zone', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Preferred new locations in order: NW, W, S, SE. Avoid NE, N, NNE, ENE.' },
  { id: 'ne-toilet-5', doshId: 'ne-toilet', type: 'non-structural', category: 'element', title: 'Sea Salt Bowl', description: 'Keep a bowl of sea salt in NE bathroom, change every 15 days', effectiveness: 45, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Use pure sea salt (not iodized). Place in a copper or glass bowl. Do not reuse — discard in flowing water.' },

  // NE Kitchen remedies
  { id: 'ne-kitchen-1', doshId: 'ne-kitchen', type: 'non-structural', category: 'yantra', title: 'Agni Yantra in SE of Kitchen', description: 'Place Agni Yantra in SE corner of the NE kitchen to rebalance fire energy', effectiveness: 65, budget: 'low', timeToEffect: '1–2 months', instructions: 'Place copper Agni Yantra on SE wall of kitchen. Light a ghee lamp beside it daily.' },
  { id: 'ne-kitchen-2', doshId: 'ne-kitchen', type: 'non-structural', category: 'color', title: 'Blue/Green Color Therapy', description: 'Paint kitchen walls in blue-green tones to counterbalance fire with water/earth', effectiveness: 50, budget: 'low', timeToEffect: '1–3 months', instructions: 'Use sage green, aqua, or light blue for walls. Avoid red, orange, or yellow in this kitchen.' },
  { id: 'ne-kitchen-3', doshId: 'ne-kitchen', type: 'structural', category: 'structural-fix', title: 'Relocate Kitchen to SE', description: 'Move kitchen to SE (ideal) or NW (acceptable alternative)', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Ideal kitchen locations: SE (best), NW (second best). Avoid NE, SW, NE corner.' },

  // SW Entrance remedies
  { id: 'sw-entrance-1', doshId: 'sw-entrance', type: 'non-structural', category: 'yantra', title: 'Vastu Purusha Yantra at Entrance', description: 'Place a Vastu Purusha Yantra on the inside wall of the SW entrance', effectiveness: 75, budget: 'medium', timeToEffect: '1–3 months', instructions: 'Energise yantra on a Saturday. Place at eye level on the inside wall facing outward to push away Nirrti energy.' },
  { id: 'sw-entrance-2', doshId: 'sw-entrance', type: 'non-structural', category: 'element', title: 'Heavy Threshold & Pyramid', description: 'Place a heavy stone threshold at the SW entrance + copper pyramid above the door', effectiveness: 65, budget: 'medium', timeToEffect: '2–4 weeks', instructions: 'Black granite or heavy stone threshold. Copper pyramid (3-inch) fixed above door frame pointing upward.' },
  { id: 'sw-entrance-3', doshId: 'sw-entrance', type: 'structural', category: 'structural-fix', title: 'Create Secondary Entrance', description: 'Create a new main entrance in North or East, demote SW to secondary entrance only', effectiveness: 95, budget: 'high', timeToEffect: 'Immediate', instructions: 'Best entrance: N, NE, E, NNE. Use SW door only for utility access, not as main entry.' },

  // S Entrance remedies
  { id: 's-entrance-1', doshId: 's-entrance', type: 'non-structural', category: 'yantra', title: 'Hanuman Yantra/Image at South Door', description: 'Place a large Hanuman image or yantra on the south-facing door', effectiveness: 70, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Hanuman faces south in his powerful form. Place on the inside of the south door. Recite Hanuman Chalisa weekly.' },
  { id: 's-entrance-2', doshId: 's-entrance', type: 'non-structural', category: 'crystal', title: 'Black Tourmaline at South Entry', description: 'Place 4 pieces of black tourmaline at the four corners of the south entrance', effectiveness: 60, budget: 'low', timeToEffect: '1–2 months', instructions: 'Bury or place black tourmaline stones at corners of south door. Cleanse under sunlight monthly.' },

  // N Heavy Wall
  { id: 'n-wall-1', doshId: 'n-heavy-wall', type: 'non-structural', category: 'yantra', title: 'Kubera Yantra on North Wall', description: 'Place a Kubera Yantra on the north wall to activate wealth energy despite the wall', effectiveness: 75, budget: 'low', timeToEffect: '1–3 months', instructions: 'Place copper Kubera yantra at eye level on north wall. Offer green mung beans and coins. Mercury/Wednesday activation.' },
  { id: 'n-wall-2', doshId: 'n-heavy-wall', type: 'non-structural', category: 'plant', title: 'Money Plant / Lucky Bamboo in North', description: 'Place a thriving money plant or 4-stalk lucky bamboo in the north zone', effectiveness: 60, budget: 'low', timeToEffect: '3–6 weeks', instructions: 'Keep north zone green and alive. Money plant in water (copper vessel). Lucky bamboo in north direction.' },
  { id: 'n-wall-3', doshId: 'n-heavy-wall', type: 'non-structural', category: 'color', title: 'Green/Blue Colors in North', description: 'Paint the north wall in green or blue to activate Mercury/water energy', effectiveness: 50, budget: 'low', timeToEffect: '1–3 months', instructions: 'Use emerald green, royal blue, or aqua. Avoid red/orange/brown on north wall.' },

  // BS Staircase
  { id: 'bs-staircase-1', doshId: 'bs-staircase', type: 'non-structural', category: 'yantra', title: 'Brahma Yantra at Brahmasthan', description: 'Consecrate a Brahma Yantra in the center zone to restore balance', effectiveness: 70, budget: 'medium', timeToEffect: '1–3 months', instructions: 'Place under the staircase landing if accessible. Alternatively on the closest east-facing wall to the center.' },
  { id: 'bs-staircase-2', doshId: 'bs-staircase', type: 'non-structural', category: 'element', title: 'Crystal Ball / Pyramid at Center', description: 'Place a large clear quartz sphere or pyramid at the base of the central staircase', effectiveness: 60, budget: 'medium', timeToEffect: '1–2 months', instructions: 'At least 3-inch sphere. Cleanse with Ganga jal on full moon. Place on a copper plate.' },

  // SW Cut corner
  { id: 'sw-cut-1', doshId: 'sw-cut', type: 'non-structural', category: 'structural-fix', title: 'Mirror to Visually Extend SW', description: 'Place a large mirror on both walls of the SW cut to visually complete the corner', effectiveness: 60, budget: 'low', timeToEffect: '1–2 months', instructions: 'Mirrors should be placed on adjacent walls of the cut corner facing toward the interior to "extend" the missing space.' },
  { id: 'sw-cut-2', doshId: 'sw-cut', type: 'non-structural', category: 'element', title: 'Heavy Stones / Black Granite in SW', description: 'Place the heaviest possible objects in the SW to compensate for the missing weight', effectiveness: 65, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Black granite statues, heavy marble figurines, iron safe/locker. The heavier the better for SW stabilisation.' },
  { id: 'sw-cut-3', doshId: 'sw-cut', type: 'structural', category: 'structural-fix', title: 'Structural Extension of SW Corner', description: 'Extend the building to fill the SW cut corner if renovation is feasible', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Extend structure to create a full 90-degree SW corner. Consult a Vastu architect for exact guidelines.' },

  // E Heavy Wall
  { id: 'e-wall-1', doshId: 'e-heavy-wall', type: 'non-structural', category: 'element', title: 'East-Facing Windows / Openings', description: 'Maximise east-facing openings — windows, vents, or light shafts', effectiveness: 70, budget: 'low', timeToEffect: 'Immediate', instructions: 'If walls are fixed, add east-facing mirrors, keep east side as light and open as possible.' },
  { id: 'e-wall-2', doshId: 'e-heavy-wall', type: 'non-structural', category: 'yantra', title: 'Indra Yantra on East Wall', description: 'Place an Indra Yantra on the heavy east wall to compensate for blocked solar energy', effectiveness: 65, budget: 'low', timeToEffect: '1–2 months', instructions: 'Gold or copper Indra yantra. Consecrate on Sunday at sunrise. Face east during puja.' },

  // NE Master Bedroom
  { id: 'ne-bed-1', doshId: 'ne-master-bed', type: 'non-structural', category: 'element', title: 'Head toward South/East in NE Bedroom', description: 'Sleep with the head pointing South or East to offset the spiritual charge of the NE zone', effectiveness: 55, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Reposition the bed so the headboard faces South or East. Never sleep with head toward North in the NE zone.' },
  { id: 'ne-bed-2', doshId: 'ne-master-bed', type: 'non-structural', category: 'crystal', title: 'Rose Quartz + Clear Quartz Pair', description: 'Place rose quartz at SW of bedroom and clear quartz cluster in NE corner to balance energies', effectiveness: 50, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Rose quartz by the SW corner of the room for love and harmony. Clear quartz cluster in NE to clarify the spiritual energy. Cleanse both monthly.' },
  { id: 'ne-bed-3', doshId: 'ne-master-bed', type: 'structural', category: 'structural-fix', title: 'Relocate Master Bedroom to SW', description: 'Move master bedroom to SW (ideal) — the stability zone anchors the head of household', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Ideal bedroom: SW. Acceptable: S, W, NW. The NE bedroom should become a prayer room or meditation space after relocation.' },

  // NE Cut corner
  { id: 'ne-cut-1', doshId: 'ne-cut', type: 'non-structural', category: 'structural-fix', title: 'Mirror Pair at NE Cut', description: 'Place large mirrors on both walls of the NE cut corner to visually reconstruct the sacred corner', effectiveness: 65, budget: 'low', timeToEffect: '1–2 months', instructions: 'Two equal-sized mirrors on adjacent walls of the NE cut, facing inward. Visually completes the missing corner and maintains energy continuity.' },
  { id: 'ne-cut-2', doshId: 'ne-cut', type: 'non-structural', category: 'yantra', title: 'Shiva Yantra + Crystal Cluster at NE Cut', description: 'Place a Shiva/Ishan yantra and clear quartz cluster at the apex of the NE cut', effectiveness: 70, budget: 'low', timeToEffect: '1–3 months', instructions: 'Copper Shiva yantra on the innermost wall of the NE cut. A clear quartz cluster at the corner. Energise on Thursday with Shiva mantra and white flowers.' },
  { id: 'ne-cut-3', doshId: 'ne-cut', type: 'structural', category: 'structural-fix', title: 'Extend Structure to Complete NE Corner', description: 'Build out the NE corner to restore a full 90-degree angle — permanent correction', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Consult a Vastu architect. Extend the structure to fill the cut NE corner. This is the only complete remedy for a structural NE cut.' },

  // NE Heavy Wall
  { id: 'ne-hw-1', doshId: 'ne-heavy-wall', type: 'non-structural', category: 'element', title: 'Clear NE Zone — Remove All Clutter', description: 'Remove heavy furniture, storage, and clutter from NE to allow energy inflow', effectiveness: 70, budget: 'low', timeToEffect: 'Immediate', instructions: 'NE must be the lightest zone. Use only light furniture. Add windows or skylights if possible. Keep it the most open area.' },
  { id: 'ne-hw-2', doshId: 'ne-heavy-wall', type: 'non-structural', category: 'yantra', title: 'Shri Yantra + Crystal in NE', description: 'Shri Yantra on NE wall with a natural quartz cluster to attract and amplify positive energy despite the wall', effectiveness: 65, budget: 'low', timeToEffect: '1–2 months', instructions: 'Shri Yantra at eye level on NE wall. Natural quartz cluster on a light shelf in NE. Offer fresh water and flowers to NE weekly.' },
  { id: 'ne-hw-3', doshId: 'ne-heavy-wall', type: 'structural', category: 'structural-fix', title: 'Add Window/Opening in NE Wall', description: 'Create a window, ventilation opening, or translucent panel in the NE wall', effectiveness: 85, budget: 'medium', timeToEffect: 'Immediate', instructions: 'Even a small east or north-facing window dramatically improves NE energy. Consult a structural engineer for safe placement.' },

  // SE Water
  { id: 'se-water-1', doshId: 'se-water', type: 'non-structural', category: 'element', title: 'Remove Water Body from SE', description: 'Drain or relocate any water feature from the SE zone — direct Agni extinguisher', effectiveness: 85, budget: 'medium', timeToEffect: 'Immediate', instructions: 'SE is Agni\'s zone — water here extinguishes the fire element. Relocate to NE, N, or NW. Seal any drain or sump in SE.' },
  { id: 'se-water-2', doshId: 'se-water', type: 'non-structural', category: 'yantra', title: 'Agni Yantra in SE', description: 'Install a copper Agni Yantra in the SE corner to re-energise the fire element', effectiveness: 60, budget: 'low', timeToEffect: '1–3 months', instructions: 'Place on SE wall at eye level. Light a ghee lamp beside it daily. Recite Agni mantra 108 times on Tuesday.' },
  { id: 'se-water-3', doshId: 'se-water', type: 'non-structural', category: 'color', title: 'Red/Orange Colors in SE Zone', description: 'Use red, orange, or terracotta in the SE to amplify fire energy against the water intrusion', effectiveness: 45, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Paint SE walls in warm red or terracotta. Place a red lamp or red candles in SE. Avoid blue/green in SE.' },

  // SE Master Bedroom
  { id: 'se-bed-1', doshId: 'se-master-bed', type: 'non-structural', category: 'crystal', title: 'Rose Quartz + Blue Crystal Grid in SE Bedroom', description: 'Rose quartz in SW corner and blue calcite in SE corner to cool fire energy and harmonise relationships', effectiveness: 55, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Rose quartz by the SW corner for love energy. Blue calcite or aquamarine in the SE corner to cool Agni energy. Cleanse monthly under moonlight.' },
  { id: 'se-bed-2', doshId: 'se-master-bed', type: 'non-structural', category: 'color', title: 'Cool Tones in SE Bedroom', description: 'Paint bedroom in cool blues, greens, or whites to counterbalance excessive fire energy', effectiveness: 50, budget: 'low', timeToEffect: '1–3 months', instructions: 'Use sky blue, sage green, or off-white. Avoid red, orange, deep yellow. Blue bed linen calms the Agni energy.' },
  { id: 'se-bed-3', doshId: 'se-master-bed', type: 'structural', category: 'structural-fix', title: 'Relocate Master Bedroom to SW', description: 'Move master bedroom to SW — the ideal anchor for the head of household', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Ideal bedroom: SW (stability). Acceptable: S, W, NW. Avoid SE and NE for the master bedroom.' },

  // SE Entrance
  { id: 'se-entrance-1', doshId: 'se-entrance', type: 'non-structural', category: 'yantra', title: 'Vastu Swastika at SE Door', description: 'Place a copper Vastu Swastika above the SE entrance to stabilise fire-zone entry energy', effectiveness: 65, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Copper swastika above the door frame, energised with Ganesh mantra on Wednesday. Paint doorframe white or light yellow to diffuse harsh fire energy.' },
  { id: 'se-entrance-2', doshId: 'se-entrance', type: 'non-structural', category: 'plant', title: 'Green Plants Flanking SE Entry', description: 'Lush green plants on both sides of the SE entrance introduce earth energy to moderate fire', effectiveness: 50, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Two identical potted plants flanking the SE entrance. Preferred: money plant, jade, or peace lily. Wilting worsens the dosha — replace immediately.' },
  { id: 'se-entrance-3', doshId: 'se-entrance', type: 'structural', category: 'structural-fix', title: 'Create North or East Main Entrance', description: 'Demote SE to secondary use and create a new main entry in N or E', effectiveness: 95, budget: 'high', timeToEffect: 'Immediate', instructions: 'New main entrance preferred in: N, NE, E, NNE. Mark SE door permanently as utility/secondary access.' },

  // SW Toilet
  { id: 'sw-toilet-1', doshId: 'sw-toilet', type: 'non-structural', category: 'yantra', title: 'Nairita Yantra outside SW Toilet', description: 'Copper Nairita yantra on the outer wall of the SW toilet to stabilise energy drain', effectiveness: 65, budget: 'low', timeToEffect: '1–3 months', instructions: 'Place on the wall outside the SW toilet facing into the room. Energise on Saturday with black sesame offering. Keep area clean.' },
  { id: 'sw-toilet-2', doshId: 'sw-toilet', type: 'non-structural', category: 'element', title: 'Heavy Threshold + Sea Salt in SW Toilet', description: 'Heavy stone threshold at SW toilet entry and sea salt inside to absorb draining energy', effectiveness: 55, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Black granite or heavy stone threshold. Sea salt in a copper bowl inside — replace every 15 days. Discard in flowing water, never reuse.' },
  { id: 'sw-toilet-3', doshId: 'sw-toilet', type: 'structural', category: 'structural-fix', title: 'Relocate Toilet from SW', description: 'Move toilet to NW, W, or SE — the most compatible Vastu zones for bathrooms', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Preferred toilet zones: NW (best), W, S, SE. Avoid SW, NE, N, E. Seal SW toilet and redirect plumbing during renovation.' },

  // SW Open / Low
  { id: 'sw-open-1', doshId: 'sw-open', type: 'non-structural', category: 'element', title: 'Maximum Weight in SW Zone', description: 'Place the heaviest possible furniture and objects in SW to compensate for the lowness', effectiveness: 70, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Iron safe, marble statues, heavy bookcase, or stone planters. The heavier the better. Avoid light, moveable furniture in SW.' },
  { id: 'sw-open-2', doshId: 'sw-open', type: 'non-structural', category: 'plant', title: 'Large Trees / Dense Planting in SW', description: 'Plant large, heavy trees in the SW zone to create natural weight and barrier energy', effectiveness: 60, budget: 'low', timeToEffect: '6–12 months', instructions: 'Plant heavy trees: mango, neem, peepal (outside house), or dense hedging. Avoid flowering/light plants in SW. Goal is weight and density.' },
  { id: 'sw-open-3', doshId: 'sw-open', type: 'structural', category: 'structural-fix', title: 'Raise SW Floor/Plot Level', description: 'Raise the SW portion of the property through filling or elevation to create a SW-high slope', effectiveness: 90, budget: 'high', timeToEffect: 'Immediate', instructions: 'Fill SW plot with soil or raise flooring so SW is the highest point. Consult a Vastu engineer for measurements.' },

  // S Open / Weak boundary
  { id: 's-open-1', doshId: 's-open', type: 'non-structural', category: 'element', title: 'Heavy Southern Boundary / Dense Hedge', description: 'Reinforce the south boundary with a high wall or dense trees to block Yama energy drain', effectiveness: 75, budget: 'medium', timeToEffect: '1–3 months', instructions: 'South boundary should be higher and heavier than North. Dense trees: silver oak, neem, ashoka. Avoid open gaps in South.' },
  { id: 's-open-2', doshId: 's-open', type: 'non-structural', category: 'yantra', title: 'Hanuman Image at South Boundary', description: 'Lord Hanuman image or Yama yantra at the south boundary to activate the Dharmic protector', effectiveness: 60, budget: 'low', timeToEffect: '1–2 months', instructions: 'Hanuman in his powerful south-facing form. Place on south-facing boundary wall. Recite Hanuman Chalisa weekly.' },
  { id: 's-open-3', doshId: 's-open', type: 'structural', category: 'structural-fix', title: 'Build High South Compound Wall', description: 'Construct a compound wall on the southern boundary — taller than all other walls', effectiveness: 95, budget: 'high', timeToEffect: 'Immediate', instructions: 'South wall must be the tallest boundary. Minimum 6 feet. Use heavy materials: brick, stone, or reinforced concrete.' },

  // N Toilet
  { id: 'n-toilet-1', doshId: 'n-toilet', type: 'non-structural', category: 'yantra', title: 'Kubera Yantra outside N Toilet', description: 'Kubera Yantra on the outside wall of the north toilet to redirect wealth energy', effectiveness: 70, budget: 'low', timeToEffect: '1–3 months', instructions: 'Copper Kubera yantra just outside the north toilet door. Offer green mung beans and a coin every Wednesday. Face north during puja.' },
  { id: 'n-toilet-2', doshId: 'n-toilet', type: 'non-structural', category: 'plant', title: 'Money Plant at North Toilet Door', description: 'Thriving money plant in a copper vessel at the north toilet entry to compensate for wealth leakage', effectiveness: 55, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Money plant in water in a copper pot just outside the toilet. Must be thriving — replace if it wilts. Change water every 7 days.' },
  { id: 'n-toilet-3', doshId: 'n-toilet', type: 'structural', category: 'structural-fix', title: 'Relocate Toilet from North', description: 'Move toilet to NW, W, or SE where water and waste energy is naturally supported', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Best toilet zones: NW (ideal), W, S, SE. Avoid N, NE, E, SW.' },

  // BS Toilet (Brahmasthan center)
  { id: 'bs-toilet-1', doshId: 'bs-toilet', type: 'non-structural', category: 'yantra', title: 'Brahma Yantra + Crystal Ball outside Center Toilet', description: 'Brahma Yantra and large quartz sphere at the closest point outside the center toilet', effectiveness: 65, budget: 'medium', timeToEffect: '1–3 months', instructions: 'Consecrate Brahma yantra in the room/corridor just outside. Clear quartz sphere (4-inch minimum) on a copper plate beside it. Cleanse on full moon.' },
  { id: 'bs-toilet-2', doshId: 'bs-toilet', type: 'non-structural', category: 'element', title: 'Sea Salt Bowls + Daily Camphor in Center', description: 'Sea salt at all four corners of the Brahmasthan bathroom and burn camphor in adjacent space daily', effectiveness: 50, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Four copper bowls of sea salt at each internal corner. Replace every 15 days. Burn camphor in the adjoining space twice daily.' },
  { id: 'bs-toilet-3', doshId: 'bs-toilet', type: 'structural', category: 'structural-fix', title: 'Relocate Central Toilet — Most Urgent', description: 'Relocating the Brahmasthan toilet is the single most urgent Vastu correction possible', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Consult a Vastu architect immediately. Preferred relocations: NW, W, S. Leave the center as open living/meditation space.' },

  // BS Heavy Column
  { id: 'bs-column-1', doshId: 'bs-heavy-column', type: 'non-structural', category: 'yantra', title: 'Brahma Yantra on Central Column', description: 'Consecrate a Brahma Yantra directly on the central column to redirect compressive energy', effectiveness: 60, budget: 'low', timeToEffect: '1–2 months', instructions: 'Copper Brahma yantra affixed to the column at eye level. Energise on Thursday. Keep the column base clean and uncluttered.' },
  { id: 'bs-column-2', doshId: 'bs-heavy-column', type: 'non-structural', category: 'crystal', title: 'Crystal Pyramid at Column Base', description: '4-inch clear quartz or citrine pyramid at the base of the central column to diffuse pressure energy', effectiveness: 55, budget: 'low', timeToEffect: '1–2 months', instructions: 'Crystal pyramid at the column base on a copper plate. Cleanse under sunlight weekly. Citrine for prosperity; clear quartz for general harmony.' },

  // E Toilet
  { id: 'e-toilet-1', doshId: 'e-toilet', type: 'non-structural', category: 'yantra', title: 'Indra Yantra outside East Toilet', description: 'Indra Yantra on the wall just outside the east toilet to protect solar fame energy', effectiveness: 65, budget: 'low', timeToEffect: '1–3 months', instructions: 'Gold or copper Indra yantra outside the east toilet door at eye level. Consecrate on Sunday at sunrise. Offer red flowers weekly.' },
  { id: 'e-toilet-2', doshId: 'e-toilet', type: 'non-structural', category: 'element', title: 'Sun Symbol in East Corridor', description: 'Surya symbol or image on the east wall of the corridor leading to the east toilet', effectiveness: 50, budget: 'low', timeToEffect: '2–4 weeks', instructions: 'Copper Surya yantra or stylised sunrise image on the east-facing corridor wall. Perform Surya namaskar facing east at dawn for additional energy correction.' },
  { id: 'e-toilet-3', doshId: 'e-toilet', type: 'structural', category: 'structural-fix', title: 'Relocate East Toilet to NW', description: 'Move the east toilet to the NW zone — the most Vastu-compatible bathroom location', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Best toilet zones: NW (ideal), W, S, SE. Seal east toilet and redirect plumbing during renovation.' },

  // NW Kitchen
  { id: 'nw-kitchen-1', doshId: 'nw-kitchen', type: 'non-structural', category: 'yantra', title: 'Agni Yantra in SE Corner of NW Kitchen', description: 'Agni Yantra in SE corner of the NW kitchen anchors fire energy in its proper direction', effectiveness: 60, budget: 'low', timeToEffect: '1–2 months', instructions: 'Copper Agni yantra on SE wall inside the kitchen. Light a ghee lamp beside it daily. Cook facing east whenever possible.' },
  { id: 'nw-kitchen-2', doshId: 'nw-kitchen', type: 'non-structural', category: 'color', title: 'Warm Color Accents in NW Kitchen', description: 'Orange, red, or yellow accents to amplify fire element in this air-dominant zone', effectiveness: 40, budget: 'low', timeToEffect: '1–3 months', instructions: 'Orange curtains, yellow tiles or backsplash, red storage containers. Warm tones compensate for the fire-air mismatch.' },
  { id: 'nw-kitchen-3', doshId: 'nw-kitchen', type: 'structural', category: 'structural-fix', title: 'Relocate Kitchen to SE', description: 'Move kitchen to SE (Agneya/fire) zone — the ideal Vastu placement for all cooking', effectiveness: 100, budget: 'high', timeToEffect: 'Immediate', instructions: 'Ideal kitchen: SE (best), NW (acceptable). Avoid NE, SW, N. Shift cooking range to SE and replumb/rewire accordingly.' },

  // Slope SW High
  { id: 'slope-sw-1', doshId: 'slope-sw-high', type: 'non-structural', category: 'element', title: 'Counter-Weight in NE to Balance Slope', description: 'Heavy objects in NE to partially offset the incorrect slope draining toward SW', effectiveness: 45, budget: 'low', timeToEffect: '1–2 months', instructions: 'A stone water feature or large crystal sphere in NE adds counter-energy. This is a partial mitigation only — structural correction is strongly advised.' },
  { id: 'slope-sw-2', doshId: 'slope-sw-high', type: 'structural', category: 'structural-fix', title: 'Land Grading to Correct Slope Direction', description: 'Re-grade the land so NE is lower and SW is higher — restores the ideal energy flow', effectiveness: 95, budget: 'high', timeToEffect: 'Immediate', instructions: 'Hire a civil engineer and Vastu consultant to re-grade the site. NE should be the lowest point, SW the highest. Most impactful structural correction for plots.' },
];

// ─── ROOM PLACEMENT GUIDE ─────────────────────────────────────────────────

export interface RoomPlacement {
  room: string;
  idealZones: VastuDirection[];
  acceptableZones: VastuDirection[];
  avoidZones: VastuDirection[];
  reason: string;
  sleepDirection?: string;
}

export const ROOM_PLACEMENTS: RoomPlacement[] = [
  { room: 'Master Bedroom', idealZones: ['SW'], acceptableZones: ['S', 'W', 'NW'], avoidZones: ['NE', 'SE', 'N'], reason: 'SW is the zone of stability (Nairita) — anchors the head of the household with weight and authority', sleepDirection: 'Head to South or East, never North' },
  { room: "Children's Bedroom", idealZones: ['W', 'NW'], acceptableZones: ['N', 'E'], avoidZones: ['SW', 'NE', 'SE'], reason: 'West brings academic gains; NW promotes movement and growth for children', sleepDirection: 'Head to East or South' },
  { room: 'Prayer Room / Puja', idealZones: ['NE'], acceptableZones: ['N', 'E'], avoidZones: ['SW', 'SE', 'S', 'W'], reason: 'NE (Ishan) is the sacred corner blessed by Shiva — divine energy is strongest here', sleepDirection: undefined },
  { room: 'Kitchen', idealZones: ['SE'], acceptableZones: ['NW'], avoidZones: ['NE', 'SW', 'N'], reason: 'SE (Agneya) is the zone of Agni (fire) — kitchen fire harmonises perfectly with SE energy' },
  { room: 'Living Room', idealZones: ['N', 'NE', 'E'], acceptableZones: ['NW', 'W'], avoidZones: ['SW', 'SE'], reason: 'North and East bring social energy, opportunities and prosperity for the household' },
  { room: 'Dining Room', idealZones: ['W', 'E'], acceptableZones: ['N', 'S'], avoidZones: ['NE', 'SW'], reason: 'West and East promote healthy digestion and nourishing family bonds' },
  { room: 'Study / Home Office', idealZones: ['W', 'SW', 'N'], acceptableZones: ['NW', 'E'], avoidZones: ['SE', 'NE'], reason: 'West and SW promote focused intellectual work; North supports career and opportunities' },
  { room: 'Bathroom / Toilet', idealZones: ['NW', 'W', 'S'], acceptableZones: ['SE'], avoidZones: ['NE', 'SW', 'N', 'E'], reason: 'NW and W allow water and waste removal without disturbing sacred or wealth zones' },
  { room: 'Garage / Parking', idealZones: ['NW', 'SE'], acceptableZones: ['W', 'S'], avoidZones: ['NE', 'SW'], reason: 'NW promotes movement and vehicle energy; SE allows mechanical fire energy' },
  { room: 'Guest Room', idealZones: ['NW'], acceptableZones: ['W', 'N'], avoidZones: ['SW', 'NE'], reason: 'NW is the zone of temporary stay — ideal for guests who come and go' },
  { room: 'Store Room', idealZones: ['SW', 'S'], acceptableZones: ['W', 'NW'], avoidZones: ['NE', 'N', 'E'], reason: 'SW and S can bear heavy loads without disturbing primary energy zones' },
  { room: 'Home Gym / Exercise', idealZones: ['E', 'N'], acceptableZones: ['SE'], avoidZones: ['SW', 'NW'], reason: 'East solar energy and North motivational energy support physical exercise and vitality' },
];

// ─── VASTU HARMONY SCORING RULES ──────────────────────────────────────────

export interface HarmonyScore {
  zone: VastuDirection;
  score: number; // 0-100
  dosha: string[];
  strengths: string[];
}

export function getZoneScore(zone: VastuDirection, activeDoshas: string[]): number {
  const ZONE_BASE_SCORES: Record<VastuDirection, number> = {
    NE: 100, N: 85, E: 85, SE: 75, S: 65, SW: 80, W: 70, NW: 75,
    NNE: 80, ENE: 75, ESE: 70, SSE: 65, SSW: 60, WSW: 65, WNW: 65, NNW: 70,
  };

  const DOSHA_PENALTIES: Record<string, number> = {
    severe: 40,
    moderate: 25,
    mild: 10,
  };

  let score = ZONE_BASE_SCORES[zone] || 70;
  const relevantDoshas = ALL_DOSHAS.filter(d => d.zone === zone && activeDoshas.includes(d.id));

  relevantDoshas.forEach(d => {
    score -= DOSHA_PENALTIES[d.severity] || 10;
  });

  return Math.max(0, Math.min(100, score));
}

export function getOverallHarmonyScore(activeDoshas: string[]): number {
  if (activeDoshas.length === 0) return 88;

  const severeDoshas = activeDoshas.filter(id => ALL_DOSHAS.find(d => d.id === id)?.severity === 'severe').length;
  const moderateDoshas = activeDoshas.filter(id => ALL_DOSHAS.find(d => d.id === id)?.severity === 'moderate').length;
  const mildDoshas = activeDoshas.filter(id => ALL_DOSHAS.find(d => d.id === id)?.severity === 'mild').length;

  const score = 88 - (severeDoshas * 15) - (moderateDoshas * 8) - (mildDoshas * 3);
  return Math.max(10, Math.min(95, score));
}

// ─── NUMEROLOGY–VASTU PERSONAL HARMONY ────────────────────────────────────

export const NUMBER_VASTU_AFFINITY: Record<number, { strongZones: VastuDirection[]; weakZones: VastuDirection[]; primaryDevta: string; guidance: string }> = {
  1: { strongZones: ['E', 'NE', 'N'], weakZones: ['W', 'SW'], primaryDevta: 'Surya / Indra', guidance: 'LP 1 thrives when the East (Sun energy) and North (opportunity) are strong and unobstructed. A SW master bedroom anchors leadership ambitions well.' },
  2: { strongZones: ['NW', 'W', 'NE'], weakZones: ['SE', 'S'], primaryDevta: 'Vayu / Kubera', guidance: 'LP 2 flourishes with a strong NW (partnership support) and clean NE (emotional clarity). Avoid disrupted NE — it amplifies emotional instability for 2s.' },
  3: { strongZones: ['E', 'N', 'NE'], weakZones: ['SW', 'W'], primaryDevta: 'Indra / Soma', guidance: 'LP 3\'s creative and expressive nature is amplified by vibrant East (Indra) and North (Mercury). A creative study in the East or North brings tremendous flow.' },
  4: { strongZones: ['SW', 'S', 'W'], weakZones: ['NE', 'N'], primaryDevta: 'Nairita / Yama', guidance: 'LP 4\'s need for stability is perfectly met by a strong SW. Ensure SW is heavy and undisturbed. NE sacred corner should remain clean to prevent over-rigidity.' },
  5: { strongZones: ['N', 'NW', 'E'], weakZones: ['SW', 'S'], primaryDevta: 'Kubera / Vayu', guidance: 'LP 5 needs freedom and movement — North (new opportunities) and NW (movement, change) must be unblocked. Avoid heavy SW master bedroom — it creates restlessness.' },
  6: { strongZones: ['SW', 'NW', 'W'], weakZones: ['SE', 'NE'], primaryDevta: 'Nairita / Pushpadanta', guidance: 'LP 6\'s relationship focus is supported by a strong SW (stability in partnerships) and NW (harmonious support from others). Keep the western zones warm and well-lit.' },
  7: { strongZones: ['NE', 'N', 'E'], weakZones: ['SW', 'SE'], primaryDevta: 'Isa / Kubera', guidance: 'LP 7 is deeply spiritual — the NE sacred corner must be pristine and used for meditation or prayer. A blocked NE is particularly damaging for 7 life paths.' },
  8: { strongZones: ['SW', 'S', 'W'], weakZones: ['N', 'NE'], primaryDevta: 'Nairita / Varuna', guidance: 'LP 8\'s material mastery needs a powerful SW (authority, stability) and strong South. Weak SW for an LP 8 creates chronic financial and authority blocks — the most critical dosha to fix.' },
  9: { strongZones: ['NE', 'E', 'N'], weakZones: ['SW', 'SE'], primaryDevta: 'Isa / Indra', guidance: 'LP 9\'s humanitarian and spiritual mission needs a clear NE (divine connection) and East (fame and social reach). A strong Brahmasthan (center) amplifies LP 9\'s healing influence.' },
};
