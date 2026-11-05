import React, { useState, useMemo } from 'react';
import { LabParameter } from '../types/medical';
import { 
  Search, 
  FileText, 
  ExternalLink, 
  Filter, 
  MapPin, 
  Clock, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle,
  Building2,
  Stethoscope,
  X
} from 'lucide-react';

interface QuickSearchProps {
  parameters: LabParameter[];
  onOpenDocument: (path: string, title: string, page?: string) => void;
  onFilterHistory?: (paramName: string) => void;
  onSelectCredentials?: () => void;
}

const QUICK_TAGS = [
  '🔑 Senhas dos Labs',
  'HIV (P168579)',
  'Laudo',
  'Cirurgia',
  'Ureia',
  'Creatinina',
  'Hemoglobina',
  'Cateterismo',
  'Angiotomografia',
  'Doppler',
  'Plaquetas',
  'Sódio',
  'Potássio',
  'HbA1c',
  'EAS / Urina',
  'CD4 / Carga Viral',
  'TAP / Coagulograma',
  'Dr. Kingma',
  'Carlos Chagas',
  'Santa Casa',
];

export const QuickSearch: React.FC<QuickSearchProps> = ({
  parameters,
  onOpenDocument,
  onFilterHistory,
  onSelectCredentials,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(parameters.map((p) => p.categoryLabel));
    return ['all', ...Array.from(cats)];
  }, [parameters]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return parameters.filter((param) => {
      // Category filter
      if (selectedCategory !== 'all' && param.categoryLabel !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      // Match name, synonyms, category, value, lab, doctor, folderTab, blockName, physicalPage, notes
      const matchName = param.name.toLowerCase().includes(q);
      const matchSynonyms = param.synonyms?.some((s) => s.toLowerCase().includes(q));
      const matchCategory = param.categoryLabel.toLowerCase().includes(q);
      const matchValue = param.value.toLowerCase().includes(q);
      const matchLab = param.laboratory.toLowerCase().includes(q);
      const matchDoc = param.physician.toLowerCase().includes(q);
      const matchTab = param.folderTab.toLowerCase().includes(q);
      const matchBlock = param.blockName?.toLowerCase().includes(q);
      const matchPage = param.physicalPage.toLowerCase().includes(q);
      const matchNotes = param.notes?.toLowerCase().includes(q);

      return (
        matchName ||
        matchSynonyms ||
        matchCategory ||
        matchValue ||
        matchLab ||
        matchDoc ||
        matchTab ||
        matchBlock ||
        matchPage ||
        matchNotes
      );
    });
  }, [parameters, query, selectedCategory]);

  const handleCopy = (param: LabParameter) => {
    const textToCopy = `${param.name}: ${param.value} ${param.unit !== '-' ? param.unit : ''} (Ref: ${param.referenceRange}) - Coleta: ${param.date} (${param.laboratory}). Pasta Física: ${param.folderTab}, ${param.physicalPage}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(param.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Pesquisa Rápida de Exames & Localização na Pasta
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Digite o nome do exame (ex: <strong className="font-semibold text-slate-800">Ureia</strong>, <strong className="font-semibold text-slate-800">Creatinina</strong>, <strong className="font-semibold text-slate-800">Hemoglobina</strong>, <strong className="font-semibold text-slate-800">Sódio</strong>, <strong className="font-semibold text-slate-800">TAP</strong>) para obter na hora o resultado, valor de referência e o número da folha na pasta física.
          </p>
        </div>

        {/* Input Bar */}
        <div className="mt-4 relative flex items-center">
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por exame, valor, substância, médico, laboratório ou folha..."
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:bg-white transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-md"
              title="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Sugestões:
          </span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                if (tag === '🔑 Senhas dos Labs' && onSelectCredentials) {
                  onSelectCredentials();
                  return;
                }
                if (tag === 'HIV (P168579)') {
                  setQuery('P168579');
                  return;
                }
                if (query === tag) {
                  setQuery('');
                } else {
                  setQuery(tag);
                }
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                tag === '🔑 Senhas dos Labs'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold hover:bg-amber-200'
                  : query.toLowerCase() === tag.toLowerCase()
                  ? 'bg-cyan-700 text-white font-medium shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Quick shortcut banner if user is looking for passwords or labs */}
        {onSelectCredentials && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-600">
              🔑 Precisa dos logins e senhas para consultar exames nos sites dos laboratórios?
            </span>
            <button
              onClick={onSelectCredentials}
              className="font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-md border border-amber-300 transition-colors shrink-0"
            >
              Ver Todas as Senhas Online →
            </button>
          </div>
        )}

        {/* Category Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 whitespace-nowrap mr-1 font-medium">Categoria:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todas as Categorias' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Exibindo <strong className="font-semibold text-slate-800">{filtered.length}</strong> {filtered.length === 1 ? 'resultado' : 'resultados'}
          {query ? ` para "${query}"` : ''}
        </span>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
            className="text-cyan-700 hover:underline font-medium"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">Nenhum exame encontrado</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Não encontramos resultados para &quot;{query}&quot;. Tente pesquisar por termos como &quot;ureia&quot;, &quot;creatinina&quot;, &quot;hemoglobina&quot;, &quot;potássio&quot; ou confira as abas da pasta física.
          </p>
          <button
            onClick={() => setQuery('')}
            className="mt-4 px-4 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
          >
            Ver Todos os Exames
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((param) => {
            const isCopied = copiedId === param.id;

            return (
              <div
                key={param.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-4 transition-shadow hover:shadow-sm flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Status header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      {param.categoryLabel}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                        param.status === 'normal'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : param.status === 'attention'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {param.status === 'normal' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{param.statusLabel || (param.status === 'normal' ? 'Normal' : 'Atenção')}</span>
                    </span>
                  </div>

                  {/* Exam Title */}
                  <h3 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-cyan-800 transition-colors">
                    {param.name}
                  </h3>

                  {/* Primary Value Display */}
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">Resultado:</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 tabular-nums">
                          {param.value}
                        </span>
                        {param.unit !== '-' && (
                          <span className="text-xs font-semibold text-slate-600 font-mono">
                            {param.unit}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Referência:</span>
                      <span className="text-xs font-medium text-slate-700 block font-mono">
                        {param.referenceRange}
                      </span>
                    </div>
                  </div>

                  {/* Physical Location in Folder (Key requirement) */}
                  <div className="mt-3 p-2 rounded-md bg-cyan-50/70 border border-cyan-100 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-cyan-950">
                      <MapPin className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                      <span>Localização na Pasta Física:</span>
                    </div>
                    <div className="text-[11px] text-cyan-900 font-medium pl-5">
                      <span className="block font-semibold">{param.folderTab}</span>
                      {param.blockName && <span className="block text-cyan-800">{param.blockName}</span>}
                      <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-cyan-200/60 text-cyan-900 font-mono font-bold">
                        {param.physicalPage}
                      </span>
                    </div>
                  </div>

                  {/* Clinical Metadata */}
                  <div className="mt-3 space-y-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>Data da Coleta/Emissão: <strong className="text-slate-700">{param.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">Local: <strong className="text-slate-700">{param.laboratory}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Stethoscope className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">Médico: <strong className="text-slate-700">{param.physician}</strong></span>
                    </div>
                  </div>

                  {param.notes && (
                    <p className="mt-2 text-[11px] text-slate-500 italic bg-slate-50/60 p-1.5 rounded">
                      {param.notes}
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenDocument(param.documentPath, param.documentTitle, param.physicalPage)}
                    className="flex-1 py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    title="Visualizar laudo oficial original com zoom"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver Laudo (PDF)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => handleCopy(param)}
                    className={`p-1.5 rounded-lg border text-xs transition-colors ${
                      isCopied
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Copiar resultado formatado"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
