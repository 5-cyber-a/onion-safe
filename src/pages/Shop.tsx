import { useState } from 'react';
import { 
  ShoppingBag, HardHat, ShieldOff, Footprints, 
  Search, ChevronRight, Truck, ShoppingCart, Zap, Calculator,
  MapPin, Maximize2, Building2, ArrowRight, Loader2, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { generateSafetyQuote } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';

const PRODUCTS = [
  { id: 1, name: '스마트 경사계 (무선 IoT 모델)', price: 450000, category: 'Sensor', rating: 4.9, img: 'https://picsum.photos/seed/sensor1/400/300' },
  { id: 2, name: '고감도 가속도계 (진동 계측용)', price: 380000, category: 'Sensor', rating: 4.8, img: 'https://picsum.photos/seed/sensor2/400/300' },
  { id: 3, name: '크레인 하부 하중 감지 센서', price: 1250000, category: 'Heavy', rating: 5.0, img: 'https://picsum.photos/seed/crane/400/300' },
  { id: 4, name: '멀티 복합 가스 측정기 (O2, H2S, CO)', price: 850000, category: 'Safety', rating: 4.7, img: 'https://picsum.photos/seed/gas/400/300' },
  { id: 5, name: '스마트 안전고리 체결 감지 모듈', price: 120000, category: 'Wearable', rating: 4.6, img: 'https://picsum.photos/seed/wearable/400/300' },
  { id: 6, name: '현장 미세먼지 및 소음 측정 스테이션', price: 2100000, category: 'Env', rating: 4.8, img: 'https://picsum.photos/seed/env/400/300' },
];

const CATEGORIES = [
  { id: 'All', name: '전체 품목', icon: ShoppingBag },
  { id: 'Sensor', name: '계측용 센서 (IoT)', icon: Zap },
  { id: 'Heavy', name: '중장비 모니터링', icon: Truck },
  { id: 'Safety', name: '안전 인프라', icon: ShieldOff },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<string | null>(null);
  const [siteInfo, setSiteInfo] = useState({ location: '', scale: '', type: '' });

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleGetQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteLoading(true);
    const result = await generateSafetyQuote(siteInfo);
    setQuoteResult(result);
    setQuoteLoading(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Quote CTA Banner */}
        <div className="mb-12 bg-slate-900 rounded-3xl p-8 relative overflow-hidden group border border-slate-700 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl -mr-20 -mt-20 rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                <Zap className="w-3 h-3" />
                AI Smart Estimate
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight mb-4 font-display">
                현장 맞춤형 <span className="text-blue-500">안전 계측 패키지</span> 견적
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                공사 현장 정보를 입력하시면 관련 법령(산업안전보건법) 및 현장 규모에 맞춘 필수 장비와 AI 스마트 모니터링 시스템 견적을 즉시 산출해 드립니다.
              </p>
              <button 
                onClick={() => setShowQuoteModal(true)}
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-blue-900/20"
              >
                <Calculator className="w-4 h-4" />
                AI 스마트 견적 시작하기
              </button>
            </div>
            <div className="hidden lg:block w-64 h-64 bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-inner relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl" />
              <div className="space-y-4">
                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-blue-500" />
                </div>
                <div className="h-2 w-3/4 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} className="h-full bg-emerald-500" />
                </div>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-12 w-full bg-slate-700/50 rounded-lg" />
                    <div className="h-2 w-full bg-slate-700/50 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-12 w-full bg-slate-700/50 rounded-lg" />
                    <div className="h-2 w-full bg-slate-700/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">건설 안전 전문 상점</h2>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight font-display">스마트 안전 장비 솔루션</h3>
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
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-4 mb-4">품목 구분</h3>
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
                    "text-sm font-bold",
                    activeCategory === cat.id ? "text-slate-900" : "text-slate-500"
                  )}>{cat.name}</span>
                </div>
                <ChevronRight className={cn(
                  "w-3 h-3 text-slate-300",
                  activeCategory === cat.id ? "text-blue-600 opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />
              </button>
            ))}

            <div className="mt-12 bg-slate-50 border border-slate-200 p-8 rounded-2xl">
              <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-3">
                <Truck className="w-4 h-4 text-slate-400" />
              </div>
              <h5 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">공급사 파트너 프로그램</h5>
              <p className="text-[10px] text-slate-500 leading-normal font-bold">
                생산 업체 및 유통사로 등록하여 귀하의 스마트 장비를 쉴드세이프 분석 시스템에 직접 연동하세요.
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

      <AnimatePresence>
        {showQuoteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuoteModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="w-full md:w-80 bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-center md:block mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <button onClick={() => setShowQuoteModal(false)} className="md:hidden text-slate-400">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display">AI 스마트 견적</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-8">
                  공사 종류와 규모에 따라 법정 필수 장비를 포함한 최적의 안전 계측 패키지를 추천해 드립니다.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                    <div className="w-5 h-5 bg-blue-600/20 rounded flex items-center justify-center text-blue-500">1</div>
                    현장 정보 입력
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center">2</div>
                    법령 및 리스크 분석
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center">3</div>
                    등급별 맞춤 견적 확인
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
                {!quoteResult ? (
                  <form onSubmit={handleGetQuote} className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          공사 현장 위치
                        </label>
                        <input 
                          required
                          value={siteInfo.location}
                          onChange={e => setSiteInfo({...siteInfo, location: e.target.value})}
                          placeholder="예: 서울시 성남구 00동"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Maximize2 className="w-3 h-3" />
                            공사 규모 (평/m²)
                          </label>
                          <input 
                            required
                            value={siteInfo.scale}
                            onChange={e => setSiteInfo({...siteInfo, scale: e.target.value})}
                            placeholder="예: 1,000평"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Building2 className="w-3 h-3" />
                            공사 유형
                          </label>
                          <select 
                            required
                            value={siteInfo.type}
                            onChange={e => setSiteInfo({...siteInfo, type: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                          >
                            <option value="">유형 선택</option>
                            <option value="Department Store">백화점/상업시설</option>
                            <option value="Apartment">아パート/공동주택</option>
                            <option value="Civil Engineering">토목/교량/터널</option>
                            <option value="Plant">플랜트/산업시설</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={quoteLoading}
                      className="w-full bg-slate-900 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-50"
                    >
                      {quoteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                      견적 산출하기
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-500" />
                        분석이 완료되었습니다
                      </h4>
                      <button 
                        onClick={() => { setQuoteResult(null); setSiteInfo({ location: '', scale: '', type: '' }); }}
                        className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline"
                      >
                        다시 작성하기
                      </button>
                    </div>
                    <div className="p-8 bg-blue-50/30 border border-blue-100 border-dashed rounded-3xl shadow-inner prose prose-slate prose-sm max-w-none">
                      <ReactMarkdown>{quoteResult}</ReactMarkdown>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Standard', 'Pro', 'Premium'].map((tier) => (
                        <div key={tier} className={cn(
                          "p-4 rounded-xl border flex flex-col justify-between gap-3",
                          tier === 'Premium' ? "bg-blue-50 border-blue-100 ring-1 ring-blue-500/20" : "bg-white border-slate-200"
                        )}>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tier} Package</div>
                          <button className={cn(
                            "w-full py-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1",
                            tier === 'Premium' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"
                          )}>
                            자세히 보기 <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
        <div className="absolute top-3 left-3 bg-blue-600 text-[8px] font-black text-white px-1.5 py-0.5 rounded-sm uppercase tracking-tighter z-10">
          IoT 연동 장비
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
              {product.category === 'Sensor' ? 'IoT 계측 센서' : '산업용 모니터링'}
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
            <span className="text-[9px] font-bold text-slate-400 uppercase">공급 단가</span>
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
