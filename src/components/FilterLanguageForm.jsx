import React from 'react';
import CustomDropdown from './CustomDropdown';
import styles from './FilterLanguageForm.module.css';

export default function FilterLanguageForm({ filter, setFilter, sort, setSort }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>เลือกดูตามภาษา</span>
        <span className={styles.subtitle}>เลือกตัวเลือกที่ต้องการใช้งาน</span>
      </div>
      <div className={styles.row}>
        {/* ประเภทภาษา */}
        <div className={styles.group}>
          <CustomDropdown
            className={styles.select}
            options={[
              { value: 'original', label: 'ภาษาต้นฉบับ' },
              { value: 'audio', label: 'เสียงพากย์' },
              { value: 'subtitle', label: 'คำบรรยาย' },
            ]}
            value={filter.type}
            onChange={val => setFilter(f => ({ ...f, type: val }))}
          />
        </div>
        {/* ภาษา */}
        <div className={styles.group}>
          <CustomDropdown
            className={`${styles.select} ${styles.lang}`}
            options={[
              { value: 'en', label: 'อังกฤษ' },
              { value: 'ko', label: 'เกาหลี' },
              { value: 'zh', label: 'จีนกลาง' },
              { value: 'ja', label: 'ญี่ปุ่น' },
              { value: 'de', label: 'เยอรมัน' },
              { value: 'es', label: 'สเปน' },
              { value: 'fr', label: 'ฝรั่งเศส' },
              { value: 'it', label: 'อิตาลี' },
              { value: 'ru', label: 'รัสเซีย' },
              { value: 'pt', label: 'โปรตุเกส' },
              { value: 'nl', label: 'ดัตช์' },
              { value: 'sv', label: 'สวีเดน' },
              { value: 'fi', label: 'ฟินแลนด์' },
              { value: 'pl', label: 'โปแลนด์' },
              { value: 'tr', label: 'ตุรกี' },
              { value: 'th', label: 'ไทย' },
              { value: 'ms', label: 'มาเลย์' },
              { value: 'id', label: 'อินโดนีเซีย' },
              { value: 'vi', label: 'เวียดนาม' },
              { value: 'ar', label: 'อาหรับ' },
              { value: 'he', label: 'ฮิบรู' },
              { value: 'hi', label: 'ฮินดี' },
              { value: 'ta', label: 'ทมิฬ' },
              { value: 'te', label: 'เตลูกู' },
              { value: 'bn', label: 'เบงกาลี' },
              { value: 'uk', label: 'ยูเครน' },
              { value: 'cs', label: 'เช็ก' },
              { value: 'hu', label: 'ฮังการี' },
              { value: 'el', label: 'กรีก' },
              { value: 'da', label: 'เดนมาร์ก' },
              { value: 'no', label: 'นอร์เวย์' },
              { value: 'ro', label: 'โรมาเนีย' },
              { value: 'bg', label: 'บัลแกเรีย' },
              { value: 'hr', label: 'โครเอเชีย' },
              { value: 'sk', label: 'สโลวัก' },
              { value: 'sl', label: 'สโลวีเนีย' },
              { value: 'et', label: 'เอสโตเนีย' },
              { value: 'lt', label: 'ลิทัวเนีย' },
              { value: 'lv', label: 'ลัตเวีย' },
              { value: 'sr', label: 'เซอร์เบีย' },
              { value: 'ca', label: 'คาตาลัน' },
              { value: 'fa', label: 'เปอร์เซีย' },
              { value: 'ur', label: 'อูรดู' },
              { value: 'sw', label: 'สวาฮีลี' },
              { value: 'zu', label: 'ซูลู' },
            ]}
            value={filter.language}
            onChange={val => setFilter(f => ({ ...f, language: val }))}
          />
        </div>
        {/* เรียงตาม */}
        <div className={styles.group}>
          <span className={styles.label}>เรียงตาม</span>
          <CustomDropdown
            className={`${styles.select} ${styles.sort}`}
            options={[
              { value: 'recommend', label: 'เนื้อหาแนะนำสำหรับคุณ' },
              { value: 'year', label: 'ปีเปิดตัว' },
              { value: 'az', label: 'A-Z' },
              { value: 'za', label: 'Z-A' },
            ]}
            value={sort}
            onChange={val => setSort(val)}
          />
        </div>
      </div>
    </div>
  );
}
