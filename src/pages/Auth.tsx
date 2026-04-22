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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
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
          ShieldSafe <span className="text-blue-600 font-medium">Console</span>
        </h1>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Premium Construction Safety SaaS
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          {loading ? "Authenticating..." : "Access with Google"}
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="mt-10 pt-6 border-t border-slate-50">
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
            By proceeding, you agree to our <span className="underline cursor-pointer">Security Protocols</span> and <span className="underline cursor-pointer">Data Policy</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
