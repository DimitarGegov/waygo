import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, ScrollText, ScanLine, User, Trophy } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Map', icon: Map },
  { path: '/quests', label: 'Quests', icon: ScrollText },
  { path: '/checkin', label: 'Check In', icon: ScanLine },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/leaderboard', label: 'Top', icon: Trophy },
];

export function BottomNav() {
  const navigate = useNavigate();
  const currentPath = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-safe">
      <div className="max-w-[430px] mx-auto">
        <div className="bg-waygo-darkMid/95 backdrop-blur-lg border-t border-white/10 rounded-t-2xl px-2 py-2 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentPath.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center py-1 px-3 min-w-[60px]"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? '#00D4C8' : '#6a6a8a',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="relative"
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-waygo-teal rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span
                  className={`text-xs mt-1 transition-colors ${
                    isActive ? 'text-waygo-teal font-semibold' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}