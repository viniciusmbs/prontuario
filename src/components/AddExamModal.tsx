import React, { useState } from 'react';
import { LabParameter, ResultStatus } from '../types/medical';
import { X, Plus, Upload, Save, FileText, CheckCircle } from 'lucide-react';

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddParameter: (param: LabParameter) => void;
}

export const AddExamModal: React.FC<AddExamModalProps> = ({
  isOpen,
  onClose,
  onAddParameter,
}) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('mg/dL');
  const [referenceRange, setReferenceRange] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('Bioquímica & Função Renal');
  const [status, setStatus] = useState<ResultStatus>('normal');
  const [date, setDate] = useState('04/11/2026');
  const [laboratory, setLaboratory] = useState('Laboratório Carlos Chagas');
  const [physician, setPhysician] = useState('Dra. Cecília Faria Wolkartt');
  const [folderTab, setFolderTab] = useState('ABA 3: Infectologia e Exames de Sangue');
  const [blockName, setBlockName] = useState('Bloco 2: Rotina Pré-Operatória');
  const [physicalPage, setPhysicalPage] = useState('Página 1/1');
  const [notes, setNotes] = useState('');
  const [customFileUrl, setCustomFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setCustomFileUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;

    const newParam: LabParameter = {
      id: `param-custom-${Date.now()}`,
      name: name.trim(),
      category: 'bioquimica',
      categoryLabel,
      value: value.trim(),
      numericValue: parseFloat(value.replace(',', '.')),
      unit: unit.trim() || '-',
      referenceRange: referenceRange.trim() || 'Conforme método',
      status,
      statusLabel: status === 'normal' ? 'Normal' : status === 'attention' ? 'Atenção' : 'Alterado',
      date,
      laboratory,
      physician,
      documentTitle: fileName ? `Laudo - ${fileName}` : `Laudo de ${name}`,
      documentPath: customFileUrl || '/assets/aistudio/ceilia_f5c95ee4.pdf',
      folderTab,
      blockName,
      physicalPage,
      notes: notes.trim() || undefined,
    };

    onAddParameter(newParam);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-700 flex items-center justify-center text-white">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Adicionar Novo Exame ao Prontuário</h3>
              <p className="text-xs text-slate-300">
                Cadastre o resultado, valor de referência e localização na pasta física
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome do Exame / Parâmetro *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Ureia, Eletrocardiograma, Glicemia..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoria Clínica
              </label>
              <select
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none bg-white"
              >
                <option value="Bioquímica & Função Renal">Bioquímica & Função Renal</option>
                <option value="Hematologia & Coagulação">Hematologia & Coagulação</option>
                <option value="Eletrólitos e Minerais">Eletrólitos e Minerais</option>
                <option value="Controle Glicêmico">Controle Glicêmico</option>
                <option value="Perfil Lipídico">Perfil Lipídico</option>
                <option value="Função Hepática">Função Hepática</option>
                <option value="Urina & Nefrologia">Urina & Nefrologia</option>
                <option value="Sorologias e Doenças Infecciosas">Sorologias e Doenças Infecciosas</option>
                <option value="Infectologia & Imunologia">Infectologia & Imunologia</option>
                <option value="Painel Hormonal">Painel Hormonal</option>
                <option value="Exames de Imagem & Cirúrgicos">Exames de Imagem & Cirúrgicos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resultado Encontrado *
              </label>
              <input
                type="text"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ex: 29,2 ou Normal"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Unidade
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Ex: mg/dL, g/dL, UI/L, -"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Valores de Referência
              </label>
              <input
                type="text"
                value={referenceRange}
                onChange={(e) => setReferenceRange(e.target.value)}
                placeholder="Ex: 15 a 40 mg/dL"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Clínico
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ResultStatus)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none bg-white font-medium"
              >
                <option value="normal">Normal (Dentro da referência)</option>
                <option value="attention">Atenção / Limítrofe</option>
                <option value="altered">Alterado / Crítico</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data do Exame
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="DD/MM/AAAA"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Laboratório / Hospital
              </label>
              <input
                type="text"
                value={laboratory}
                onChange={(e) => setLaboratory(e.target.value)}
                placeholder="Ex: Carlos Chagas, Santa Casa, HNMD..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aba da Pasta Física
              </label>
              <select
                value={folderTab}
                onChange={(e) => setFolderTab(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none bg-white"
              >
                <option value="ABA 1: Relatórios e Histórico">ABA 1: Relatórios & Histórico</option>
                <option value="ABA 2: Prescrições e Medicações">ABA 2: Prescrições & Medicações</option>
                <option value="ABA 3: Infectologia e Exames de Sangue">ABA 3: Infectologia & Sangue</option>
                <option value="ABA 4: Cirurgia Vascular e Hemodinâmica">ABA 4: Cirurgia Vascular & Imagem</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bloco / Divisória
              </label>
              <input
                type="text"
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
                placeholder="Ex: Bloco 2: Carlos Chagas"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Número da Folha na Pasta *
              </label>
              <input
                type="text"
                required
                value={physicalPage}
                onChange={(e) => setPhysicalPage(e.target.value)}
                placeholder="Ex: Página 7/9 ou Folha 12"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Médico Solicitante / Assistente
            </label>
            <input
              type="text"
              value={physician}
              onChange={(e) => setPhysician(e.target.value)}
              placeholder="Ex: Dra. Cecília Faria Wolkartt (CRM-MG 80696)"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observações Clínicas (Opcional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Sem alterações agudas; controle pré-operatório."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
          </div>

          {/* File Upload Section */}
          <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Anexar Arquivo de Laudo (PDF ou Imagem)
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Selecione o arquivo do exame no seu computador para que o médico possa abri-lo diretamente no visualizador.
            </p>
            <div className="flex items-center gap-3">
              <label className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Escolher Arquivo</span>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {fileName ? (
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {fileName}
                </span>
              ) : (
                <span className="text-xs text-slate-400">Nenhum arquivo selecionado (usará o laudo padrão)</span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Exame no Prontuário</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
