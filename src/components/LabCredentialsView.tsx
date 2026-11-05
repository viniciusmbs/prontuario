import React, { useState } from 'react';
import { LAB_PORTALS_CREDENTIALS } from '../data/labPortals';
import { LabPortalCredential } from '../types/medical';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  KeyRound, 
  Phone, 
  FileCheck2, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  Info
} from 'lucide-react';

interface LabCredentialsViewProps {
  onOpenDocument?: (path: string, title: string, page?: string) => void;
}

export const LabCredentialsView: React.FC<LabCredentialsViewProps> = ({ onOpenDocument }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'laboratorio' | 'hospital' | 'imagem'>('all');
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleCopyAllCredentials = () => {
    const text = `
=== CREDENCIAIS E PORTAIS DE EXAMES ONLINE ===
Paciente: Vinícius Paes Mendes Pereira (CPF: 862.278.156-91 | NIP: 86679619)

1. LABORATÓRIO CARLOS CHAGAS (Exames de Sangue, Bioquímica, Sorologias)
- Portal: https://www.laboratoriocarloschagas.com.br
- CPF: 862.278.156-91 | O.S.: 004-67872-36
- NOVO EXAME CARGA VIRAL HIV (PENDENTE): Protocolo: P168579 | Senha: m4-QQywm

2. SANTA CASA DE MISERICÓRDIA DE JUIZ DE FORA (Cateterismo CATE, Doppler, Relatório Vascular)
- Portal: http://www.santacasajf.org.br
- Atendimento: 4945339 | Prontuário/Usuário: 91226818 | Senha: 60613938
- Contatos: CINDI (32) 3229-2007 | Hemodinâmica (32) 3229-2220 | Radiologia (32) 3229-2390

3. ULTRIMAGEM DIAGNÓSTICOS (Angiotomografia Aorta Abdominal e Tórax)
- Portal: https://www.ultrimagem.com.br
- Nº Ordem: 471034 | Senha: 8471034
- Protocolos: 1001 1636589 / 1001 1636599

4. HOSPITAL GERAL DE JUIZ DE FORA - HGeJF / EXÉRCITO (Histórico Clínico e Hormonal)
- Portal: https://www.laudoonline.com.br/hgejf
- Login / Prontuário: 00104618 | Senha: 18538237
==============================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const filteredPortals = LAB_PORTALS_CREDENTIALS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-cyan-900 via-cyan-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-700/60 border border-cyan-400/30 text-cyan-200 text-xs font-semibold tracking-wide">
              <KeyRound className="w-3.5 h-3.5 text-cyan-300" />
              <span>Acesso Rápido para a Equipe Médica & Cirúrgica</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Portais de Laboratórios, Laudos & Senhas de Acesso
            </h2>
            <p className="text-sm text-cyan-100 leading-relaxed">
              Todos os links oficiais, credenciais e senhas fornecidos pelo paciente para que o médico assistente, hemodinamicista e cirurgião vascular consultem os laudos originais e imagens digitais em tempo real.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleCopyAllCredentials}
              className="px-4 py-2.5 bg-white text-cyan-900 hover:bg-cyan-50 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Todas Credenciais Copiadas!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-700" />
                  <span>Copiar Todas as Senhas</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL CARD: NOVO EXAME DE HIV / CARGA VIRAL (PENDENTE / RECENTE) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-orange-500/10 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                Coleta Recente para Internação HNMD
              </span>
              <span className="text-xs text-slate-500 font-medium">Laboratório Carlos Chagas</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Novo Laudo de Carga Viral HIV (Em Processamento)</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
              O paciente realizou nova coleta de sangue no Laboratório Carlos Chagas para controle pré-internação imediato. O médico pode acessar o portal com os dados abaixo para emitir o resultado oficial assim que disponibilizado pelo laboratório.
            </p>
          </div>

          {/* Quick Credential Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Protocolo</span>
                <span className="font-mono font-bold text-sm text-slate-900 select-all">P168579</span>
              </div>
              <button
                onClick={() => handleCopy('P168579', 'hiv-prot')}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-cyan-700 transition-colors"
                title="Copiar protocolo"
              >
                {copiedKey === 'hiv-prot' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Senha</span>
                <span className="font-mono font-bold text-sm text-amber-900 select-all">m4-QQywm</span>
              </div>
              <button
                onClick={() => handleCopy('m4-QQywm', 'hiv-pass')}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-cyan-700 transition-colors"
                title="Copiar senha"
              >
                {copiedKey === 'hiv-pass' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href="https://www.laboratoriocarloschagas.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>Abrir Carlos Chagas</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-cyan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Todos os Portais ({LAB_PORTALS_CREDENTIALS.length})
        </button>
        <button
          onClick={() => setActiveFilter('laboratorio')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeFilter === 'laboratorio'
              ? 'bg-cyan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Análises Clínicas & Sangue
        </button>
        <button
          onClick={() => setActiveFilter('hospital')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeFilter === 'hospital'
              ? 'bg-cyan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Hospitais & Cirurgia
        </button>
        <button
          onClick={() => setActiveFilter('imagem')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeFilter === 'imagem'
              ? 'bg-cyan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Diagnóstico por Imagem
        </button>
      </div>

      {/* 4 Portals Detailed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPortals.map((portal) => (
          <div
            key={portal.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {portal.name}
                    </h3>
                    <span className="text-xs text-slate-500 block">
                      {portal.additionalInfo}
                    </span>
                  </div>
                </div>

                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-semibold text-xs rounded-lg border border-cyan-200 flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Acessar Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card Body: Credentials Fields */}
            <div className="p-5 space-y-4 flex-1">
              {/* Credentials Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {/* Field 1: Login / User */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                      {portal.loginLabel}
                    </span>
                    <span className="font-mono font-bold text-xs text-slate-900 select-all block truncate">
                      {portal.loginValue}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(portal.loginValue, `${portal.id}-login`)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-cyan-700 transition-colors shrink-0 ml-1"
                    title="Copiar"
                  >
                    {copiedKey === `${portal.id}-login` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Field 2: Password */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                      {portal.passwordLabel || 'Senha'}
                    </span>
                    <span className="font-mono font-bold text-xs text-cyan-900 select-all block truncate">
                      {portal.passwordValue}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(portal.passwordValue, `${portal.id}-pass`)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-cyan-700 transition-colors shrink-0 ml-1"
                    title="Copiar"
                  >
                    {copiedKey === `${portal.id}-pass` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Field 3: Protocol / OS (if available) */}
                {portal.protocolValue && (
                  <div className="sm:col-span-2 bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div className="overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        {portal.protocolLabel || 'Protocolo'}
                      </span>
                      <span className="font-mono font-medium text-xs text-slate-800 select-all block truncate">
                        {portal.protocolValue}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(portal.protocolValue!, `${portal.id}-prot`)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-cyan-700 transition-colors shrink-0 ml-1"
                      title="Copiar protocolo"
                    >
                      {copiedKey === `${portal.id}-prot` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Pending Exam specific box inside Carlos Chagas */}
              {portal.pendingExam && (
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{portal.pendingExam.examName}</span>
                  </div>
                  <p className="text-amber-800 text-[11px] mb-2 leading-relaxed">
                    {portal.pendingExam.instructions}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold bg-white px-2 py-0.5 rounded border border-amber-200 text-slate-800">
                      Prot: {portal.pendingExam.protocol}
                    </span>
                    <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-900">
                      Senha: {portal.pendingExam.password}
                    </span>
                  </div>
                </div>
              )}

              {/* List of Available Exams in this portal */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Laudos e Exames Disponíveis Neste Portal:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {portal.availableExams.map((exam, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FileCheck2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{exam}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer: Phone Numbers and Direct Hospital Helpdesk */}
            {portal.phones && portal.phones.length > 0 && (
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  Telefones:
                </span>
                {portal.phones.map((phone, idx) => (
                  <span key={idx}>
                    <span className="text-slate-500">{phone.label}: </span>
                    <a
                      href={`tel:${phone.number.replace(/\D/g, '')}`}
                      className="font-mono font-medium text-cyan-700 hover:underline"
                    >
                      {phone.number}
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instruction Box for Hospital Consultation */}
      <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-800 block">
            Orientações para o Médico ou Secretária do Ambulatório:
          </span>
          <p className="leading-relaxed">
            Caso o sistema do hospital bloqueie acessos externos por política de firewall, o médico pode utilizar o botão <span className="font-medium text-slate-800">"Ver Laudo"</span> em qualquer exame nas abas <span className="font-medium text-slate-800">"Pesquisa de Exames"</span> ou <span className="font-medium text-slate-800">"Pasta Física"</span> para abrir instantaneamente as páginas escaneadas e fotografadas de alta resolução sem necessidade de login.
          </p>
        </div>
      </div>
    </div>
  );
};
