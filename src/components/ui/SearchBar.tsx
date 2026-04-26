import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search Plovdiv...',
  onFocus,
  onBlur,
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-4 right-4 z-10"
    >
      <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-3">
        <Search size={20} className="text-gray-400 mr-3 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-base"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}