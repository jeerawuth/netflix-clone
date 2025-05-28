import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from '../pages/Home/Home.module.css';
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
    <div className={styles.home} style={{background:'#181818', minHeight:'100vh', width:'100vw', position:'relative'}}>
      <Navbar />
      <div style={{maxWidth:1280, margin:'0 auto', paddingTop:100, paddingBottom:60}}>
        <h2 style={{color:'#fff', margin:'80px 0 18px', textAlign:'left'}}>รายการของฉัน</h2>
        {items.length === 0 ? (
          <div style={{color:'#fff', padding:40}}>ยังไม่มีรายการที่คุณบันทึกไว้</div>
        ) : (
          <Row title="" movies={items} onMyListChange={handleMyListChange} />
        )}
      </div>
    </div>
  );
}
