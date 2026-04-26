import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, PanInfo } from 'framer-motion';
import { GripHorizontal } from 'lucide-react';
import type { BottomSheetState } from '../../types';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onStateChange?: (state: BottomSheetState) => void;
  children: React.ReactNode;
  snapPoints?: { compact: number; expanded: number };
  className?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  onStateChange,
  children,
  snapPoints = { compact: 200, expanded: 400 },
  className = '',
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [currentHeight, setCurrentHeight] = useState(snapPoints.compact);
  const [sheetState, setSheetState] = useState<BottomSheetState>('compact');
  const constraintsRef = useRef<HTMLDivElement>(null);

  const y = useMotionValue(0);

  const updateState = useCallback((height: number) => {
    const state: BottomSheetState = height >= snapPoints.expanded - 20 ? 'expanded' : 'compact';
    if (state !== sheetState) {
      setSheetState(state);
      onStateChange?.(state);
    }
  }, [sheetState, onStateChange, snapPoints.expanded]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentHeight(0);
      y.set(400);
    }
  }, [isOpen, y]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const currentY = y.get();
    const velocity = info.velocity.y;
    const dragUp = currentY < snapPoints.expanded / 2;
    const snapTo = dragUp || velocity < -500 ? snapPoints.expanded : snapPoints.compact;

    y.set(snapTo - currentHeight);
    setCurrentHeight(snapTo);
    updateState(snapTo);
  }, [y, currentHeight, snapPoints, updateState]);

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        ref={constraintsRef}
        className="fixed inset-0 z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-waygo-darkMid rounded-t-3xl shadow-2xl ${className}`}
        style={{ y }}
        drag="y"
        dragConstraints={constraintsRef}
        dragElastic={{ top: 0, bottom: 0 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        exit={{ y: 400 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <GripHorizontal size={32} className="text-gray-600" />
        </div>
        <div className="px-4 pb-4">
          {children}
        </div>
      </motion.div>
    </>
  );
}

interface PlaceCardProps {
  name: string;
  category: string;
  distance: string;
  rating?: number;
  description?: string;
  address?: string;
  checkinCount?: number;
  onCheckIn: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function PlaceCard({
  name,
  category,
  distance,
  rating,
  description,
  address,
  checkinCount,
  onCheckIn,
  isExpanded = false,
  onToggleExpand,
}: PlaceCardProps) {
  const categoryEmoji: Record<string, string> = {
    cafe: '☕',
    museum: '🏛️',
    cultural: '🕌',
    bar: '🍺',
    shop: '🛍️',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-waygo-darkLight flex items-center justify-center text-2xl">
          {categoryEmoji[category] || '📍'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg truncate">{name}</h3>
          <p className="text-sm text-gray-400">
            <span className="capitalize">{category}</span> • {distance}
          </p>
        </div>
        {rating && (
          <div className="flex items-center gap-1 text-amber-400">
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {isExpanded && description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3"
        >
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          {address && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>📍</span>
              <span>{address}</span>
            </div>
          )}
          {checkinCount && (
            <div className="text-sm text-gray-400">
              {checkinCount} check-ins
            </div>
          )}
        </motion.div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onCheckIn}
          className="flex-1 bg-waygo-teal hover:bg-waygo-tealDark text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          Check In
        </button>
        <button
          onClick={onToggleExpand}
          className="px-4 py-3 bg-waygo-darkLight hover:bg-waygo-dark text-gray-400 rounded-xl transition-colors"
        >
          {isExpanded ? 'Less' : 'More'}
        </button>
      </div>
    </div>
  );
}