import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const em = localStorage.getItem('email');
    if (!token || !em) {
      navigate('/login');
    } else {
      setEmail(em);
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  }

  return (
    <div style={{color:'#fff',padding:40}}>
      <h2>โปรไฟล์</h2>
      <div style={{margin:'24px 0'}}>อีเมล: <b>{email}</b></div>
      <button onClick={logout} style={{padding:'10px 28px',background:'#e50914',color:'#fff',border:'none',borderRadius:4}}>ออกจากระบบ</button>
    </div>
  );
}
