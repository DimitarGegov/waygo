import { Routes, Route, Navigate } from 'react-router-dom';
import { BottomNav } from './components/ui';
import {
  MapPage,
  QuestsPage,
  CheckinPage,
  ProfilePage,
  LeaderboardPage,
  VouchersPage,
  PartnerDashboard,
  AdminPanel,
} from './pages';

function App() {
  return (
    <div className="min-h-screen bg-waygo-dark">
      <div className="max-w-[430px] mx-auto relative">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/quests" element={<QuestsPage />} />
          <Route path="/checkin" element={<CheckinPage />} />
          <Route path="/checkin/:businessId" element={<CheckinPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/vouchers" element={<VouchersPage />} />
          <Route path="/partner" element={<PartnerDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;