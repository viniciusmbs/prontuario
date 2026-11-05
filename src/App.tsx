import React, { useState, useEffect } from 'react';
import { LAB_PARAMETERS_DB } from './data/labResults';
import { LabParameter } from './types/medical';
import { Header } from './components/Header';
import { PatientSummaryBar } from './components/PatientSummaryBar';
import { QuickSearch } from './components/QuickSearch';
import { HNMDChecklist } from './components/HNMDChecklist';
import { PhysicalFolderNav } from './components/PhysicalFolderNav';
import { LabEvolutionTable } from './components/LabEvolutionTable';
import { MedicationPanel } from './components/MedicationPanel';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { AddExamModal } from './components/AddExamModal';
import { GitHubGuideModal } from './components/GitHubGuideModal';
import { PrintReportView } from './components/PrintReportView';
import { LabCredentialsView } from './components/LabCredentialsView';
import { 
  Search, 
  CheckCircle2, 
  FolderOpen, 
  TrendingUp, 
  Pill, 
  FileText, 
  PlusCircle, 
  ShieldCheck,
  AlertCircle,
  KeyRound
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'prontuario_custom_exams_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('search');
  const [parameters, setParameters] = useState<LabParameter[]>(LAB_PARAMETERS_DB);
  
  // Document Viewer Modal State
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerPath, setViewerPath] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState<string | null>(null);
  const [viewerTargetPage, setViewerTargetPage] = useState<string | undefined>(undefined);

  // Other Modals
  const [addExamOpen, setAddExamOpen] = useState(false);
  const [gitHubGuideOpen, setGitHubGuideOpen] = useState(false);
  const [printViewOpen, setPrintViewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load custom exams from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge unique by id
          const existingIds = new Set(LAB_PARAMETERS_DB.map((p) => p.id));
          const customOnly = parsed.filter((p: LabParameter) => !existingIds.has(p.id));
          setParameters([...customOnly, ...LAB_PARAMETERS_DB]);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar exames do localStorage', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenDocument = (path: string, title: string, page?: string) => {
    setViewerPath(path);
    setViewerTitle(title);
    setViewerTargetPage(page);
    setViewerOpen(true);
  };

  const handleAddParameter = (newParam: LabParameter) => {
    const updated = [newParam, ...parameters];
    setParameters(updated);
    try {
      const customOnly = updated.filter((p) => p.id.startsWith('param-custom-'));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customOnly));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage', e);
    }
    showToast(`Exame "${newParam.name}" adicionado com sucesso ao prontuário!`);
  };

  const handleImportParameters = (importedList: LabParameter[]) => {
    setParameters(importedList);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(importedList));
    } catch (e) {
      console.warn(e);
    }
    showToast(`${importedList.length} exames importados com sucesso.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-slideUp border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenAddExam={() => setAddExamOpen(true)}
        onOpenGitHubGuide={() => setGitHubGuideOpen(true)}
        onPrint={() => setPrintViewOpen(true)}
      />

      {/* Patient Summary & Alert Bar */}
      <PatientSummaryBar 
        onOpenDocument={handleOpenDocument} 
        onSelectSection={setActiveSection}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Quick Switch Cards for Easy Discovery */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => setActiveSection('search')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSection === 'search'
                ? 'bg-white border-cyan-600 shadow-sm ring-1 ring-cyan-600'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <Search className={`w-4 h-4 ${activeSection === 'search' ? 'text-cyan-700' : 'text-slate-400'}`} />
              <span className="text-[11px] font-mono text-slate-400">{parameters.length} itens</span>
            </div>
            <span className="font-bold text-xs text-slate-900 block mt-1.5">Pesquisa Direta</span>
            <span className="text-[11px] text-slate-500 block truncate">Busca de resultados & folha</span>
          </button>

          <button
            onClick={() => setActiveSection('checklist')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSection === 'checklist'
                ? 'bg-white border-cyan-600 shadow-sm ring-1 ring-cyan-600'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <CheckCircle2 className={`w-4 h-4 ${activeSection === 'checklist' ? 'text-cyan-700' : 'text-slate-400'}`} />
              <span className="text-[11px] font-mono font-bold text-emerald-600">10 itens</span>
            </div>
            <span className="font-bold text-xs text-slate-900 block mt-1.5">Checklist HNMD</span>
            <span className="text-[11px] text-slate-500 block truncate">Exigências pré-operatórias</span>
          </button>

          <button
            onClick={() => setActiveSection('folder')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSection === 'folder'
                ? 'bg-white border-cyan-600 shadow-sm ring-1 ring-cyan-600'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <FolderOpen className={`w-4 h-4 ${activeSection === 'folder' ? 'text-cyan-700' : 'text-slate-400'}`} />
              <span className="text-[11px] font-mono text-slate-400">4 Abas</span>
            </div>
            <span className="font-bold text-xs text-slate-900 block mt-1.5">Pasta Física</span>
            <span className="text-[11px] text-slate-500 block truncate">Itens 01 a 18 numerados</span>
          </button>

          <button
            onClick={() => setActiveSection('evolution')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSection === 'evolution'
                ? 'bg-white border-cyan-600 shadow-sm ring-1 ring-cyan-600'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <TrendingUp className={`w-4 h-4 ${activeSection === 'evolution' ? 'text-cyan-700' : 'text-slate-400'}`} />
              <span className="text-[11px] font-mono text-slate-400">4 Épocas</span>
            </div>
            <span className="font-bold text-xs text-slate-900 block mt-1.5">Evolução Temporal</span>
            <span className="text-[11px] text-slate-500 block truncate">Comparativo Mai/Set/Out</span>
          </button>

          <button
            onClick={() => setActiveSection('credentials')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSection === 'credentials'
                ? 'bg-amber-50 border-amber-500 shadow-sm ring-1 ring-amber-500'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <KeyRound className={`w-4 h-4 ${activeSection === 'credentials' ? 'text-amber-800' : 'text-amber-600'}`} />
              <span className="text-[11px] font-mono font-bold text-amber-700">4 Portais</span>
            </div>
            <span className="font-bold text-xs text-slate-900 block mt-1.5">Labs & Senhas</span>
            <span className="text-[11px] text-slate-500 block truncate">Logins e exames online</span>
          </button>

          <button
            onClick={() => setActiveSection('meds')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSection === 'meds'
                ? 'bg-white border-cyan-600 shadow-sm ring-1 ring-cyan-600'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <Pill className={`w-4 h-4 ${activeSection === 'meds' ? 'text-cyan-700' : 'text-slate-400'}`} />
              <span className="text-[11px] font-mono text-slate-400">7 Drogas</span>
            </div>
            <span className="font-bold text-xs text-slate-900 block mt-1.5">Medicações</span>
            <span className="text-[11px] text-slate-500 block truncate">Vascular, Dor e TARV</span>
          </button>
        </div>

        {/* Section Viewport */}
        {activeSection === 'search' && (
          <QuickSearch
            parameters={parameters}
            onOpenDocument={handleOpenDocument}
            onSelectCredentials={() => setActiveSection('credentials')}
          />
        )}

        {activeSection === 'checklist' && (
          <HNMDChecklist
            onOpenDocument={handleOpenDocument}
            onSelectSearchTag={(tag) => {
              setActiveSection('search');
            }}
          />
        )}

        {activeSection === 'folder' && (
          <PhysicalFolderNav onOpenDocument={handleOpenDocument} />
        )}

        {activeSection === 'evolution' && (
          <LabEvolutionTable onOpenDocument={handleOpenDocument} />
        )}

        {activeSection === 'credentials' && (
          <LabCredentialsView onOpenDocument={handleOpenDocument} />
        )}

        {activeSection === 'meds' && <MedicationPanel />}
      </main>

      {/* Clean Hospital Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Dossiê Clínico e Cirúrgico Vascular</span>
            <span aria-hidden="true">·</span>
            <span>Paciente Vinícius Paes Mendes Pereira (NIP: 86679619)</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setGitHubGuideOpen(true)}
              className="text-cyan-700 hover:underline font-medium"
            >
              Como Adicionar Exames no GitHub / Código
            </button>
            <button
              onClick={() => setPrintViewOpen(true)}
              className="text-cyan-700 hover:underline font-medium"
            >
              Versão para Impressão
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DocumentViewerModal
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        documentPath={viewerPath}
        documentTitle={viewerTitle}
        targetPage={viewerTargetPage}
      />

      <AddExamModal
        isOpen={addExamOpen}
        onClose={() => setAddExamOpen(false)}
        onAddParameter={handleAddParameter}
      />

      <GitHubGuideModal
        isOpen={gitHubGuideOpen}
        onClose={() => setGitHubGuideOpen(false)}
        allParameters={parameters}
        onImportParameters={handleImportParameters}
      />

      {printViewOpen && (
        <PrintReportView
          parameters={parameters}
          onClose={() => setPrintViewOpen(false)}
        />
      )}
    </div>
  );
}
