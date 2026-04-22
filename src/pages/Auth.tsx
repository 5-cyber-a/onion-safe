import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/src/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { Shield, ArrowRight, UserCheck } from 'lucide-react';
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

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("현장 시연 모드 접속에 실패했습니다. (Firebase Console에서 익명 로그인을 활성화해야 할 수 있습니다)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-slate-900">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2 uppercase tracking-tight">
          onion <span className="text-blue-600 font-medium font-display">Console</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">
          지능형 건설 현장 통합 안전 계측 서비스
        </p>

        <div className="space-y-3">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {loading ? "인증 확인 중..." : "Google 계정으로 시작하기"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-600 px-6 py-4 rounded-xl text-xs font-extrabold hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            <UserCheck className="w-4 h-4" />
            현장 시연용 모드로 즉시 접속 (Skip Login)
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-50">
          <p className="text-[10px] text-slate-400 font-bold leading-relaxed px-4">
            로그인함으로써 귀하는 onion의 <span className="underline cursor-pointer">보안 규정</span> 및 <span className="underline cursor-pointer">개인정보 처리방침</span>에 동의하게 됩니다.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
