import { motion } from 'framer-motion';
import type { CategoryFilter } from '../../types';

interface CategoryChipsProps {
  selected: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

const categories: { id: CategoryFilter; label: string; emoji: string }[] = [
  { id: 'all', label: 'All', emoji: '🌍' },
  { id: 'cafe', label: 'Cafes', emoji: '☕' },
  { id: 'museum', label: 'Museums', emoji: '🏛️' },
  { id: 'cultural', label: 'Cultural', emoji: '🕌' },
  { id: 'featured', label: 'Featured', emoji: '⭐' },
];

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="absolute top-20 left-4 right-4 z-10"
    >
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selected === cat.id
                ? 'bg-waygo-teal text-white shadow-lg shadow-waygo-teal/30'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}