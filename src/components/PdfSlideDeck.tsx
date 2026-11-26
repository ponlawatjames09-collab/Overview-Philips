import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { AlertTriangle, ShieldCheck, Stethoscope, Wrench } from 'lucide-react';
import {
  ATTACHED_DIAGRAMS,
  MAINTENANCE_RULES,
  MODELS_COMPARISON,
} from '../data/systemsData';

export const PDF_SLIDE_WIDTH = 1440;
export const PDF_SLIDE_HEIGHT = 810;

export async function exportSlideDeckToPdf(
  slideElements: (HTMLElement | null)[],
  filename = 'Philips_Imaging_Overview_Slides.pdf'
): Promise<void> {
  const validSlides = slideElements.filter((el): el is HTMLElement => el !== null);
  if (validSlides.length === 0) {
    throw new Error('No slide elements available for export.');
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const allImages = validSlides.flatMap((el) => Array.from(el.querySelectorAll('img')));
  await Promise.all(
    allImages.map((img) =>
      img.complete
        ? img.decode().catch(() => undefined)
        : new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
    )
  );

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [PDF_SLIDE_WIDTH, PDF_SLIDE_HEIGHT],
    hotfixes: ['px_scaling'],
    compress: true,
  });

  for (let i = 0; i < validSlides.length; i += 1) {
    const slideEl = validSlides[i];
    let dataUrl: string;
    try {
      dataUrl = await toPng(slideEl, {
        width: PDF_SLIDE_WIDTH,
        height: PDF_SLIDE_HEIGHT,
        pixelRatio: 2,
        backgroundColor: '#061024',
        cacheBust: false,
      });
    } catch {
      dataUrl = await toPng(slideEl, {
        width: PDF_SLIDE_WIDTH,
        height: PDF_SLIDE_HEIGHT,
        pixelRatio: 2,
        backgroundColor: '#061024',
        skipFonts: true,
        cacheBust: false,
      });
    }

    if (i > 0) {
      pdf.addPage([PDF_SLIDE_WIDTH, PDF_SLIDE_HEIGHT], 'landscape');
    }
    pdf.addImage(dataUrl, 'PNG', 0, 0, PDF_SLIDE_WIDTH, PDF_SLIDE_HEIGHT, undefined, 'FAST');
  }

  pdf.save(filename);
}

interface PdfSlideDeckProps {
  slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function PdfSlideDeck({ slideRefs }: PdfSlideDeckProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '-14000px',
        top: 0,
        width: `${PDF_SLIDE_WIDTH}px`,
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      {/* SLIDE 1: Overview & Attached Visual Diagrams */}
      <div
        ref={(el) => {
          slideRefs.current[0] = el;
        }}
        style={{ width: `${PDF_SLIDE_WIDTH}px`, height: `${PDF_SLIDE_HEIGHT}px` }}
        className="flex flex-col justify-between overflow-hidden bg-[#061024] p-7 text-white"
      >
        <div className="flex items-end justify-between border-b border-blue-400/25 pb-3.5">
          <div>
            <div className="font-mono text-xs text-sky-300">
              PHILIPS HEALTHCARE · CSIP LEVEL 0 TECHNICAL OVERVIEW · SLIDE 01 / 03
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
              ภาพรวมระบบและแผนผังโครงสร้าง: Zenition 90 Motorized &amp; Ultrasound Family
            </h1>
          </div>
          <div className="text-right font-mono text-xs text-blue-200">
            <div>C-Arm 25 kW · Code 718134</div>
            <div>US 5000 Compact · Affiniti 50 · Flash 5100 POC</div>
          </div>
        </div>

        <div className="my-3 grid flex-1 grid-cols-4 gap-3">
          {ATTACHED_DIAGRAMS.map((diagram) => (
            <div
              key={diagram.id}
              className="flex flex-col justify-between rounded-lg border border-blue-400/25 bg-[#0D1C3A] p-2.5"
            >
              <div>
                <div className="font-mono text-[10px] text-sky-300">{diagram.figCode}</div>
                <div className="truncate text-xs font-bold text-white">{diagram.title}</div>
              </div>
              <div className="my-1.5 flex h-[155px] items-center justify-center rounded border border-blue-300/30 bg-white p-1.5">
                <img
                  src={diagram.src}
                  alt={diagram.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="line-clamp-2 text-[10.5px] leading-snug text-blue-100">
                {diagram.relatedCheck}
              </p>
            </div>
          ))}

          {/* 8th Grid Cell: Compact Ultrasound Family Overview */}
          <div className="flex flex-col justify-between rounded-lg border border-sky-400/35 bg-[#10254D] p-3">
            <div className="flex items-center gap-1.5 border-b border-blue-400/25 pb-1.5">
              <Stethoscope className="h-4 w-4 text-sky-300" />
              <span className="text-xs font-bold text-white">กลุ่มเครื่อง Ultrasound (3 รุ่น)</span>
            </div>
            <div className="my-1.5 space-y-2 text-[10.5px]">
              <div className="rounded border border-blue-400/20 bg-[#0A162E] p-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>5000 Compact</span>
                  <span className="font-mono text-sky-300">10.6 kg · 15.6&quot;</span>
                </div>
                <div className="mt-0.5 text-blue-100">
                  1+3 พอร์ต · แบต 30 นาที (+UPS 2 ชม.) · ห้ามเสียบ USB ตอนเปิดเครื่อง
                </div>
              </div>
              <div className="rounded border border-blue-400/20 bg-[#0A162E] p-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Affiniti 50</span>
                  <span className="font-mono text-sky-300">83.6 kg · 21.5&quot;</span>
                </div>
                <div className="mt-0.5 text-blue-100">
                  4+1 พอร์ต · ล้างฟิลเตอร์ทุก 12 เดือน · ห้ามสแกนด้วยพลังงานแบตเตอรี่
                </div>
              </div>
              <div className="rounded border border-blue-400/20 bg-[#0A162E] p-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Flash 5100 POC</span>
                  <span className="font-mono text-sky-300">56.6 kg · Portrait</span>
                </div>
                <div className="mt-0.5 text-blue-100">
                  3 พอร์ต · ล้างฟิลเตอร์ทุกสัปดาห์ · ลบเคสเอง (&lt; 1,200 เคส)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-blue-400/20 pt-2 font-mono text-[11px] text-blue-200">
          <span>Philips Zenition 90 Motorized · 5000 Compact · Affiniti 50 · Flash 5100 POC</span>
          <span>1 / 3 · System Overview &amp; Attached Schematics</span>
        </div>
      </div>

      {/* SLIDE 2: One-Page Master Comparison Matrix */}
      <div
        ref={(el) => {
          slideRefs.current[1] = el;
        }}
        style={{ width: `${PDF_SLIDE_WIDTH}px`, height: `${PDF_SLIDE_HEIGHT}px` }}
        className="flex flex-col justify-between overflow-hidden bg-[#061024] p-7 text-white"
      >
        <div className="flex items-end justify-between border-b border-blue-400/25 pb-3">
          <div>
            <div className="font-mono text-xs text-sky-300">
              ONE-PAGE COMPARISON MATRIX · SLIDE 02 / 03
            </div>
            <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              ตารางเปรียบเทียบฟังก์ชัน การบำรุงรักษา (PM) และการแก้ Error เบื้องต้น (ครบ 4 รุ่น)
            </h2>
          </div>
          <span className="font-mono text-xs text-blue-200">
            Zenition 90 · 5000 Compact · Affiniti 50 · Flash 5100 POC
          </span>
        </div>

        <div className="my-2.5 flex-1 overflow-hidden rounded-lg border border-blue-400/30">
          <table className="h-full w-full border-collapse text-left text-[10.5px]">
            <thead>
              <tr className="border-b border-blue-400/30 bg-[#122854]">
                <th className="w-[130px] px-3 py-2 font-bold text-white">หัวข้อ</th>
                {MODELS_COMPARISON.map((m) => (
                  <th key={m.id} className="border-l border-blue-400/25 px-3 py-2 align-top">
                    <div className="text-xs font-bold text-white">{m.shortName}</div>
                    <div className="text-[10px] font-medium text-sky-300">{m.modality}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-400/20">
              <tr className="bg-[#09152B] align-top">
                <td className="bg-[#0E2044] px-3 py-2 font-bold text-white">1. ภาพรวม</td>
                {MODELS_COMPARISON.map((m) => (
                  <td key={m.id} className="border-l border-blue-400/20 px-3 py-2 text-slate-100">
                    <ul className="space-y-1">
                      {m.overview.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="bg-[#0C1B38] align-top">
                <td className="bg-[#0E2044] px-3 py-2 font-bold text-white">2. บำรุงรักษา PM</td>
                {MODELS_COMPARISON.map((m) => (
                  <td key={m.id} className="border-l border-blue-400/20 px-3 py-2 text-slate-100">
                    <ul className="space-y-1">
                      {m.pm.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="bg-[#09152B] align-top">
                <td className="bg-[#0E2044] px-3 py-2 font-bold text-white">3. ปัญหาพบบ่อย</td>
                {MODELS_COMPARISON.map((m) => (
                  <td key={m.id} className="border-l border-blue-400/20 px-3 py-2 text-slate-100">
                    <ul className="space-y-1">
                      {m.commonIssues.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="bg-[#0C1B38] align-top">
                <td className="bg-[#0E2044] px-3 py-2 font-bold text-white">4. แก้ Error</td>
                {MODELS_COMPARISON.map((m) => (
                  <td key={m.id} className="border-l border-blue-400/20 px-3 py-2 text-slate-100">
                    <ul className="space-y-1">
                      {m.errorFix.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="bg-[#132240] align-top">
                <td className="bg-[#172B52] px-3 py-2 font-bold text-amber-200">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                    <span>5. ข้อควรระวัง</span>
                  </div>
                </td>
                {MODELS_COMPARISON.map((m) => (
                  <td
                    key={m.id}
                    className="border-l border-blue-400/20 px-3 py-2 leading-snug font-medium text-amber-50"
                  >
                    {m.safetyNote}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-blue-400/20 pt-2 font-mono text-[11px] text-blue-200">
          <span>CSIP Level 0 Reference Matrix</span>
          <span>2 / 3 · 4-Model Comparison Table</span>
        </div>
      </div>

      {/* SLIDE 3: Field Maintenance & Troubleshooting Reference */}
      <div
        ref={(el) => {
          slideRefs.current[2] = el;
        }}
        style={{ width: `${PDF_SLIDE_WIDTH}px`, height: `${PDF_SLIDE_HEIGHT}px` }}
        className="flex flex-col justify-between overflow-hidden bg-[#061024] p-7 text-white"
      >
        <div className="flex items-end justify-between border-b border-blue-400/25 pb-3.5">
          <div>
            <div className="font-mono text-xs text-sky-300">
              FIELD MAINTENANCE &amp; ERROR RECOVERY GUIDE · SLIDE 03 / 03
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
              คำอธิบายประกอบการดูแลรักษาและการแก้ Error อย่างถูกต้อง (C-Arm &amp; Ultrasound)
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-200">
            <ShieldCheck className="h-4 w-4 text-sky-300" />
            <span>Zenition 90 Rev E · Spellman FRU · 5000 / Affiniti 50 / Flash 5100 CSIP</span>
          </div>
        </div>

        <div className="my-4 grid flex-1 grid-cols-2 gap-6">
          <div className="flex flex-col justify-between rounded-xl border border-blue-400/30 bg-[#0D1C3A] p-5">
            <div>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-sky-300" />
                  <h3 className="text-base font-bold text-white">C-Arm: Zenition 90 Motorized</h3>
                </div>
                <span className="font-mono text-xs text-blue-200">PSC + IST SmartCard</span>
              </div>
              <div className="mt-4 divide-y divide-blue-400/15">
                {MAINTENANCE_RULES.filter((r) => r.group === 'carm').map((rule) => (
                  <div key={rule.id} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold text-white">{rule.title}</span>
                      <span className="font-mono text-xs font-semibold text-sky-300">
                        {rule.metricOrCode}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-blue-100">{rule.summary}</p>
                    <p className="mt-1 text-xs font-semibold text-white">
                      แนวทางปฏิบัติ: {rule.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5 rounded-lg border border-blue-400/20 bg-[#09152B] p-3 text-center text-xs">
              <div>
                <div className="font-mono font-bold text-sky-300">610–2,180 mm</div>
                <div className="text-[11px] text-blue-100">ระยะยกแนวดิ่ง</div>
              </div>
              <div>
                <div className="font-mono font-bold text-sky-300">200 mm</div>
                <div className="text-[11px] text-blue-100">ระยะเลื่อนแนวนอน</div>
              </div>
              <div>
                <div className="font-mono font-bold text-sky-300">+90° / -50°</div>
                <div className="text-[11px] text-blue-100">มุมเอียง (SID 670 mm)</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-blue-400/30 bg-[#0D1C3A] p-5">
            <div>
              <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-sky-300" />
                  <h3 className="text-base font-bold text-white">
                    Ultrasound: 5000 Compact · Affiniti 50 · Flash 5100
                  </h3>
                </div>
                <span className="font-mono text-xs text-blue-200">CSIP Level 0 Recovery</span>
              </div>
              <div className="mt-4 divide-y divide-blue-400/15">
                {MAINTENANCE_RULES.filter((r) => r.group === 'ultrasound').map((rule) => (
                  <div key={rule.id} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold text-white">{rule.title}</span>
                      <span className="font-mono text-xs font-semibold text-sky-300">
                        {rule.metricOrCode}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-blue-100">{rule.summary}</p>
                    <p className="mt-1 text-xs font-semibold text-white">
                      แนวทางปฏิบัติ: {rule.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5 rounded-lg border border-blue-400/20 bg-[#09152B] p-3 text-center text-xs">
              <div>
                <div className="font-mono font-bold text-sky-300">Ctrl+Alt+R</div>
                <div className="text-[11px] text-blue-100">เข้าโหมดกู้ระบบ (MTE)</div>
              </div>
              <div>
                <div className="font-mono font-bold text-sky-300">Ctrl+Shift+I</div>
                <div className="text-[11px] text-blue-100">จับภาพ Error (RF/IQ)</div>
              </div>
              <div>
                <div className="font-mono font-bold text-amber-300">EHA014</div>
                <div className="text-[11px] text-blue-100">Import License USB</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-blue-400/20 pt-2 font-mono text-[11px] text-blue-200">
          <span>Prepared for Field Service &amp; Clinical Engineering Reference</span>
          <span>3 / 3 · Maintenance &amp; Troubleshooting Standards</span>
        </div>
      </div>
    </div>
  );
}
