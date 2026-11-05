import React from 'react';
import { HNMD_REQUIREMENTS } from '../data/medicalDossier';
import { CheckCircle2, Clock, AlertTriangle, FileText, ExternalLink, ShieldCheck, Info } from 'lucide-react';

interface HNMDChecklistProps {
  onOpenDocument: (path: string, title: string, page?: string) => void;
  onSelectSearchTag?: (tag: string) => void;
}

export const HNMDChecklist: React.FC<HNMDChecklistProps> = ({
  onOpenDocument,
  onSelectSearchTag,
}) => {
  const verifiedCount = HNMD_REQUIREMENTS.filter((r) => r.status === 'present').length;
  const totalCount = HNMD_REQUIREMENTS.length;
  const percentage = Math.round((verifiedCount / totalCount) * 100);

  return (
    <section className="space-y-6">
      {/* Official Navy Notification Context Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white rounded-xl p-6 shadow-md border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono">
                MSG OFICIAL SIGAD-MB · P221325Z/OUT/2026
              </span>
              <span className="text-xs text-slate-300">Capitania Fluvial de Minas Gerais</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mt-2">
              Checklist de Exames Pré-Operatórios Obrigatórios (HNMD)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Exigências formais expedidas pela Clínica de Cirurgia Vascular para internação em <strong>09/11/2026</strong>. 
              Todos os exames solicitados foram conferidos, organizados em abas numeradas e digitalizados com acesso imediato abaixo.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[11px] text-cyan-200 block font-medium">Índice de Prontidão</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold font-mono tabular-nums text-white">
                  {verifiedCount}/{totalCount}
                </span>
                <span className="text-xs text-cyan-200 font-semibold">Exigências</span>
              </div>
              <span className="text-[11px] text-emerald-300 font-medium block mt-0.5">
                {percentage}% Concluído e em Pasta
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-400 flex items-center justify-center font-bold text-xs text-white">
              {percentage}%
            </div>
          </div>
        </div>

        {/* View Official Message CTA */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Portar cópia da mensagem da Marinha + filmes impressos + 3 CDs de tomografia na admissão.</span>
          </div>
          <button
            onClick={() => onOpenDocument('/assets/aistudio/Procedimento_de_Alta_Complexidade_78074c58.pdf', 'Mensagem Oficial da Marinha - Procedimento Alta Complexidade')}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ver Mensagem Oficial da Marinha (PDF)</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Grid of 10 Mandatory Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HNMD_REQUIREMENTS.map((req) => {
          const isPresent = req.status === 'present';
          const isPartial = req.status === 'partial';

          return (
            <div
              key={req.id}
              className={`rounded-xl p-4 border transition-all ${
                isPresent
                  ? 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  : 'bg-amber-50/40 border-amber-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {isPresent ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isPartial ? (
                      <Clock className="w-5 h-5 text-amber-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {req.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-medium text-slate-700">Data mais recente: {req.latestDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{req.doctor}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                    isPresent
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {isPresent ? 'Presente' : 'Em Andamento'}
                </span>
              </div>

              {/* Latest verified value */}
              {req.latestValue && (
                <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400 block font-medium">Último Laudo Encontrado:</span>
                  <span className="font-semibold text-slate-900 font-mono mt-0.5 block">
                    {req.latestValue}
                  </span>
                </div>
              )}

              {/* Folder Location & Notes */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between text-xs gap-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] text-slate-600">
                  <span className="font-medium text-cyan-800">{req.tabLocation}</span>
                  <span className="text-slate-400"> · </span>
                  <span className="font-mono text-slate-700">{req.pageLocation}</span>
                </div>

                <div className="flex items-center gap-2">
                  {onSelectSearchTag && (
                    <button
                      onClick={() => onSelectSearchTag(req.name.split(' ')[0])}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      Filtrar
                    </button>
                  )}
                  <button
                    onClick={() => onOpenDocument(req.filePath, req.name, req.pageLocation)}
                    className="px-2.5 py-1 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-md transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Ver Laudo (PDF)</span>
                  </button>
                </div>
              </div>

              {req.notes && (
                <p className="mt-2 text-[11px] text-slate-500 italic bg-white/70 p-1.5 rounded border border-slate-100">
                  {req.notes}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Special Medical Note from the Dossier Cover */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">
            Nota Médica sobre Risco Cirúrgico / Eletrocardiograma (Constante na Capa do Dossiê):
          </span>
          <p className="leading-relaxed">
            &ldquo;O laudo do eletrocardiograma e a avaliação formal de risco cirúrgico não foram entregues pelo hospital emissor até o momento da montagem da pasta. 
            Contudo, o paciente já realizou <strong>Cateterismo Cardíaco (CATE 88181 em 01/10/2026)</strong> que evidenciou coronárias totalmente livres de obstrução, 
            e os exames laboratoriais e infecciosos encontram-se 100% atualizados.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
