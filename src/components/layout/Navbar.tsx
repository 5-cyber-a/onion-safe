import { Link, useLocation } from 'react-router-dom';
import { Shield, ShoppingBag, LayoutDashboard, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { auth } from '@/src/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar() {
  const pathname = useLocation().pathname;
  const [user] = useAuthState(auth);

  const navItems = [
    { name: '대시보드', href: '/', icon: LayoutDashboard },
    { name: '안전 상점', href: '/shop', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shrink-0">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 uppercase">
            ShieldSafe <span className="text-blue-600 font-medium">Premium</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "transition-colors hover:text-blue-600",
                pathname === item.href ? "text-blue-600" : "text-slate-600"
              )}
            >
              {item.name === '대시보드' ? 'Management Console' : 'Equipment Mall'}
            </Link>
          ))}
          <div className="h-4 w-px bg-slate-300 mx-2"></div>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 rounded-full border border-slate-300 overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="profile" />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
              </div>
              <span className="text-slate-800 truncate max-w-[120px]">{user.displayName || 'Admin'}</span>
              <button 
                onClick={() => auth.signOut()}
                className="ml-2 text-[10px] uppercase font-bold text-slate-400 hover:text-red-500"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Access Console
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
