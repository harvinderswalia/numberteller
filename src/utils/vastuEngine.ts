/**
 * Native Vastu Shastra Analysis Engine
 * Generates contextual, numerology-integrated Vastu analysis entirely in-browser.
 */

import {
  VastuDirection, DIRECTION_ZONES, ALL_DOSHAS, VastuDosha,
  REMEDY_DATABASE, VastuRemedy, ROOM_PLACEMENTS, RoomPlacement,
  getZoneScore, getOverallHarmonyScore, NUMBER_VASTU_AFFINITY,
  HarmonyScore
} from '../data/vastuData';

// ─── INPUT TYPES ───────────────────────────────────────────────────────────

export interface RoomEntry {
  roomType: string;
  zone: VastuDirection | '';
}

export interface VastuInput {
  propertyType: 'apartment' | 'house' | 'office' | 'plot';
  mainEntranceDirection: VastuDirection | '';
  rooms: RoomEntry[];
  structuralIssues: string[]; // dosha ids checked by user
  slopeDirection: 'NE-high' | 'SW-high' | 'flat' | '';
  numerologyContext?: {
    lifePath?: string;
    expression?: string;
    soulUrge?: string;
    personalYear?: string;
    name?: string;
  };
}

// ─── OUTPUT TYPES ──────────────────────────────────────────────────────────

export interface DetectedDosha {
  dosha: VastuDosha;
  source: 'room-placement' | 'user-checked' | 'structural' | 'entrance' | 'slope';
  autoDetected: boolean;
}

export interface ZoneAnalysis {
  zone: VastuDirection;
  name: string;
  score: number;
  element: string;
  planet: string;
  devta: string;
  doshas: VastuDosha[];
  strengths: string[];
  status: 'excellent' | 'good' | 'caution' | 'dosha';
}

export interface PersonalHarmony {
  lifePathNumber: number | null;
  strongZonesMatch: boolean;
  weakZonesAffected: boolean;
  guidance: string;
  affinity: string;
  criticalZone?: string;
}

export interface VastuReport {
  overallScore: number;
  scoreLabel: string;
  summary: string;
  detectedDoshas: DetectedDosha[];
  zoneAnalysis: ZoneAnalysis[];
  topDoshas: DetectedDosha[];
  priorityRemedies: VastuRemedy[];
  allRemedies: VastuRemedy[];
  personalHarmony: PersonalHarmony | null;
  roomGuide: Array<{ room: string; currentZone: VastuDirection | ''; placement: RoomPlacement; status: 'ideal' | 'acceptable' | 'dosha' | 'unknown' }>;
  positiveFeatures: string[];
  narrative: string;
  personalYearVastu?: string;
  generatedAt: string;
}

// ─── DIRECTION DEGREE HELPER ───────────────────────────────────────────────

export function getDirectionFromDegrees(deg: number): VastuDirection {
  const normalized = ((deg % 360) + 360) % 360;
  if (normalized >= 337.5 || normalized < 22.5) return 'N';
  if (normalized >= 22.5 && normalized < 45) return 'NNE';
  if (normalized >= 45 && normalized < 67.5) return 'NE';
  if (normalized >= 67.5 && normalized < 90) return 'ENE';
  if (normalized >= 90 && normalized < 112.5) return 'E';
  if (normalized >= 112.5 && normalized < 135) return 'ESE';
  if (normalized >= 135 && normalized < 157.5) return 'SE';
  if (normalized >= 157.5 && normalized < 180) return 'SSE';
  if (normalized >= 180 && normalized < 202.5) return 'S';
  if (normalized >= 202.5 && normalized < 225) return 'SSW';
  if (normalized >= 225 && normalized < 247.5) return 'SW';
  if (normalized >= 247.5 && normalized < 270) return 'WSW';
  if (normalized >= 270 && normalized < 292.5) return 'W';
  if (normalized >= 292.5 && normalized < 315) return 'WNW';
  if (normalized >= 315 && normalized < 337.5) return 'NW';
  return 'NNW';
}

export const DIRECTION_DEGREES: Record<VastuDirection, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5, E: 90, ESE: 112.5,
  SE: 135, SSE: 157.5, S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
  W: 270, WNW: 292.5, NW: 315, NNW: 337.5
};

// ─── AUTO-DETECT DOSHAS FROM ROOM PLACEMENTS ──────────────────────────────

function detectRoomDoshas(rooms: RoomEntry[]): DetectedDosha[] {
  const detected: DetectedDosha[] = [];

  rooms.forEach(entry => {
    if (!entry.zone) return;
    const roomName = entry.roomType.toLowerCase();
    const zone = entry.zone;

    // Toilet in NE
    if ((roomName.includes('toilet') || roomName.includes('bathroom') || roomName.includes('wc')) && zone === 'NE') {
      const dosha = ALL_DOSHAS.find(d => d.id === 'ne-toilet');
      if (dosha) detected.push({ dosha, source: 'room-placement', autoDetected: true });
    }

    // Kitchen in NE
    if (roomName.includes('kitchen') && zone === 'NE') {
      const dosha = ALL_DOSHAS.find(d => d.id === 'ne-kitchen');
      if (dosha) detected.push({ dosha, source: 'room-placement', autoDetected: true });
    }

    // Kitchen in SW
    if (roomName.includes('kitchen') && zone === 'SW') {
      const dosha = ALL_DOSHAS.find(d => d.id === 'sw-entrance');
      // Create a dynamic "Kitchen in SW" marker
      const swKitchenDosha: VastuDosha = {
        id: 'sw-kitchen', name: 'Kitchen in SW', zone: 'SW', category: 'placement', severity: 'moderate',
        devtaDisturbed: 'Nairita', effect: 'Fire in the stability zone causes instability, relationship heat and financial drain',
        lifeArea: ['relationships', 'stability', 'finances'], shortDescription: 'Fire element destabilises the SW anchor zone'
      };
      detected.push({ dosha: swKitchenDosha, source: 'room-placement', autoDetected: true });
    }

    // Bedroom in NE
    if ((roomName.includes('bedroom') || roomName.includes('master')) && zone === 'NE') {
      const dosha = ALL_DOSHAS.find(d => d.id === 'ne-master-bed');
      if (dosha) detected.push({ dosha, source: 'room-placement', autoDetected: true });
    }

    // Toilet in N
    if ((roomName.includes('toilet') || roomName.includes('bathroom')) && zone === 'N') {
      const dosha = ALL_DOSHAS.find(d => d.id === 'n-toilet');
      if (dosha) detected.push({ dosha, source: 'room-placement', autoDetected: true });
    }

    // Toilet in E
    if ((roomName.includes('toilet') || roomName.includes('bathroom')) && zone === 'E') {
      const dosha = ALL_DOSHAS.find(d => d.id === 'e-toilet');
      if (dosha) detected.push({ dosha, source: 'room-placement', autoDetected: true });
    }

    // Master bedroom in SE
    if ((roomName.includes('master') || roomName.includes('bedroom')) && zone === 'SE') {
      const dosha = ALL_DOSHAS.find(d => d.id === 'se-master-bed');
      if (dosha) detected.push({ dosha, source: 'room-placement', autoDetected: true });
    }

    // Prayer room in SW
    if ((roomName.includes('prayer') || roomName.includes('puja') || roomName.includes('temple')) && zone === 'SW') {
      const swPrayerDosha: VastuDosha = {
        id: 'sw-prayer', name: 'Prayer Room in SW', zone: 'SW', category: 'placement', severity: 'moderate',
        devtaDisturbed: 'Nairita', effect: 'Spiritual energy in the stability zone creates imbalance — divine energy is best in NE',
        lifeArea: ['spirituality', 'finances', 'stability'], shortDescription: 'Prayer room in heavy stability zone — better suited for NE'
      };
      detected.push({ dosha: swPrayerDosha, source: 'room-placement', autoDetected: true });
    }

    // Toilet/kitchen in Brahmasthan (center) — user needs to indicate center zone
    if ((roomName.includes('toilet') || roomName.includes('kitchen') || roomName.includes('staircase')) && entry.zone === 'N') {
      // N as proxy for center in our simplified model — handle in structural
    }
  });

  return detected;
}

function detectEntranceDoshas(entranceDir: VastuDirection | ''): DetectedDosha[] {
  const detected: DetectedDosha[] = [];
  if (!entranceDir) return detected;

  if (entranceDir === 'SW') {
    const dosha = ALL_DOSHAS.find(d => d.id === 'sw-entrance');
    if (dosha) detected.push({ dosha, source: 'entrance', autoDetected: true });
  }
  if (entranceDir === 'S') {
    const dosha = ALL_DOSHAS.find(d => d.id === 's-entrance');
    if (dosha) detected.push({ dosha, source: 'entrance', autoDetected: true });
  }
  if (entranceDir === 'SE') {
    const dosha = ALL_DOSHAS.find(d => d.id === 'se-entrance');
    if (dosha) detected.push({ dosha, source: 'entrance', autoDetected: true });
  }
  return detected;
}

function detectStructuralDoshas(structuralIssues: string[], slopeDir: string): DetectedDosha[] {
  const detected: DetectedDosha[] = [];

  structuralIssues.forEach(id => {
    const dosha = ALL_DOSHAS.find(d => d.id === id);
    if (dosha) detected.push({ dosha, source: 'user-checked', autoDetected: false });
  });

  if (slopeDir === 'SW-high') {
    const dosha = ALL_DOSHAS.find(d => d.id === 'slope-sw-high');
    if (dosha) detected.push({ dosha, source: 'slope', autoDetected: true });
  }

  return detected;
}

// ─── ZONE ANALYSIS ────────────────────────────────────────────────────────

function buildZoneAnalysis(activeDoshaIds: string[]): ZoneAnalysis[] {
  const coreZones: VastuDirection[] = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

  return coreZones.map(zone => {
    const zoneData = DIRECTION_ZONES.find(z => z.code === zone)!;
    const score = getZoneScore(zone, activeDoshaIds);
    const doshas = ALL_DOSHAS.filter(d => d.zone === zone && activeDoshaIds.includes(d.id));

    let status: ZoneAnalysis['status'];
    if (score >= 80) status = 'excellent';
    else if (score >= 60) status = 'good';
    else if (score >= 40) status = 'caution';
    else status = 'dosha';

    const strengths: string[] = [];
    if (doshas.length === 0) {
      strengths.push(`${zoneData.devta} energy is undisturbed`);
      strengths.push(`${zoneData.idealFor[0]} placement is optimal here`);
    }

    return {
      zone,
      name: zoneData.name,
      score,
      element: zoneData.element,
      planet: zoneData.planet,
      devta: zoneData.devta,
      doshas,
      strengths,
      status,
    };
  });
}

// ─── PERSONAL HARMONY ANALYSIS ────────────────────────────────────────────

function analysePersonalHarmony(
  numCtx: VastuInput['numerologyContext'],
  detectedDoshas: DetectedDosha[],
  entranceDir: VastuDirection | ''
): PersonalHarmony | null {
  if (!numCtx?.lifePath) return null;

  const lpRaw = numCtx.lifePath;
  const lpNum = parseInt(lpRaw.split('/').pop() || lpRaw);
  if (!lpNum || lpNum < 1 || lpNum > 9) return null;

  const affinity = NUMBER_VASTU_AFFINITY[lpNum];
  if (!affinity) return null;

  const activeDoshaIds = detectedDoshas.map(d => d.dosha.id);
  const dosha = detectedDoshas.find(d => affinity.weakZones.includes(d.dosha.zone));
  const weakZonesAffected = !!dosha;

  const strongZoneActive = entranceDir && affinity.strongZones.includes(entranceDir as VastuDirection);

  let criticalZone: string | undefined;
  if (lpNum === 8) criticalZone = 'SW (stability zone — must be heaviest for LP 8)';
  if (lpNum === 7) criticalZone = 'NE (sacred corner — must be pristine for LP 7)';
  if (lpNum === 1) criticalZone = 'East (solar energy — must be unobstructed for LP 1 leadership)';
  if (lpNum === 4) criticalZone = 'SW (foundation zone — LP 4 thrives with a strong anchor)';

  return {
    lifePathNumber: lpNum,
    strongZonesMatch: !!strongZoneActive,
    weakZonesAffected,
    guidance: affinity.guidance,
    affinity: `${affinity.primaryDevta} resonance | Strong zones: ${affinity.strongZones.join(', ')} | Weak zones: ${affinity.weakZones.join(', ')}`,
    criticalZone,
  };
}

// ─── REMEDY PRIORITISATION ────────────────────────────────────────────────

function prioritiseRemedies(detectedDoshas: DetectedDosha[]): { priority: VastuRemedy[]; all: VastuRemedy[] } {
  const allRemedies: VastuRemedy[] = [];
  const priorityRemedies: VastuRemedy[] = [];

  // Sort doshas by severity first
  const sorted = [...detectedDoshas].sort((a, b) => {
    const severityOrder = { severe: 0, moderate: 1, mild: 2 };
    return severityOrder[a.dosha.severity] - severityOrder[b.dosha.severity];
  });

  sorted.forEach(({ dosha }) => {
    const remedies = REMEDY_DATABASE.filter(r => r.doshId === dosha.id);
    allRemedies.push(...remedies);

    // Priority = first non-structural remedy for each dosha
    const nonStructural = remedies.find(r => r.type === 'non-structural');
    if (nonStructural) priorityRemedies.push(nonStructural);
  });

  return {
    priority: priorityRemedies.slice(0, 5),
    all: allRemedies,
  };
}

// ─── ROOM GUIDE ───────────────────────────────────────────────────────────

function buildRoomGuide(rooms: RoomEntry[]) {
  return rooms
    .filter(r => r.zone)
    .map(r => {
      const placement = ROOM_PLACEMENTS.find(p =>
        p.room.toLowerCase().includes(r.roomType.toLowerCase()) ||
        r.roomType.toLowerCase().includes(p.room.toLowerCase().split(' ')[0])
      );

      let status: 'ideal' | 'acceptable' | 'dosha' | 'unknown' = 'unknown';
      if (placement && r.zone) {
        if (placement.idealZones.includes(r.zone as VastuDirection)) status = 'ideal';
        else if (placement.acceptableZones.includes(r.zone as VastuDirection)) status = 'acceptable';
        else if (placement.avoidZones.includes(r.zone as VastuDirection)) status = 'dosha';
      }

      return { room: r.roomType, currentZone: r.zone, placement: placement || ROOM_PLACEMENTS[0], status };
    });
}

// ─── NARRATIVE GENERATOR ──────────────────────────────────────────────────

function generateNarrative(
  input: VastuInput,
  overallScore: number,
  detectedDoshas: DetectedDosha[],
  personalHarmony: PersonalHarmony | null
): string {
  const parts: string[] = [];
  const severeCount = detectedDoshas.filter(d => d.dosha.severity === 'severe').length;
  const totalCount = detectedDoshas.length;

  // Opening assessment
  if (overallScore >= 75) {
    parts.push(`This ${input.propertyType} carries strong foundational Vastu energy, scoring ${overallScore}/100 overall. The layout preserves key energy channels and the Vastu Purusha is largely undisturbed.`);
  } else if (overallScore >= 50) {
    parts.push(`This ${input.propertyType} shows moderate Vastu harmony at ${overallScore}/100. While the property has inherent potential, ${totalCount > 0 ? `${totalCount} dosha${totalCount > 1 ? 's' : ''} detected require${totalCount === 1 ? 's' : ''} attention` : 'some imbalances are present'} to restore full energy flow.`);
  } else {
    parts.push(`This ${input.propertyType} requires significant Vastu attention, scoring ${overallScore}/100. ${severeCount > 0 ? `${severeCount} severe dosha${severeCount > 1 ? 's' : ''} ${severeCount > 1 ? 'are' : 'is'} disturbing critical energy zones.` : 'Multiple energy imbalances are affecting the natural prana flow of the space.'}`);
  }

  // Entrance analysis
  if (input.mainEntranceDirection) {
    const entranceData = DIRECTION_ZONES.find(z => z.code === input.mainEntranceDirection);
    if (entranceData) {
      const isGoodEntrance = ['N', 'NE', 'E', 'NNE', 'ENE'].includes(input.mainEntranceDirection);
      const isBadEntrance = ['SW', 'S', 'SSW'].includes(input.mainEntranceDirection);
      if (isGoodEntrance) {
        parts.push(`The main entrance facing ${entranceData.name} is a positive feature — ${entranceData.devta} energy enters the property, bringing ${entranceData.quality.toLowerCase()}.`);
      } else if (isBadEntrance) {
        parts.push(`The main entrance in ${entranceData.name} is a significant concern. ${entranceData.devta} oversees this zone — when the entrance faces this direction, ${entranceData.energy.toLowerCase()}.`);
      } else {
        parts.push(`The main entrance faces ${entranceData.name}, governed by ${entranceData.devta}. This direction brings ${entranceData.quality.toLowerCase()} — a neutral to acceptable placement for most property types.`);
      }
    }
  }

  // Top dosha narrative
  if (detectedDoshas.length > 0) {
    const topDosha = detectedDoshas.find(d => d.dosha.severity === 'severe') || detectedDoshas[0];
    parts.push(`The most critical concern is ${topDosha.dosha.name}. This disturbs ${topDosha.dosha.devtaDisturbed}, the presiding deity of this zone, and creates: ${topDosha.dosha.effect}.`);
  }

  // Personal harmony narrative
  if (personalHarmony) {
    const lpNum = personalHarmony.lifePathNumber;
    const affinity = NUMBER_VASTU_AFFINITY[lpNum!];
    if (affinity) {
      parts.push(`Personal Vastu Harmony: ${personalHarmony.guidance}`);
      if (personalHarmony.weakZonesAffected) {
        parts.push(`Notably, one or more doshas are affecting the zones most sensitive for a Life Path ${lpNum} individual. This means the Vastu imbalances are likely amplifying existing life challenges — especially in ${affinity.weakZones.join(' and ')} zone${affinity.weakZones.length > 1 ? 's' : ''}.`);
      }
    }
  }

  // Positive features
  const hasGoodNE = !detectedDoshas.some(d => d.dosha.zone === 'NE');
  const hasGoodN = !detectedDoshas.some(d => d.dosha.zone === 'N');
  if (hasGoodNE) parts.push('The NE (Ishan) zone is clean — divine blessings, clarity and spiritual support flow freely into this property.');
  if (hasGoodN && !hasGoodNE) parts.push('The North zone is undisturbed, keeping Kubera\'s wealth pathways open.');

  return parts.join('\n\n');
}

// ─── PERSONAL YEAR VASTU OVERLAY ──────────────────────────────────────────

function generatePYVastuOverlay(py: string | undefined, detectedDoshas: DetectedDosha[]): string | undefined {
  if (!py) return undefined;
  const pyNum = parseInt(py);
  if (!pyNum || pyNum < 1 || pyNum > 9) return undefined;

  const PY_ZONE_FOCUS: Record<number, { zone: VastuDirection; focus: string; action: string }> = {
    1: { zone: 'NE', focus: 'New beginnings, fresh starts', action: 'Energise the NE corner with prayer, fresh flowers and clear water. Remove all clutter from NE to allow new-cycle energy to enter.' },
    2: { zone: 'NW', focus: 'Partnerships, support, patience', action: 'Activate NW with wind chimes and white flowers. Ensure the NW guest room or space is welcoming — support will come through people.' },
    3: { zone: 'E', focus: 'Creativity, expression, expansion', action: 'Keep East open, bright and well-lit. East-facing creative workspace or a vibrant green plant in the East amplifies PY 3 energy.' },
    4: { zone: 'SW', focus: 'Foundation building, discipline', action: 'Reinforce SW with heavy furniture, dark earthy colors and a locker or safe. PY 4 rewards solid structure — make the SW the most stable point of the property.' },
    5: { zone: 'N', focus: 'Change, freedom, new opportunities', action: 'Keep the North zone clear and uncluttered. A Kubera yantra activated now opens pathways for the rapid changes and opportunities PY 5 brings.' },
    6: { zone: 'SW', focus: 'Relationships, responsibility, home', action: 'Beautify the SW and master bedroom zone. Rose quartz or pink crystals in the SW corner of the bedroom amplify loving relationship energy.' },
    7: { zone: 'NE', focus: 'Introspection, spiritual seeking', action: 'Create a sacred meditation corner in the NE with a prayer setup or Sri Yantra. PY 7 deepens through spiritual practice — the NE amplifies this work.' },
    8: { zone: 'S', focus: 'Material achievement, authority', action: 'Strengthen the South with heavy earthy elements and red/burgundy accents. A powerful, uncluttered South supports the authority and abundance PY 8 activates.' },
    9: { zone: 'N', focus: 'Completion, release, humanitarian', action: 'Clear the North of all blocks — this is a year of releasing what no longer serves. Donate unused items, especially from the North and NE zones.' },
  };

  const pySuggestion = PY_ZONE_FOCUS[pyNum];
  if (!pySuggestion) return undefined;

  const hasDosha = detectedDoshas.some(d => d.dosha.zone === pySuggestion.zone);
  const urgency = hasDosha
    ? `CRITICAL: This zone has an active dosha AND is your PY ${pyNum} focal zone — addressing this dosha should be your highest priority this year.`
    : `The ${pySuggestion.zone} zone is currently clear — ideal conditions for amplifying your PY ${pyNum} energy.`;

  return `Personal Year ${pyNum} — ${pySuggestion.focus}\n\nFocal Zone: ${pySuggestion.zone} (${DIRECTION_ZONES.find(z => z.code === pySuggestion.zone)?.name})\n\n${pySuggestion.action}\n\n${urgency}`;
}

// ─── MAIN ENGINE FUNCTION ─────────────────────────────────────────────────

export function analyseVastu(input: VastuInput): VastuReport {
  // Detect all doshas
  const roomDoshas = detectRoomDoshas(input.rooms);
  const entranceDoshas = detectEntranceDoshas(input.mainEntranceDirection);
  const structuralDoshas = detectStructuralDoshas(input.structuralIssues, input.slopeDirection);

  // Deduplicate
  const seen = new Set<string>();
  const allDetected: DetectedDosha[] = [];
  [...entranceDoshas, ...roomDoshas, ...structuralDoshas].forEach(d => {
    if (!seen.has(d.dosha.id)) {
      seen.add(d.dosha.id);
      allDetected.push(d);
    }
  });

  const activeDoshaIds = allDetected.map(d => d.dosha.id);

  // Scores
  const overallScore = getOverallHarmonyScore(activeDoshaIds);

  let scoreLabel: string;
  if (overallScore >= 80) scoreLabel = 'Excellent';
  else if (overallScore >= 65) scoreLabel = 'Good';
  else if (overallScore >= 50) scoreLabel = 'Moderate';
  else if (overallScore >= 35) scoreLabel = 'Needs Attention';
  else scoreLabel = 'Critical';

  // Zone analysis
  const zoneAnalysis = buildZoneAnalysis(activeDoshaIds);

  // Personal harmony
  const personalHarmony = analysePersonalHarmony(input.numerologyContext, allDetected, input.mainEntranceDirection);

  // Remedies
  const { priority: priorityRemedies, all: allRemedies } = prioritiseRemedies(allDetected);

  // Room guide
  const roomGuide = buildRoomGuide(input.rooms);

  // Positive features
  const positiveFeatures: string[] = [];
  const cleanZones = zoneAnalysis.filter(z => z.status === 'excellent' || z.status === 'good');
  cleanZones.forEach(z => positiveFeatures.push(`${z.name} zone is clean — ${z.devta} energy is active`));
  if (input.mainEntranceDirection && ['N', 'NE', 'E', 'NNE'].includes(input.mainEntranceDirection)) {
    positiveFeatures.push(`Auspicious ${input.mainEntranceDirection} entrance draws positive energy into the property`);
  }
  if (input.slopeDirection === 'NE-high') {
    positiveFeatures.push('Favourable slope — property slopes toward NE, allowing energy to flow toward the sacred corner');
  }

  // Narrative
  const narrative = generateNarrative(input, overallScore, allDetected, personalHarmony);

  // Personal Year overlay
  const personalYearVastu = generatePYVastuOverlay(
    input.numerologyContext?.personalYear,
    allDetected
  );

  // Top 3 doshas by severity
  const topDoshas = [...allDetected].sort((a, b) => {
    const sev = { severe: 0, moderate: 1, mild: 2 };
    return sev[a.dosha.severity] - sev[b.dosha.severity];
  }).slice(0, 3);

  return {
    overallScore,
    scoreLabel,
    summary: narrative.split('\n\n')[0],
    detectedDoshas: allDetected,
    zoneAnalysis,
    topDoshas,
    priorityRemedies,
    allRemedies,
    personalHarmony,
    roomGuide,
    positiveFeatures,
    narrative,
    personalYearVastu,
    generatedAt: new Date().toISOString(),
  };
}
