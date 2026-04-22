import { useState } from 'react';
import { 
  Shield, Zap, Activity, FileText, CheckCircle2, 
  Loader2, LayoutDashboard, Brain, History, Radar, AlertTriangle, ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { analyzeSafety } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';

// MOCK DATA for Integrated Monitoring
const MOCK_TELEMETRY = [
  { time: '09:00', load: 45, vibration: 12, tilt: 0.1, gas: 19.5 },
  { time: '10:00', load: 52, vibration: 15, tilt: 0.2, gas: 19.4 },
  { time: '11:00', load: 88, vibration: 42, tilt: 0.8, gas: 19.8 },
  { time: '12:00', load: 40, vibration: 10, tilt: 0.2, gas: 19.5 },
  { time: '13:00', load: 65, vibration: 25, tilt: 0.5, gas: 20.1 },
  { time: '14:00', load: 78, vibration: 30, tilt: 0.4, gas: 19.3 },
];

const MOCK_CHECKLIST = [
  { id: '1', task: '작업자 안전모 착용 확인', status: 'checked' },
  { id: '2', task: '비계 설치 및 고정 상태 점검', status: 'checked' },
  { id: '3', task: '화기 작업 근처 소화기 배치', status: 'pending' },
  { id: '4', task: '고소 작업자 안전대 체결', status: 'checked' },
];

const MOCK_LOGS = [
  { id: 1, type: 'warn', time: '14:22', msg: 'A구역 타워크레인 지브 횡풍 감지 (15m/s 초과)' },
  { id: 2, type: 'info', time: '14:15', msg: '지하 2층 산소 농도 정상 (20.5%)' },
  { id: 3, type: 'alert', time: '13:50', msg: '토류판 변위 계측 수치 관리기준 1차 초과' },
  { id: 4, type: 'info', time: '13:30', msg: '신규 스마트 경사계(CH-04) 데이터 수신 시작' },
];

export default function Dashboard() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [siteScore] = useState(88);

  const handleAIAnalysis = async () => {
    setAnalyzing(true);
    // In a real app, send actual telemetry and checklist
    const result = await analyzeSafety(MOCK_CHECKLIST, MOCK_TELEMETRY);
    setReport(result);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">건설·토목·유지관리 통합 계측 시스템</h2>
          <h3 className="text-2xl font-bold text-slate-800 font-display">스마트 현장 통합 관제 센터</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white border border-slate-200 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">연동 장비 수</span>
            <span className="text-xs font-bold text-blue-600">24 Nodes</span>
          </div>
          <div className="bg-green-50 border border-green-100 px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-bold text-green-700">AI 위험 예측 엔진 가동 중</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">종합 리스크 스코어</div>
            <div className="text-xl font-bold text-slate-800">{siteScore} / 100</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">AI 사고 예측 확률</div>
            <div className="text-xl font-bold text-amber-600">Low (4.2%)</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">실시간 계측 노드</div>
            <div className="text-xl font-bold text-slate-800">정상 (100%)</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">전력/에너지 상태</div>
            <div className="text-xl font-bold text-slate-800">안정</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Multi-Channel Integrated Monitoring</div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600"></div><span className="text-[10px] font-bold text-slate-500">장비 부하</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[10px] font-bold text-slate-500">진동/변위</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] font-bold text-slate-500">유해가스</span></div>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TELEMETRY}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: 'none' }}
                  />
                  <Area type="monotone" name="장비 부하" dataKey="load" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
                  <Area type="monotone" name="진동 수치" dataKey="vibration" stroke="#f59e0b" strokeWidth={2} fill="transparent" />
                  <Area type="monotone" name="가스 농도" dataKey="gas" stroke="#10b981" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                <LayoutDashboard className="w-3 h-3" />
                주요 계측 관리 포인트
              </div>
              <div className="space-y-4">
                {[
                  { label: '교량 상판 변위 (Node-X1)', value: '0.12mm', status: 'Normal' },
                  { label: '지하시설물 잔류가스', value: '1.2ppm', status: 'Normal' },
                  { label: '타워크레인 풍속 센서', value: '8.4m/s', status: 'Warning' },
                  { label: '절토사면 경사계 (S-09)', value: '0.02°', status: 'Normal' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-600">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold text-slate-800">{item.value}</span>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        item.status === 'Warning' ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative border border-slate-700">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
              <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                <Brain className="w-3 h-3 text-blue-400" />
                AI 위험 예측 분석 현황
              </div>
              <div className="space-y-6 relative z-10">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">사고 발생 예측 확률 (AI)</div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-black text-white">4.2%</div>
                    <div className="text-[10px] font-bold text-emerald-400 mb-1.5 flex items-center">
                      <ChevronRight className="w-2 h-2 rotate-[-90deg]" /> 1.2% 하락
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleAIAnalysis}
                  disabled={analyzing}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"
                >
                  {analyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Radar className="w-3 h-3" />}
                  전체 지점 리스크 시뮬레이션
                </button>
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <History className="w-3 h-3" />
              실시간 계측 및 예측 로그
            </h3>
            <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {MOCK_LOGS.map(log => (
                <div key={log.id} className="relative pl-6 border-l border-slate-100">
                  <div className={cn(
                    "absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full",
                    log.type === 'alert' ? "bg-red-500" : log.type === 'warn' ? "bg-amber-500" : "bg-slate-300"
                  )} />
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono text-slate-400">{log.time}</span>
                    <span className={cn(
                      "text-[8px] font-bold uppercase px-1 py-0.5 rounded",
                      log.type === 'alert' ? "bg-red-50 text-red-600" : log.type === 'warn' ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-500"
                    )}>
                      {log.type}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 leading-relaxed font-display">
                    {log.msg}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">데이터 신뢰도 지표</h4>
              <span className="text-[10px] font-bold text-blue-600">Reliability 99.9%</span>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: '경사', val: 98 },
                  { name: '진동', val: 92 },
                  { name: '하중', val: 95 },
                  { name: '가스', val: 99 },
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: '#cbd5e1'}} />
                  <Bar dataKey="val" fill="#f1f5f9" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
      
      {report && (
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl border-t-4 border-t-blue-600">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">AI 정밀 진단 및 위험 예측 보고서</h4>
            </div>
            <button onClick={() => window.print()} className="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase transition-colors">Print PDF</button>
          </div>
          <div className="prose prose-slate prose-sm max-w-none bg-slate-50/50 p-6 rounded-xl border border-slate-100 border-dashed">
            <ReactMarkdown>{report}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  );
}
