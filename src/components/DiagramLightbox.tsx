import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { AttachedDiagram } from '../data/systemsData';

interface DiagramLightboxProps {
  diagrams: AttachedDiagram[];
  activeIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function DiagramLightbox({
  diagrams,
  activeIndex,
  onClose,
  onSelect,
}: DiagramLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelect((activeIndex + 1) % diagrams.length);
      if (e.key === 'ArrowLeft') onSelect((activeIndex - 1 + diagrams.length) % diagrams.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, diagrams.length, onClose, onSelect]);

  if (activeIndex === null) return null;
  const item = diagrams[activeIndex];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030814]/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-blue-400/30 bg-[#0B1730] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-blue-400/20 bg-[#081226] px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-300">
              <span>{item.figCode}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate text-blue-100/80">{item.subtitle}</span>
            </div>
            <h3 className="truncate text-base font-semibold text-white">{item.title}</h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSelect((activeIndex - 1 + diagrams.length) % diagrams.length)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/25 bg-[#0F2042] text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-400"
              aria-label="ภาพก่อนหน้า"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="px-2 text-xs font-mono tabular-nums text-blue-100">
              {activeIndex + 1} / {diagrams.length}
            </span>
            <button
              type="button"
              onClick={() => onSelect((activeIndex + 1) % diagrams.length)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/25 bg-[#0F2042] text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-400"
              aria-label="ภาพถัดไป"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/25 bg-[#0F2042] text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-400"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-auto bg-[#071124] p-4 sm:p-6">
          <div className="rounded-lg border border-blue-300/30 bg-white p-2">
            <img
              src={item.src}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="max-h-[62vh] w-auto object-contain"
            />
          </div>
        </div>

        <div className="grid gap-3 border-t border-blue-400/20 bg-[#09152C] px-5 py-3.5 text-sm sm:grid-cols-2">
          <div>
            <span className="text-xs font-semibold text-blue-300">สาระสำคัญจากแผนผัง</span>
            <p className="mt-0.5 text-white">{item.keyTakeaway}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-sky-300">จุดตรวจเช็กและแก้ปัญหา</span>
            <p className="mt-0.5 text-white">{item.relatedCheck}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
