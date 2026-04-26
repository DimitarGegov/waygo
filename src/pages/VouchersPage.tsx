import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Clock, Copy, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { Voucher } from '../types';
import { fetchVouchers } from '../data/mockApi';
import { PARTNER_BUSINESSES } from '../data/seed';

export function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    fetchVouchers('demo-user').then(data => {
      setVouchers(data);
    });
  }, []);

  const getBusinessName = (businessId: string) => {
    return PARTNER_BUSINESSES.find(b => b.id === businessId)?.name || 'Unknown Business';
  };

  const getDaysUntilExpiry = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const getStatusColor = (voucher: Voucher) => {
    if (voucher.is_redeemed) return 'bg-gray-500/20 text-gray-400';
    const daysLeft = getDaysUntilExpiry(voucher.expires_date);
    if (daysLeft <= 0) return 'bg-red-500/20 text-red-400';
    if (daysLeft <= 3) return 'bg-amber-500/20 text-amber-400';
    return 'bg-green-500/20 text-green-400';
  };

  const getStatusText = (voucher: Voucher) => {
    if (voucher.is_redeemed) return 'Redeemed';
    const daysLeft = getDaysUntilExpiry(voucher.expires_date);
    if (daysLeft <= 0) return 'Expired';
    if (daysLeft === 1) return 'Expires tomorrow';
    return `${daysLeft} days left`;
  };

  const activeVouchers = vouchers.filter(v => !v.is_redeemed && getDaysUntilExpiry(v.expires_date) > 0);
  const pastVouchers = vouchers.filter(v => v.is_redeemed || getDaysUntilExpiry(v.expires_date) <= 0);

  return (
    <div className="min-h-screen bg-waygo-dark pb-24 pt-safe">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-6">My Vouchers</h1>

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Active ({activeVouchers.length})
          </h2>
          {activeVouchers.map((voucher) => (
            <motion.button
              key={voucher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedVoucher(voucher)}
              className="w-full bg-gradient-to-br from-waygo-darkMid to-waygo-dark rounded-2xl overflow-hidden border border-white/10 text-left"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-waygo-amber/20 flex items-center justify-center">
                    <Ticket size={28} className="text-waygo-amber" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{voucher.discount_description}</p>
                    <p className="text-sm text-gray-400 mt-1">{getBusinessName(voucher.business_id)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voucher)}`}>
                    {getStatusText(voucher)}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 bg-waygo-darkLight flex items-center justify-between">
                <span className="text-xs text-gray-400">Tap to view code</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </motion.button>
          ))}
        </div>

        {pastVouchers.length > 0 && (
          <div className="space-y-4 mt-8">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Past & Expired ({pastVouchers.length})
            </h2>
            {pastVouchers.map((voucher) => (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-waygo-darkMid rounded-2xl p-4 border border-white/5 opacity-60"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gray-700/50 flex items-center justify-center">
                    <Ticket size={28} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-400">{voucher.discount_description}</p>
                    <p className="text-sm text-gray-500 mt-1">{getBusinessName(voucher.business_id)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voucher)}`}>
                    {getStatusText(voucher)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedVoucher && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVoucher(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-waygo-darkMid rounded-3xl p-6 max-w-sm w-full border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-waygo-amber/20 flex items-center justify-center mx-auto mb-4">
                <Ticket size={32} className="text-waygo-amber" />
              </div>
              <h2 className="text-xl font-bold text-white">{selectedVoucher.discount_description}</h2>
              <p className="text-gray-400 mt-2">{getBusinessName(selectedVoucher.business_id)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-4">
              <div className="flex justify-center mb-4">
                <QRCodeSVG
                  value={selectedVoucher.code}
                  size={160}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                <span className="text-2xl font-mono font-bold text-waygo-dark tracking-widest">
                  {selectedVoucher.code}
                </span>
                <button
                  onClick={() => copyCode(selectedVoucher.code)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Clock size={16} />
              <span>{getStatusText(selectedVoucher)}</span>
            </div>

            <button
              onClick={() => setSelectedVoucher(null)}
              className="w-full py-3 bg-waygo-darkLight text-white font-semibold rounded-xl transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}