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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Stat row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          label="종합 안전 점수" 
          value={`${siteScore}/100`} 
          icon={ShieldIcon} 
          trend="+2.5%" 
          color="blue" 
        />
        <StatCard 
          label="활성 장비 (OEM)" 
          value="12" 
          icon={Zap} 
          subtitle="92% 가동률" 
          color="amber" 
        />
        <StatCard 
          label="미결 체크리스트" 
          value="3" 
          icon={ClipboardCheck} 
          subtitle="오늘 남은 항목" 
          color="rose" 
        />
        <StatCard 
          label="현장 인원" 
          value="48" 
          icon={HardHat} 
          subtitle="A/B구역 통합" 
          color="emerald" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                장비 모니터링 라이브 (OEM-Integrated)
              </h3>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">실시간</span>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TELEMETRY}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="load" 
                    stroke="#3b82f6" 
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

          {/* Checklist & Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-emerald-500" />
                현장 안전 체크리스트
              </h3>
              <div className="space-y-3">
                {MOCK_CHECKLIST.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                    <span className="text-sm font-medium text-gray-700">{item.task}</span>
                    {item.status === 'checked' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
              <button 
                onClick={handleAIAnalysis}
                disabled={analyzing}
                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                AI 위험 분석 및 리포트 생성
              </button>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                AI 안전 분석 리포트
              </h3>
              <div className="flex-1 overflow-y-auto max-h-[300px] prose prose-sm text-gray-600 bg-gray-50 p-4 rounded-2xl">
                {report ? (
                  <ReactMarkdown>{report}</ReactMarkdown>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                    <Info className="w-8 h-8 opacity-20" />
                    <p className="text-xs">데이터를 분석하면 리포트가 생성됩니다.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar logs & status */}
        <div className="space-y-8">
          <section className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              현장 실시간 로그
            </h3>
            <div className="space-y-6">
              {logs.map(log => (
                <div key={log.id} className="relative pl-6 border-l border-slate-700">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-slate-500" />
                  <div className="flex justify-between items-start mb-1">
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                      log.type === 'warn' ? "bg-amber-500/20 text-amber-500" : "bg-blue-500/20 text-blue-500"
                    )}>
                      {log.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-300 leading-relaxed">
                    {log.msg}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4">안전 등급 등락 (30일)</h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'W1', score: 82 },
                  { name: 'W2', score: 85 },
                  { name: 'W3', score: 79 },
                  { name: 'W4', score: 91 },
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="score" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
              * 안전 점수는 건설 보험 요율 산정 시 증빙 자료로 자동 연동됩니다.
            </p>
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
