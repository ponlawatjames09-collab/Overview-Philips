import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Maximize2,
  Printer,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  Wrench,
} from 'lucide-react';
import { DiagramLightbox } from './components/DiagramLightbox';
import {
  ATTACHED_DIAGRAMS,
  MAINTENANCE_RULES,
  MODELS_COMPARISON,
  type ComparisonCategory,
  type ModelId,
} from './data/systemsData';

const CATEGORY_TABS: { id: ComparisonCategory; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด (ครบทุกหัวข้อ)' },
  { id: 'overview', label: '1. ภาพรวมการใช้งาน' },
  { id: 'pm', label: '2. บำรุงรักษา (PM)' },
  { id: 'troubleshooting', label: '3. ปัญหาพบบ่อย & แก้ Error' },
  { id: 'safety', label: '4. ข้อควรระวังสำคัญ' },
];

export default function App() {
  const [selectedDiagramIdx, setSelectedDiagramIdx] = useState<number>(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<ComparisonCategory>('all');
  const [focusedModel, setFocusedModel] = useState<ModelId | 'all'>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeDiagram = ATTACHED_DIAGRAMS[selectedDiagramIdx] ?? ATTACHED_DIAGRAMS[0];

  const visibleModels = useMemo(() => {
    if (focusedModel === 'all') return MODELS_COMPARISON;
    return MODELS_COMPARISON.filter((m) => m.id === focusedModel);
  }, [focusedModel]);

  const showRow = (rowType: Exclude<ComparisonCategory, 'all'>) =>
    categoryFilter === 'all' || categoryFilter === rowType;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050d1d] text-white">
      <header className="no-print sticky top-0 z-30 border-b border-blue-400/20 bg-[#071226]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-3.5">
          <a
            href="#slide-top"
            className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            Philips Imaging Overview
          </a>

          <nav
            aria-label="หัวข้อหลักในสไลด์"
            className="hidden items-center gap-6 text-sm font-medium text-blue-100 md:flex"
          >
            <a
              href="#visual-deck"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
            >
              รูปและแผนผังแนบ
            </a>
            <a
              href="#comparison-matrix"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
            >
              ตารางเปรียบเทียบ
            </a>
            <a
              href="#maintenance-guide"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
            >
              แนวทางดูแล &amp; แก้ Error
            </a>
            <a
              href="#safety-summary"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
            >
              ข้อควรระวังเฉพาะรุ่น
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>พิมพ์สไลด์ / PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main
        id="slide-top"
        className="print-slide-sheet mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8"
      >
        <div className="overflow-hidden rounded-xl border border-blue-400/25 bg-[#0B1730]">
          <section className="border-b border-blue-400/20 bg-gradient-to-br from-[#0F234B] via-[#0B1730] to-[#081226] px-6 py-6 sm:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-300">
                  <span>PHILIPS HEALTHCARE</span>
                  <span aria-hidden="true">/</span>
                  <span>C-ARM &amp; ULTRASOUND</span>
                  <span aria-hidden="true">/</span>
                  <span>CSIP LEVEL 0 ONE-PAGE OVERVIEW</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  ภาพรวมการใช้งาน การบำรุงรักษา และการแก้ไข Error เบื้องต้น
                </h1>
                <p className="mt-1.5 text-sm leading-relaxed text-blue-100">
                  สรุปรวม 4 รุ่นในหน้าเดียว: C-Arm{' '}
                  <span className="font-semibold text-white">Zenition 90 Motorized</span>{' '}
                  และเครื่องอัลตราซาวนด์{' '}
                  <span className="font-semibold text-white">
                    5000 Compact Series · Affiniti 50 · Flash 5100 POC
                  </span>{' '}
                  อ้างอิงข้อมูลจริงจากคู่มือบริการทั้ง 5 ฉบับ
                </p>
              </div>

              <div className="no-print flex flex-col gap-1.5 shrink-0">
                <span className="text-xs font-medium text-blue-200">
                  เลือกรุ่นที่ต้องการโฟกัสในตาราง
                </span>
                <div className="flex flex-wrap items-center gap-1 rounded-lg border border-blue-400/20 bg-[#071124] p-1">
                  <button
                    type="button"
                    onClick={() => setFocusedModel('all')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      focusedModel === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-200 hover:bg-[#102348] hover:text-white'
                    }`}
                  >
                    ทุกรุ่น (4)
                  </button>
                  {MODELS_COMPARISON.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setFocusedModel(model.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        focusedModel === model.id
                          ? 'bg-blue-600 text-white'
                          : 'text-blue-200 hover:bg-[#102348] hover:text-white'
                      }`}
                    >
                      {model.shortName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="visual-deck" className="border-b border-blue-400/20 bg-[#09142A] px-6 py-6 sm:px-8">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-white">
                  01. ภาพรวมโครงสร้างและแผนผังจากไฟล์แนบ (Zenition 90 Motorized &amp; US Family)
                </h2>
                <p className="text-xs text-blue-200">
                  คลิกที่รูปย่อยทั้ง 7 ภาพเพื่อดูจุดตรวจเช็กตามระบบ หรือกดขยายเต็มจอ
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-300">
                <span>7 ATTACHED DIAGRAMS</span>
                <span aria-hidden="true">·</span>
                <span>SYSTEM CODE 718134</span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
              <div className="flex flex-col justify-between rounded-lg border border-blue-400/25 bg-[#0F2042] p-4 lg:col-span-7">
                <div className="flex items-start justify-between gap-4 border-b border-blue-400/20 pb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                      <span>{activeDiagram.figCode}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate text-blue-100">{activeDiagram.subtitle}</span>
                    </div>
                    <h3 className="mt-0.5 text-base font-semibold text-white">
                      {activeDiagram.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxIdx(selectedDiagramIdx)}
                    className="no-print inline-flex items-center gap-1.5 rounded-md border border-blue-400/30 bg-[#152B56] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600 whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>ขยายรูป</span>
                  </button>
                </div>

                <div className="my-3 flex h-[280px] items-center justify-center overflow-hidden rounded-md border border-blue-300/30 bg-white p-3 sm:h-[320px]">
                  {failedImages[activeDiagram.id] ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-center text-slate-600">
                      <SlidersHorizontal className="h-8 w-8 text-slate-500" />
                      <span className="text-sm font-medium text-slate-800">
                        {activeDiagram.title}
                      </span>
                      <span className="text-xs font-mono">{activeDiagram.figCode}</span>
                    </div>
                  ) : (
                    <img
                      src={activeDiagram.src}
                      alt={activeDiagram.title}
                      referrerPolicy="no-referrer"
                      onClick={() => setLightboxIdx(selectedDiagramIdx)}
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [activeDiagram.id]: true }))
                      }
                      className="h-full w-full cursor-zoom-in object-contain"
                    />
                  )}
                </div>

                <div className="grid gap-3 border-t border-blue-400/20 pt-3 text-xs sm:grid-cols-2">
                  <div>
                    <span className="font-semibold text-blue-300">สรุปการทำงาน</span>
                    <p className="mt-0.5 leading-relaxed text-white">
                      {activeDiagram.keyTakeaway}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-sky-300">จุดตรวจซ่อม / แก้ Error</span>
                    <p className="mt-0.5 leading-relaxed text-white">
                      {activeDiagram.relatedCheck}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 lg:col-span-5">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
                  {ATTACHED_DIAGRAMS.map((diagram, idx) => {
                    const isActive = idx === selectedDiagramIdx;
                    return (
                      <button
                        key={diagram.id}
                        type="button"
                        onClick={() => setSelectedDiagramIdx(idx)}
                        className={`group flex items-center gap-2.5 rounded-lg border p-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-blue-400 ${
                          isActive
                            ? 'border-sky-400 bg-[#173264]'
                            : 'border-blue-400/20 bg-[#0D1C3A] hover:border-blue-400/50 hover:bg-[#12264E]'
                        }`}
                      >
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded border border-blue-300/30 bg-white p-0.5">
                          {failedImages[diagram.id] ? (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-mono text-slate-500">
                              IMG
                            </div>
                          ) : (
                            <img
                              src={diagram.src}
                              alt={diagram.title}
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setFailedImages((prev) => ({ ...prev, [diagram.id]: true }))
                              }
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[11px] font-mono text-blue-300">
                            {diagram.figCode.split('·')[0].trim()}
                          </div>
                          <div className="truncate text-xs font-semibold text-white">
                            {diagram.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-lg border border-blue-400/25 bg-[#0F2042] p-4">
                  <div className="flex items-center justify-between gap-2 border-b border-blue-400/20 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Stethoscope className="h-4 w-4 text-sky-300" />
                      <span>สเปกสำคัญกลุ่ม Ultrasound (ข้อมูล CSIP Level 0 เพิ่มเติม)</span>
                    </div>
                  </div>
                  <div className="mt-2.5 grid gap-2 text-xs sm:grid-cols-3">
                    <div className="rounded border border-blue-400/20 bg-[#0A162E] p-2.5">
                      <div className="font-semibold text-white">5000 Compact</div>
                      <div className="mt-0.5 font-mono text-[11px] text-sky-300">
                        10.6 kg · 15.6&quot; · 7 yrs
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-blue-100">
                        1+3 พอร์ต · ห้ามเสียบ USB ตอนเปิดเครื่อง (เข้า Service Mode)
                      </div>
                    </div>
                    <div className="rounded border border-blue-400/20 bg-[#0A162E] p-2.5">
                      <div className="font-semibold text-white">Affiniti 50</div>
                      <div className="mt-0.5 font-mono text-[11px] text-sky-300">
                        83.6 kg · 21.5&quot; · 10 yrs
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-blue-100">
                        4+1 พอร์ต · ล้างฟิลเตอร์/12 เดือน · ห้ามสแกนด้วยแบตเตอรี่
                      </div>
                    </div>
                    <div className="rounded border border-blue-400/20 bg-[#0A162E] p-2.5">
                      <div className="font-semibold text-white">Flash 5100 POC</div>
                      <div className="mt-0.5 font-mono text-[11px] text-sky-300">
                        56.6 kg · Portrait 21.5&quot;
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-blue-100">
                        3 พอร์ต · ล้างฟิลเตอร์ทุกสัปดาห์ · ลบเคสเอง (&lt; 1,200)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="comparison-matrix" className="border-b border-blue-400/20 bg-[#0B1730] px-6 py-6 sm:px-8">
            <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-base font-bold text-white">
                  02. ตารางสรุปเปรียบเทียบฟังก์ชัน การบำรุงรักษา และการแก้ปัญหาเบื้องต้น (หน้าเดียว)
                </h2>
                <p className="text-xs text-blue-200">
                  เปรียบเทียบครบทั้ง 4 รุ่น แยกตามหมวดหมู่เพื่อใช้อ้างอิงหน้างานได้ทันที
                </p>
              </div>

              <div className="no-print flex flex-wrap items-center gap-1 rounded-lg border border-blue-400/20 bg-[#071124] p-1">
                {CATEGORY_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategoryFilter(tab.id)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      categoryFilter === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-200 hover:bg-[#102348] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-blue-400/25">
              <table className="w-full min-w-[960px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-blue-400/30 bg-[#122854]">
                    <th className="w-[160px] px-4 py-3 font-semibold text-white">
                      หัวข้อเปรียบเทียบ
                    </th>
                    {visibleModels.map((model) => (
                      <th
                        key={model.id}
                        className="border-l border-blue-400/25 px-4 py-3 align-top"
                      >
                        <div className="text-sm font-bold text-white">{model.shortName}</div>
                        <div className="mt-0.5 text-[11px] font-medium text-sky-300">
                          {model.modality}
                        </div>
                        <div className="mt-0.5 font-mono text-[11px] font-normal text-blue-200">
                          {model.architectureTag}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-400/20">
                  {showRow('overview') && (
                    <tr className="align-top bg-[#09152B]">
                      <td className="bg-[#0E2044] px-4 py-3.5 font-semibold text-white">
                        <div>1. ภาพรวมการใช้งาน</div>
                        <div className="mt-0.5 text-[11px] font-normal text-blue-200">
                          สเปกหลัก &amp; โครงสร้าง
                        </div>
                      </td>
                      {visibleModels.map((model) => (
                        <td
                          key={model.id}
                          className="border-l border-blue-400/20 px-4 py-3.5 text-slate-100"
                        >
                          <ul className="space-y-1.5">
                            {model.overview.map((line, i) => (
                              <li key={i} className="flex items-start gap-2 leading-relaxed">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  )}

                  {showRow('pm') && (
                    <tr className="align-top bg-[#0C1B38]">
                      <td className="bg-[#0E2044] px-4 py-3.5 font-semibold text-white">
                        <div>2. การบำรุงรักษา (PM)</div>
                        <div className="mt-0.5 text-[11px] font-normal text-blue-200">
                          รอบตรวจเช็ก &amp; ทำความสะอาด
                        </div>
                      </td>
                      {visibleModels.map((model) => (
                        <td
                          key={model.id}
                          className="border-l border-blue-400/20 px-4 py-3.5 text-slate-100"
                        >
                          <ul className="space-y-1.5">
                            {model.pm.map((line, i) => (
                              <li key={i} className="flex items-start gap-2 leading-relaxed">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  )}

                  {showRow('troubleshooting') && (
                    <>
                      <tr className="align-top bg-[#09152B]">
                        <td className="bg-[#0E2044] px-4 py-3.5 font-semibold text-white">
                          <div>3. ปัญหาที่พบบ่อย</div>
                          <div className="mt-0.5 text-[11px] font-normal text-blue-200">
                            อาการ &amp; สัญญาณไฟ LED
                          </div>
                        </td>
                        {visibleModels.map((model) => (
                          <td
                            key={model.id}
                            className="border-l border-blue-400/20 px-4 py-3.5 text-slate-100"
                          >
                            <ul className="space-y-1.5">
                              {model.commonIssues.map((line, i) => (
                                <li key={i} className="flex items-start gap-2 leading-relaxed">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>

                      <tr className="align-top bg-[#0C1B38]">
                        <td className="bg-[#0E2044] px-4 py-3.5 font-semibold text-white">
                          <div>4. การแก้ Error เบื้องต้น</div>
                          <div className="mt-0.5 text-[11px] font-normal text-blue-200">
                            รหัส Error &amp; ขั้นตอนแก้ไข
                          </div>
                        </td>
                        {visibleModels.map((model) => (
                          <td
                            key={model.id}
                            className="border-l border-blue-400/20 px-4 py-3.5 text-slate-100"
                          >
                            <ul className="space-y-1.5">
                              {model.errorFix.map((line, i) => (
                                <li key={i} className="flex items-start gap-2 leading-relaxed">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {showRow('safety') && (
                    <tr id="safety-summary" className="align-top bg-[#132240]">
                      <td className="bg-[#172B52] px-4 py-3.5 font-semibold text-amber-200">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                          <span>5. ข้อควรระวังสำคัญ</span>
                        </div>
                        <div className="mt-0.5 text-[11px] font-normal text-amber-100/80">
                          Safety &amp; Do-Not-Do
                        </div>
                      </td>
                      {visibleModels.map((model) => (
                        <td
                          key={model.id}
                          className="border-l border-blue-400/20 px-4 py-3.5 leading-relaxed font-medium text-amber-50"
                        >
                          {model.safetyNote}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section id="maintenance-guide" className="bg-[#081226] px-6 py-6 sm:px-8">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-white">
                  03. คำอธิบายประกอบการดูแลรักษาและการแก้ Error อย่างถูกต้อง
                </h2>
                <p className="text-xs text-blue-200">
                  สรุปค่ามาตรฐานและข้อห้ามสำคัญจากคู่มือ CSIP Level 0 ทั้ง 5 ฉบับ
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-200">
                <ShieldCheck className="h-4 w-4 text-sky-300" />
                <span>Zenition 90 Rev E · Spellman FRU · 5000 / Affiniti 50 / Flash 5100 CSIP</span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-blue-400/25 bg-[#0E1E3F] p-5">
                <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-sky-300" />
                    <h3 className="text-sm font-bold text-white">
                      C-Arm: Zenition 90 Motorized
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-blue-200">
                    PSC + IST SmartCard (Sync 30 วัน)
                  </span>
                </div>
                <div className="mt-3 divide-y divide-blue-400/15">
                  {MAINTENANCE_RULES.filter((r) => r.group === 'carm').map((rule) => (
                    <div key={rule.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold text-white">{rule.title}</span>
                        <span className="font-mono text-[11px] font-medium tabular-nums text-sky-300">
                          {rule.metricOrCode}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-blue-100">{rule.summary}</p>
                      <p className="mt-1 text-xs font-medium text-white">
                        แนวทางปฏิบัติ: {rule.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-blue-400/25 bg-[#0E1E3F] p-5">
                <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-sky-300" />
                    <h3 className="text-sm font-bold text-white">
                      Ultrasound: 5000 Compact · Affiniti 50 · Flash 5100
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-blue-200">
                    CSIP Level 0 PM &amp; Recovery
                  </span>
                </div>
                <div className="mt-3 divide-y divide-blue-400/15">
                  {MAINTENANCE_RULES.filter((r) => r.group === 'ultrasound').map((rule) => (
                    <div key={rule.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold text-white">{rule.title}</span>
                        <span className="font-mono text-[11px] font-medium tabular-nums text-sky-300">
                          {rule.metricOrCode}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-blue-100">{rule.summary}</p>
                      <p className="mt-1 text-xs font-medium text-white">
                        แนวทางปฏิบัติ: {rule.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-blue-200/80">
          <span>
            Philips Zenition 90 Motorized · 5000 Compact Series · Affiniti 50 · Flash 5100 POC
          </span>
          <span className="font-mono">CSIP Level 0 Field Overview</span>
        </footer>
      </main>

      <DiagramLightbox
        diagrams={ATTACHED_DIAGRAMS}
        activeIndex={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onSelect={(idx) => setLightboxIdx(idx)}
      />
    </div>
  );
}
