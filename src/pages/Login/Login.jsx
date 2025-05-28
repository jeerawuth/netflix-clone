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
      {/* BG image */}
      <div style={{
        position:'fixed',
        inset:0,
        zIndex:-1,
        width:'100vw',
        height:'100dvh',
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/9e8d7b4c-5a7b-4e8d-ae7b-0e6b8c4b7a7a/2e7e8f3e-9e4e-4e2c-bd3f-0e3e2e2c6e16/TH-th-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        filter:'brightness(0.6) blur(1px)',
        transition:'all 0.3s',
      }} />
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
