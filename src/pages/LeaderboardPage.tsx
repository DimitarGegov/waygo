import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Search } from 'lucide-react';
import type { User } from '../types';
import { fetchLeaderboard } from '../data/mockApi';
import { DEMO_USER } from '../data/seed';
import { Avatar } from '../components/shared';

type Period = 'week' | 'month' | 'all';

export function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>('week');
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeaderboard = leaderboard.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchLeaderboard(period).then(data => {
      setLeaderboard(data);
    });
  }, [period]);

  const topThree = filteredLeaderboard.slice(0, 3);
  const rest = filteredLeaderboard.slice(3);
  const currentUserRank = filteredLeaderboard.findIndex(u => u.id === 'demo-user');

  const podiumOrder = topThree.length >= 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;

  return (
    <div className="min-h-screen bg-waygo-dark pb-24 pt-safe">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-amber-400" />
            Leaderboard
          </h1>
        </div>

        <div className="flex gap-2 mb-6">
          {(['week', 'month', 'all'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-waygo-teal text-white'
                  : 'bg-waygo-darkLight text-gray-400 hover:text-white'
              }`}
            >
              {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="bg-waygo-darkLight rounded-full flex items-center px-4 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        <div className="relative h-64 flex items-end justify-center gap-3 mb-8">
          {podiumOrder.map((user, index) => {
            const actualIndex = index === 0 ? 1 : index === 1 ? 0 : 2;
            const heights = [160, 200, 140];
            const isCurrentUser = user.id === 'demo-user';

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: actualIndex * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`${isCurrentUser ? 'ring-2 ring-waygo-teal' : ''} rounded-full mb-2`}>
                  <Avatar user={user} size="md" />
                </div>
                {actualIndex === 0 && (
                  <Crown size={24} className="text-amber-400 mb-1" />
                )}
                <div
                  className={`w-20 rounded-t-2xl flex flex-col items-center justify-center pb-3 pt-4 ${
                    actualIndex === 0 ? 'bg-gradient-to-t from-amber-600 to-amber-500' :
                    actualIndex === 1 ? 'bg-gradient-to-t from-gray-500 to-gray-400' :
                    'bg-gradient-to-t from-orange-600 to-orange-500'
                  }`}
                  style={{ height: heights[actualIndex] }}
                >
                  <span className="text-white font-bold text-lg">
                    {actualIndex === 0 ? '1st' : actualIndex === 1 ? '2nd' : '3rd'}
                  </span>
                  <span className="text-white/80 text-xs mt-1 truncate max-w-[70px]">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-2">
          {rest.map((user, index) => {
            const rank = index + 4;
            const isCurrentUser = user.id === 'demo-user';

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  isCurrentUser
                    ? 'bg-waygo-teal/20 border border-waygo-teal/50'
                    : 'bg-waygo-darkMid border border-white/5'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-waygo-darkLight flex items-center justify-center text-sm font-bold text-gray-400">
                  {rank}
                </div>
                <Avatar user={user} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${isCurrentUser ? 'text-waygo-teal' : 'text-white'}`}>
                    {user.name}
                    {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                  </p>
                  <p className="text-xs text-gray-400">Lv.{user.level} • {user.streak_current} day streak</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-waygo-teal">{user.xp_total.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">XP</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {currentUserRank >= 20 && (
          <>
            <div className="my-4 border-t border-gray-700" />
            <div className="flex items-center gap-3 p-3 rounded-xl bg-waygo-teal/20 border border-waygo-teal/50">
              <div className="w-8 h-8 rounded-full bg-waygo-darkLight flex items-center justify-center text-sm font-bold text-waygo-teal">
                {currentUserRank + 1}
              </div>
              <Avatar user={DEMO_USER} size="sm" />
              <div className="flex-1">
                <p className="font-medium text-waygo-teal">You</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-waygo-teal">{DEMO_USER.xp_total.toLocaleString()}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}