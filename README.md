# Philips Imaging Overview (C-Arm & Ultrasound CSIP Level 0)

สรุปภาพรวมการใช้งาน การบำรุงรักษา (PM) ปัญหาที่พบบ่อย และการแก้ไข Error เบื้องต้นในหน้าเดียว สำหรับ:
- **Philips Zenition 90 Motorized (C-Arm)**
- **Philips Ultrasound 5000 Compact Series (5300/5500)**
- **Philips Affiniti 50**
- **Philips Flash 5100 POC / Pro**

---

## การเชื่อมต่อ GitHub และ Vercel เพื่อนำขึ้นระบบออนไลน์

โปรเจกต์นี้ตั้งค่าไฟล์ `vercel.json`, `.vercelignore`, `.gitignore` และ `.github/workflows/deploy.yml` ไว้พร้อมใช้งานแล้ว (ระบบจะไม่ส่งไฟล์คู่มือ PDF ขนาด ~75 MB ขึ้น GitHub/Vercel แต่จะเก็บภาพแผนผัง PNG ทั้ง 7 รูปไว้ครบถ้วน)

### วิธีที่ 1: เชื่อมต่อผ่านหน้าเว็บ Vercel (แนะนำ — ง่ายที่สุด)
1. นำโค้ดขึ้น **GitHub Repository** ของคุณ (สร้าง Repo ใหม่บน GitHub แล้ว push โค้ดจาก branch `main`)
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit: Philips Imaging Overview"
   git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
2. เข้าสู่ [vercel.com](https://vercel.com) และล็อกอินด้วยบัญชี **GitHub**
3. กด **Add New... > Project** แล้วเลือก Repository ที่สร้างไว้
4. Vercel จะตรวจจับการตั้งค่าจาก `vercel.json` อัตโนมัติ (`Framework: Vite`, `Build: npm run build`, `Output: dist`) กด **Deploy**
5. เมื่อ Deploy เสร็จ จะได้ลิงก์ออนไลน์ เช่น `https://<project-name>.vercel.app` และทุกครั้งที่ push โค้ดใหม่ขึ้น GitHub ตัว Vercel จะอัปเดตลิงก์ออนไลน์ให้อัตโนมัติ

### วิธีที่ 2: อัปเดตอัตโนมัติผ่าน GitHub Actions
หากต้องการให้ GitHub Actions เป็นตัวสั่ง Deploy ไปยัง Vercel ทุกครั้งที่ push ขึ้น `main` ให้เพิ่ม Secrets ใน **GitHub Repo > Settings > Secrets and variables > Actions**:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
