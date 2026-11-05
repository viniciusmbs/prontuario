import React from 'react';
import { MEDICATIONS_LIST } from '../data/medicalDossier';
import { Pill, AlertCircle, ShieldAlert, Heart, Clock, UserCheck } from 'lucide-react';

export const MedicationPanel: React.FC = () => {
  const vascularMeds = MEDICATIONS_LIST.filter((m) => m.category === 'vascular');
  const analgesiaMeds = MEDICATIONS_LIST.filter((m) => m.category === 'analgesia');
  const hivMeds = MEDICATIONS_LIST.filter((m) => m.category === 'hiv');

  return (
    <section className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-cyan-700" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Lista Completa de Medicamentos em Uso Recente
          </h2>
        </div>
        <p className="text-xs text-slate-600 mt-1 max-w-2xl">
          Medicações ativas registradas no prontuário, com dosagens, intervalos e recomendações pré e pós-operatórias para o cirurgião vascular e anestesista do HNMD.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Category A: Analgesia e Relaxamento */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm pb-3 border-b border-slate-100">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>A) Analgesia & Relaxamento</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              Prescritos pelo Maj. Túlio (HGeJF em 16/10/2026)
            </p>

            <div className="mt-4 space-y-4">
              {analgesiaMeds.map((med) => (
                <div key={med.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 text-sm block">
                    {med.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-700 font-mono">
                    <span className="font-semibold">{med.dosage}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-800 font-medium">{med.frequency}</span>
                  </div>
                  {med.notes && (
                    <p className="text-[11px] text-slate-500 mt-1.5 italic">
                      {med.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Orientação: Uso conforme sintomatologia dolorosa de repouso.
          </div>
        </div>

        {/* Category B: Tratamento Vascular e Prevenção */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-900 font-bold text-sm pb-3 border-b border-slate-100">
              <Heart className="w-4 h-4 text-cyan-700" />
              <span>B) Tratamento Vascular & Prevenção</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              Prescritos pelo Dr. Luiz Kingma (Santa Casa)
            </p>

            <div className="mt-4 space-y-4">
              {vascularMeds.map((med) => (
                <div key={med.id} className="p-3 bg-cyan-50/50 rounded-lg border border-cyan-100">
                  <span className="font-bold text-cyan-950 text-sm block">
                    {med.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-xs text-cyan-900 font-mono">
                    <span className="font-semibold">{med.dosage}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-800 font-medium">{med.frequency}</span>
                  </div>
                  {med.notes && (
                    <p className="text-[11px] text-cyan-800/80 mt-1.5 italic">
                      {med.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-800 font-medium bg-amber-50/60 p-2 rounded">
            Atenção equipe cirúrgica: AAS e Cilostazol para planejamento de pausa/manuseio hemostático conforme rotina cirúrgica vascular.
          </div>
        </div>

        {/* Category C: Esquema Antirretroviral */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm pb-3 border-b border-slate-100">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>C) Esquema Antirretroviral / TARV</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              Prescrito pela Dra. Cecília Wolkartt (CRM-MG 80696)
            </p>

            <div className="mt-4 space-y-3">
              {hivMeds.map((med) => (
                <div key={med.id} className="p-2.5 bg-emerald-50/40 rounded-lg border border-emerald-100">
                  <span className="font-bold text-emerald-950 text-sm block">
                    {med.name} ({med.dosage})
                  </span>
                  <div className="text-xs text-emerald-800 font-mono mt-0.5">
                    {med.frequency}
                  </div>
                  {med.notes && (
                    <p className="text-[10px] text-emerald-700 mt-1">
                      {med.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-900 font-bold bg-emerald-50 p-2 rounded border border-emerald-200">
            Orientação Expressa da Infectologia: MANTER O ESQUEMA EM PRÉ E PÓS-OPERATÓRIO IMEDIATO SEM INTERRUPÇÃO.
          </div>
        </div>
      </div>
    </section>
  );
};
