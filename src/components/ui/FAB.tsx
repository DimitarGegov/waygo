import { motion } from 'framer-motion';
import { Crosshair, Layers, Eye, EyeOff } from 'lucide-react';

interface FABsProps {
  onRecenter: () => void;
  onToggleFog: () => void;
  onToggleExplorers: () => void;
  isFogEnabled: boolean;
  isExplorersEnabled: boolean;
}

export function FABs({
  onRecenter,
  onToggleFog,
  onToggleExplorers,
  isFogEnabled,
  isExplorersEnabled,
}: FABsProps) {
  return (
    <div className="absolute bottom-36 right-4 z-10 flex flex-col gap-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRecenter}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Crosshair size={22} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleFog}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isFogEnabled
            ? 'bg-waygo-teal text-white'
            : 'bg-white text-gray-700'
        }`}
      >
        <Layers size={22} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleExplorers}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isExplorersEnabled
            ? 'bg-waygo-amber text-white'
            : 'bg-white text-gray-700'
        }`}
      >
        {isExplorersEnabled ? <Eye size={22} /> : <EyeOff size={22} />}
      </motion.button>
    </div>
  );
}