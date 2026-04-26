# Waygo Project - Complete Creation Plan

## Overview

**Waygo** is a gamified city exploration app for Plovdiv, Bulgaria, built with **React 18 + TypeScript + Vite + Tailwind CSS**. It's a mobile-first web application that encourages users to discover local businesses and cultural landmarks through a quest and check-in system.

---

## Part 1: Descriptive Plan (What Was Done)

This section documents what was created in this project.

### Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 18.3.1 with TypeScript |
| Build Tool | Vite 5.4 |
| Routing | React Router DOM 6.26.0 |
| Styling | Tailwind CSS 3.4 with PostCSS |
| Animations | Framer Motion 11 |
| Maps | Leaflet + React-Leaflet |
| Charts | Recharts 3 |
| Icons | Lucide React |
| QR Codes | qrcode.react, jsqr |
| Celebrations | canvas-confetti |

### Project Structure

```
waygo/
├── index.html                    # Entry HTML with meta tags
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json           # TypeScript config for Vite
├── vite.config.ts / .js         # Vite build configuration
├── tailwind.config.js          # Tailwind with custom colors/animations
├── postcss.config.js           # PostCSS with Tailwind/autoprefixer
├── .env                       # Environment variables
├── dist/                      # Production build output
└── src/
    ├── main.tsx                # React entry point with Router
    ├── App.tsx                # Main app with route definitions
    ├── index.css              # Global styles + Tailwind imports
    ├── types/index.ts          # TypeScript interfaces (User, Business, Quest, etc.)
    ├── data/
    │   ├── seed.ts          # Demo data (businesses, quests, users, badges)
    │   └── mockApi.ts      # Simulated API functions
    ├── utils/
    │   ├── geo.ts           # Geolocation utilities
    │   └── mapStyles.ts     # Map styling utilities
    ├── hooks/
    │   ├── useFogOfWar.ts  # Fog of war exploration mechanic
    │   ├── useCheckin.ts   # Check-in validation logic
    │   ├── useLocation.ts  # GPS location tracking
    │   ├── useQuest.ts    # Quest completion tracking
    │   └── index.ts       # Hooks export
    ├── pages/
    │   ├── MapPage.tsx     # Main map with markers & fog of war
    │   ├── QuestsPage.tsx  # Quest list & details
    │   ├── CheckinPage.tsx # QR code / manual check-in
    │   ├── ProfilePage.tsx # User profile with stats
    │   ├── LeaderboardPage.tsx # XP rankings
    │   ├── VouchersPage.tsx # Discount vouchers
    │   ├── PartnerDashboard.tsx # Business owner portal
    │   ├── AdminPanel.tsx # Admin management
    │   └── index.ts     # Pages export
    └── components/
        ├── ui/            # Reusable UI components
        │   ├── BottomNav.tsx
        │   ├── BottomSheet.tsx
        │   ├── SearchBar.tsx
        │   ├── CategoryChips.tsx
        │   ├── FAB.tsx
        │   ├── ExploreCarousel.tsx
        │   ├── PlaceCard.tsx
        │   └── index.ts
        ├── map/            # Map-related components
        │   ├── FogOfWarOverlay.tsx
        │   ├── WaypointMarker.tsx
        │   ├── ExplorerDots.tsx
        │   └── index.ts
        ├── quest/          # Quest UI components
        │   ├── QuestCard.tsx
        │   ├── WaypointList.tsx
        │   └── index.ts
        ├── checkin/       # Check-in components
        │   ├── QRScanner.tsx
        │   ├── CodeInput.tsx
        │   ├── Celebration.tsx
        │   └── index.ts
        └── shared/        # Shared components
            ├── XPBar.tsx
            ├── StreakCard.tsx
            ├── Badge.tsx
            ├── Avatar.tsx
            └── index.ts
```

### Key Features Implemented

1. **Interactive Map** - Dark-themed Leaflet map centered on Plovdiv with custom emoji markers
2. **Fog of War** - Unexplored areas are hidden until discovered
3. **Quest System** - Multi-waypoint quests with XP rewards
4. **Check-in System** - GPS + QR code validation at partner venues
5. **Gamification** - XP, levels, streaks, badges
6. **Leaderboard** - Weekly/monthly/all-time rankings
7. **Vouchers** - Discount codes earned through quests
8. **Multiple User Roles** - Explorer, Partner (business owner), Admin

---

## Part 2: Prescriptive Plan (Exact Steps to Reproduce)

This section provides exact, step-by-step instructions to reproduce this project identically.

## Phase 1: Start the Project

### Step 1.1: Create Vite Project
```bash
npm create vite@latest waygo -- --template react-ts
cd waygo
```

### Step 1.2: Install All Dependencies
```bash
npm install react@18.3.1 react-dom@18.3.1 react-router-dom@6.26.0 leaflet@1.9.4 react-leaflet@4.2.1 @types/leaflet@1.9.21 framer-motion@11.0.0 lucide-react@0.460.0 recharts@3.8.1 canvas-confetti@1.9.3 qrcode.react@4.1.0 jsqr@1.4.0 @vis.gl/react-google-maps@1.0.0 react-is@19.2.5
```

### Step 1.3: Install Dev Dependencies
```bash
npm install -D tailwindcss@3.4.0 postcss@8.4.40 autoprefixer@10.4.20 @vitejs/plugin-react@4.3.0 typescript@5.5.0 @types/react@18.3.0 @types/react-dom@18.3.0 @types/canvas-confetti@1.6.4 vite@5.4.0
```

### Step 1.4: Initialize Tailwind
```bash
npx tailwindcss init -p
```

---

## Phase 2: Set Up Configuration

### 2.1 package.json

Update with these scripts:
- `"dev": "vite"` - Start dev server
- `"build": "tsc -b && vite build"` - Build for production
- `"lint": "eslint ."` - Lint code
- `"preview": "vite preview"` - Preview build

### 2.2 vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
```

### 2.3 tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2.4 tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

### 2.5 tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        waygo: {
          teal: '#00D4C8',
          tealDark: '#00A89E',
          amber: '#FF8C42',
          amberDark: '#E67530',
          dark: '#0a0a0a',
          darkMid: '#1a1a1a',
          darkLight: '#2a2a2a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'xp-fly': 'xp-fly 1.5s ease-out forwards',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.5' },
        },
        'xp-fly': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-80px) scale(1.5)', opacity: '0' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

### 2.6 postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 2.7 index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#0a0a0a" />
    <title>Waygo - Explore Plovdiv</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Phase 3: Create Type Definitions

Create `src/types/index.ts` with these interfaces:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  xp_total: number;
  level: number;
  streak_current: number;
  streak_longest: number;
  is_visible_on_map: boolean;
  last_location_lat?: number;
  last_location_lng?: number;
  last_active: string;
  created_date: string;
  badges: string[];
  checkins_total: number;
  quests_completed: number;
  explored_percentage: number;
}

export interface PartnerBusiness {
  id: string;
  name: string;
  description: string;
  category: 'cafe' | 'museum' | 'bar' | 'shop' | 'cultural';
  address: string;
  lat: number;
  lng: number;
  geofence_radius_meters: number;
  checkin_code: string;
  subscription_tier: 'free' | 'basic' | 'featured';
  is_approved: boolean;
  is_active: boolean;
  owner_user_id: string;
  total_checkins: number;
  created_date: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'coffee' | 'history' | 'exploration' | 'culture';
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  waypoint_business_ids: string[];
  required_checkins_count: number;
  is_active: boolean;
  created_date: string;
}

export interface CheckIn {
  id: string;
  user_id: string;
  business_id: string;
  quest_id?: string;
  validation_method: 'qr' | 'staff_code' | 'gps_only';
  gps_lat: number;
  gps_lng: number;
  distance_from_business: number;
  xp_awarded: number;
  created_date: string;
}

export interface Voucher {
  id: string;
  user_id: string;
  business_id: string;
  quest_id?: string;
  discount_description: string;
  code: string;
  is_redeemed: boolean;
  redeemed_date?: string;
  expires_date: string;
  created_date: string;
}

export interface ExploredTile {
  id: string;
  user_id: string;
  center_lat: number;
  center_lng: number;
  radius_meters: number;
  revealed_date: string;
}

export interface ValidationResult {
  valid: boolean;
  reason?: string;
  xp?: number;
  bonus_xp?: number;
}

export type CategoryFilter = 'all' | 'cafe' | 'museum' | 'cultural' | 'featured';
export type BottomSheetState = 'closed' | 'compact' | 'expanded';
```

---

## Phase 4: Create Seed Data

Create `src/data/seed.ts` with these exact values:

### Partner Businesses (8 locations):
1. **Kapana Craft Beer Bar** - id: `kapana-craft`, category: `cafe`, lat: `42.1433`, lng: `24.7489`, geofence: `150m`, code: `KAP001`, tier: `featured`
2. **Regional History Museum** - id: `history-museum`, category: `museum`, lat: `42.1441`, lng: `24.7501`, geofence: `200m`, code: `MUS001`, tier: `featured`
3. **Dzhumaya Mosque** - id: `dzhumaya-mosque`, category: `cultural`, lat: `42.1404`, lng: `24.7476`, geofence: `150m`, code: `CUL001`, tier: `basic`
4. **Roman Stadium Ruins** - id: `roman-stadium`, category: `cultural`, lat: `42.1411`, lng: `24.7458`, geofence: `100m`, code: `CUL002`, tier: `basic`
5. **Coffee Trail Cafe** - id: `coffee-trail`, category: `cafe`, lat: `42.1428`, lng: `24.7502`, geofence: `100m`, code: `CAF001`, tier: `featured`
6. **Art Gallery Plovdiv** - id: `art-gallery`, category: `museum`, lat: `42.1448`, lng: `24.7512`, geofence: `150m`, code: `ART001`, tier: `basic`
7. **Old Town Bistro** - id: `old-town-bistro`, category: `cafe`, lat: `42.1391`, lng: `24.7521`, geofence: `100m`, code: `BIS001`, tier: `basic`
8. **Ethnographic Museum** - id: `ethnographic-museum`, category: `museum`, lat: `42.1445`, lng: `24.7536`, geofence: `150m`, code: `ETH001`, tier: `basic`

### Quests (4 quests):
1. **The Coffee Trail** - id: `quest-coffee-trail`, difficulty: `easy`, XP: `150`, waypoints: `["kapana-craft", "coffee-trail", "old-town-bistro"]`, required: `3`
2. **History Hunter** - id: `quest-history-hunter`, difficulty: `medium`, XP: `300`, waypoints: `["history-museum", "art-gallery", "ethnographic-museum", "dzhumaya-mosque", "roman-stadium"]`, required: `5`
3. **Kapana Explorer** - id: `quest-kapana-explorer`, difficulty: `medium`, XP: `250`, waypoints: `["kapana-craft", "coffee-trail", "art-gallery", "old-town-bistro"]`, required: `4`
4. **Plovdiv Grand Tour** - id: `quest-grand-tour`, difficulty: `hard`, XP: `500`, waypoints: All 8 businesses, required: `8`

### Demo User:
- name: `"Alex Explorer"`
- email: `"alex@waygo.app"`
- avatar: `"https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"`
- xp_total: `2100`
- level: `5`
- streak_current: `7`
- streak_longest: `12`
- badges: `["First Steps", "Coffee Lover", "Week Warrior", "Culture Vulture", "Night Owl"]`
- checkins_total: `23`
- quests_completed: `3`
- explored_percentage: `34`

### Badges (8 badges):
1. `first-steps` - icon: `👣`, condition: `checkins >= 1`
2. `coffee-lover` - icon: `☕`, condition: `cafe_checkins >= 3`
3. `week-warrior` - icon: `🔥`, condition: `streak >= 7`
4. `culture-vulture` - icon: `🏛️`, condition: `museum_checkins >= 3`
5. `night-owl` - icon: `🦉`, condition: `late_checkin`
6. `early-bird` - icon: `🐦`, condition: `early_checkin`
7. `quest-master` - icon: `🗺️`, condition: `quests_completed >= 5`
8. `explorer` - icon: `🧭`, condition: `explored >= 50`

### Demo Explorers (5 explorers):
- Maria S. at 42.1430, 24.7480
- Petar K. at 42.1415, 24.7510
- Elena V. at 42.1440, 24.7465
- Nikolay D. at 42.1400, 24.7495
- Ivana R. at 42.1450, 24.7505

---

## Phase 5: Create Mock API

Create `src/data/mockApi.ts` with these functions:
- `fetchBusinesses()` - returns approved/active businesses with 300-800ms delay
- `fetchBusinessById(id)` - returns single business
- `fetchQuests()` - returns active quests
- `fetchQuestById(id)` - returns single quest
- `fetchUser()` - returns demo user
- `updateUser(updates)` - updates demo user
- `createCheckIn(userId, businessId, questId, xp)` - creates check-in record
- `fetchExploredTiles(userId)` - returns 5 initial tiles
- `addExploredTile(tile)` - adds new tile
- `fetchVouchers(userId)` - returns 3 sample vouchers
- `redeemVoucher(voucherId)` - marks voucher as redeemed
- `fetchLeaderboard(period)` - returns 8 users sorted by XP
- `fetchBadges()` - returns badge definitions

---

## Phase 6: Create Utility Functions

Create `src/utils/geo.ts`:

- `toRadians(degrees)` - converts degrees to radians
- `haversine(lat1, lng1, lat2, lng2)` - calculates distance in meters using Haversine formula
- `calculateXP(distance, streak, isQuestCompletion)` - calculates XP with bonuses and multipliers
  - Base: 50 XP
  - Distance bonus (>500m): +25 XP
  - Streak 3-6: 1.2x multiplier
  - Streak 7+: 1.5x multiplier
  - Quest completion: +50% bonus
- `validateCheckin(userLat, userLng, business, code)` - validates GPS proximity and code
- `calculateLevel(xp)` - returns floor(xp/500) + 1
- `xpForNextLevel(level)` - returns level * 500
- `xpProgressInLevel(xp)` - returns progress object
- `formatDistance(meters)` - formats as "Xm" or "X.Xkm"
- `formatTimeAgo(date)` - returns "Just now", "Xm ago", "Xh ago", "Xd ago"
- `generateVoucherCode()` - returns random 6-char uppercase string

---

## Phase 7: Create Custom Hooks

### useFogOfWar (src/hooks/useFogOfWar.ts)
- State: tiles array, isEnabled boolean, exploredPercentage number
- Initial: 5 tiles at Plovdiv coordinates
- Functions: revealTile(lat, lng), toggleFog(), resetFog()
- 150m radius per tile

### useCheckin (src/hooks/useCheckin.ts)
- State: isValidating, result, xpEarned, streakUpdated
- Functions: performCheckin(userLat, userLng, business, code, streak), resetCheckin()

### useLocation (src/hooks/useLocation.ts)
- GPS tracking with getCurrentPosition

### useQuest (src/hooks/useQuest.ts)
- Quest progress tracking and completion

Export all from `src/hooks/index.ts`.

---

## Phase 8: Create UI Components

Create `src/components/ui/`:

### BottomNav.tsx
- 5 tabs: Map (/), Quests (/quests), Check In (/checkin), Profile (/profile), Top (/leaderboard)
- Icons: Map, ScrollText, ScanLine, User, Trophy from lucide-react
- Active indicator with Framer Motion
- waygo.teal for active, gray for inactive

### SearchBar.tsx
- Input with search icon
- Placeholder: "Search places in Plovdiv..."

### CategoryChips.tsx
- Horizontal scroll: all, cafe, museum, cultural, featured
- waygo.teal for selected

### FAB.tsx (Floating Action Buttons)
- 3 buttons: recenter, toggle fog, toggle explorers

### ExploreCarousel.tsx
- Horizontal scroll of nearby businesses

### BottomSheet.tsx
- Expandable sheet with snap points

---

## Phase 9: Create Map Components

Create `src/components/map/`:

### FogOfWarOverlay.tsx
- Canvas-based dark overlay
- Clears circles at explored locations

### WaypointMarker.tsx
- Custom DivIcon with emoji markers
- Category colors:
  - cafe: #00D4C8, ☕
  - museum: #FF8C42, 🏛️
  - cultural: #A855F7, 🕌
  - bar: #F97316, 🍺
  - shop: #EC4899, 🛍️
- Star for featured tier

### ExplorerDots.tsx
- Animated dots for demo explorers

---

## Phase 10: Create Other Components

Create `src/components/quest/`:
- QuestCard.tsx - Quest display with progress
- WaypointList.tsx - Waypoint list with status

Create `src/components/checkin/`:
- QRScanner.tsx - jsqr camera scanning
- CodeInput.tsx - Manual code entry
- Celebration.tsx - canvas-confetti animation

Create `src/components/shared/`:
- XPBar.tsx - XP progress bar
- StreakCard.tsx - Streak display
- Badge.tsx - Badge display
- Avatar.tsx - DiceBear avatar

---

## Phase 11: Create Pages

Create `src/pages/`:

### MapPage.tsx (~347 lines)
- MapContainer centered on Plovdiv (42.1354, 24.7453), zoom 14
- CartoDB Dark Matter tiles: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
- Filtered markers, fog overlay, search, carousel
- Navigate to /checkin on business selection

### QuestsPage.tsx
- Quest list with cards

### CheckinPage.tsx
- QR scan or manual code entry

### ProfilePage.tsx
- Avatar, XPBar, StreakCard, badges, stats

### LeaderboardPage.tsx
- Week/Month/All tabs, ranked list

### VouchersPage.tsx
- Voucher list

### PartnerDashboard.tsx
- Placeholder

### AdminPanel.tsx
- Placeholder

Export all from `src/pages/index.ts`.

---

## Phase 12: Create App Shell

### src/main.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### src/App.tsx
- Routes: /, /quests, /checkin, /checkin/:businessId, /profile, /leaderboard, /vouchers, /partner, /admin
- BottomNav at bottom
- Wrap in max-width 430px container with dark background

---

## Phase 13: Create Styles

### src/index.css
- Import leaflet/dist/leaflet.css
- Tailwind directives
- CSS variables (safe-area-inset-bottom)
- Base styles:
  - Font: Inter
  - Background: #0a0a0a
  - Text: white
  - Antialiasing
- Utilities: pb-safe, pt-safe, scrollbar-hide
- Input min 16px
- Animations: bounce-subtle, shimmer
- Gradient-text (teal to amber)
- Leaflet overrides (dark theme)

---

## Phase 14: Build and Test

```bash
npm run dev
```

Verify:
- Map loads with dark tiles
- Markers display correctly
- Navigation works
- All pages render without errors

---

## NPM Scripts Summary

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite development server |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

---

This plan provides everything needed to reproduce the Waygo project exactly.