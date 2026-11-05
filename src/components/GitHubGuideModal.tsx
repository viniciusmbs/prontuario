import React from 'react';
import { X, Github, FolderPlus, Code, Database, Download, Upload, CheckCircle2 } from 'lucide-react';
import { LabParameter } from '../types/medical';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  allParameters: LabParameter[];
  onImportParameters: (imported: LabParameter[]) => void;
}

export const GitHubGuideModal: React.FC<GitHubGuideModalProps> = ({
  isOpen,
  onClose,
  allParameters,
  onImportParameters,
}) => {
  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allParameters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `prontuario_exames_vinicius_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportParameters(parsed);
          alert(`Sucesso! ${parsed.length} exames importados.`);
          onClose();
        }
      } catch (err) {
        alert('Erro ao ler arquivo JSON. Verifique o formato.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white border border-slate-700">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Como Adicionar Novos Exames ao Prontuário</h3>
              <p className="text-xs text-slate-300">
                Pelo próprio site, via arquivos do projeto ou repositório GitHub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh] text-xs text-slate-700 leading-relaxed">
          {/* Method 1: No-Code In App */}
          <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200">
            <div className="flex items-center gap-2 text-cyan-950 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-cyan-700" />
              <span>Método 1: Pelo próprio site (Mais Fácil e Rápido)</span>
            </div>
            <p className="mt-1 text-cyan-900">
              Você pode clicar no botão <strong>&ldquo;+ Adicionar Exame&rdquo;</strong> no topo da página. O exame fica salvo no seu navegador e você pode anexar o PDF ou foto do laudo na hora.
            </p>
            <div className="mt-3 flex items-center gap-2 pt-2 border-t border-cyan-200">
              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Backup (JSON)</span>
              </button>

              <label className="px-3 py-1.5 bg-white hover:bg-cyan-50 border border-cyan-300 text-cyan-900 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs">
                <Upload className="w-3.5 h-3.5 text-cyan-700" />
                <span>Importar Backup (JSON)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Method 2: GitHub & Files */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <FolderPlus className="w-4 h-4 text-slate-700" />
              <span>Método 2: Adicionando Arquivos no Projeto e GitHub</span>
            </div>
            <p>
              Se você quiser guardar todos os PDFs e imagens fixos no código e no GitHub:
            </p>

            <ol className="list-decimal list-inside space-y-2 pl-1 text-slate-800 font-medium">
              <li>
                <strong>Coloque os novos PDFs ou imagens na pasta do projeto:</strong>
                <pre className="mt-1 p-2 rounded bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto">
                  /public/assets/aistudio/meu_novo_exame.pdf
                </pre>
              </li>
              <li>
                <strong>Abra o arquivo de dados dos exames:</strong>
                <pre className="mt-1 p-2 rounded bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto">
                  /src/data/labResults.ts
                </pre>
                <p className="text-[11px] text-slate-600 mt-1 font-normal">
                  Basta duplicar um item e preencher o nome, valor, referência e o caminho <code className="text-slate-800 font-bold">&quot;/assets/aistudio/meu_novo_exame.pdf&quot;</code>.
                </p>
              </li>
              <li>
                <strong>Envie para o GitHub:</strong>
                <pre className="mt-1 p-2 rounded bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                  git add .<br />
                  git commit -m &quot;Adiciona novos exames e laudos&quot;<br />
                  git push origin main
                </pre>
              </li>
              <li>
                <strong>Publicação no Vercel (Link Online para o Médico):</strong>
                <p className="text-[11px] text-slate-600 mt-1 font-normal">
                  No site do Vercel (<a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-700 underline font-medium">vercel.com</a>), clique em <strong>&ldquo;Add New &gt; Project&rdquo;</strong>, importe o seu repositório do GitHub e clique em <strong>&ldquo;Deploy&rdquo;</strong>.
                </p>
                <p className="text-[11px] text-slate-600 mt-1 font-normal">
                  O arquivo <code className="text-slate-800 font-bold">&quot;vercel.json&quot;</code> já está configurado na raiz para servir todas as páginas e imagens com máxima velocidade. Você receberá um link gratuito (ex: <code>prontuario-vinicius.vercel.app</code>) para enviar diretamente no WhatsApp do médico!
                </p>
              </li>
            </ol>
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-100 p-3 rounded-lg">
            <strong>Dica para o médico:</strong> O site funciona tanto no celular quanto no tablet ou notebook do consultório/hospital, permitindo abrir qualquer exame em segundos com 1 clique.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
