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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header / Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight font-display">현장 안전 상점</h1>
            <p className="text-gray-500 mt-2">필수 PPE부터 건설 소모품까지, 검증된 품질만 공급합니다.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="장비 및 보호구 검색..."
                className="pl-11 pr-4 py-3 w-full md:w-80 bg-white rounded-2xl border-none shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
              />
            </div>
            <button className="p-3 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 transition-all">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative">
              <button className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                <ShoppingCart className="w-5 h-5" />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureItem icon={Truck} title="직배송 시스템" desc="제조사 직접 연동으로 중간 유통 마진을 제거했습니다." />
          <FeatureItem icon={RefreshCw} title="드롭쉬핑 제공" desc="재고 부담 없이 현장에서 바로 주문하고 수령하세요." />
          <FeatureItem icon={ShieldOff} title="품질 보증" desc="KCs 인증을 통과한 검증된 안전 장구만 취급합니다." />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Categories Sidebar */}
          <aside className="w-full lg:w-64 space-y-2">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2 mb-4">Categories</h3>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                  activeCategory === cat.id 
                    ? "bg-white shadow-sm ring-1 ring-gray-200" 
                    : "hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                  )}>
                    <cat.icon className="w-4 h-4" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    activeCategory === cat.id ? "text-gray-900" : "text-gray-500"
                  )}>{cat.name}</span>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  activeCategory === cat.id ? "text-blue-600 translate-x-0" : "text-gray-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </button>
            ))}
          </aside>

          {/* Product Grid */}
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
      className="bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-100 group"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.img} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-blue-600 shadow-sm">
          #{product.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={cn("w-2 h-2 rounded-full", i < 4 ? "bg-amber-400" : "bg-gray-200")} />
          ))}
          <span className="text-[10px] font-bold text-gray-400 ml-1">{product.rating}</span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug h-10 line-clamp-2">{product.name}</h3>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
            <span className="text-lg font-black text-gray-900">₩{product.price.toLocaleString()}</span>
          </div>
          <button 
            onClick={onAddToCart}
            className={cn(
              "p-3 rounded-2xl transition-all",
              hovered ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-100 text-gray-900"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
