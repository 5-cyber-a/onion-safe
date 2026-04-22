import { useState, useEffect } from 'react';
import { 
  Activity, AlertTriangle, CheckCircle2, ClipboardCheck, 
  FileText, HardHat, TrendingUp, Zap, Info, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { analyzeSafety } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';

// MOCK DATA for Demo
const MOCK_TELEMETRY = [
  { time: '09:00', load: 45, vibration: 12, temp: 22 },
  { time: '10:00', load: 52, vibration: 15, temp: 24 },
  { time: '11:00', load: 48, vibration: 14, temp: 25 },
  { time: '12:00', load: 61, vibration: 22, temp: 28 },
  { time: '13:00', load: 55, vibration: 18, temp: 27 },
  { time: '14:00', load: 72, vibration: 31, temp: 30 },
  { time: '15:00', load: 65, vibration: 25, temp: 29 },
];

const MOCK_CHECKLIST = [
  { id: '1', task: '작업자 안전모 착용 확인', status: 'checked' },
  { id: '2', task: '비계 설치 및 고정 상태 점검', status: 'checked' },
  { id: '3', task: '화기 작업 근처 소화기 배치', status: 'pending' },
  { id: '4', task: '고소 작업자 안전대 체결', status: 'checked' },
];

export default function Dashboard() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [siteScore, setSiteScore] = useState(88);
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', msg: '굴삭기(OEM) 엔진 시운전 시작', time: '14:20' },
    { id: 2, type: 'warn', msg: 'A구역 진동 수치 임계치 접근 (31Hz)', time: '14:45' },
    { id: 3, type: 'info', msg: '안전 점검 체크리스트 업데이트 완료', time: '15:01' },
  ]);

  const handleAIAnalysis = async () => {
    setAnalyzing(true);
    const result = await analyzeSafety(MOCK_CHECKLIST, MOCK_TELEMETRY);
    setReport(result || "분석 결과를 가져오지 못했습니다.");
    
    // Extract score if possible
    const scoreMatch = result?.match(/Safety Score:\s*(\d+)/i);
    if (scoreMatch) setSiteScore(parseInt(scoreMatch[1]));
    
    setAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Safety Management SaaS</h2>
          <h3 className="text-2xl font-bold text-slate-800">Risk Control Center</h3>
        </div>
        <div className="bg-green-50 border border-green-100 px-3 py-1 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-semibold text-green-700 uppercase">AI Monitoring Active</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="64" cy="64" r="58" fill="none" stroke="#f1f5f9" strokeWidth="10"/>
            <circle 
              cx="64" 
              cy="64" 
              r="58" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="10" 
              strokeDasharray="364" 
              strokeDashoffset={364 - (364 * siteScore / 100)} 
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="text-center">
            <span className="text-3xl font-bold text-slate-800 block text-display">{siteScore}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Safety Score</span>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-800 mb-2 underline decoration-blue-500 underline-offset-4">Premium Insurance Grade</h4>
          <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
            현재 귀하의 현장 안전 점수는 다음 달 산업재해 보험료에서 <span className="text-blue-600 font-bold">12% 프리미엄 할인</span>을 받을 수 있는 우수 등급에 해당합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center justify-between">
              Live Monitoring (OEM-Integrated)
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                Real-time
              </span>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TELEMETRY}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="load" 
                    stroke="#2563eb" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorLoad)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="vibration" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Pre-Work Checklist</div>
              <div className="space-y-2">
                {MOCK_CHECKLIST.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-semibold text-slate-700">{item.task}</span>
                    {item.status === 'checked' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-slate-200 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
              <button 
                onClick={handleAIAnalysis}
                disabled={analyzing}
                className="w-full mt-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {analyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                Analyze Risks & Score
              </button>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">AI Safety Analysis</div>
              <div className="flex-1 overflow-y-auto max-h-[300px] prose prose-slate prose-xs text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100 border-dashed">
                {report ? (
                  <ReactMarkdown>{report}</ReactMarkdown>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-2 py-8">
                    <FileText className="w-8 h-8 opacity-20" />
                    <p className="text-[10px] font-bold uppercase">Generate report to view analysis</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <div className="flex flex-col mb-4">
              <span className="text-[10px] font-bold uppercase opacity-80 tracking-widest">SaaS Status</span>
              <span className="text-xl font-bold tracking-tight">Enterprise Tier</span>
            </div>
            <p className="text-xs opacity-80 leading-relaxed mb-6">
              실시간 원청 공유 및 자동 점수 산출 기능이 활성화되어 있습니다.
            </p>
            <div className="flex justify-between items-end border-t border-blue-400 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-widest">Billing Score</span>
              <div className="text-right">
                <span className="text-2xl font-bold">$450</span>
                <span className="text-xs opacity-80"> / month</span>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Monthly Trend</div>
            <div className="h-40 w-full font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'W1', score: 82 },
                  { name: 'W2', score: 85 },
                  { name: 'W3', score: 79 },
                  { name: 'W4', score: 91 },
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: '#cbd5e1'}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }} />
                  <Bar dataKey="score" fill="#e2e8f0" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return <div className="p-2 bg-blue-50 rounded-lg"><Shield className="w-5 h-5 text-blue-500" /></div>;
}

function Shield({ className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function StatCard({ label, value, icon: Icon, trend, subtitle, color }: any) {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className={cn("p-3 rounded-2xl", colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
