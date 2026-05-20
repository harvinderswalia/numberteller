import { useState, useRef, useCallback } from 'react';
import { Compass, ChevronRight, RotateCcw, Home, AlertTriangle, CheckCircle, RefreshCw, Hash, Zap, Shield, ChevronDown, BookOpen, Layers, TrendingUp, Upload, X, Image as ImageIcon, Info, Plus } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';
import {
  DIRECTION_ZONES, ALL_DOSHAS, ROOM_PLACEMENTS, VASTU_DEVTAS, VastuDirection,
} from '../data/vastuData';
import {
  analyseVastu, VastuInput, VastuReport, RoomEntry,
} from '../utils/vastuEngine';

interface SharedNumerologyContext {
  name?: string;
  lifePath?: string;
  expression?: string;
  soulUrge?: string;
  personalYear?: string;
  birthday?: string;
}

interface VastuPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  sharedNumerology?: SharedNumerologyContext | null;
}

type Step = 'input' | 'analysis' | 'remedies' | 'report';
type RemedyTab = 'non-structural' | 'structural';
type PropertyType = 'apartment' | 'house' | 'office' | 'plot';

const DIRECTION_OPTIONS: VastuDirection[] = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
];
const DIRECTION_LABELS: Record<VastuDirection, string> = {
  N: 'North', NNE: 'North-North-East', NE: 'North-East (Ishan)', ENE: 'East-North-East',
  E: 'East', ESE: 'East-South-East', SE: 'South-East (Agneya)', SSE: 'South-South-East',
  S: 'South', SSW: 'South-South-West', SW: 'South-West (Nairitya)', WSW: 'West-South-West',
  W: 'West', WNW: 'West-North-West', NW: 'North-West (Vayavya)', NNW: 'North-North-West'
};

// ─── PROPERTY-TYPE ROOM PRESETS ────────────────────────────────────────────

const ROOM_PRESETS: Record<PropertyType, string[]> = {
  apartment: [
    'Master Bedroom', 'Bedroom 2', 'Bedroom 3',
    'Kitchen', 'Living Room / Hall', 'Dining Room',
    'Prayer Room / Puja', 'Toilet / Bathroom (Master)', 'Toilet / Bathroom 2',
    'Balcony (Main)', 'Store Room / Utility',
  ],
  house: [
    'Master Bedroom', 'Bedroom 2', 'Bedroom 3', 'Bedroom 4',
    'Kitchen', 'Living Room / Hall', 'Dining Room', 'Drawing Room',
    'Prayer Room / Puja', 'Toilet / Bathroom (Master)', 'Toilet / Bathroom 2',
    'Study Room', 'Pooja Room', 'Guest Room',
    'Garage / Parking', 'Garden / Lawn Area',
    'Store Room / Basement', 'Staircase', 'Overhead Water Tank',
  ],
  office: [
    "Owner's Cabin / MD Room", 'Director Cabin', 'Manager Cabin',
    'Reception / Lobby', 'Conference Room / Board Room',
    'Open Work Area / Cubicles', 'Finance / Accounts Department',
    'HR Department', 'Sales Department', 'IT / Server Room',
    'Pantry / Office Kitchen', 'Toilet / Washroom',
    'Store Room / Archive', 'Staircase / Lift',
    'Main Entry / Entrance Lobby', 'Parking Area',
  ],
  plot: [
    'Main Gate / Entrance', 'Well / Borewell / Underground Water',
    'Overhead Water Tank', 'Septic Tank / Drainage Pit',
    'Garden / Lawn (NE area)', 'Garden / Lawn (SW area)',
    'Tree / Large Plant (SW)', 'Tree / Large Plant (NE)',
    'Proposed Main Building', 'Proposed Kitchen Area',
    'Proposed Servants Quarters', 'Compound Wall (High)',
  ],
};

// ─── PROPERTY-TYPE STRUCTURAL DOSHAS ──────────────────────────────────────

const DOSHA_FILTER_BY_TYPE: Record<PropertyType, string[]> = {
  apartment: [
    'ne-toilet', 'ne-kitchen', 'ne-master-bed', 'ne-cut', 'ne-heavy-wall',
    'se-water', 'se-master-bed', 'se-entrance',
    'sw-entrance', 'sw-toilet', 'sw-cut', 'sw-open',
    's-entrance', 'n-heavy-wall', 'n-toilet',
    'bs-toilet', 'bs-staircase', 'e-heavy-wall', 'e-toilet',
  ],
  house: [
    'ne-toilet', 'ne-kitchen', 'ne-master-bed', 'ne-cut', 'ne-heavy-wall',
    'se-water', 'se-master-bed', 'se-entrance',
    'sw-entrance', 'sw-toilet', 'sw-cut', 'sw-open',
    's-entrance', 's-open',
    'n-heavy-wall', 'n-toilet',
    'bs-toilet', 'bs-staircase', 'bs-heavy-column',
    'e-heavy-wall', 'e-toilet', 'nw-kitchen',
    'slope-sw-high', 'slope-ne-high',
  ],
  office: [
    'ne-toilet', 'ne-kitchen', 'ne-cut', 'ne-heavy-wall',
    'se-water', 'se-entrance',
    'sw-entrance', 'sw-toilet', 'sw-cut',
    's-entrance', 'n-heavy-wall',
    'bs-toilet', 'bs-staircase', 'bs-heavy-column',
    'e-heavy-wall',
  ],
  plot: [
    'ne-cut', 'ne-heavy-wall',
    'sw-cut', 'sw-open',
    's-open', 'n-heavy-wall',
    'e-heavy-wall',
    'slope-sw-high', 'slope-ne-high',
  ],
};

// ─── LABELS BY PROPERTY TYPE ───────────────────────────────────────────────

const PROPERTY_CONFIG: Record<PropertyType, {
  entranceLabel: string;
  clientLabel: string;
  roomSectionLabel: string;
  slopeVisible: boolean;
}> = {
  apartment: {
    entranceLabel: 'Main Entrance / Front Door Direction',
    clientLabel: 'Client / Occupant Numerology',
    roomSectionLabel: 'Room & Zone Mapping',
    slopeVisible: false,
  },
  house: {
    entranceLabel: 'Main Gate / Entrance Direction',
    clientLabel: 'Client / Owner Numerology',
    roomSectionLabel: 'Room & Zone Mapping',
    slopeVisible: true,
  },
  office: {
    entranceLabel: 'Main Office Entry / Reception Entrance Direction',
    clientLabel: 'Business Owner Numerology',
    roomSectionLabel: 'Department & Space Zone Mapping',
    slopeVisible: false,
  },
  plot: {
    entranceLabel: 'Main Gate / Plot Entry Direction',
    clientLabel: 'Owner / Developer Numerology',
    roomSectionLabel: 'Proposed / Existing Zones',
    slopeVisible: true,
  },
};

// ─── SCORE CONFIG ──────────────────────────────────────────────────────────

const SCORE_CONFIG = (score: number) => {
  if (score >= 80) return { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', bar: 'bg-emerald-500', label: 'Excellent' };
  if (score >= 65) return { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', bar: 'bg-blue-500', label: 'Good' };
  if (score >= 50) return { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', bar: 'bg-amber-500', label: 'Moderate' };
  if (score >= 35) return { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', bar: 'bg-orange-500', label: 'Needs Attention' };
  return { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', bar: 'bg-red-500', label: 'Critical' };
};

const SEVERITY_CONFIG = {
  severe: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', dot: 'bg-red-400', label: 'Severe' },
  moderate: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-400', label: 'Moderate' },
  mild: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', dot: 'bg-blue-400', label: 'Mild' },
};

const ZONE_STATUS_CONFIG = {
  excellent: { color: 'text-emerald-400', bar: 'bg-emerald-500' },
  good: { color: 'text-blue-400', bar: 'bg-blue-500' },
  caution: { color: 'text-amber-400', bar: 'bg-amber-500' },
  dosha: { color: 'text-red-400', bar: 'bg-red-500' },
};

// ─── COMPASS COMPONENT ─────────────────────────────────────────────────────

function CompassRing({ direction, onSelect }: { direction: VastuDirection | ''; onSelect?: (d: VastuDirection) => void }) {
  const compassPoints = [
    { dir: 'N' as VastuDirection, angle: 0 },
    { dir: 'NE' as VastuDirection, angle: 45 },
    { dir: 'E' as VastuDirection, angle: 90 },
    { dir: 'SE' as VastuDirection, angle: 135 },
    { dir: 'S' as VastuDirection, angle: 180 },
    { dir: 'SW' as VastuDirection, angle: 225 },
    { dir: 'W' as VastuDirection, angle: 270 },
    { dir: 'NW' as VastuDirection, angle: 315 },
  ];

  const ANGLE_MAP: Record<VastuDirection, number> = {
    N: 0, NNE: 22.5, NE: 45, ENE: 67.5, E: 90, ESE: 112.5,
    SE: 135, SSE: 157.5, S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
    W: 270, WNW: 292.5, NW: 315, NNW: 337.5
  };

  const selectedAngle = direction ? ANGLE_MAP[direction] : null;

  return (
    <div className="relative w-48 h-48 mx-auto select-none">
      <div className="absolute inset-0 rounded-full border-2 border-white/10 bg-slate-800/60" />
      <div className="absolute inset-4 rounded-full border border-white/5" />
      {/* Degree tick marks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = i * 22.5;
        const rad = (angle - 90) * (Math.PI / 180);
        const x1 = 50 + 46 * Math.cos(rad);
        const y1 = 50 + 46 * Math.sin(rad);
        const x2 = 50 + 49 * Math.cos(rad);
        const y2 = 50 + 49 * Math.sin(rad);
        return (
          <svg key={i} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          </svg>
        );
      })}
      {compassPoints.map(({ dir, angle }) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const x = 50 + 41 * Math.cos(rad);
        const y = 50 + 41 * Math.sin(rad);
        const isSelected = direction && (direction === dir || direction.startsWith(dir));
        return (
          <button
            key={dir}
            onClick={() => onSelect?.(dir)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold transition-all rounded-sm px-0.5 ${
              onSelect ? 'cursor-pointer hover:text-amber-300' : ''
            } ${isSelected ? 'text-amber-400' : dir === 'N' || dir === 'S' || dir === 'E' || dir === 'W' ? 'text-gray-300' : 'text-gray-600'}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {dir}
          </button>
        );
      })}
      {/* Needle */}
      {selectedAngle !== null && (
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `rotate(${selectedAngle}deg)` }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <line x1="50" y1="50" x2="50" y2="12" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="50,8 47,14 53,14" fill="#f59e0b" />
          </svg>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
      </div>
      {direction && (
        <div className="absolute -bottom-7 left-0 right-0 text-center text-xs text-amber-300 font-semibold pointer-events-none">
          {DIRECTION_LABELS[direction as VastuDirection]?.split(' (')[0] || direction}
        </div>
      )}
    </div>
  );
}

// ─── LAYOUT IMAGE OVERLAY ──────────────────────────────────────────────────

interface NorthMark { x: number; y: number }

function LayoutImageAnalyser({
  onDirectionDetected,
  onClear,
}: {
  onDirectionDetected: (dir: VastuDirection) => void;
  onClear: () => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [northMark, setNorthMark] = useState<NorthMark | null>(null);
  const [entranceMark, setEntranceMark] = useState<NorthMark | null>(null);
  const [markMode, setMarkMode] = useState<'north' | 'entrance' | null>(null);
  const [detectedDir, setDetectedDir] = useState<VastuDirection | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setNorthMark(null);
    setEntranceMark(null);
    setDetectedDir(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!markMode || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (markMode === 'north') {
      setNorthMark({ x, y });
      setMarkMode(null);
    } else if (markMode === 'entrance') {
      setEntranceMark({ x, y });
      setMarkMode(null);
    }
  };

  // Compute direction from north and entrance marks
  const computeDirection = () => {
    if (!northMark || !entranceMark) return;
    // Center of property (assumed midpoint of image)
    const cx = 50, cy = 50;
    // North vector: from center to north mark
    const nVec = { x: northMark.x - cx, y: northMark.y - cy };
    // Entrance vector: from center to entrance mark
    const eVec = { x: entranceMark.x - cx, y: entranceMark.y - cy };

    // Angle of north vector (reference direction)
    const northAngle = Math.atan2(nVec.y, nVec.x) * (180 / Math.PI);
    // Angle of entrance vector
    const entranceAngle = Math.atan2(eVec.y, eVec.x) * (180 / Math.PI);

    // Compass bearing: 0 = North, clockwise
    // SVG y-axis is flipped vs compass. Compass north bearing of entrance:
    let bearing = entranceAngle - northAngle;
    // Normalize bearing: In SVG, y increases downward. North in compass = up = SVG y negative.
    // North mark going upward means nVec.y < 0 (smaller y = up in SVG).
    // We need the compass angle of the entrance relative to true north.
    // Compass bearing formula: angle where North=0, East=90, South=180, West=270
    // If north mark is "up" (nVec pointing upward in SVG = negative y), then
    // the SVG angle of north = -90 degrees from SVG x-axis.
    // We rotate the entrance vector by -(northAngle + 90) to align north with 0.
    let compassBearing = entranceAngle - northAngle - 90;
    // Normalize to 0-360
    compassBearing = ((compassBearing % 360) + 360) % 360;

    // Map to 16 zones
    const zones: VastuDirection[] = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const zoneAngle = 360 / 16;
    const idx = Math.round(compassBearing / zoneAngle) % 16;
    const dir = zones[idx];
    setDetectedDir(dir);
    onDirectionDetected(dir);
  };

  const clearImage = () => {
    setImageUrl(null);
    setNorthMark(null);
    setEntranceMark(null);
    setDetectedDir(null);
    setMarkMode(null);
    onClear();
  };

  if (!imageUrl) {
    return (
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
          dragActive ? 'border-amber-500/60 bg-amber-500/5' : 'border-white/15 bg-slate-800/40 hover:border-white/25 hover:bg-slate-800/60'
        }`}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
        <p className="text-white font-semibold mb-1">Upload Floor Plan / Layout Image</p>
        <p className="text-gray-500 text-sm mb-3">Drag & drop or click to upload JPG, PNG, PDF screenshot</p>
        <p className="text-gray-600 text-xs">After uploading: mark North direction on the image, then mark the main entrance — direction will be auto-calculated</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setMarkMode(markMode === 'north' ? null : 'north')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              markMode === 'north' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' :
              northMark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-700 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            {northMark ? 'N marked' : markMode === 'north' ? 'Click image for North' : 'Mark North'}
          </button>
          <button
            onClick={() => setMarkMode(markMode === 'entrance' ? null : 'entrance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              markMode === 'entrance' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' :
              entranceMark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-700 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {entranceMark ? 'Entrance marked' : markMode === 'entrance' ? 'Click image for Entrance' : 'Mark Entrance'}
          </button>
          {northMark && entranceMark && (
            <button
              onClick={computeDirection}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all"
            >
              <Compass className="w-3.5 h-3.5" /> Auto-Detect Direction
            </button>
          )}
        </div>
        <button onClick={clearImage} className="text-gray-500 hover:text-red-400 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image canvas */}
      <div
        ref={imgRef}
        className={`relative overflow-hidden bg-slate-900 ${markMode ? 'cursor-crosshair' : 'cursor-default'}`}
        style={{ maxHeight: 400 }}
        onClick={handleClick}
      >
        <img src={imageUrl} alt="Floor plan" className="w-full object-contain" style={{ maxHeight: 400 }} />

        {/* North marker */}
        {northMark && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${northMark.x}%`, top: `${northMark.y}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-blue-500/90 border-2 border-white flex items-center justify-center shadow-lg shadow-blue-500/50">
              <span className="text-white text-[10px] font-black">N</span>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-blue-300 text-[9px] font-bold whitespace-nowrap">True North</div>
          </div>
        )}

        {/* Entrance marker */}
        {entranceMark && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${entranceMark.x}%`, top: `${entranceMark.y}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-amber-500/90 border-2 border-white flex items-center justify-center shadow-lg shadow-amber-500/50">
              <span className="text-white text-[9px] font-black">E</span>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-amber-300 text-[9px] font-bold whitespace-nowrap">Entrance</div>
          </div>
        )}

        {/* Direction line between marks */}
        {northMark && entranceMark && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(245,158,11,0.8)" />
              </marker>
            </defs>
            <line
              x1={`${northMark.x}%`} y1={`${northMark.y}%`}
              x2={`${entranceMark.x}%`} y2={`${entranceMark.y}%`}
              stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" strokeDasharray="4 3"
              markerEnd="url(#arrow)"
            />
          </svg>
        )}

        {/* Mode hint overlay */}
        {markMode && (
          <div className="absolute top-2 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-slate-900/90 text-amber-300 text-xs px-3 py-1.5 rounded-full border border-amber-500/30 font-medium">
              {markMode === 'north' ? 'Click to mark North direction on the plan' : 'Click to mark the Main Entrance position'}
            </div>
          </div>
        )}
      </div>

      {/* Detected result */}
      {detectedDir && (
        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 border-t border-emerald-500/20">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <p className="text-emerald-300 text-sm font-semibold">
            Direction auto-detected: <span className="text-white">{DIRECTION_LABELS[detectedDir]}</span>
          </p>
          <span className="text-emerald-400/60 text-xs ml-auto">Applied to entrance selector</span>
        </div>
      )}

      {(!northMark || !entranceMark) && (
        <div className="flex items-start gap-2 px-4 py-3 border-t border-white/5">
          <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-gray-500 text-xs leading-relaxed">
            {!northMark && !entranceMark && 'Click "Mark North" then tap the true north point on your floor plan. Then "Mark Entrance" and tap the main door position.'}
            {northMark && !entranceMark && 'North marked. Now click "Mark Entrance" and tap the main entrance/door on the plan.'}
            {!northMark && entranceMark && 'Entrance marked. Now click "Mark North" and tap where north is on the plan.'}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE COMPONENT ───────────────────────────────────────────────────

export default function VastuPage({ onNavigate, onShowAuth, sharedNumerology }: VastuPageProps) {
  const [step, setStep] = useState<Step>('input');
  const [report, setReport] = useState<VastuReport | null>(null);
  const [remedyTab, setRemedyTab] = useState<RemedyTab>('non-structural');
  const [expandedZone, setExpandedZone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'zones' | 'rooms' | 'devtas'>('overview');

  // Form state
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [entranceDir, setEntranceDir] = useState<VastuDirection | ''>('');
  const [rooms, setRooms] = useState<RoomEntry[]>(() => buildDefaultRooms('apartment'));
  const [structuralIssues, setStructuralIssues] = useState<string[]>([]);
  const [slopeDir, setSlopeDir] = useState<VastuInput['slopeDirection']>('');
  const [numerologyCtx, setNumerologyCtx] = useState({
    name: sharedNumerology?.name || '',
    lifePath: sharedNumerology?.lifePath || '',
    expression: sharedNumerology?.expression || '',
    soulUrge: sharedNumerology?.soulUrge || '',
    personalYear: sharedNumerology?.personalYear || '',
  });
  const chartAutoFilled = !!(sharedNumerology?.lifePath || sharedNumerology?.name);

  function buildDefaultRooms(type: PropertyType): RoomEntry[] {
    // Pre-fill the most important rooms per type with empty zones
    const defaults: Record<PropertyType, string[]> = {
      apartment: ['Master Bedroom', 'Kitchen', 'Prayer Room / Puja', 'Living Room / Hall', 'Toilet / Bathroom (Master)'],
      house: ['Master Bedroom', 'Kitchen', 'Prayer Room / Puja', 'Living Room / Hall', 'Toilet / Bathroom (Master)', 'Garage / Parking'],
      office: ["Owner's Cabin / MD Room", 'Reception / Lobby', 'Pantry / Office Kitchen', 'Toilet / Washroom', 'Finance / Accounts Department'],
      plot: ['Main Gate / Entrance', 'Well / Borewell / Underground Water', 'Proposed Main Building', 'Septic Tank / Drainage Pit'],
    };
    return defaults[type].map(r => ({ roomType: r, zone: '' }));
  }

  const handlePropertyTypeChange = (t: PropertyType) => {
    setPropertyType(t);
    setRooms(buildDefaultRooms(t));
    setStructuralIssues([]);
  };

  const cfg = PROPERTY_CONFIG[propertyType];
  const availableDoshas = ALL_DOSHAS.filter(d => DOSHA_FILTER_BY_TYPE[propertyType].includes(d.id));

  const runAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      const input: VastuInput = {
        propertyType,
        mainEntranceDirection: entranceDir,
        rooms: rooms.filter(r => r.roomType.trim()),
        structuralIssues,
        slopeDirection: slopeDir,
        numerologyContext: Object.values(numerologyCtx).some(v => v.trim()) ? numerologyCtx : undefined,
      };
      const result = analyseVastu(input);
      setReport(result);
      setStep('analysis');
      setLoading(false);
    }, 500);
  };

  const reset = () => {
    setStep('input');
    setReport(null);
    setEntranceDir('');
    setRooms(buildDefaultRooms(propertyType));
    setStructuralIssues([]);
    setSlopeDir('');
    setNumerologyCtx({ name: '', lifePath: '', expression: '', soulUrge: '', personalYear: '' });
    setActiveTab('overview');
  };

  const addRoom = () => setRooms(r => [...r, { roomType: '', zone: '' }]);
  const updateRoom = (i: number, key: keyof RoomEntry, val: string) =>
    setRooms(r => r.map((room, idx) => idx === i ? { ...room, [key]: val } : room));
  const removeRoom = (i: number) => setRooms(r => r.filter((_, idx) => idx !== i));
  const toggleStructural = (id: string) =>
    setStructuralIssues(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const canAnalyse = entranceDir !== '' || rooms.some(r => r.zone !== '');

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} currentPage="vastu" />

      {/* ─── HERO ─── */}
      <section className="pt-24 pb-8 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 15% 60%, rgba(245,158,11,0.07) 0%, transparent 50%), radial-gradient(ellipse at 85% 30%, rgba(234,88,12,0.07) 0%, transparent 50%)`
        }} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-5 py-2 rounded-full mb-5 text-sm font-medium">
            <Compass className="w-4 h-4" />
            Vedic Vastu Shastra — Manasara & Mayamatam System
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Vastu Purusha
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              Analysis Engine
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Direction-precise dosha detection · 45 Devta mapping · Zone harmony scoring · Layered remedies · Numerology-integrated personal Vastu
          </p>
        </div>
      </section>

      {/* ─── PROGRESS BAR ─── */}
      <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {(['input', 'analysis', 'remedies', 'report'] as Step[]).map((s, i) => {
              const labels = { input: 'Property Input', analysis: 'Analysis', remedies: 'Remedies', report: 'Full Report' };
              const stepIdx = ['input', 'analysis', 'remedies', 'report'].indexOf(step);
              const isActive = step === s;
              const isDone = i < stepIdx;
              return (
                <div key={s} className="flex items-center gap-1">
                  <div
                    className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      isDone ? 'cursor-pointer' : 'cursor-default'
                    } ${isActive ? 'bg-amber-600 text-white' : isDone ? 'text-emerald-400 hover:text-emerald-300' : 'text-gray-500'}`}
                    onClick={() => isDone && setStep(s)}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isActive ? 'bg-white/20' : isDone ? 'bg-emerald-500/20' : 'bg-white/5'
                    }`}>{i + 1}</span>
                    <span className="hidden sm:inline">{labels[s]}</span>
                  </div>
                  {i < 3 && <ChevronRight className="w-3 h-3 text-gray-600 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ════════════════════════════════════════════════════
            STEP 1: INPUT
        ════════════════════════════════════════════════════ */}
        {step === 'input' && (
          <div className="max-w-3xl mx-auto space-y-6">

            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Property & Client Details</h2>
              <p className="text-gray-500 text-sm">For practitioner use — fill in all known details for the most accurate analysis.</p>
            </div>

            {/* ── 1. Property Type ── */}
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
              <label className="block text-sm font-semibold text-white mb-3">Property Type</label>
              <div className="grid grid-cols-4 gap-2">
                {([
                  { value: 'apartment', label: 'Apartment / Flat' },
                  { value: 'house', label: 'Independent House / Villa' },
                  { value: 'office', label: 'Office / Commercial' },
                  { value: 'plot', label: 'Plot / Land' },
                ] as { value: PropertyType; label: string }[]).map(t => (
                  <button
                    key={t.value}
                    onClick={() => handlePropertyTypeChange(t.value)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all leading-tight ${
                      propertyType === t.value
                        ? 'bg-amber-600/20 border-amber-500/50 text-amber-300'
                        : 'bg-slate-700/60 border-white/10 text-gray-400 hover:border-white/25 hover:text-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── 2. Layout Image Upload ── */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">Floor Plan / Layout Image</span>
                <span className="text-xs text-gray-500 bg-slate-700 px-2 py-0.5 rounded-full">Optional — Auto-Detects Direction</span>
              </div>
              <LayoutImageAnalyser
                onDirectionDetected={(dir) => setEntranceDir(dir)}
                onClear={() => {}}
              />
            </div>

            {/* ── 3. Main Entrance Direction ── */}
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
              <label className="block text-sm font-semibold text-white mb-4">{cfg.entranceLabel}</label>
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  <select
                    value={entranceDir}
                    onChange={e => setEntranceDir(e.target.value as VastuDirection | '')}
                    className="w-full bg-slate-900 border border-white/10 focus:border-amber-500/40 rounded-xl px-4 py-3 text-white outline-none text-sm"
                  >
                    <option value="">Select direction (or auto-detect from image above)</option>
                    {DIRECTION_OPTIONS.map(d => (
                      <option key={d} value={d}>{DIRECTION_LABELS[d]} ({d}) — {DIRECTION_ZONES.find(z => z.code === d)?.degrees[0].toFixed(1)}°–{DIRECTION_ZONES.find(z => z.code === d)?.degrees[1].toFixed(1)}°</option>
                    ))}
                  </select>
                  {entranceDir && (() => {
                    const zd = DIRECTION_ZONES.find(z => z.code === entranceDir);
                    if (!zd) return null;
                    const isGood = ['N', 'NE', 'E', 'NNE', 'ENE'].includes(entranceDir);
                    const isBad = ['SW', 'S', 'SSW'].includes(entranceDir);
                    return (
                      <div className={`p-4 rounded-xl border text-sm ${
                        isGood ? 'bg-emerald-500/10 border-emerald-500/20' :
                        isBad ? 'bg-red-500/10 border-red-500/20' :
                        'bg-slate-700/60 border-white/10'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {isGood && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                          {isBad && <AlertTriangle className="w-4 h-4 text-red-400" />}
                          <span className={`font-semibold ${isGood ? 'text-emerald-300' : isBad ? 'text-red-300' : 'text-gray-200'}`}>
                            {zd.devta}
                          </span>
                        </div>
                        <p className={`text-xs ${isGood ? 'text-emerald-300/70' : isBad ? 'text-red-300/70' : 'text-gray-400'}`}>
                          {zd.quality}
                        </p>
                        <p className={`text-xs mt-1 ${isBad ? 'text-red-400 font-semibold' : 'text-gray-500'}`}>
                          {isBad ? 'Severe dosha risk — see remedies after analysis' : isGood ? 'Auspicious direction — draws positive energy' : 'Neutral direction'}
                        </p>
                      </div>
                    );
                  })()}
                </div>
                <div className="flex flex-col items-center gap-3">
                  <CompassRing direction={entranceDir} onSelect={(d) => setEntranceDir(d)} />
                  <p className="text-[10px] text-gray-600 text-center">Click compass points to select direction</p>
                </div>
              </div>
            </div>

            {/* ── 4. Room / Zone Mapping ── */}
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="text-sm font-semibold text-white">{cfg.roomSectionLabel}</label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {propertyType === 'office'
                      ? 'Map each department/space to its compass zone'
                      : propertyType === 'plot'
                      ? 'Map proposed or existing elements to their zones'
                      : 'Map each room to its compass zone for dosha auto-detection'}
                  </p>
                </div>
                <button
                  onClick={addRoom}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-2">
                {rooms.map((room, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    {/* Room type — dropdown of presets + free text */}
                    <select
                      value={room.roomType}
                      onChange={e => updateRoom(i, 'roomType', e.target.value)}
                      className="flex-1 bg-slate-700/80 border border-white/10 focus:border-amber-500/30 rounded-xl px-3 py-2.5 text-white text-sm outline-none appearance-none"
                    >
                      <option value="">Select space type…</option>
                      <optgroup label={`— ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} Spaces —`}>
                        {ROOM_PRESETS[propertyType].map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </optgroup>
                      {/* Allow free text by having current value if not in list */}
                      {room.roomType && !ROOM_PRESETS[propertyType].includes(room.roomType) && (
                        <option value={room.roomType}>{room.roomType}</option>
                      )}
                    </select>
                    {/* Zone selector */}
                    <select
                      value={room.zone}
                      onChange={e => updateRoom(i, 'zone', e.target.value)}
                      className="bg-slate-700/80 border border-white/10 focus:border-amber-500/30 rounded-xl px-3 py-2.5 text-white text-sm outline-none min-w-[120px]"
                    >
                      <option value="">Zone?</option>
                      {DIRECTION_OPTIONS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                      <option value="Center">Center</option>
                    </select>
                    <button
                      onClick={() => removeRoom(i)}
                      className="text-gray-600 hover:text-red-400 text-xl leading-none transition-colors flex-shrink-0 w-7 h-7 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {/* Quick add free-text input */}
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-xs text-gray-600">Custom space not in list? Click "Add" above, then type a custom name in the dropdown and assign a zone.</p>
              </div>
            </div>

            {/* ── 5. Known Structural / Layout Issues ── */}
            <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5">
              <label className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Known Layout / Structural Issues
              </label>
              <p className="text-xs text-gray-500 mb-4">Check all that apply — these will be included in the dosha analysis</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {availableDoshas.map(d => {
                  const sc = SEVERITY_CONFIG[d.severity];
                  const isChecked = structuralIssues.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      onClick={() => toggleStructural(d.id)}
                      className={`flex items-start gap-2.5 text-left p-2.5 rounded-xl border transition-all ${
                        isChecked ? `${sc.bg} ${sc.color}` : 'bg-slate-700/40 border-white/8 text-gray-400 hover:border-white/20 hover:text-gray-300'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                        isChecked ? 'bg-current border-current' : 'border-white/20'
                      }`}>
                        {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs leading-relaxed flex-1">
                        {d.shortDescription}
                        <span className={`ml-1.5 text-[9px] font-black uppercase tracking-wide ${sc.color}`}>
                          [{d.severity}]
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 6. Property Slope (house/plot only) ── */}
            {cfg.slopeVisible && (
              <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5">
                <label className="block text-sm font-semibold text-white mb-3">Property Slope</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'flat', label: 'Flat / Unknown' },
                    { value: 'NE-high', label: 'Slopes down toward NE (SW higher)' },
                    { value: 'SW-high', label: 'Slopes down toward SW (NE higher)' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSlopeDir(opt.value as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all leading-snug ${
                        slopeDir === opt.value
                          ? opt.value === 'NE-high' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : opt.value === 'SW-high' ? 'bg-red-500/15 border-red-500/40 text-red-300'
                          : 'bg-amber-600/20 border-amber-500/50 text-amber-300'
                          : 'bg-slate-700/60 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">SW-higher-than-NE is the ideal Vastu slope — energy flows toward the sacred NE corner</p>
              </div>
            )}

            {/* ── 7. Numerology Integration ── */}
            <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Hash className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-semibold text-sm">{cfg.clientLabel} Integration</span>
                {chartAutoFilled ? (
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full">Pre-filled from Core Chart</span>
                ) : (
                  <span className="text-xs text-gray-500 bg-slate-700 px-2 py-0.5 rounded-full">Optional</span>
                )}
              </div>
              {chartAutoFilled ? (
                <p className="text-emerald-400/80 text-xs mb-4">Core numbers from the calculator have been pre-loaded. All five numbers are used for Personal Vastu Harmony — edit any field if needed.</p>
              ) : (
                <p className="text-gray-500 text-xs mb-4">Adds Personal Vastu Harmony — how the property's zone energy aligns with the client's full numerological blueprint (LP, Expression, Soul Urge, Personal Year).</p>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                {[
                  { key: 'name', label: propertyType === 'office' ? 'Owner / Business Name' : 'Client Name', placeholder: propertyType === 'office' ? 'e.g. Rajiv Mehra' : 'e.g. Priya Sharma' },
                  { key: 'lifePath', label: 'Life Path Number', placeholder: 'e.g. 8 or 22/4' },
                  { key: 'expression', label: 'Expression Number', placeholder: 'e.g. 3' },
                  { key: 'soulUrge', label: 'Soul Urge Number', placeholder: 'e.g. 9' },
                  { key: 'personalYear', label: 'Personal Year', placeholder: 'e.g. 4' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                    <input
                      type="text"
                      value={numerologyCtx[f.key as keyof typeof numerologyCtx]}
                      onChange={e => setNumerologyCtx(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-500/30 rounded-lg px-3 py-2.5 text-white placeholder-gray-600 text-sm outline-none"
                    />
                  </div>
                ))}
              </div>
              {!chartAutoFilled && (
                <button
                  onClick={() => onNavigate('calculator')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <Zap className="w-3 h-3" /> Calculate numerology in Core Chart first
                </button>
              )}
            </div>

            {/* ── RUN ANALYSIS ── */}
            <button
              onClick={runAnalysis}
              disabled={!canAnalyse || loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl disabled:opacity-40 hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/20 text-lg"
            >
              {loading
                ? <><RefreshCw className="w-5 h-5 animate-spin" /> Analysing Property…</>
                : <><Compass className="w-6 h-6" /> Run Vastu Analysis</>
              }
            </button>
            {!canAnalyse && (
              <p className="text-center text-gray-600 text-xs -mt-4">Provide at least the entrance direction or one room zone to run the analysis</p>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 2: ANALYSIS
        ════════════════════════════════════════════════════ */}
        {step === 'analysis' && report && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Vastu Analysis Complete</h2>
                <p className="text-gray-400 text-sm capitalize">
                  {propertyType === 'office' ? 'Office / Commercial' : propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} ·
                  Entrance: {entranceDir ? DIRECTION_LABELS[entranceDir as VastuDirection]?.split(' (')[0] : 'Not specified'}
                </p>
              </div>
              <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl border ${SCORE_CONFIG(report.overallScore).bg}`}>
                <div className="text-center">
                  <p className={`text-4xl font-bold ${SCORE_CONFIG(report.overallScore).color}`}>{report.overallScore}</p>
                  <p className="text-xs text-gray-500 mt-1">/ 100</p>
                </div>
                <div>
                  <p className={`text-lg font-bold ${SCORE_CONFIG(report.overallScore).color}`}>{report.scoreLabel}</p>
                  <p className="text-gray-500 text-xs">Overall Harmony</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl mb-8 overflow-x-auto">
              {(['overview', 'zones', 'rooms', 'devtas'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${
                    activeTab === t ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}>
                  {t === 'devtas' ? '45 Devtas' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" /> Vastu Assessment
                  </h3>
                  <div className="text-gray-300 text-sm leading-[1.9] whitespace-pre-line">{report.narrative}</div>
                </div>

                {report.topDoshas.length > 0 && (
                  <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" /> Priority Doshas
                    </h3>
                    <div className="space-y-3">
                      {report.topDoshas.map((d, i) => {
                        const sc = SEVERITY_CONFIG[d.dosha.severity];
                        return (
                          <div key={i} className={`bg-slate-800/60 border rounded-2xl p-5 ${sc.bg}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${sc.dot}`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="text-white font-semibold">{d.dosha.name}</span>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sc.bg} ${sc.color}`}>{sc.label}</span>
                                  <span className="text-[10px] text-gray-600 capitalize">{d.source === 'room-placement' ? 'auto-detected from room map' : 'marked as issue'}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Devta Disturbed: <span className="text-orange-300 font-medium">{d.dosha.devtaDisturbed}</span></p>
                                <p className="text-gray-300 text-sm leading-relaxed">{d.dosha.effect}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {d.dosha.lifeArea.map(a => (
                                    <span key={a} className="text-[10px] bg-slate-700 text-gray-400 px-2 py-0.5 rounded-full capitalize">{a}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {report.positiveFeatures.length > 0 && (
                  <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-5">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" /> Positive Features
                    </h3>
                    <ul className="space-y-2">
                      {report.positiveFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-emerald-300 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {report.personalHarmony && (
                  <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <Hash className="w-5 h-5 text-cyan-400" /> Personal Vastu Harmony — LP {report.personalHarmony.lifePathNumber}
                    </h3>
                    <p className="text-xs text-cyan-300/60 mb-3 font-mono">{report.personalHarmony.affinity}</p>
                    <p className="text-gray-200 text-sm leading-relaxed mb-3">{report.personalHarmony.guidance}</p>
                    {report.personalHarmony.criticalZone && (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-3">
                        <p className="text-amber-300 text-xs font-semibold">Critical Zone for LP {report.personalHarmony.lifePathNumber}:</p>
                        <p className="text-amber-200 text-sm mt-0.5">{report.personalHarmony.criticalZone}</p>
                      </div>
                    )}
                    {report.personalHarmony.weakZonesAffected && (
                      <p className="text-red-300 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                        Active doshas are in zones particularly sensitive for Life Path {report.personalHarmony.lifePathNumber}. These imbalances are likely amplifying existing life challenges.
                      </p>
                    )}
                  </div>
                )}

                {report.personalYearVastu && (
                  <div className="bg-blue-950/40 border border-blue-500/20 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" /> Personal Year Vastu Overlay
                    </h3>
                    <div className="text-gray-300 text-sm leading-[1.9] whitespace-pre-line">{report.personalYearVastu}</div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button onClick={() => setStep('remedies')}
                    className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg">
                    View Remedies <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ZONES */}
            {activeTab === 'zones' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {report.zoneAnalysis.map(zone => {
                  const sc = ZONE_STATUS_CONFIG[zone.status];
                  const isExpanded = expandedZone === zone.zone;
                  const zoneData = DIRECTION_ZONES.find(z => z.code === zone.zone);
                  return (
                    <div key={zone.zone}
                      className="bg-slate-800/60 border border-white/10 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all"
                      onClick={() => setExpandedZone(isExpanded ? null : zone.zone)}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-white font-semibold">{zone.name}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{zone.devta}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-2xl font-bold ${sc.color}`}>{zone.score}</span>
                          <p className="text-xs text-gray-600">/100</p>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3">
                        <div className={`h-1.5 rounded-full ${sc.bar}`} style={{ width: `${zone.score}%` }} />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-[10px] bg-slate-700 text-gray-400 px-2 py-0.5 rounded-full">{zone.element}</span>
                        <span className="text-[10px] bg-slate-700 text-gray-400 px-2 py-0.5 rounded-full">{zone.planet}</span>
                        {zone.doshas.map(d => (
                          <span key={d.id} className={`text-[10px] px-2 py-0.5 rounded-full border ${SEVERITY_CONFIG[d.severity].bg} ${SEVERITY_CONFIG[d.severity].color}`}>{d.severity}</span>
                        ))}
                      </div>
                      {isExpanded && zoneData && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-3">
                          <div><p className="text-xs text-gray-500 font-semibold mb-1">Ideal For</p><p className="text-gray-300 text-xs">{zoneData.idealFor.join(', ')}</p></div>
                          <div><p className="text-xs text-gray-500 font-semibold mb-1">Avoid Placing</p><p className="text-gray-400 text-xs">{zoneData.avoidFor.join(', ')}</p></div>
                          <div><p className="text-xs text-gray-500 font-semibold mb-1">Zone Energy</p><p className="text-gray-300 text-xs">{zoneData.energy}</p></div>
                          {zone.doshas.length > 0 && (
                            <div>
                              <p className="text-xs text-red-400 font-semibold mb-1">Active Doshas</p>
                              {zone.doshas.map(d => <p key={d.id} className="text-red-300 text-xs">{d.name} — {d.shortDescription}</p>)}
                            </div>
                          )}
                          {zone.strengths.length > 0 && (
                            <div>
                              <p className="text-xs text-emerald-400 font-semibold mb-1">Strengths</p>
                              {zone.strengths.map((s, i) => <p key={i} className="text-emerald-300 text-xs">{s}</p>)}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex justify-end mt-1">
                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ROOMS */}
            {activeTab === 'rooms' && (
              <div>
                {report.roomGuide.length > 0 ? (
                  <div className="space-y-3 mb-8">
                    {report.roomGuide.map((rg, i) => {
                      const sc = {
                        ideal: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Ideal Placement' },
                        acceptable: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', label: 'Acceptable' },
                        dosha: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', label: 'Dosha — Needs Remedy' },
                        unknown: { color: 'text-gray-400', bg: 'bg-slate-800 border-white/10', label: 'Zone Unknown' },
                      }[rg.status];
                      return (
                        <div key={i} className={`border rounded-2xl p-5 ${sc.bg}`}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <p className="text-white font-semibold">{rg.room}</p>
                              <p className="text-gray-500 text-xs mt-0.5">Zone: <span className="text-gray-300">{rg.currentZone ? `${rg.currentZone} — ${DIRECTION_LABELS[rg.currentZone as VastuDirection]?.split(' (')[0] || ''}` : 'Not specified'}</span></p>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full border flex-shrink-0 ${sc.bg} ${sc.color}`}>{sc.label}</span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed mb-2">{rg.placement.reason}</p>
                          <div className="flex flex-wrap gap-2 text-[10px]">
                            <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Ideal: {rg.placement.idealZones.join(', ')}</span>
                            {rg.placement.sleepDirection && <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Sleep: {rg.placement.sleepDirection}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500 mb-8">
                    <Home className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Add room/space zones in Step 1 to see the placement analysis here.</p>
                  </div>
                )}

                {/* Reference guide filtered by property type */}
                <h3 className="text-white font-bold mb-4">
                  Vedic Placement Reference — {propertyType === 'office' ? 'Commercial' : propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ROOM_PLACEMENTS
                    .filter(rp => propertyType !== 'office' || !['Master Bedroom', "Children's Bedroom"].includes(rp.room))
                    .slice(0, 8)
                    .map((rp, i) => (
                      <div key={i} className="bg-slate-800/60 border border-white/10 rounded-xl p-4">
                        <p className="text-white font-medium text-sm mb-1">{rp.room}</p>
                        <p className="text-emerald-400 text-xs mb-1">Ideal: {rp.idealZones.join(', ')}</p>
                        <p className="text-red-400 text-xs mb-2">Avoid: {rp.avoidZones.join(', ')}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{rp.reason}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* DEVTAS */}
            {activeTab === 'devtas' && (
              <div>
                <p className="text-gray-400 text-sm mb-6">The 45 Devtas of the Vastu Purusha Mandala preside over each zone. Identifying disturbed Devtas is the foundation of targeted Vastu remediation.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VASTU_DEVTAS.slice(0, 27).map(dev => (
                    <div key={dev.id} className="bg-slate-800/60 border border-white/10 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400 flex-shrink-0">
                          {dev.id}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{dev.name}</p>
                          <p className="text-amber-300/70 text-xs mb-1">{dev.zone} zone</p>
                          <p className="text-gray-400 text-xs leading-relaxed">{dev.domain}</p>
                          <p className="text-gray-600 text-[10px] mt-1.5 leading-relaxed">Remedy: {dev.offeringRemedy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 3: REMEDIES
        ════════════════════════════════════════════════════ */}
        {step === 'remedies' && report && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">Vastu Remedies</h2>
              <p className="text-gray-400 text-sm">
                {report.detectedDoshas.length} dosha{report.detectedDoshas.length !== 1 ? 's' : ''} detected ·
                {report.allRemedies.filter(r => r.type === 'non-structural').length} non-structural +
                {report.allRemedies.filter(r => r.type === 'structural').length} structural remedies
              </p>
            </div>

            <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl mb-6 w-fit">
              <button onClick={() => setRemedyTab('non-structural')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${remedyTab === 'non-structural' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                Non-Structural
              </button>
              <button onClick={() => setRemedyTab('structural')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${remedyTab === 'structural' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                Structural
              </button>
            </div>

            {remedyTab === 'non-structural' && (
              <div>
                <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 mb-5 text-sm text-emerald-300">
                  <span className="font-semibold">Non-Structural Remedies</span> — No demolition required. Ideal for apartments, rentals and immediate relief. Apply these first before any structural changes.
                </div>
                <div className="space-y-4">
                  {report.allRemedies.filter(r => r.type === 'non-structural').map((remedy, i) => {
                    const budgetColor = { low: 'text-emerald-400', medium: 'text-amber-400', high: 'text-red-400' };
                    return (
                      <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                              <p className="text-white font-semibold">{remedy.title}</p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 capitalize ${budgetColor[remedy.budget]}`}>{remedy.budget} cost</span>
                              <span className="text-[10px] text-gray-500 bg-slate-700 px-2 py-0.5 rounded-full capitalize">{remedy.category}</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">{remedy.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-2xl font-bold text-emerald-400">{remedy.effectiveness}%</p>
                            <p className="text-[10px] text-gray-600">effectiveness</p>
                          </div>
                        </div>
                        <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3 mb-3">
                          <p className="text-xs text-gray-500 font-semibold mb-1.5 uppercase tracking-wider">Instructions</p>
                          <p className="text-gray-300 text-xs leading-relaxed">{remedy.instructions}</p>
                        </div>
                        <p className="text-xs text-gray-600 flex items-center gap-1.5">
                          <RefreshCw className="w-3 h-3" /> Takes effect: {remedy.timeToEffect}
                        </p>
                      </div>
                    );
                  })}
                  {report.allRemedies.filter(r => r.type === 'non-structural').length === 0 && (
                    <p className="text-center text-gray-500 py-8">No non-structural remedies needed — excellent Vastu!</p>
                  )}
                </div>
              </div>
            )}

            {remedyTab === 'structural' && (
              <div>
                <div className="bg-amber-950/40 border border-amber-500/20 rounded-xl p-4 mb-5 text-sm text-amber-300">
                  <span className="font-semibold">Structural Remedies</span> — Require renovation or construction. Consult a qualified Vastu architect. These deliver the most permanent corrections.
                </div>
                <div className="space-y-4">
                  {report.allRemedies.filter(r => r.type === 'structural').map((remedy, i) => (
                    <div key={i} className="bg-slate-800/60 border border-amber-500/10 rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <p className="text-white font-semibold mb-1.5">{remedy.title}</p>
                          <p className="text-gray-400 text-sm leading-relaxed">{remedy.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-bold text-amber-400">{remedy.effectiveness}%</p>
                          <p className="text-[10px] text-gray-600">effectiveness</p>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3">
                        <p className="text-xs text-gray-500 font-semibold mb-1.5">Professional Guidance</p>
                        <p className="text-gray-300 text-xs leading-relaxed">{remedy.instructions}</p>
                      </div>
                    </div>
                  ))}
                  {report.allRemedies.filter(r => r.type === 'structural').length === 0 && (
                    <p className="text-center text-gray-500 py-8">No structural remedies for the doshas identified.</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep('analysis')} className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors">
                Back to Analysis
              </button>
              <button onClick={() => setStep('report')}
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all">
                Full Report <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 4: FULL REPORT
        ════════════════════════════════════════════════════ */}
        {step === 'report' && report && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Full Vastu Report</h2>
                <p className="text-gray-400 text-sm">Generated {new Date(report.generatedAt).toLocaleString()}</p>
              </div>
              <div className={`px-5 py-3 rounded-xl border ${SCORE_CONFIG(report.overallScore).bg} text-center`}>
                <p className={`text-3xl font-bold ${SCORE_CONFIG(report.overallScore).color}`}>{report.overallScore}/100</p>
                <p className="text-xs text-gray-500">{report.scoreLabel}</p>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Compass className="w-5 h-5 text-amber-400" /> Full Assessment</h3>
              <div className="text-gray-300 text-sm leading-[1.9] whitespace-pre-line">{report.narrative}</div>
            </div>

            {report.detectedDoshas.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-bold mb-4">All Detected Doshas ({report.detectedDoshas.length})</h3>
                <div className="space-y-2">
                  {report.detectedDoshas.map((d, i) => {
                    const sc = SEVERITY_CONFIG[d.dosha.severity];
                    return (
                      <div key={i} className={`border rounded-xl p-4 ${sc.bg}`}>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          <span className="text-white font-medium text-sm">{d.dosha.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${sc.bg} ${sc.color} font-bold`}>{sc.label}</span>
                          <span className="text-xs text-gray-500">{d.dosha.zone} zone</span>
                        </div>
                        <p className="text-gray-400 text-xs ml-3.5 leading-relaxed">{d.dosha.effect}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-white font-bold mb-4">Zone Harmony Scores</h3>
              <div className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden">
                {report.zoneAnalysis.map((zone, i) => {
                  const sc = ZONE_STATUS_CONFIG[zone.status];
                  return (
                    <div key={zone.zone} className={`flex items-center gap-4 px-5 py-3 ${i < report.zoneAnalysis.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <span className="text-gray-300 text-sm w-32 font-medium">{zone.name}</span>
                      <div className="flex-1 bg-slate-700 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${sc.bar}`} style={{ width: `${zone.score}%` }} />
                      </div>
                      <span className={`text-sm font-bold w-10 text-right ${sc.color}`}>{zone.score}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {report.priorityRemedies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-bold mb-4">Priority Remedies</h3>
                <div className="space-y-3">
                  {report.priorityRemedies.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-800/60 border border-white/10 rounded-xl p-4">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <div>
                        <p className="text-white font-medium text-sm">{r.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{r.description}</p>
                        <p className="text-emerald-400 text-xs mt-1">Effectiveness: {r.effectiveness}% · Takes effect: {r.timeToEffect}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-center text-gray-600 text-xs mb-8">
              Vastu analysis based on Manasara and Mayamatam traditions · NumberTeller Vastu Engine
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={reset} className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all">
                <RotateCcw className="w-5 h-5" /> New Analysis
              </button>
              <button onClick={() => onNavigate('calculator')} className="flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors">
                <Hash className="w-5 h-5" /> Calculate Numerology
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── How it works ── */}
      {step === 'input' && (
        <section className="py-16 bg-slate-800/30 border-t border-white/5 px-4 sm:px-6 mt-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Rooted in Manasara & Mayamatam</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Compass, title: '16-Zone Direction System', desc: '8 primary + 8 sub-directions with degree-precise analysis. Upload a floor plan and mark North + entrance to auto-calculate direction.', color: 'text-amber-400' },
                { icon: Layers, title: '45 Devta Mapping', desc: 'Every zone is mapped to one of the 45 Devtas of the Vastu Purusha Mandala. Disturbed Devtas are identified with their specific remedies.', color: 'text-orange-400' },
                { icon: Shield, title: 'Dual-Layer Remedies', desc: 'Non-structural (yantras, crystals, color, plants, mantras) for apartments and rentals. Structural guidance for renovation-ready properties.', color: 'text-emerald-400' },
              ].map((f, i) => (
                <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-slate-700/60 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
