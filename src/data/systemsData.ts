export type ModelId = 'z90' | 'us5000' | 'affiniti50' | 'flash5100';

export type ComparisonCategory = 'all' | 'overview' | 'pm' | 'troubleshooting' | 'safety';

export interface AttachedDiagram {
  id: string;
  src: string;
  figCode: string;
  title: string;
  subtitle: string;
  keyTakeaway: string;
  relatedCheck: string;
}

export interface ModelSpec {
  id: ModelId;
  shortName: string;
  fullName: string;
  modality: string;
  architectureTag: string;
  overview: string[];
  pm: string[];
  commonIssues: string[];
  errorFix: string[];
  safetyNote: string;
}

export interface MaintenanceRule {
  id: string;
  group: 'carm' | 'ultrasound';
  title: string;
  metricOrCode: string;
  summary: string;
  action: string;
}

export const ATTACHED_DIAGRAMS: AttachedDiagram[] = [
  {
    id: 'z90-system',
    src: '/assets/aistudio/Screenshot_2026-11-26_144314_f324e671.png',
    figCode: 'FIG. 01 · SYSTEM',
    title: 'Zenition 90 Motorized & MVS',
    subtitle: 'C-Arm Stand + Table UI + Mobile Viewing Station',
    keyTakeaway: 'ชุด Stand เคลื่อนที่ด้วยมอเตอร์พร้อม Flat Detector (FD12/17) เชื่อมต่อ MVS จอคู่ผ่านสายหลักเส้นเดียว',
    relatedCheck: 'ตรวจขั้วสาย Stand–MVS, ล้อเบรก และไฟเตือน X-Ray On บนหัวเสา MVS ก่อนใช้งาน',
  },
  {
    id: 'z90-block',
    src: '/assets/aistudio/Screenshot_2026-11-26_144753_237792d5.png',
    figCode: 'FIG. 02 · ARCHITECTURE',
    title: 'System Block Diagram (Stand & MVS)',
    subtitle: 'SCN · BB/BC · GA/SE/SP · LA · WS · WA',
    keyTakeaway: 'แยกฝั่ง Stand (SCN คุม High-Voltage, Collimator, Motion) และฝั่ง MVS (WS/WA คุมภาพและเมนไฟหลัก)',
    relatedCheck: 'ไล่เช็กตามบล็อก: ไม่มีภาพดู BB/BC, ไม่มีรังสีดู GA/SE/SP, มอเตอร์ไม่ขยับดู SBQ/BLA',
  },
  {
    id: 'z90-image-chain',
    src: '/assets/aistudio/Screenshot_2026-11-26_145302_6348a1a9.png',
    figCode: 'FIG. 03 · FIG. 158',
    title: 'Image Processing & Dose Loop',
    subtitle: 'X-Ray Tube -> FD -> FDC -> MVS-PC (IP Simplicity)',
    keyTakeaway: 'สัญญาณภาพจาก FD ส่งผ่าน FDC เข้า MVS-PC เพื่อลด Noise/ปรับ Auto CB แล้วป้อนกลับ Dose Rate Control ไปที่ SCU',
    relatedCheck: 'หากภาพเบลอ/มีจุด Spots ให้แยกตรวจ 3 ชั้น: จอภาพ -> Flat Detector (ทำ DFA) -> MVS Processing',
  },
  {
    id: 'z90-interconnect',
    src: '/assets/aistudio/Screenshot_2026-11-26_144836_e723057d.png',
    figCode: 'FIG. 04 · INTERCONNECT',
    title: 'Ethernet & Control Cabling',
    subtitle: 'WS (X19 Image / X21 Control) <-> SCN & BC',
    keyTakeaway: 'แยกสาย Ethernet 2 เส้น: Image Link (X19 -> BC X2) และ Control Link (X21 -> SCN X9) พร้อม Serial Link',
    relatedCheck: 'ถ้าขึ้น Error สื่อสารหรือภาพไม่ขึ้นจอ เช็กสาย Fiber/LAN ช่อง X2 (FDC เปราะบางมาก) และไฟสถานะ SCN/BC',
  },
  {
    id: 'z90-height',
    src: '/assets/aistudio/Screenshot_2026-11-26_145405_13e66555.png',
    figCode: 'FIG. 05 · FIG. 132',
    title: 'Height Movement (Motorized)',
    subtitle: 'ระยะยกแนวตั้ง 610 – 2,180 mm (คอลัมน์ SM)',
    keyTakeaway: 'ระยะยกชุด C-Arm ครอบคลุมช่วง 610–1,100 mm ถึงความสูงรวมสูงสุด 2,180 mm (ฐานยาว 2,060 mm)',
    relatedCheck: 'ต้องปรับคอลัมน์ลงศูนย์และค้ำรองน้ำหนักก่อนถอด ESU มิฉะนั้นเครื่องเสียสมดุล/ล้มได้',
  },
  {
    id: 'z90-longitudinal',
    src: '/assets/aistudio/Screenshot_2026-11-26_145348_9649d84b.png',
    figCode: 'FIG. 06 · FIG. 131',
    title: 'Longitudinal / Horizontal Travel',
    subtitle: 'ระยะเลื่อนหน้า-หลัง 200 mm (ความยาวรวม 2,765 mm)',
    keyTakeaway: 'ชุดแขนยืดหดแนวนอนได้ 200 mm เพื่อจัดระยะ Isocenter โดยไม่ต้องเข็นฐานเครื่อง',
    relatedCheck: 'ก่อนถอดชุดพลังงาน ESU ต้องเลื่อนแนวนอนกลับตำแหน่ง Zero Position และล็อกเบรกทุกครั้ง',
  },
  {
    id: 'z90-angulation',
    src: '/assets/aistudio/Screenshot_2026-11-26_145415_8271317a.png',
    figCode: 'FIG. 07 · FIG. 133',
    title: 'Angulation & Orbital Range',
    subtitle: 'มุมเอียง +90° / -50° · ช่องว่าง SID 670 mm · ลึก 730 mm',
    keyTakeaway: 'รองรับการหมุนก้ม-เงยและเอียงได้กว้างพร้อมเซนเซอร์กันชน (BLA Anti-Collision) รอบตัวรับภาพ FD',
    relatedCheck: 'เช็กขั้ว BLA J1 และหมุน Monoblock ลงพื้น-FD ขึ้นบนก่อนถอด Collimator หรือ Calibration',
  },
];

export const MODELS_COMPARISON: ModelSpec[] = [
  {
    id: 'z90',
    shortName: 'Zenition 90 Motorized',
    fullName: 'Philips Zenition 90 (Motorized C-Arm)',
    modality: 'Mobile C-Arm X-Ray · 25 kW',
    architectureTag: 'Code 718134 · Spellman MMB + ESU 312V',
    overview: [
      'C-Arm ผ่าตัดแบบ Motorized พร้อม MVS จอคู่ (Stand + Viewing Station)',
      'Monoblock 25 kW (120 kV) เสริมกำลังด้วยแบต ESU (26×12V) และ Cap Bank 54,000 µF',
      'ตรวจเช็ก/ปรับตั้งค่าผ่านซอฟต์แวร์ PSC (Philips SupportConnect) + IST SmartCard',
    ],
    pm: [
      'ตรวจความปลอดภัยไฟฟ้า IEC 62353 (Earth < 300 mΩ, Insulation > 100 MΩ)',
      'เช็ก ESU Battery Lifetime Indicator ใน PSC ให้สูงกว่า 295 V (แบตใหม่ชาร์จ 24 ชม.)',
      'อุ่น FD นาน 20 นาที ก่อนทำ DFA · ทำ Tube Conditioning หากหยุดใช้นาน ~3 เดือน',
    ],
    commonIssues: [
      'หลอดร้อนจัดขึ้นเตือน Hot tank! (51°C / 54.6°C / 60°C เหลือเฉพาะ Low dose fluoro)',
      'เกิด Spot หรือเส้นบนภาพจาก Grid สกปรก หรือ Detector ต้องทำ DFA',
      'ขึ้นเตือนแบต ESU ต่ำ (< 295 V) หรือมอเตอร์หยุดทำงานจากเซนเซอร์กันชน BLA',
    ],
    errorFix: [
      'M 061 Warning (wrong View Station): เปิด PSC -> System -> Connect -> Re-connect แล้ว Restart',
      'X-ray Tube Test ไม่ผ่าน: ดู mAdrift/mAstable ใน CAT Viewer -> ปรับ R27 (SEA3) + Filament Gain (≤ 5 รอบ, ±5 mA)',
      'ค้าง Startup Exceeded หลังเปลี่ยน SCU: รอ 5–10 นาทีให้ MVS ซิงค์ SW แล้วกด Re-connect',
    ],
    safetyNote:
      'ไฟสูง 310–367 V DC ค้างใน ESU/Cap Bank แม้ถอดปลั๊ก · ห้ามเช็ดเลนส์ FD/Tube LAD ด้วย IPA/น้ำยาเลนส์ · ระวังสาย Fiber X2 หัก และห้ามคลายนอต 6 ตัวหน้า Monoblock',
  },
  {
    id: 'us5000',
    shortName: '5000 Compact Series',
    fullName: 'Philips Ultrasound 5000 Compact (5300/5500)',
    modality: 'Compact Portable US · 10.6 kg',
    architectureTag: '4535 621 03362 Rev B · Service Life 7 yrs',
    overview: [
      'รุ่นพกพา 10.6 kg จอ FHD 15.6" + Touch Screen + Trackpad · 1 พอร์ต (เพิ่ม 3 พอร์ตด้วย Multiport บนรถเข็น)',
      'แบตภายใน 1× 14.4 Vdc 98 Wh (สแกนได้ ~30 นาที) + Cart UPS 3× 98 Wh (รวมสูงสุด 2 ชม.)',
      'เชื่อมต่อจอนอกผ่าน DisplayPort · รองรับ Auto-Delete เคสเก่าและ MTE Recovery',
    ],
    pm: [
      'ทำความสะอาดหัวต่อ Probe Pin 1–65 (TechSpray 2032 + IPA และเป่าลมห่าง 5–7.6 ซม. 5–10 วินาที)',
      'ตรวจแบตเตอรี่ทุก 12 เดือน (วางหมุนบนพื้นเรียบเช็กอาการบวม) · เปลี่ยน Easy-Clip ทุก ~6 เดือน',
      'Calibrate จอสัมผัส 8 จุด · ตรวจพื้นที่ HDD (เตือน Almost full ที่ ≤ 15% หรือ < 10 เคส)',
    ],
    commonIssues: [
      'เสียบ USB ค้างไว้ขณะเปิดเครื่อง -> ระบบบูตเข้า Philips Service Mode แทนหน้าสแกนปกติ',
      'ไฟ PC Status (ซ้ายเครื่อง): Yellow = BIOS OK แต่ OS ค้าง / Unlit = PC Module เสีย',
      'ไฟ Cart UPS (ด้านหลัง): Blinking Green = แบต 1–3 เสีย / Blinking Yellow = บอร์ด BMS เสีย',
    ],
    errorFix: [
      'บูตไม่ขึ้น/ค้าง: ถอด USB ทั้งหมดออกก่อน -> กด Ctrl+Alt+R เข้า MTE เพื่อกู้ระบบหรือ Restore',
      'ทดสอบฮาร์ดแวร์: ถอดหัวตรวจทุกตัวออกแล้วรัน System Test (ใช้เวลา 7–10 นาที)',
      'เก็บหลักฐาน Error หน้างาน: กด Ctrl+Shift+I เพื่อ Capture ค่า RF/IQ ส่งทีมช่าง',
    ],
    safetyNote:
      'เสียบ/ดึงปลั๊ก AC Adapter แบบตรงๆ ห้ามเอียงงัด (ขั้วพินหัก) · ถอดสาย Adapter ออกจากเครื่องเมื่อดึงปลั๊กผนัง · เสียบชาร์จที่แบต ≤ 25% · ห้ามใช้ Sani-Cloth AF3, Super Sani-Cloth, 70% IPA บนจอสัมผัส และห้าม Defrag SSD',
  },
  {
    id: 'affiniti50',
    shortName: 'Affiniti 50',
    fullName: 'Philips Affiniti 50',
    modality: 'Cart-Based Shared Service · 83.6 kg',
    architectureTag: '4535 619 14975 REV A · Service Life 10 yrs',
    overview: [
      'อัลตราซาวนด์รถเข็น 83.6 kg (450 VA) จอ 21.5" IPS (1920×1080) · 4 พอร์ตหัวตรวจ + 1 Pencil Probe',
      'ภาคจ่ายไฟ VPPM/APPM มีแบตเสริม 25.2 V Li-ion (7s2p) ใช้โหมด Sleep เคลื่อนย้าย 20–40 นาที',
      'ตรวจซ่อมผ่าน Support Menu, MTE (Ctrl+Alt+R) และปรับแขนจอ Armstrong/Ergotron',
    ],
    pm: [
      'ล้าง Air Filter ล่างซ้ายทุก 12 เดือน แล้วรีเซ็ตตัวนับใน Service Messaging > Check Filter Status (1–999 วัน)',
      'ถอด Trackball ล้างลูกกลิ้ง (หมุนแหวนทวนเข็มนาฬิกา เช็ดด้วย IPA แล้วตั้งจุดเหลืองให้ตรง)',
      'Calibrate จอสัมผัส 8 จุด · ตรวจความตึงแขนจอ (ประแจ M4) · ตั้ง Auto-Delete เมื่อดิสก์ ≤ 15%',
    ],
    commonIssues: [
      'เครื่องดับเองจากความร้อนสะสม (CPU/Sys ≥ 50°C, PREG 60°C, ACB/CB/FPGA 70°C) เพราะฟิลเตอร์ตัน/บังช่องลมบน',
      'ไฟ VPPM/APPM: Battery LED สีเหลือง (< 10%) หรือกระพริบเหลือง (แบตเสีย/Unbalanced)',
      'จอสัมผัสไม่ตอบสนอง หรือเปลี่ยนบอร์ด SVIO แล้วจอ B ไม่ขึ้นภาพ',
    ],
    errorFix: [
      'จอสัมผัสเอ๋อ/ค้าง: แตะมุมขวาล่างที่ไม่มีป้ายบนจอภาพหลัก (Imaging Display) เพื่อรีเซ็ต Touch',
      'จอ B ไม่มีภาพหลังงานซ่อม: เข้า Hardware Utilities > Display Assignment เพื่อผูกจอใหม่',
      'บูตไม่ขึ้น/DICOM ค้าง: กด Ctrl+Alt+R เข้า MTE, รัน System Test (7–10 นาที, ถอดหัวตรวจ) หรือสั่ง DICOM Job Clear',
    ],
    safetyNote:
      'ห้ามสแกนด้วยพลังงานแบตเตอรี่ (ใช้สำหรับ Sleep Mode เคลื่อนย้ายเท่านั้น) · รอ ≥ 30 วินาทีหลังถอด AC และแบตก่อนซ่อม · ห้ามใช้ Sani-Cloth AF3/Super Sani-Cloth/Acetone/MEK/Bleach/70% IPA เช็ดจอสัมผัส และห้าม Defrag SSD',
  },
  {
    id: 'flash5100',
    shortName: 'Flash 5100 POC',
    fullName: 'Philips Flash 5100 POC / Pro',
    modality: 'Vertical POC Ultrasound · 56.6 kg',
    architectureTag: '3000 138 15861_C · 3× 98 Wh Backup',
    overview: [
      'รุ่น POC แนวตั้ง 56.6 kg จอสัมผัส Portrait 21.5" + Trackpad/Gain/Depth/Freeze และปุ่ม Service',
      '3 พอร์ตหัวตรวจแนวตั้ง + แบตสำรอง 3× 4S3P 14.4 Vdc 98 Wh (Auto Freeze 15 นาที / Sleep 20 นาที)',
      'ไม่มีไดรฟ์ CD/DVD (Export ผ่าน USB 2.0 ≥ 35 MB/s) และไม่รองรับ Auto-Delete เคสอัตโนมัติ',
    ],
    pm: [
      'ตรวจและล้าง Air Filter ล่างซ้าย E-Box ทุกสัปดาห์ (Weekly) — ใส่แผ่นสำรองขณะตากแห้ง',
      'ลบข้อมูลเคสผู้ป่วยด้วยตนเองสม่ำเสมอ (ระบบเตือนที่ 1,000 เคส และ Error ที่ 1,200 เคส)',
      'ล้างพินหัวตรวจ Pin 1–65 (≥ 60% IPA + ลม) และ Calibrate Touch 4 จุด (ต้องถอดจอนอกก่อน)',
    ],
    commonIssues: [
      'เคสสะสม > 1,200 เคส ทำให้ระบบทำงานช้าหรือรีสตาร์ทเองระหว่างใช้งาน',
      'Error EHA014 (014.5092.501) หลังกู้คืนซอฟต์แวร์ (ไฟล์ License หายหรือไม่ตรง)',
      'Calibrate Touch ขึ้น "Invalid display was specified" หรือจอนอกไม่โคลนหลังเครื่องตื่นจาก Sleep',
    ],
    errorFix: [
      'แก้ EHA014 (License): กดปุ่ม Service -> Options > Software Options > Import License Options จาก USB',
      'แก้ > 1,200 เคส: ส่งออก PACS/USB 2.0 แล้วลบเคสเก่าด้วยมือ (เพราะไม่มี Auto-Delete)',
      'แก้ Calibration/Clone จอนอก: ถอดจอนอกแล้ว Reboot ก่อน Calibrate · ตั้งจอนอกเป็น Portrait (ถ้าหลับให้ Restart)',
    ],
    safetyNote:
      'ห้ามเก็บในที่อุณหภูมิต่ำกว่า -10°C · ห้ามถอด Top Bin (5.2 kg) หรือผลักขอบจอข้าง (เสี่ยงล้มคว่ำ) · ห้ามถอดปลั๊ก AC ระหว่าง System Test · เสียบชาร์จเมื่อแบต ≤ 20% · ห้ามใช้ Sani-Cloth AF3 / Super Sani-Cloth',
  },
];

export const MAINTENANCE_RULES: MaintenanceRule[] = [
  {
    id: 'rule-esu',
    group: 'carm',
    title: 'ESU & Capacitor Bank (Z90)',
    metricOrCode: '310–367 V DC · > 295 V',
    summary: 'ไฟสูงค้างใน ESU (26×12V) และ Cap Bank 54,000 µF แม้ถอดปลั๊ก; หากค่า Battery Lifetime < 295 V ต้องเปลี่ยนแบตและชาร์จ 24 ชม.',
    action: 'เช็กใน PSC: Survey > Tank & Energy Storage History และปลด SQ-P1 ก่อนซ่อม',
  },
  {
    id: 'rule-tube',
    group: 'carm',
    title: 'Monoblock Thermal & Tube Test (Z90)',
    metricOrCode: '51°C / 54.6°C / 60°C · R27',
    summary: 'Hot tank 60°C ใช้ได้เฉพาะ Low Dose; หยุดใช้ ~3 เดือนต้องทำ Conditioning · ค่า mA เพี้ยนปรับ R27 (SEA3) + Filament Gain',
    action: 'ปรับไม่เกิน 5 ครั้ง (±5 mA) ปิดหน้าหน้าต่างด้วยตะกั่ว และห้ามคลายนอต 6 ตัวหน้า Pre-filter',
  },
  {
    id: 'rule-optics',
    group: 'carm',
    title: 'Laser Optics & FDC Fiber (Z90)',
    metricOrCode: 'X2 Fiber · NO IPA',
    summary: 'เลนส์ FD/Tube LAD เคลือบกันสะท้อน ห้ามเช็ดแอลกอฮอล์; ขั้ว X2 บน FDC เป็นไฟเบอร์แก้วเปราะบางหักง่าย',
    action: 'เป่าลมแห้งหรือใช้กระดาษเช็ดเลนส์ชุบน้ำหมาด และกดสลัก X2 เบาๆ ก่อนดึงตรงๆ',
  },
  {
    id: 'rule-us-filter',
    group: 'ultrasound',
    title: 'Air Filter & Thermal Limits (US Family)',
    metricOrCode: 'Affiniti 12 mo · Flash Weekly',
    summary: 'Affiniti 50 ตัดดับเมื่อ CPU 50°C / PREG 60°C (รีเซ็ตตัวนับ Filter 1–999 วัน) ส่วน Flash 5100 POC ต้องล้างฟิลเตอร์ทุกสัปดาห์',
    action: 'ล้าง/เป่าแห้งฟิลเตอร์เสมอ ห้ามบังช่องระบายลมบนของ Affiniti และตรวจพัดลมระบายอากาศ',
  },
  {
    id: 'rule-us-boot',
    group: 'ultrasound',
    title: 'Boot Traps, Storage & Error Recovery (US)',
    metricOrCode: 'Ctrl+Alt+R · EHA014 · 1,200 Studies',
    summary: '5000 Compact ห้ามเสียบ USB ค้างตอนเปิดเครื่อง · Flash 5100 ไม่มี Auto-Delete (> 1,200 เคสรีบูตเอง) และอาจขึ้น EHA014 หลังกู้ OS',
    action: 'ใช้ MTE (Ctrl+Alt+R) กู้ระบบ, Ctrl+Shift+I เก็บ Snapshot, และ Import License แก้ EHA014',
  },
  {
    id: 'rule-us-care',
    group: 'ultrasound',
    title: 'Probes, Touchscreen & Power Hygiene (US)',
    metricOrCode: 'Pin 1–65 · NO 70% IPA / AF3',
    summary: 'ห้ามใช้ Sani-Cloth AF3, Super Sani-Cloth, 70% IPA บนจอสัมผัส และห้าม Defrag SSD; Affiniti 50 สแกนบนแบตไม่ได้',
    action: 'ล้างพิน 1–65 ด้วยน้ำยา + เป่าลม 5–7.6 ซม. เสียบ AC 5000 Series ตรงๆ และชาร์จที่ ≤ 20–25%',
  },
];
