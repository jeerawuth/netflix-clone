import React from 'react';

export default function FilterLanguageForm({ filter, setFilter, sort, setSort }) {
  return (
    <div style={{
      background: '#181818',
      borderRadius: 8,
      padding: '18px 24px',
      margin: '0 0 32px 0',
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      alignItems: 'flex-start',
      width: '100%',
      boxShadow: '0 2px 16px rgba(0,0,0,0.22)',
    }}>
      <div style={{marginBottom: 6}}>
        <span style={{fontSize: '1.7rem', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginRight: 16}}>เลือกดูตามภาษา</span>
        <span style={{fontSize: '1.02rem', color: '#aaa', fontWeight: 400, marginLeft: 6}}>เลือกตัวเลือกที่ต้องการใช้งาน</span>
      </div>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: 16, marginTop: 4}}>
        {/* ประเภทภาษา */}
        <div style={{display:'flex', alignItems:'center', gap:6}}>
          <select style={{padding:'7px 18px', borderRadius:4, border:'1px solid #444', background:'#232323', color:'#fff', fontWeight:600, minWidth:140}} value={filter.type} onChange={e=>setFilter(f => ({...f, type: e.target.value}))}>
            <option value="original">ภาษาต้นฉบับ</option>
            <option value="audio">เสียงพากย์</option>
            <option value="subtitle">คำบรรยาย</option>
          </select>
        </div>
        {/* ภาษา */}
        <div style={{display:'flex', alignItems:'center', gap:6}}>
          <select style={{padding:'7px 18px', borderRadius:4, border:'1px solid #444', background:'#232323', color:'#fff', minWidth:180}} value={filter.language} onChange={e=>setFilter(f => ({...f, language: e.target.value}))}>
            <option value="en">อังกฤษ</option>
            <option value="ko">เกาหลี</option>
            <option value="zh">จีนกลาง</option>
            <option value="ja">ญี่ปุ่น</option>
            <option value="de">เยอรมัน</option>
            <option value="es">สเปน</option>
            <option value="fr">ฝรั่งเศส</option>
            <option value="it">อิตาลี</option>
            <option value="ru">รัสเซีย</option>
            <option value="pt">โปรตุเกส</option>
            <option value="nl">ดัตช์</option>
            <option value="sv">สวีเดน</option>
            <option value="fi">ฟินแลนด์</option>
            <option value="pl">โปแลนด์</option>
            <option value="tr">ตุรกี</option>
            <option value="th">ไทย</option>
            <option value="ms">มาเลย์</option>
            <option value="id">อินโดนีเซีย</option>
            <option value="vi">เวียดนาม</option>
            <option value="ar">อาหรับ</option>
            <option value="he">ฮิบรู</option>
            <option value="hi">ฮินดี</option>
            <option value="ta">ทมิฬ</option>
            <option value="te">เตลูกู</option>
            <option value="bn">เบงกาลี</option>
            <option value="uk">ยูเครน</option>
            <option value="cs">เช็ก</option>
            <option value="hu">ฮังการี</option>
            <option value="el">กรีก</option>
            <option value="da">เดนมาร์ก</option>
            <option value="no">นอร์เวย์</option>
            <option value="ro">โรมาเนีย</option>
            <option value="bg">บัลแกเรีย</option>
            <option value="hr">โครเอเชีย</option>
            <option value="sk">สโลวัก</option>
            <option value="sl">สโลวีเนีย</option>
            <option value="et">เอสโตเนีย</option>
            <option value="lt">ลิทัวเนีย</option>
            <option value="lv">ลัตเวีย</option>
            <option value="sr">เซอร์เบีย</option>
            <option value="ca">คาตาลัน</option>
            <option value="fa">เปอร์เซีย</option>
            <option value="ur">อูรดู</option>
            <option value="sw">สวาฮีลี</option>
            <option value="zu">ซูลู</option>
          </select>
        </div>
        {/* เรียงตาม */}
        <div style={{display:'flex', alignItems:'center', gap:6}}>
          <span style={{color:'#fff', fontWeight:500, fontSize:'1rem'}}>เรียงตาม</span>
          <select style={{padding:'7px 18px', borderRadius:4, border:'1px solid #444', background:'#232323', color:'#fff', minWidth:160}} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recommend">เนื้อหาแนะนำสำหรับคุณ</option>
            <option value="year">ปีเปิดตัว</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
