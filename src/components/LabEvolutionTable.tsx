import React, { useState } from 'react';
import { TrendingUp, ArrowRight, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface EvolutionRow {
  parameter: string;
  reference: string;
  may2026: string; // 20/05 HGeJF
  sep2026Adm: string; // 20/09 Santa Casa
  sep2026Ctrl: string; // 24/09 Santa Casa
  oct2026: string; // 29/10 Carlos Chagas
  trend: 'stable' | 'improved' | 'attention';
  trendText: string;
  clinicalNote: string;
}

const EVOLUTION_DATA: EvolutionRow[] = [
  {
    parameter: 'Ureia Sérica',
    reference: '15 a 45 mg/dL',
    may2026: '24 mg/dL',
    sep2026Adm: '31 mg/dL',
    sep2026Ctrl: '39 mg/dL',
    oct2026: '29,2 mg/dL',
    trend: 'stable',
    trendText: 'Estável e Normal',
    clinicalNote: 'Função renal preservada em todas as aferições, sem retenção de escórias.',
  },
  {
    parameter: 'Creatinina Sérica',
    reference: '0,6 a 1,3 mg/dL',
    may2026: '1,18 mg/dL',
    sep2026Adm: '1,26 mg/dL',
    sep2026Ctrl: '1,18 mg/dL',
    oct2026: '1,10 mg/dL',
    trend: 'improved',
    trendText: 'Otimizada (1,10)',
    clinicalNote: 'Taxa de filtração glomerular estimada (TFG) de 79,2 mL/min/1,73m² no pré-op imediato.',
  },
  {
    parameter: 'Hemoglobina (Hb)',
    reference: '13,0 a 17,0 g/dL',
    may2026: '17,1 g/dL',
    sep2026Adm: '14,5 g/dL',
    sep2026Ctrl: '13,3 g/dL',
    oct2026: '14,1 g/dL',
    trend: 'stable',
    trendText: 'Compensada (14,1)',
    clinicalNote: 'Excelente nível pré-operatório sem necessidade de transfusão.',
  },
  {
    parameter: 'Hematócrito (Ht)',
    reference: '40 a 50 %',
    may2026: '49,7 %',
    sep2026Adm: '42,0 %',
    sep2026Ctrl: '39,3 %',
    oct2026: '41,5 %',
    trend: 'stable',
    trendText: 'Normovolêmico',
    clinicalNote: 'Eritrograma normocítico normocrômico estável.',
  },
  {
    parameter: 'Leucócitos Totais',
    reference: '4.000 a 10.000 /uL',
    may2026: '8.540 /mm³',
    sep2026Adm: '10.800 /mm³',
    sep2026Ctrl: '7.100 /mm³',
    oct2026: '6.830 /uL',
    trend: 'improved',
    trendText: 'Normalizado',
    clinicalNote: 'Leucocitose reacional de admissão regrediu completamente.',
  },
  {
    parameter: 'Plaquetas',
    reference: '150k a 450k /mm³',
    may2026: '178.000 /mm³',
    sep2026Adm: '219.000 /mm³',
    sep2026Ctrl: '176.000 /mm³',
    oct2026: '196.000 /mm³',
    trend: 'stable',
    trendText: 'Estável e Seguro',
    clinicalNote: 'Plaquetometria sem trombocitopenia.',
  },
  {
    parameter: 'Glicemia de Jejum',
    reference: '70 a 99 mg/dL',
    may2026: '97 mg/dL',
    sep2026Adm: '—',
    sep2026Ctrl: '119 mg/dL',
    oct2026: '105 mg/dL (Est)',
    trend: 'stable',
    trendText: 'Sob Controle',
    clinicalNote: '119 mg/dL transitório de estresse hospitalar.',
  },
  {
    parameter: 'Hemoglobina Glicada (HbA1c)',
    reference: '< 5,7% (Normal)',
    may2026: '5,20 %',
    sep2026Adm: '—',
    sep2026Ctrl: '5,30 %',
    oct2026: '5,30 %',
    trend: 'stable',
    trendText: 'Não Diabético',
    clinicalNote: 'Curva de controle glicêmico perfeito há mais de 6 meses.',
  },
  {
    parameter: 'Sódio Sérico (Na+)',
    reference: '136 a 145 mEq/L',
    may2026: '—',
    sep2026Adm: '139 mmol/L',
    sep2026Ctrl: '138 mmol/L',
    oct2026: '136 mEq/L',
    trend: 'stable',
    trendText: 'Eunatrêmico',
    clinicalNote: 'Equilíbrio hidroeletrolítico mantido.',
  },
  {
    parameter: 'Potássio Sérico (K+)',
    reference: '3,5 a 5,1 mEq/L',
    may2026: '—',
    sep2026Adm: '4,40 mmol/L',
    sep2026Ctrl: '4,00 mmol/L',
    oct2026: '3,90 mEq/L',
    trend: 'stable',
    trendText: 'Normocalêmico',
    clinicalNote: 'Sem arritmias por distúrbios de potássio.',
  },
  {
    parameter: 'Colesterol Total',
    reference: '< 190 mg/dL',
    may2026: '176 mg/dL',
    sep2026Adm: '—',
    sep2026Ctrl: '—',
    oct2026: '221 mg/dL',
    trend: 'attention',
    trendText: 'Atenção Lipídica',
    clinicalNote: 'Aumento concomitante ao expressivo ganho de fração protetora HDL.',
  },
  {
    parameter: 'Colesterol HDL (Fator Protetor)',
    reference: '> 40 mg/dL',
    may2026: '39 mg/dL',
    sep2026Adm: '—',
    sep2026Ctrl: '—',
    oct2026: '68 mg/dL',
    trend: 'improved',
    trendText: 'Excelente (+74%)',
    clinicalNote: 'Elevação substancial de HDL com ação cardioprotetora.',
  },
  {
    parameter: 'TGP (ALT) Hepática',
    reference: '<= 45 U/L',
    may2026: '20,0 UI/L',
    sep2026Adm: '—',
    sep2026Ctrl: '—',
    oct2026: '22,0 U/L',
    trend: 'stable',
    trendText: 'Normal e Estável',
    clinicalNote: 'Fígado saudável tolerando perfeitamente a terapia antirretroviral.',
  },
  {
    parameter: 'TGO (AST) Hepática',
    reference: '< 38 U/L',
    may2026: '38,0 UI/L',
    sep2026Adm: '—',
    sep2026Ctrl: '—',
    oct2026: '19,0 U/L',
    trend: 'improved',
    trendText: 'Melhora (19,0)',
    clinicalNote: 'Redução para metade do limite superior de normalidade.',
  },
  {
    parameter: 'Coagulograma (TAP / RNI)',
    reference: 'RNI ~ 1,0 | Ativ. 100%',
    may2026: '—',
    sep2026Adm: '11,4s (100% / RNI 1,0)',
    sep2026Ctrl: '11,4s (100% / RNI 1,0)',
    oct2026: 'Normal',
    trend: 'stable',
    trendText: 'Sem Sangramento',
    clinicalNote: 'TTPA 30,2s estável. Coagulação fisiológica preservada para cirurgia vascular.',
  },
  {
    parameter: 'Linfócitos T CD4 & Carga Viral',
    reference: 'CD4 > 350 | CV < 200',
    may2026: 'Acompanhado',
    sep2026Adm: 'Estável',
    sep2026Ctrl: 'TARV mantida',
    oct2026: 'CD4: 464 | CV: 129',
    trend: 'improved',
    trendText: 'Apto Pela Infecto',
    clinicalNote: 'Atestado emitido pela Dra. Cecília Wolkartt em 29/10/2026.',
  },
];

interface LabEvolutionTableProps {
  onOpenDocument: (path: string, title: string, page?: string) => void;
}

export const LabEvolutionTable: React.FC<LabEvolutionTableProps> = ({ onOpenDocument }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'improved' | 'stable' | 'attention'>('all');

  const filtered = selectedFilter === 'all'
    ? EVOLUTION_DATA
    : EVOLUTION_DATA.filter((r) => r.trend === selectedFilter);

  return (
    <section className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-700" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Painel Comparativo e Evolução Temporal de Resultados
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Análise longitudinal dos exames entre <strong className="text-slate-800">Maio/2026 (HGeJF)</strong>, <strong className="text-slate-800">Setembro/2026 (Santa Casa Admissão & Controle)</strong> e <strong className="text-slate-800">Outubro/2026 (Carlos Chagas Pré-Op)</strong>.
            </p>
          </div>

          {/* Filter segment */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({EVOLUTION_DATA.length})
            </button>
            <button
              onClick={() => setSelectedFilter('stable')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedFilter === 'stable' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Estáveis
            </button>
            <button
              onClick={() => setSelectedFilter('improved')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedFilter === 'improved' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Melhorias
            </button>
            <button
              onClick={() => setSelectedFilter('attention')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedFilter === 'attention' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Atenção
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                <th className="py-3 px-4 font-bold">Parâmetro Clínico</th>
                <th className="py-3 px-3 font-semibold text-slate-500">Referência</th>
                <th className="py-3 px-3 font-bold text-slate-700 font-mono">
                  20/05/2026
                  <span className="block text-[10px] text-slate-400 font-normal">HGeJF (Dr. Arthur)</span>
                </th>
                <th className="py-3 px-3 font-bold text-slate-700 font-mono">
                  20/09/2026
                  <span className="block text-[10px] text-slate-400 font-normal">Santa Casa (Admissão)</span>
                </th>
                <th className="py-3 px-3 font-bold text-slate-700 font-mono">
                  24/09/2026
                  <span className="block text-[10px] text-slate-400 font-normal">Santa Casa (Controle)</span>
                </th>
                <th className="py-3 px-3 font-bold text-cyan-900 font-mono bg-cyan-50/70 border-x border-cyan-100">
                  29/10/2026
                  <span className="block text-[10px] text-cyan-700 font-normal">Carlos Chagas (Pré-Op)</span>
                </th>
                <th className="py-3 px-4 font-bold text-slate-700">Tendência / Conduta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row, idx) => {
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {row.parameter}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {row.reference}
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-slate-700 tabular-nums">
                      {row.may2026}
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-slate-700 tabular-nums">
                      {row.sep2026Adm}
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-slate-700 tabular-nums">
                      {row.sep2026Ctrl}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-cyan-950 tabular-nums bg-cyan-50/40 border-x border-cyan-100">
                      {row.oct2026}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {row.trend === 'improved' ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {row.trendText}
                          </span>
                        ) : row.trend === 'attention' ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            {row.trendText}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {row.trendText}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                        {row.clinicalNote}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer actions inside table */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-600">
            Necessita verificar o laudo original assinado? Clique no documento de cada época:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenDocument('/assets/aistudio/etraiol_d7833244.pdf', 'Laudo HGeJF - 20/05/2026 (Dr. Arthur)')}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-medium transition-colors"
            >
              HGeJF (20/05)
            </button>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/laudoSangue_6f5bc10f.pdf', 'Laudo Santa Casa - 20/09/2026 (Admissão)')}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-medium transition-colors"
            >
              Santa Casa (20/09)
            </button>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/laudoHemograma_dcadf96f.pdf', 'Laudo Santa Casa - 24/09/2026 (Controle)')}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-medium transition-colors"
            >
              Santa Casa (24/09)
            </button>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/ceilia_f5c95ee4.pdf', 'Laudo Carlos Chagas - 29/10/2026 (Dra. Cecília)')}
              className="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-800 text-white rounded font-medium transition-colors shadow-xs"
            >
              Carlos Chagas (29/10)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
