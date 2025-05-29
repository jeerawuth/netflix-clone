import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import Navbar from '../../components/Navbar/Navbar';
import profileImages from './profile-images';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [selectedImg, setSelectedImg] = useState(localStorage.getItem('profileImage') || profileImages[0]);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const em = localStorage.getItem('email');
    if (!token || !em) {
      navigate('/login');
    } else {
      setEmail(em);
    }
    // โหลดรูปโปรไฟล์จาก localStorage ถ้ามี
    const savedImg = localStorage.getItem('profileImage');
    if (savedImg && profileImages.includes(savedImg)) {
      setSelectedImg(savedImg);
    } else {
      setSelectedImg(profileImages[0]);
    }
  }, [navigate]);

  function selectProfile(img) {
    setSelectedImg(img);
    localStorage.setItem('profileImage', img);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  }

  return (
    <div className={styles.profileContainer}>
      <Navbar />
      <div className={styles.profileContent}>
        <h2 className={styles.heading}>โปรไฟล์</h2>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom: 32}}>
          <img src={selectedImg} alt="profile" style={{width:90, height:90, borderRadius:'50%', marginBottom:16, border:'3px solid #e50914', background:'#222'}} />
          <button type="button" onClick={()=>setShowEdit(v=>!v)} style={{marginBottom: showEdit ? 12 : 0, background:'#222', color:'#fff', border:'1.5px solid #e50914', borderRadius:6, padding:'6px 18px', cursor:'pointer', fontWeight:500}}>
            {showEdit ? 'ปิดการแก้ไขรูปภาพ' : 'แก้ไขรูปภาพ'}
          </button>
          {showEdit && (
            <div className={styles.profileImageScroll}>
              {profileImages.map(img => (
                <img
                  key={img}
                  src={img}
                  alt="profile-option"
                  onClick={()=>selectProfile(img)}
                  className={styles.profileImageOption + (img===selectedImg ? ' ' + styles.selected : '')}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.email}>อีเมล: <b>{email}</b></div>
        <button onClick={logout} className={styles.logoutBtn}>ออกจากระบบ</button>
      </div>
    </div>
  );
}
