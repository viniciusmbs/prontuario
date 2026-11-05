import React from 'react';
import { PATIENT_DATA, MEDICATIONS_LIST, PHYSICAL_FOLDER_ITEMS, HNMD_REQUIREMENTS } from '../data/medicalDossier';
import { LabParameter } from '../types/medical';
import { Printer, X } from 'lucide-react';

interface PrintReportViewProps {
  parameters: LabParameter[];
  onClose: () => void;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({
  parameters,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/90 backdrop-blur-sm p-4 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 print:p-0 print:shadow-none print:rounded-none">
        {/* Floating Print Controls (hidden when printing) */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 print:hidden">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Visualização de Impressão do Prontuário Médico
            </h2>
            <p className="text-xs text-slate-500">
              Formato executivo otimizado para entrega em mãos ao cirurgião ou arquivo hospitalar.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Agora</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="space-y-6 text-slate-900 font-sans">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block">
                DOSSIÊ CLÍNICO E CIRÚRGICO VASCULAR · PRONTUÁRIO MÉDICO
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                {PATIENT_DATA.name}
              </h1>
              <div className="flex flex-wrap gap-x-3 text-xs text-slate-600 mt-1">
                <span><strong>NIP:</strong> {PATIENT_DATA.nip}</span>
                <span><strong>CPF:</strong> {PATIENT_DATA.cpf}</span>
                <span><strong>Data Nasc:</strong> {PATIENT_DATA.birthDate} ({PATIENT_DATA.age} anos)</span>
                <span><strong>Convênio:</strong> {PATIENT_DATA.insurance}</span>
              </div>
            </div>
            <div className="text-right text-xs bg-slate-100 p-2.5 rounded border border-slate-300">
              <span className="font-bold block text-slate-900">INTERNAÇÃO / AVALIAÇÃO HNMD</span>
              <span className="text-slate-700 font-medium">Data: {PATIENT_DATA.appointmentDate}</span>
              <span className="block text-[11px] text-slate-500">{PATIENT_DATA.specialty}</span>
            </div>
          </div>

          {/* Section 1: Diagnóstico e Histórico */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded border border-slate-300 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 uppercase text-[11px] border-b border-slate-200 pb-1 mb-1.5">
                1. Diagnóstico Principal & Antecedentes
              </h3>
              <p className="font-semibold text-slate-800">{PATIENT_DATA.mainDiagnosis}</p>
              <p className="text-slate-500 font-mono text-[11px]">{PATIENT_DATA.cid}</p>
              <p className="mt-1 text-slate-700"><span className="font-medium">Hábitos:</span> {PATIENT_DATA.habits}</p>
              <p className="text-slate-700"><span className="font-medium">Alergias:</span> {PATIENT_DATA.allergies}</p>
            </div>

            <div className="p-3 rounded border border-slate-300 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 uppercase text-[11px] border-b border-slate-200 pb-1 mb-1.5">
                2. Parecer Infectológico (Dra. Cecília Wolkartt)
              </h3>
              <p className="text-slate-700"><span className="font-medium">Histórico:</span> Paciente em TARV contínua há {PATIENT_DATA.infectologyStatus.hivTime}.</p>
              <p className="text-slate-800 font-medium">
                Linfócitos CD4: <strong className="font-mono">{PATIENT_DATA.infectologyStatus.cd4}</strong> ({PATIENT_DATA.infectologyStatus.cd4Percent}) · CV: <strong className="font-mono">{PATIENT_DATA.infectologyStatus.viralLoad}</strong>
              </p>
              <p className="text-emerald-800 font-bold mt-1 text-[11px]">
                ✓ {PATIENT_DATA.infectologyStatus.status}
              </p>
            </div>
          </div>

          {/* Section 2: Medicamentos em Uso Recente */}
          <div>
            <h3 className="font-bold text-slate-900 uppercase text-[11px] border-b border-slate-300 pb-1 mb-2">
              3. Medicamentos em Uso Recente
            </h3>
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="py-1.5 px-2">Classe / Categoria</th>
                  <th className="py-1.5 px-2">Medicamento e Dosagem</th>
                  <th className="py-1.5 px-2">Posologia / Frequência</th>
                  <th className="py-1.5 px-2">Médico Prescritor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {MEDICATIONS_LIST.map((med) => (
                  <tr key={med.id}>
                    <td className="py-1 px-2 font-medium text-slate-600">{med.categoryLabel}</td>
                    <td className="py-1 px-2 font-bold text-slate-900">{med.name} {med.dosage}</td>
                    <td className="py-1 px-2 font-mono text-slate-800">{med.frequency}</td>
                    <td className="py-1 px-2 text-slate-500">{med.prescribedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Exames Pré-Operatórios Essenciais (Checklist HNMD) */}
          <div>
            <h3 className="font-bold text-slate-900 uppercase text-[11px] border-b border-slate-300 pb-1 mb-2">
              4. Exames Pré-Operatórios Recentes (Checklist Obrigatório HNMD)
            </h3>
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="py-1.5 px-2">Exame Obrigatório</th>
                  <th className="py-1.5 px-2">Data Mais Recente</th>
                  <th className="py-1.5 px-2">Resultado Encontrado</th>
                  <th className="py-1.5 px-2">Localização na Pasta Física</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {HNMD_REQUIREMENTS.map((req) => (
                  <tr key={req.id}>
                    <td className="py-1 px-2 font-bold text-slate-900">{req.name}</td>
                    <td className="py-1 px-2 font-mono text-slate-700">{req.latestDate}</td>
                    <td className="py-1 px-2 font-mono font-semibold text-slate-900">{req.latestValue || 'Conforme laudo'}</td>
                    <td className="py-1 px-2 text-cyan-900 font-medium">{req.tabLocation} ({req.pageLocation})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Índice Sequencial da Pasta Física */}
          <div>
            <h3 className="font-bold text-slate-900 uppercase text-[11px] border-b border-slate-300 pb-1 mb-2">
              5. Índice dos 18 Itens da Pasta Física Levada ao Hospital
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              {PHYSICAL_FOLDER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-start gap-1.5 py-0.5 border-b border-slate-100">
                  <span className="font-mono font-bold text-cyan-800 shrink-0">
                    ITEM {String(item.itemNumber).padStart(2, '0')}:
                  </span>
                  <span className="truncate text-slate-800">
                    {item.title} <span className="text-slate-400">({item.tab})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts & Signoff */}
          <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-center text-xs text-slate-600">
            <div>
              <strong>Contatos de Emergência: </strong>
              {PATIENT_DATA.emergencyContacts.map((c, i) => (
                <span key={i} className="mr-3">
                  {c.relationship} ({c.name}): {c.phone}
                </span>
              ))}
            </div>
            <div className="text-right text-[11px] text-slate-400">
              Dossiê Médico Digital · Impresso em {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
