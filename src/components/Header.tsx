import React from 'react';
import { 
  FileText, 
  Printer, 
  PlusCircle, 
  Github, 
  Search, 
  CheckCircle2, 
  FolderOpen, 
  TrendingUp, 
  Pill,
  KeyRound
} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenAddExam: () => void;
  onOpenGitHubGuide: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenAddExam,
  onOpenGitHubGuide,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-cyan-700 flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap block">
                Prontuário & Dossiê Clínico
              </span>
              <span className="text-xs text-cyan-800 font-medium whitespace-nowrap block -mt-0.5">
                HNMD · Cirurgia Vascular
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectSection('search')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSection === 'search'
                  ? 'bg-cyan-50 text-cyan-900 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Pesquisa de Exames</span>
            </button>

            <button
              onClick={() => onSelectSection('checklist')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSection === 'checklist'
                  ? 'bg-cyan-50 text-cyan-900 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Checklist HNMD</span>
            </button>

            <button
              onClick={() => onSelectSection('folder')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSection === 'folder'
                  ? 'bg-cyan-50 text-cyan-900 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Pasta Física (Abas)</span>
            </button>

            <button
              onClick={() => onSelectSection('evolution')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSection === 'evolution'
                  ? 'bg-cyan-50 text-cyan-900 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Evolução Temporal</span>
            </button>

            <button
              onClick={() => onSelectSection('credentials')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSection === 'credentials'
                  ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                  : 'text-amber-800 hover:text-amber-950 hover:bg-amber-50/80 font-semibold'
              }`}
            >
              <KeyRound className="w-4 h-4 text-amber-700" />
              <span>Laboratórios & Senhas</span>
            </button>

            <button
              onClick={() => onSelectSection('meds')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeSection === 'meds'
                  ? 'bg-cyan-50 text-cyan-900 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Medicações</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddExam}
              title="Cadastrar novo exame ou anexar arquivo"
              className="px-3 py-2 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Adicionar Exame</span>
              <span className="sm:hidden">+ Exame</span>
            </button>

            <button
              onClick={onOpenGitHubGuide}
              title="Instruções para adicionar mais exames no código ou GitHub"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
            </button>

            <button
              onClick={onPrint}
              title="Imprimir Resumo do Prontuário para Consultório"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-100 gap-2 no-scrollbar text-xs">
          <button
            onClick={() => onSelectSection('search')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeSection === 'search' ? 'bg-cyan-700 text-white font-medium' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Pesquisa
          </button>
          <button
            onClick={() => onSelectSection('checklist')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeSection === 'checklist' ? 'bg-cyan-700 text-white font-medium' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Checklist HNMD
          </button>
          <button
            onClick={() => onSelectSection('folder')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeSection === 'folder' ? 'bg-cyan-700 text-white font-medium' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Pasta Física (Abas)
          </button>
          <button
            onClick={() => onSelectSection('evolution')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeSection === 'evolution' ? 'bg-cyan-700 text-white font-medium' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Evolução
          </button>
          <button
            onClick={() => onSelectSection('credentials')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap flex items-center gap-1 ${
              activeSection === 'credentials' ? 'bg-amber-600 text-white font-medium' : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}
          >
            <KeyRound className="w-3 h-3" />
            <span>Senhas / Labs</span>
          </button>
          <button
            onClick={() => onSelectSection('meds')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeSection === 'meds' ? 'bg-cyan-700 text-white font-medium' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Medicações
          </button>
        </div>
      </div>
    </header>
  );
};
