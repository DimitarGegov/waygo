import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import type { PartnerBusiness, CategoryFilter, ExploredTile } from '../types';
import { fetchBusinesses } from '../data/mockApi';
import { DEMO_EXPLORERS } from '../data/seed';
import { formatDistance } from '../utils/geo';
import { SearchBar, CategoryChips, FABs, ExploreCarousel, PlaceCard } from '../components/ui';
import { useFogOfWarCanvas } from '../components/map/FogOfWarOverlay';

const DARK_MAP_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const PLOVDIV_CENTER: [number, number] = [42.1354, 24.7453];
const DEFAULT_ZOOM = 14;

const categoryEmoji: Record<string, string> = {
  cafe: '☕',
  museum: '🏛️',
  cultural: '🕌',
  bar: '🍺',
  shop: '🛍️',
};

const categoryColors: Record<string, string> = {
  cafe: '#00D4C8',
  museum: '#FF8C42',
  cultural: '#A855F7',
  bar: '#F97316',
  shop: '#EC4899',
  default: '#00D4C8',
};

function createCustomIcon(category: string, isSelected: boolean, isFeatured: boolean) {
  const color = categoryColors[category] || categoryColors.default;
  const emojiChar = categoryEmoji[category] || '📍';
  const size = isSelected ? 44 : 36;
  const borderWidth = isSelected ? 3 : 2;
  const shadow = isSelected ? '0 6px 20px rgba(0, 212, 200, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.3)';

  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border: ${borderWidth}px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size * 0.45}px;
      box-shadow: ${shadow};
      transition: transform 0.2s;
      position: relative;
    ">
      <span>${emojiChar}</span>
      ${isFeatured ? `<span style="position: absolute; top: -6px; right: -6px; font-size: 12px;">⭐</span>` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function createExplorerIcon(name: string) {
  const initial = name.charAt(0);
  const html = `
    <div style="
      width: 24px;
      height: 24px;
      background: #00D4C8;
      border: 2px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: white;
      box-shadow: 0 2px 8px rgba(0, 212, 200, 0.4);
      animation: bounce 2s infinite;
    ">
      ${initial}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'explorer-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function MapEvents() {
  useMapEvents({
    moveend: () => {},
    zoomend: () => {},
  });
  return null;
}

interface MapPageContentProps {
  businesses: PartnerBusiness[];
  onBusinessSelect: (business: PartnerBusiness | null) => void;
  selectedBusiness: PartnerBusiness | null;
  onCheckIn: (business: PartnerBusiness) => void;
  map: L.Map | null;
  tiles: ExploredTile[];
  isFogEnabled: boolean;
  showExplorers: boolean;
  onToggleFog: () => void;
  onToggleExplorers: () => void;
}

function MapPageContent({
  businesses,
  onBusinessSelect,
  selectedBusiness,
  onCheckIn,
  map,
  tiles,
  isFogEnabled,
  showExplorers,
  onToggleFog,
  onToggleExplorers,
}: MapPageContentProps) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);

  useFogOfWarCanvas(mapRef, map, tiles, isFogEnabled);

  const filteredBusinesses = useMemo(() => {
    let result = businesses;
    if (category !== 'all') {
      if (category === 'featured') {
        result = result.filter(b => b.subscription_tier === 'featured');
      } else {
        result = result.filter(b => b.category === category);
      }
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b =>
        b.name.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
      );
    }
    return result;
  }, [businesses, category, searchQuery]);

  const distanceToBusiness = useCallback((business: PartnerBusiness) => {
    const userLat = 42.1420;
    const userLng = 24.7490;
    const R = 6371e3;
    const lat1 = userLat * Math.PI / 180;
    const lat2 = business.lat * Math.PI / 180;
    const dLat = (business.lat - userLat) * Math.PI / 180;
    const dLng = (business.lng - userLng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return formatDistance(R * c);
  }, []);

  const handleMarkerClick = useCallback((business: PartnerBusiness) => {
    onBusinessSelect(business);
    if (map) {
      map.setView([business.lat, business.lng], 16, { animate: true });
    }
  }, [map, onBusinessSelect]);

  const handleBusinessSelect = useCallback((business: PartnerBusiness) => {
    onBusinessSelect(business);
    if (map && business) {
      map.setView([business.lat, business.lng], 16);
    }
  }, [map, onBusinessSelect]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="absolute inset-0 z-0">
        <MapContainer
          center={PLOVDIV_CENTER}
          zoom={DEFAULT_ZOOM}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          attributionControl={false}
          whenReady={() => {
            // Map ready
          }}
        >
          <TileLayer
            url={DARK_MAP_TILES}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          <MapEvents />

          {filteredBusinesses.map((business) => (
            <Marker
              key={business.id}
              position={[business.lat, business.lng]}
              icon={createCustomIcon(
                business.category,
                selectedBusiness?.id === business.id,
                business.subscription_tier === 'featured'
              )}
              eventHandlers={{
                click: () => handleMarkerClick(business),
              }}
            >
              <Popup className="waygo-popup">
                <div className="p-3 min-w-[150px]">
                  <h3 className="font-semibold text-sm">{business.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{distanceToBusiness(business)} away</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {showExplorers && DEMO_EXPLORERS.map((explorer) => (
            <Marker
              key={explorer.id}
              position={[explorer.lat, explorer.lng]}
              icon={createExplorerIcon(explorer.name)}
            />
          ))}
        </MapContainer>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search places in Plovdiv..."
      />

      <CategoryChips selected={category} onSelect={setCategory} />

      <FABs
        onRecenter={() => {
          if (map) {
            map.setView(PLOVDIV_CENTER, DEFAULT_ZOOM);
          }
        }}
        onToggleFog={onToggleFog}
        onToggleExplorers={onToggleExplorers}
        isFogEnabled={isFogEnabled}
        isExplorersEnabled={showExplorers}
      />

      <AnimatePresence>
        {selectedBusiness && (
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute bottom-36 left-4 right-4 z-30"
          >
            <div className="bg-waygo-darkMid rounded-2xl p-4 shadow-2xl border border-white/10">
              <PlaceCard
                name={selectedBusiness.name}
                category={selectedBusiness.category}
                distance={distanceToBusiness(selectedBusiness)}
                description={selectedBusiness.description}
                address={selectedBusiness.address}
                checkinCount={selectedBusiness.total_checkins}
                onCheckIn={() => onCheckIn(selectedBusiness)}
                isExpanded={true}
                onToggleExpand={() => {}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedBusiness && (
        <ExploreCarousel
          businesses={businesses}
          userLocation={{ lat: 42.1420, lng: 24.7490 }}
          onSelect={handleBusinessSelect}
        />
      )}

      <div className="absolute top-28 right-4 bg-waygo-amber/90 text-white text-xs px-2 py-1 rounded-lg z-10">
        Demo Mode
      </div>
    </div>
  );
}

export function MapPage() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<PartnerBusiness[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<PartnerBusiness | null>(null);
  const [map, _setMap] = useState<L.Map | null>(null);
  const [tiles] = useState<ExploredTile[]>([
    { id: '1', user_id: 'demo', center_lat: 42.1430, center_lng: 24.7490, radius_meters: 150, revealed_date: '2024-01-01' },
    { id: '2', user_id: 'demo', center_lat: 42.1420, center_lng: 24.7500, radius_meters: 150, revealed_date: '2024-01-02' },
    { id: '3', user_id: 'demo', center_lat: 42.1415, center_lng: 24.7480, radius_meters: 150, revealed_date: '2024-01-03' },
    { id: '4', user_id: 'demo', center_lat: 42.1440, center_lng: 24.7510, radius_meters: 150, revealed_date: '2024-01-04' },
    { id: '5', user_id: 'demo', center_lat: 42.1405, center_lng: 24.7465, radius_meters: 150, revealed_date: '2024-01-05' },
  ]);
  const [isFogEnabled, setIsFogEnabled] = useState(true);
  const [showExplorers, setShowExplorers] = useState(true);

  useEffect(() => {
    fetchBusinesses().then(setBusinesses);
  }, []);

  useEffect(() => {
    if (map) {
      _setMap(map);
    }
  }, [map]);

  const handleCheckIn = useCallback((business: PartnerBusiness) => {
    navigate('/checkin', { state: { business } });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-waygo-dark">
      <div className="max-w-[430px] mx-auto relative">
        <MapPageContent
          businesses={businesses}
          onBusinessSelect={setSelectedBusiness}
          selectedBusiness={selectedBusiness}
          onCheckIn={handleCheckIn}
          map={map}
          tiles={tiles}
          isFogEnabled={isFogEnabled}
          showExplorers={showExplorers}
          onToggleFog={() => setIsFogEnabled(prev => !prev)}
          onToggleExplorers={() => setShowExplorers(prev => !prev)}
        />
      </div>
    </div>
  );
}