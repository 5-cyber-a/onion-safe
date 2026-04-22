import { useState } from 'react';
import { 
  ShoppingBag, HardHat, ShieldOff, Footprints, 
  Search, SlidersHorizontal, ChevronRight, Truck, RefreshCw, ShoppingCart
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const PRODUCTS = [
  { id: 1, name: '프리미엄 산업용 안전모 (K-Steel)', price: 42000, category: 'Head', rating: 4.8, img: 'https://picsum.photos/seed/helmet/400/300' },
  { id: 2, name: '고강도 작업용 안전화 (Air-Sole)', price: 128000, category: 'Feet', rating: 4.9, img: 'https://picsum.photos/seed/shoes/400/300' },
  { id: 3, name: '고공 작업용 전신 안전벨트', price: 95000, category: 'Body', rating: 4.7, img: 'https://picsum.photos/seed/harness/400/300' },
  { id: 4, name: '낙하물 방지망 (Heavy Duty)', price: 210000, category: 'Safety', rating: 4.5, img: 'https://picsum.photos/seed/net/400/300' },
  { id: 5, name: '방진 마스크 2급 (50매입)', price: 35000, category: 'Face', rating: 4.6, img: 'https://picsum.photos/seed/mask/400/300' },
  { id: 6, name: '작업용 내열 장갑 (L사이즈)', price: 15000, category: 'Hands', rating: 4.8, img: 'https://picsum.photos/seed/gloves/400/300' },
];

const CATEGORIES = [
  { id: 'All', name: '전체 상품', icon: ShoppingBag },
  { id: 'Head', name: '머리 보호', icon: HardHat },
  { id: 'Body', name: '신체 보호', icon: ShieldOff },
  { id: 'Feet', name: '발 보호', icon: Footprints },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Hardware & Gear Store</h2>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Equipment Solutions</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="장비 및 보호구 검색..."
                className="pl-11 pr-4 py-2.5 w-full md:w-64 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div className="relative">
              <button className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-200">
                <ShoppingCart className="w-4 h-4" />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 space-y-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-4 mb-4">Categories</h3>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3.5 rounded-xl transition-all group",
                  activeCategory === cat.id 
                    ? "bg-white shadow-sm border border-slate-200" 
                    : "hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
                    activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                  )}>
                    <cat.icon className="w-3 h-3" />
                  </div>
                  <span className={cn(
                    "text-xs font-bold",
                    activeCategory === cat.id ? "text-slate-900" : "text-slate-500"
                  )}>{cat.name}</span>
                </div>
                <ChevronRight className={cn(
                  "w-3 h-3 text-slate-300",
                  activeCategory === cat.id ? "text-blue-600 opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />
              </button>
            ))}

            <div className="mt-12 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-3">
                <Truck className="w-4 h-4 text-slate-400" />
              </div>
              <h5 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Dropshipping Partner</h5>
              <p className="text-[10px] text-slate-500 leading-normal font-medium">
                공급사로 등록하여 귀하의 장비를 리얼타임 모니터링 시스템에 직접 연동하세요.
              </p>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={idx} 
                  onAddToCart={() => setCartCount(c => c + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
      <div className="p-3 bg-blue-50 rounded-2xl">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ProductCard({ product, index, onAddToCart }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group flex flex-col"
    >
      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center p-8">
        <div className="absolute top-3 left-3 bg-blue-600 text-[9px] font-bold text-white px-2 py-1 rounded-sm uppercase tracking-tight z-10">
          IOT LINKED
        </div>
        <img 
          src={product.img} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {product.category === 'Head' ? 'Safety Protection' : 'Standard Gear'}
            </span>
            <div className="flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-[9px] font-bold text-slate-500">{product.rating}</span>
            </div>
          </div>
          <h4 className="font-bold text-sm text-slate-800 leading-snug line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h4>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Unit Price</span>
            <span className="text-sm font-black text-slate-900 tracking-tight">₩{product.price.toLocaleString()}</span>
          </div>
          <button 
            onClick={onAddToCart}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              hovered ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
