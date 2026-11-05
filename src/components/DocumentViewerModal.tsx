import React, { useState, useEffect } from 'react';
import { DOCUMENT_PAGES_MAP } from '../data/documentPages';
import { 
  X, 
  ExternalLink, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentPath: string | null;
  documentTitle: string | null;
  targetPage?: string;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  documentPath,
  documentTitle,
  targetPage,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);

  // Parse targetPage if provided (e.g. "Página 7/9" -> index 6)
  useEffect(() => {
    if (targetPage && typeof targetPage === 'string') {
      const match = targetPage.match(/P[áa]gina\s*(\d+)/i);
      if (match && match[1]) {
        const pageNum = parseInt(match[1], 10);
        if (!isNaN(pageNum) && pageNum > 0) {
          setCurrentPageIndex(pageNum - 1);
          return;
        }
      }
    }
    setCurrentPageIndex(0);
  }, [targetPage, documentPath]);

  // Reset zoom on document change
  useEffect(() => {
    setZoomLevel(100);
    setRotation(0);
  }, [documentPath]);

  if (!isOpen || !documentPath) return null;

  const manifest = DOCUMENT_PAGES_MAP[documentPath];
  const pages = manifest ? manifest.pages : [documentPath];
  const totalPages = pages.length;
  const currentImage = pages[Math.min(currentPageIndex, totalPages - 1)] || documentPath;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 250));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrevPage = () => {
    setCurrentPageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-5xl h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded-lg bg-cyan-700 flex items-center justify-center text-white shrink-0 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h3 className="text-sm sm:text-base font-bold truncate">
                {documentTitle || manifest?.title || 'Visualizador do Laudo Oficial'}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                {targetPage && (
                  <span className="flex items-center gap-1 text-cyan-300 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Folha indicada: <strong className="text-white font-mono">{targetPage}</strong></span>
                  </span>
                )}
                <span className="hidden md:inline font-mono text-[11px] text-slate-400">
                  {totalPages > 1 ? `(${totalPages} páginas neste laudo)` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Page flip buttons */}
            {totalPages > 1 && (
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 mr-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPageIndex === 0}
                  className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
                  title="Página Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-2 text-slate-200 tabular-nums">
                  {currentPageIndex + 1} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPageIndex === totalPages - 1}
                  className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
                  title="Próxima Página"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1 text-slate-300 hidden sm:inline">{zoomLevel}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Girar Laudo 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Download Original PDF */}
            <a
              href={documentPath}
              download
              className="p-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white transition-colors flex items-center gap-1 text-xs px-2.5 ml-1"
              title="Baixar Laudo Original em PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/80 text-slate-300 hover:text-white transition-colors ml-1"
              title="Fechar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High-Resolution Document Canvas (No Chrome blocking) */}
        <div className="flex-1 bg-slate-200 overflow-auto relative p-3 sm:p-6 flex items-start justify-center select-none">
          <div
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="shadow-2xl rounded-sm bg-white overflow-hidden max-w-full"
          >
            <img
              src={currentImage}
              alt={`Página ${currentPageIndex + 1} - ${documentTitle || 'Laudo Médico'}`}
              referrerPolicy="no-referrer"
              className="w-auto max-h-[85vh] object-contain block"
              loading="eager"
            />
          </div>
        </div>

        {/* Footer Navigation & Thumbnail strip if multi-page */}
        <div className="bg-white border-t border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Modo Imagem Nítida Ativo (Sem bloqueios do navegador)</span>
            </span>
            {totalPages > 1 && (
              <span className="text-slate-500 text-[11px]">
                Página <strong className="font-bold text-slate-800">{currentPageIndex + 1}</strong> de {totalPages}
              </span>
            )}
          </div>

          {/* Quick page jumper pills if more than 1 page */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[11px] text-slate-400 mr-1">Ir para página:</span>
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-6 h-6 rounded text-xs font-mono font-bold transition-colors ${
                    currentPageIndex === idx
                      ? 'bg-cyan-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <a
              href={documentPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-800 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Abrir Arquivo PDF Puro</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
