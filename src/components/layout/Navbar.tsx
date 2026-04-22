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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-gray-900">ShieldSafe</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {user.displayName || '사용자'}
                </span>
                <button 
                  onClick={() => auth.signOut()}
                  className="text-xs text-gray-400 hover:text-red-500 underline underline-offset-4"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 text-sm font-medium text-gray-900 border border-gray-900 px-4 py-2 rounded-full hover:bg-gray-900 hover:text-white transition-all"
              >
                <User className="w-4 h-4" />
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
