import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Settings } from 'lucide-react';
import type { User } from '../types';
import { fetchUser } from '../data/mockApi';
import { DEMO_USER, BADGES } from '../data/seed';
import { XPBar, Avatar, StreakCard, BadgeGrid } from '../components/shared';

export function ProfilePage() {
  const [user, setUser] = useState<User>(DEMO_USER);

  useEffect(() => {
    fetchUser().then(data => {
      setUser(data);
    });
  }, []);

  const stats = [
    { label: 'Check-ins', value: user.checkins_total, icon: '📍' },
    { label: 'Quests', value: user.quests_completed, icon: '🗺️' },
    { label: 'Vouchers', value: 2, icon: '🎫' },
    { label: 'Badges', value: user.badges.length, icon: '🏆' },
  ];

  const recentActivity = [
    { id: 1, type: 'checkin', place: 'Kapana Craft Beer Bar', xp: 75, time: '2h ago' },
    { id: 2, type: 'quest', place: 'Quest Complete: Coffee Trail', xp: 150, time: '1d ago' },
    { id: 3, type: 'voucher', place: 'Voucher Redeemed: 20% off', xp: 0, time: '2d ago' },
    { id: 4, type: 'checkin', place: 'Coffee Trail Cafe', xp: 75, time: '3d ago' },
    { id: 5, type: 'checkin', place: 'Art Gallery Plovdiv', xp: 50, time: '4d ago' },
  ];

  return (
    <div className="min-h-screen bg-waygo-dark pb-24 pt-safe">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar user={user} size="lg" />
            <div>
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <p className="text-sm text-gray-400">Level {user.level} Explorer</p>
            </div>
          </div>
          <button className="p-2 bg-waygo-darkLight rounded-full text-gray-400">
            <Settings size={20} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <XPBar currentXP={user.xp_total} level={user.level} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-waygo-darkMid rounded-xl p-3 text-center border border-white/5"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StreakCard
            currentStreak={user.streak_current}
            longestStreak={user.streak_longest}
            recentDays={[1, 2, 3, 4, 5, 6, 7]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-waygo-darkMid rounded-2xl p-4 border border-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Plovdiv Explored</h2>
            <div className="flex items-center gap-2 text-waygo-teal">
              <MapPin size={16} />
              <span className="text-sm font-medium">{user.explored_percentage}%</span>
            </div>
          </div>
          <div className="h-3 bg-waygo-darkLight rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${user.explored_percentage}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-waygo-teal to-waygo-amber rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Badges</h2>
            <span className="text-sm text-gray-400">{user.badges.length}/{BADGES.length}</span>
          </div>
          <BadgeGrid
            earned={user.badges}
            allBadges={BADGES}
            onBadgeClick={(badge) => console.log('Badge clicked:', badge)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-waygo-darkMid rounded-xl border border-white/5"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  activity.type === 'checkin' ? 'bg-waygo-teal/20' :
                  activity.type === 'quest' ? 'bg-amber-500/20' :
                  'bg-purple-500/20'
                }`}>
                  {activity.type === 'checkin' ? '📍' : activity.type === 'quest' ? '🗺️' : '🎫'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{activity.place}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
                {activity.xp > 0 && (
                  <span className="text-sm font-medium text-waygo-teal">+{activity.xp} XP</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}