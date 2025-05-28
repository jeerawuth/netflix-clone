import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{position:'relative',minHeight:'100dvh',width:'100vw',overflow:'hidden'}}>
      {/* BG mosaic */}
      <div style={{
        position: 'fixed',
        left: '-30vw',
        top: '-30vh',
        zIndex: -2,
        width: '160vw',
        height: '160vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transform: 'perspective(1200px) rotateY(-18deg)',
        transition: 'transform 0.7s cubic-bezier(.5,1.5,.5,1)',
      }}>
        {/* mock poster url array */}
        {Array.from({length: 12}).map((_, rowIdx) => (
          <div key={rowIdx} style={{display: 'flex', flexDirection: 'row', width: '160vw', height: '13.34vh', flexWrap: 'nowrap'}}>
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
                  style={{
                    width: '13.34vw',
                    height: '13.34vh',
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                    opacity: 0.88,
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    display: 'block',
                  }}
                />
              );
            })}
          </div>
        ))}
        {/* overlay */}
        <div style={{position:'fixed',left:0,top:0,right:0,bottom:0,background:'rgba(0,0,0,0.58)',zIndex:1, pointerEvents:'none'}} />
      </div>
      <div style={{
        minHeight:'100dvh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:80,
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            background:'#222',
            padding:32,
            borderRadius:8,
            width:'100%',
            maxWidth:380,
            boxShadow:'0 4px 24px rgba(0,0,0,0.22)',
            zIndex:2,
            position:'relative',
            color:'#fff',
          }}
        >
        <h2 style={{color:'#e50914',marginBottom:24}}>{mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</h2>
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={{width:'100%',padding:10,marginBottom:12,borderRadius:4,border:'none'}}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={pass}
          onChange={e=>setPass(e.target.value)}
          style={{width:'100%',padding:10,marginBottom:12,borderRadius:4,border:'none'}}
        />
        {error && <div style={{color:'#e50914',marginBottom:12}}>{error}</div>}
        <button type="submit" style={{width:'100%',padding:10,background:'#e50914',color:'#fff',border:'none',borderRadius:4,marginBottom:12}}>
          {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
        </button>
        <div style={{color:'#fff',textAlign:'center'}}>
          {mode === 'login' ? (
            <>ยังไม่มีบัญชี? <span style={{color:'#e50914',cursor:'pointer'}} onClick={()=>setMode('register')}>สมัครสมาชิก</span></>
          ) : (
            <>มีบัญชีแล้ว? <span style={{color:'#e50914',cursor:'pointer'}} onClick={()=>setMode('login')}>เข้าสู่ระบบ</span></>
          )}
        </div>
      </form>
    </div>
  </div>
  );
}
