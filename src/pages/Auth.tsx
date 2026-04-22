import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/src/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">ShieldSafe</h1>
        <p className="text-gray-500 mb-8">
          프리미엄 건설 현장 안전 관리 플랫폼에 오신 것을 환영합니다.
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-2xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
        >
          {loading ? "연결 중..." : "Google 계정으로 시작하기"}
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="mt-8 text-xs text-gray-400">
          계속 진행함으로써 서비스 이용 약관 및 개인정보 처리방침에 동의하게 됩니다.
        </p>
      </motion.div>
    </div>
  );
}
