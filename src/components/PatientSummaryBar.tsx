import React, { useState } from 'react';
import { PATIENT_DATA } from '../data/medicalDossier';
import { Phone, Calendar, AlertTriangle, ShieldCheck, HeartPulse, User, ChevronDown, ChevronUp, KeyRound } from 'lucide-react';

interface PatientSummaryBarProps {
  onOpenDocument: (path: string, title: string, page?: string) => void;
  onSelectSection?: (section: string) => void;
}

export const PatientSummaryBar: React.FC<PatientSummaryBarProps> = ({ onOpenDocument, onSelectSection }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Row: Patient Quick Identification & Critical Destination */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {PATIENT_DATA.name}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200">
                  {PATIENT_DATA.insurance}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-slate-500 mt-1">
                <span className="font-mono">NIP: {PATIENT_DATA.nip}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">CPF: {PATIENT_DATA.cpf}</span>
                <span aria-hidden="true">·</span>
                <span>Nasc: {PATIENT_DATA.birthDate} ({PATIENT_DATA.age} anos)</span>
              </div>
            </div>
          </div>

          {/* Quick Action badges / Critical appointment info */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900">
              <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-semibold block">Internação / Avaliação HNMD</span>
                <span className="text-[11px] text-amber-800">
                  {PATIENT_DATA.appointmentDate} · Cirurgia Vascular
                </span>
              </div>
            </div>

            {onSelectSection && (
              <button
                onClick={() => onSelectSection('credentials')}
                className="flex items-center gap-1.5 px-3 py-2 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg text-xs font-bold text-amber-950 transition-colors shadow-2xs"
                title="Acessar portais dos laboratórios, logins e senhas"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-800" />
                <span>Senhas dos Labs (4)</span>
              </button>
            )}

            <button
              onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>Contatos de Emergência ({PATIENT_DATA.emergencyContacts.length})</span>
            </button>

            <button
              onClick={() => setShowFullDetails(!showFullDetails)}
              className="flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50 rounded-lg transition-colors"
            >
              <span>{showFullDetails ? 'Ocultar Resumo' : 'Ver Resumo Clínico'}</span>
              {showFullDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Emergency Contacts Dropdown Panel */}
        {showEmergencyContacts && (
          <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
            {PATIENT_DATA.emergencyContacts.map((contact, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-900 block">{contact.relationship}: {contact.name}</span>
                  <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-cyan-700 hover:underline font-mono">
                    {contact.phone}
                  </a>
                </div>
                <a
                  href={`tel:${contact.phone.replace(/\D/g, '')}`}
                  className="p-1.5 bg-cyan-50 text-cyan-700 rounded hover:bg-cyan-100"
                  title={`Ligar para ${contact.name}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Expandable Clinical Summary & Vascular Context */}
        {showFullDetails && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Column 1: Diagnóstico e Vascular */}
            <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>Diagnóstico Vascular Principal</span>
              </div>
              <p className="font-medium text-slate-800 leading-relaxed">
                {PATIENT_DATA.mainDiagnosis}
              </p>
              <p className="text-slate-500 font-mono text-[11px]">
                {PATIENT_DATA.cid}
              </p>
              <p className="text-slate-600 pt-1 border-t border-slate-200">
                <span className="font-medium">Quadro:</span> Claudicação severa em MID com dor de repouso e ausência de pulsos femorais bilateralmente.
              </p>
              <button
                onClick={() => onOpenDocument('/assets/aistudio/evoluvao_46453b8c.pdf', 'Relatório de Evolução Médica - Dr. Luiz Kingma')}
                className="text-cyan-700 hover:underline font-medium text-[11px] block pt-1"
              >
                Ver Relatório Médico Santa Casa (Dr. Kingma) →
              </button>
            </div>

            {/* Column 2: Infectologia & Aptidão */}
            <div className="space-y-1.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Parecer da Infectologia (Pré-Op)</span>
              </div>
              <div className="flex items-center justify-between text-emerald-900">
                <span>Linfócitos T CD4:</span>
                <span className="font-bold font-mono">{PATIENT_DATA.infectologyStatus.cd4} ({PATIENT_DATA.infectologyStatus.cd4Percent})</span>
              </div>
              <div className="flex items-center justify-between text-emerald-900">
                <span>Carga Viral HIV:</span>
                <span className="font-bold font-mono">{PATIENT_DATA.infectologyStatus.viralLoad}</span>
              </div>
              <p className="text-emerald-800 font-medium pt-1 border-t border-emerald-200">
                ✓ {PATIENT_DATA.infectologyStatus.status}
              </p>
              <p className="text-emerald-700 text-[11px]">
                {PATIENT_DATA.infectologyStatus.doctor} ({PATIENT_DATA.infectologyStatus.crm})
              </p>
            </div>

            {/* Column 3: Hábitos e Antecedentes */}
            <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Antecedentes & Fatores de Risco</span>
              </div>
              <p className="text-slate-700">
                <span className="font-medium">Tabagismo:</span> {PATIENT_DATA.habits}
              </p>
              <p className="text-slate-700">
                <span className="font-medium">Comorbidades:</span> DPOC; Portador de HIV há &gt;30 anos sob TARV contínua; Aterosclerose sistêmica.
              </p>
              <p className="text-slate-700">
                <span className="font-medium">Alergias:</span> {PATIENT_DATA.allergies}
              </p>
              <button
                onClick={() => onOpenDocument('/assets/aistudio/Capa_Dossie_Clinico_Cirurgico_Vascular_c2d903bf.pdf', 'Capa do Dossiê Clínico e Cirúrgico')}
                className="text-cyan-700 hover:underline font-medium text-[11px] block pt-1"
              >
                Ver Capa Oficial do Dossiê Completo →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
