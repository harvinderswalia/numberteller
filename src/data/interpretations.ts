export interface NumberInterpretation {
  traits: string[];
  challenges: string[];
  advice: string[];
}

export const NUMBER_INTERPRETATIONS: Record<number | string, NumberInterpretation> = {
  1: {
    traits: [
      'Natural leader with strong initiative and determination',
      'Independent thinker who values autonomy and self-reliance',
      'Pioneer spirit with courage to blaze new trails',
      'Strong willpower and ability to manifest goals',
      'Original and innovative in approach to life'
    ],
    challenges: [
      'Tendency toward arrogance or domineering behavior',
      'May struggle with accepting help from others',
      'Can be overly self-centered or egotistical',
      'Impatience with slower-paced individuals'
    ],
    advice: [
      'Balance independence with cooperation',
      'Practice humility and listen to others',
      'Channel leadership skills toward helping others',
      'Develop patience and empathy'
    ]
  },
  2: {
    traits: [
      'Natural diplomat with excellent mediation skills',
      'Sensitive and intuitive to others emotions',
      'Cooperative and works well in partnerships',
      'Patient and detail-oriented',
      'Peacemaker who seeks harmony in all situations'
    ],
    challenges: [
      'Tendency toward indecisiveness and self-doubt',
      'May be overly sensitive to criticism',
      'Can become dependent on others for validation',
      'Prone to avoiding confrontation at personal cost'
    ],
    advice: [
      'Develop confidence in your own decisions',
      'Set healthy boundaries with others',
      'Learn to embrace necessary conflict',
      'Trust your intuition and inner voice'
    ]
  },
  3: {
    traits: [
      'Creative and artistic with natural self-expression',
      'Optimistic and joyful presence that uplifts others',
      'Excellent communicator with gift for words',
      'Sociable and enjoys connecting with people',
      'Imaginative and sees possibilities everywhere'
    ],
    challenges: [
      'Scattered energy and difficulty with focus',
      'May be superficial or avoid depth',
      'Tendency to gossip or misuse communication',
      'Can become moody when creativity is blocked'
    ],
    advice: [
      'Develop discipline and follow-through',
      'Focus your creative energy on meaningful projects',
      'Practice depth in relationships and pursuits',
      'Use communication gifts responsibly'
    ]
  },
  4: {
    traits: [
      'Practical and grounded with strong work ethic',
      'Reliable and dependable in all commitments',
      'Excellent at building solid foundations',
      'Organized and methodical in approach',
      'Values tradition, security, and stability'
    ],
    challenges: [
      'Can be rigid and resistant to change',
      'May become workahollic or overly serious',
      'Tendency toward stubbornness',
      'Difficulty expressing emotions or spontaneity'
    ],
    advice: [
      'Embrace flexibility and adaptability',
      'Balance work with play and relaxation',
      'Open yourself to new experiences',
      'Allow emotions and creativity to flow'
    ]
  },
  5: {
    traits: [
      'Adventurous and freedom-loving spirit',
      'Versatile and adapts easily to change',
      'Curious and eager to experience everything',
      'Progressive thinker who embraces innovation',
      'Charismatic and attracts diverse experiences'
    ],
    challenges: [
      'Restlessness and difficulty with commitment',
      'May be irresponsible or unreliable',
      'Tendency toward excess and overindulgence',
      'Can be scattered and lack follow-through'
    ],
    advice: [
      'Develop healthy commitments and routines',
      'Practice moderation in all things',
      'Channel energy into constructive pursuits',
      'Balance freedom with responsibility'
    ]
  },
  6: {
    traits: [
      'Nurturing and caring for family and community',
      'Strong sense of responsibility and duty',
      'Artistic and appreciates beauty and harmony',
      'Counselor who offers wise guidance',
      'Protective and supportive of loved ones'
    ],
    challenges: [
      'Tendency to meddle or control others lives',
      'May sacrifice own needs for others',
      'Can be overly critical or perfectionistic',
      'Difficulty letting go and trusting others'
    ],
    advice: [
      'Allow others to make their own choices',
      'Practice self-care and set boundaries',
      'Accept imperfection in yourself and others',
      'Trust that others can handle challenges'
    ]
  },
  7: {
    traits: [
      'Deeply spiritual and philosophical',
      'Analytical mind that seeks truth and wisdom',
      'Introspective and values solitude',
      'Intuitive with strong inner knowing',
      'Perfectionist who values quality over quantity'
    ],
    challenges: [
      'Tendency toward isolation and loneliness',
      'May be overly critical or skeptical',
      'Can struggle with trust and opening up',
      'Prone to overthinking and analysis paralysis'
    ],
    advice: [
      'Balance solitude with meaningful connections',
      'Share your wisdom with others',
      'Practice trust and vulnerability',
      'Ground spiritual insights in practical action'
    ]
  },
  8: {
    traits: [
      'Natural business acumen and financial wisdom',
      'Ambitious and driven to achieve success',
      'Strong executive abilities and leadership',
      'Confident and authoritative presence',
      'Excellent at manifesting material abundance'
    ],
    challenges: [
      'Materialism and obsession with status',
      'May be controlling or domineering',
      'Tendency to overwork and neglect personal life',
      'Can be ruthless in pursuit of goals'
    ],
    advice: [
      'Remember that success includes happiness',
      'Use power and influence responsibly',
      'Balance material with spiritual pursuits',
      'Practice generosity and giving back'
    ]
  },
  9: {
    traits: [
      'Compassionate humanitarian who serves others',
      'Idealistic and works for universal causes',
      'Wise old soul with deep understanding',
      'Artistic and creatively inspired',
      'Generous and selfless in giving'
    ],
    challenges: [
      'Tendency toward martyrdom and self-sacrifice',
      'May be impractical or unrealistic',
      'Can become bitter if ideals are not met',
      'Difficulty with letting go and endings'
    ],
    advice: [
      'Balance giving with receiving',
      'Accept that you cannot save everyone',
      'Ground idealism in practical action',
      'Embrace endings as new beginnings'
    ]
  },
  11: {
    traits: [
      'Highly intuitive master number with spiritual gifts',
      'Inspirational and uplifting to others',
      'Visionary who sees beyond the ordinary',
      'Natural healer and teacher',
      'Connected to higher consciousness and wisdom'
    ],
    challenges: [
      'Anxiety and nervous tension from high sensitivity',
      'May struggle with practical daily matters',
      'Can be impractical or lost in idealism',
      'Pressure from high spiritual standards'
    ],
    advice: [
      'Ground your spiritual gifts in earthly service',
      'Practice stress management and self-care',
      'Accept your humanity alongside divinity',
      'Use intuition to guide practical decisions'
    ]
  },
  22: {
    traits: [
      'Master builder who manifests grand visions',
      'Combines spiritual wisdom with practical ability',
      'Natural architect of systems and structures',
      'Leadership on a global scale',
      'Able to turn dreams into concrete reality'
    ],
    challenges: [
      'Overwhelmed by magnitude of potential',
      'May struggle under pressure of expectations',
      'Can become frustrated by limitations',
      'Tendency to take on too much responsibility'
    ],
    advice: [
      'Break large visions into manageable steps',
      'Remember that mastery takes time',
      'Balance ambition with realistic timelines',
      'Delegate and trust others to help'
    ]
  },
  33: {
    traits: [
      'Master teacher and healer of humanity',
      'Selfless devotion to uplifting others',
      'Channels universal love and compassion',
      'Natural counselor and guide',
      'Able to inspire profound transformation'
    ],
    challenges: [
      'Self-sacrifice to point of personal depletion',
      'May carry weight of world on shoulders',
      'Can become bitter if efforts go unappreciated',
      'Difficulty maintaining personal boundaries'
    ],
    advice: [
      'Remember you cannot heal everyone',
      'Practice radical self-care and boundaries',
      'Accept appreciation without need for martyrdom',
      'Share gifts without attachment to outcomes'
    ]
  },
  '13/4': {
    traits: [
      'Strong organizational abilities with practical approach',
      'Determined to build solid foundations through hard work',
      'Karmic debt requiring mastery of discipline and structure',
      'Transformative power through persistence and dedication',
      'Natural ability to create order from chaos'
    ],
    challenges: [
      'Past life patterns of laziness or shortcuts must be overcome',
      'Tendency to feel limited or restricted by circumstances',
      'May experience setbacks requiring starting over',
      'Can become frustrated with slow progress',
      'Need to learn patience and systematic approach'
    ],
    advice: [
      'Accept that success requires sustained effort and focus',
      'Break large goals into manageable steps',
      'Embrace discipline as pathway to freedom',
      'Learn from setbacks without giving up',
      'Build strong foundations before expanding'
    ]
  },
  '14/5': {
    traits: [
      'Dynamic energy seeking freedom and diverse experiences',
      'Karmic debt requiring responsible use of freedom',
      'Adaptable and quick to learn new things',
      'Natural ability to communicate and connect with others',
      'Magnetic personality that attracts opportunities'
    ],
    challenges: [
      'Past life overindulgence in sensory pleasures must be balanced',
      'Tendency toward excess in food, drink, or substances',
      'May scatter energy across too many interests',
      'Can become addicted to constant change and stimulation',
      'Need to learn moderation and commitment'
    ],
    advice: [
      'Practice moderation in all areas of life',
      'Commit to important relationships and projects',
      'Channel energy into constructive pursuits',
      'Develop self-discipline without suppressing joy',
      'Find balance between freedom and responsibility'
    ]
  },
  '16/7': {
    traits: [
      'Deep spiritual insight and analytical mind',
      'Karmic debt requiring ego surrender and spiritual awakening',
      'Intuitive wisdom that grows through life challenges',
      'Natural philosopher seeking truth and understanding',
      'Ability to transform through introspection'
    ],
    challenges: [
      'Past life misuse of spiritual power or knowledge',
      'May experience sudden, unexpected setbacks or losses',
      'Tendency toward isolation or superiority complex',
      'Can be overly critical or judgmental',
      'Need to learn humility and trust in higher power'
    ],
    advice: [
      'Embrace humility and recognize limits of ego',
      'See challenges as opportunities for spiritual growth',
      'Practice compassion for self and others',
      'Develop faith and surrender to divine timing',
      'Use wisdom to serve rather than to dominate'
    ]
  },
  '19/1': {
    traits: [
      'Strong leadership potential with pioneering spirit',
      'Karmic debt requiring service to others through leadership',
      'Independent and determined to succeed',
      'Natural ability to inspire and motivate others',
      'Creative problem-solver with innovative approach'
    ],
    challenges: [
      'Past life abuse of power or selfish leadership',
      'May resist help from others or appear arrogant',
      'Can struggle with vulnerability and receiving',
      'Tendency to dominate rather than collaborate',
      'Need to learn interdependence and compassion'
    ],
    advice: [
      'Use leadership skills to uplift and serve others',
      'Practice asking for and receiving help graciously',
      'Balance independence with healthy interdependence',
      'Lead with compassion and humility',
      'Recognize that true strength includes vulnerability'
    ]
  }
};

export const KARMIC_LESSON_INTERPRETATIONS: Record<number, string> = {
  1: 'Develop initiative and leadership. Overcome procrastination by taking bold first steps.',
  2: 'Learn cooperation and diplomacy. Practice patience and sensitivity in relationships.',
  3: 'Cultivate self-expression and creativity. Share your authentic voice with the world.',
  4: 'Build discipline and practical skills. Create structure and follow through on commitments.',
  5: 'Embrace change and adaptability. Step out of comfort zones and experience freedom.',
  6: 'Accept responsibility and nurture others. Balance giving with receiving in relationships.',
  7: 'Develop spiritual wisdom and introspection. Trust your intuition and inner knowing.',
  8: 'Master material world and personal power. Learn healthy relationship with money and success.',
  9: 'Practice compassion and let go. Release attachments and embrace universal love.'
};

export const PERSONAL_YEAR_INTERPRETATIONS: Record<number, string> = {
  1: 'New beginnings and fresh starts. Time to initiate projects and assert independence.',
  2: 'Patience and cooperation. Focus on relationships, partnerships, and attention to detail.',
  3: 'Creativity and self-expression. Socialize, communicate, and enjoy creative pursuits.',
  4: 'Hard work and building foundations. Focus on practical matters, organization, and stability.',
  5: 'Change and freedom. Embrace new experiences, travel, and unexpected opportunities.',
  6: 'Responsibility and service. Focus on home, family, and community obligations.',
  7: 'Introspection and spiritual growth. Time for rest, study, and inner development.',
  8: 'Achievement and recognition. Focus on career, finances, and material success.',
  9: 'Completion and release. Let go of what no longer serves, prepare for new cycle.',
  11: 'Spiritual awakening and inspiration. Trust intuition and embrace your higher calling.',
  22: 'Master building year. Manifest grand visions on practical, material plane.'
};

export const HOUSE_NUMBER_INTERPRETATIONS: Record<number, string> = {
  1: 'Perfect for independence and new beginnings. Great for entrepreneurs and singles.',
  2: 'Ideal for couples and partnerships. Promotes peace, cooperation, and sensitivity.',
  3: 'Creative and social energy. Perfect for artists, writers, and those who love entertaining.',
  4: 'Stable and secure. Great for building family foundations and long-term investments.',
  5: 'Dynamic and changeable. Perfect for those who love travel, variety, and freedom.',
  6: 'Nurturing and responsible. Ideal for families, caregivers, and community activities.',
  7: 'Quiet and contemplative. Perfect for study, meditation, and spiritual pursuits.',
  8: 'Ambitious and successful. Great for business-minded individuals and material goals.',
  9: 'Humanitarian and generous. Ideal for community leaders and those serving others.',
  11: 'Spiritually charged. Perfect for healers, teachers, and intuitive development.',
  22: 'Master builder energy. Great for those manifesting large-scale projects and visions.'
};
