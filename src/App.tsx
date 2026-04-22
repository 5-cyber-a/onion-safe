import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import Auth from './pages/Auth';

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
