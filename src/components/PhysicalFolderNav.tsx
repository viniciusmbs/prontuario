import React, { useState } from 'react';
import { PHYSICAL_FOLDER_ITEMS } from '../data/medicalDossier';
import { 
  Folder, 
  FileText, 
  ExternalLink, 
  Disc, 
  Layers, 
  Calendar, 
  User, 
  Building,
  Image as ImageIcon
} from 'lucide-react';

interface PhysicalFolderNavProps {
  onOpenDocument: (path: string, title: string, page?: string) => void;
}

const TABS = [
  { id: 'ALL', label: 'Todos os Itens (01 a 18)' },
  { id: 'ABA 1', label: 'ABA 1: Relatórios & Histórico' },
  { id: 'ABA 2', label: 'ABA 2: Prescrições & Medicamentos' },
  { id: 'ABA 3', label: 'ABA 3: Infectologia & Sangue' },
  { id: 'ABA 4', label: 'ABA 4: Cirurgia Vascular & Imagem' },
];

export const PhysicalFolderNav: React.FC<PhysicalFolderNavProps> = ({ onOpenDocument }) => {
  const [selectedTab, setSelectedTab] = useState<string>('ALL');

  const filteredItems = selectedTab === 'ALL'
    ? PHYSICAL_FOLDER_ITEMS
    : PHYSICAL_FOLDER_ITEMS.filter((item) => item.tab === selectedTab);

  return (
    <section className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-cyan-700" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Organização Sequencial da Pasta Física de Exames
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Índice 100% espelhado nas divisórias plásticas e etiquetas físicas levadas pelo paciente ao hospital. 
              O médico pode localizar o documento original em papel ou abrir a versão digital em PDF/imagem instantaneamente.
            </p>
          </div>

          {/* Quick buttons to view organizer documents */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenDocument('/assets/aistudio/Folhas_de_Rosto_Divisorias_Blocos_2207e92b.pdf', 'Folhas de Rosto e Divisórias dos Blocos de Exames')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Ver Divisórias A4</span>
            </button>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/Etiquetas_Organizadoras_Dossie_3d35db1a.pdf', 'Etiquetas Organizadoras dos 18 Itens da Pasta')}
              className="px-3 py-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-700" />
              <span>Ver Folha de Etiquetas</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'bg-cyan-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Folder Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const itemNumberPadded = String(item.itemNumber).padStart(2, '0');

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-4 transition-all hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header tag with Item Number and Tab Label */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-extrabold font-mono bg-cyan-700 text-white shadow-xs">
                      ITEM {itemNumberPadded}
                    </span>
                    <span className="text-[11px] font-semibold text-cyan-900 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
                      {item.tab}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {item.tabTitle}
                  </span>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {item.itemNumber}. {item.title}
                </h3>
                <p className="text-xs font-medium text-slate-600 mt-0.5">
                  {item.subtitle}
                </p>

                {/* Metadata */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  {item.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.date}</span>
                    </span>
                  )}
                  {item.institution && (
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[180px]">{item.institution}</span>
                    </span>
                  )}
                  {item.professional && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[180px]">{item.professional}</span>
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="mt-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap items-center gap-1 text-[10px] text-slate-500">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ {item.statusText || 'Disponível na pasta'}
                </span>

                {item.filePath ? (
                  <button
                    onClick={() => onOpenDocument(item.filePath!, item.title)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    {item.fileType === 'media' ? (
                      <Disc className="w-3.5 h-3.5 text-cyan-300" />
                    ) : item.fileType === 'image' ? (
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                    ) : (
                      <FileText className="w-3.5 h-3.5" />
                    )}
                    <span>Visualizar Documento</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-medium italic">
                    Original Físico na Pasta
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Laboratory Blocks Detailed Guide */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-700" />
          <h3 className="text-base font-bold text-slate-900">
            Detalhamento dos 4 Blocos de Laudos de Sangue (Aba 3 · Item 12)
          </h3>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Os exames de sangue laboratoriais foram subdivididos na pasta em 4 blocos separados por folhas de rosto específicas:
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Bloco 1 */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-white uppercase">
                Bloco 1 · 8 Páginas
              </span>
              <h4 className="font-bold text-slate-900 mt-2 text-sm">Dr. Túlio Vieira Mendes</h4>
              <p className="text-[11px] text-slate-500 font-medium">Lab. Carlos Chagas · 29/10/2026</p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 list-disc list-inside">
                <li>Anti-HBc Total e HBsAg</li>
                <li>Toxoplasmose IgG / IgM</li>
                <li>HbA1c (5,3%) & Glicemia Média</li>
                <li>Anti-HBs e Anti-HCV</li>
                <li>Testosterona Total e Livre</li>
                <li>VDRL (Não Reagente)</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/Tulio_a8028bee.pdf', 'Bloco 1 - Dr. Túlio Mendes (Carlos Chagas)')}
              className="mt-3 w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 text-cyan-800 font-semibold rounded text-[11px] transition-colors"
            >
              Abrir Laudo Bloco 1 (8 Págs) →
            </button>
          </div>

          {/* Bloco 2 */}
          <div className="p-3.5 rounded-lg border border-cyan-200 bg-cyan-50/50 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-700 text-white uppercase">
                Bloco 2 · 9 Páginas (Principal)
              </span>
              <h4 className="font-bold text-cyan-950 mt-2 text-sm">Dra. Cecília Faria Wolkartt</h4>
              <p className="text-[11px] text-cyan-800 font-medium">Lab. Carlos Chagas · 29/10/2026</p>
              <ul className="mt-2 space-y-1 text-[11px] text-cyan-950 list-disc list-inside">
                <li>EAS / Urina Tipo 1</li>
                <li>Anti-HCV (Não Reagente)</li>
                <li>Hemograma Completo (Hb 14,1)</li>
                <li>Perfil Lipídico (CT, HDL, LDL)</li>
                <li>TGP (22 U/L) e TGO (19 U/L)</li>
                <li>Bilirrubinas e Albumina</li>
                <li>Ureia (29,2) e Creatinina (1,10)</li>
                <li>Sódio (136) e Potássio (3,9)</li>
                <li>Cálcio (9,5) e Magnésio (1,7)</li>
                <li>VDRL (Não Reagente)</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/ceilia_f5c95ee4.pdf', 'Bloco 2 - Dra. Cecília Wolkartt (Carlos Chagas)')}
              className="mt-3 w-full py-1.5 px-2 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded text-[11px] transition-colors shadow-xs"
            >
              Abrir Laudo Bloco 2 (9 Págs) →
            </button>
          </div>

          {/* Bloco 3 */}
          <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-700 text-white uppercase">
                Bloco 3 · 9 Páginas
              </span>
              <h4 className="font-bold text-slate-900 mt-2 text-sm">Dr. Arthur Valdier</h4>
              <p className="text-[11px] text-slate-500 font-medium">HGeJF / Exército · 20/05/2026</p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 list-disc list-inside">
                <li>Hemograma Completo (Hb 17,1)</li>
                <li>Glicose (97 mg/dL) & HbA1c (5,2%)</li>
                <li>Ureia (24 mg/dL) & Creatinina (1,18)</li>
                <li>Ácido Úrico (5,7 mg/dL)</li>
                <li>Perfil Lipídico e Enzimas Hepáticas</li>
                <li>Estradiol (86,3 pg/mL) e Prolactina</li>
                <li>PSA Total (0,61) e Livre (0,08)</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/etraiol_d7833244.pdf', 'Bloco 3 - Dr. Arthur Valdier (HGeJF)')}
              className="mt-3 w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 text-amber-900 font-semibold rounded text-[11px] transition-colors"
            >
              Abrir Laudo Bloco 3 (9 Págs) →
            </button>
          </div>

          {/* Bloco 4 */}
          <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/40 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-700 text-white uppercase">
                Bloco 4 · 12 Páginas
              </span>
              <h4 className="font-bold text-slate-900 mt-2 text-sm">Santa Casa de Misericórdia</h4>
              <p className="text-[11px] text-slate-500 font-medium">Setembro/2026 · Dr. Kingma / Klier</p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 list-disc list-inside">
                <li>Admissão 20/09: Hemograma, PCR 0,40</li>
                <li>Ureia (31 mg/dL) & Creatinina (1,26)</li>
                <li>Coagulograma Completo (TAP 100%, TTPA 30,2s)</li>
                <li>Controle 24/09: Hemograma, Glicemia 119</li>
                <li>HbA1c (5,30%), Ureia (39 mg/dL)</li>
                <li>Sódio e Potássio em duplicidade</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenDocument('/assets/aistudio/laudoSangue_6f5bc10f.pdf', 'Bloco 4 - Santa Casa de Misericórdia (Set/2026)')}
              className="mt-3 w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 text-rose-900 font-semibold rounded text-[11px] transition-colors"
            >
              Abrir Laudos Bloco 4 (12 Págs) →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
