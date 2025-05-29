import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !pass) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    // mock: บันทึก token ใน localStorage
    localStorage.setItem('token', 'mocktoken');
    localStorage.setItem('email', email);
    setTimeout(() => navigate('/'), 300); // redirect to home page after login
  }

  return (
    <div className={styles.container}>
      {/* BG mosaic */}
      <div className={styles.bgMosaic}>
        {/* mock poster url array */}
        {Array.from({length: 12}).map((_, rowIdx) => (
          <div key={rowIdx} className={styles.bgRow}>
            {Array.from({length: 12}).map((_, colIdx) => {
              // poster pool
              const posters = [
                '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
                '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
                '/6KErczPBROQty7QoIsaa6wJYXZi.jpg',
                '/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg',
                '/hTExot1sfn7dHZjGrk0Aiwpntxt.jpg',
                '/aJn9XeesqsrSLKcHfHP4u5985hn.jpg',
                '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
                '/riYInlsq2kf1AWoGm80JQW5dLKp.jpg',
                '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
                '/hTExot1sfn7dHZjGrk0Aiwpntxt.jpg',
                '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
                '/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg',
              ];
              const poster = posters[(rowIdx * 10 + colIdx) % posters.length];
              return (
                <img
                  key={colIdx}
                  src={`https://image.tmdb.org/t/p/w500${poster}`}
                  alt="poster"
                  className={styles.bgImg}
                />
              );
            })}
          </div>
        ))}
        {/* overlay */}
        <div className={styles.bgOverlay} />
      </div>
      <div className={styles.centerWrap}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
        <h2 className={styles.heading}>{mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</h2>
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={pass}
          onChange={e=>setPass(e.target.value)}
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button}>
          {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
        </button>
        <div className={styles.switchText}>
          {mode === 'login' ? (
            <>ยังไม่มีบัญชี? <span className={styles.switchLink} onClick={()=>setMode('register')}>สมัครสมาชิก</span></>
          ) : (
            <>มีบัญชีแล้ว? <span className={styles.switchLink} onClick={()=>setMode('login')}>เข้าสู่ระบบ</span></>
          )}
        </div>
      </form>
    </div>
  </div>
  );
}
