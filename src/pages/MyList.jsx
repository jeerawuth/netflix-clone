import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './MyList.module.css';
import Row from '../components/Row/Row';

export default function MyList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('mylist');
    setItems(saved ? JSON.parse(saved) : []);
  }, []);

  // ฟังก์ชัน callback สำหรับอัปเดต state เมื่อ Row มีการเปลี่ยนแปลง mylist
  const handleMyListChange = (newList) => {
    setItems(newList);
    localStorage.setItem('mylist', JSON.stringify(newList));
  };

  return (
    <div className={styles.myListContainer}>
      <Navbar />
      <div className={styles.myListContent}>
        <h2 className={styles.heading}>รายการของฉัน</h2>
        {items.length === 0 ? (
          <div className={styles.status}>
            ยังไม่มีรายการที่คุณบันทึกไว้
          </div>
        ) : (
          <Row title="" movies={items} onMyListChange={handleMyListChange} />
        )}
      </div>
    </div>
  );
}
