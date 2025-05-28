import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { searchMovies } from '../../api/tmdb';

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'th-TH');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownRef = useRef();
  const langMenuRef = useRef();
  const navigate = useNavigate();

  const langLabel =
    lang === 'th-TH' ? 'ไทย' :
    lang === 'en-US' ? 'English' :
    lang === 'ja-JP' ? '日本語' :
    lang === 'ko-KR' ? '한국어' : 'เลือกดูตามภาษา';

  function handleLangChange(newLang) {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    setShowLangDropdown(false);
    window.location.reload();
  }

  function toggleLangDropdown(e) {
    setShowLangDropdown(v => !v);
  }

  // ปิด dropdown เมื่อคลิกนอกเมนู
  useEffect(() => {
    function handleClick(e) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setShowLangDropdown(false);
      }
    }
    if (showLangDropdown) {
      window.addEventListener('mousedown', handleClick);
    } else {
      window.removeEventListener('mousedown', handleClick);
    }
    return () => window.removeEventListener('mousedown', handleClick);
  }, [showLangDropdown]);


  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
    setUserEmail(localStorage.getItem('email') || '');
    function syncLogin() {
      setLoggedIn(!!localStorage.getItem('token'));
      setUserEmail(localStorage.getItem('email') || '');
    }
    window.addEventListener('storage', syncLogin);
    return () => window.removeEventListener('storage', syncLogin);
  }, []);

  useEffect(() => {
    if (!search) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await searchMovies(search);
        setResults(
          (res.results || []).filter(item => item.media_type === 'movie' || item.title).slice(0, 7).map(item => ({
            id: item.id,
            type: item.media_type || (item.title ? 'movie' : 'tv'),
            name: item.title || item.name,
            poster: item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : '',
          }))
        );
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  function handleProfileMenuProfile() {
    navigate('/profile');
    setShowProfileMenu(false);
  }
  function handleProfileMenuLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setLoggedIn(false);
    setUserEmail('');
    setShowProfileMenu(false);
    navigate('/login');
  }
  // mock profileName
  useEffect(() => {
    if (!localStorage.getItem('profileName')) {
      localStorage.setItem('profileName', 'pui');
    }
  }, []);

  function handleSelectResult(item) {
    setSearch('');
    setShowDropdown(false);
    navigate(`/detail/${item.type}/${item.id}`);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>NETFLIX</Link>
        <button
          className={styles.menuToggle}
          aria-label="เปิดเมนู"
          onClick={() => setShowMobileMenu(v => !v)}
        >
          {showMobileMenu ? '✕' : '≡'}
        </button>

        <div style={{display:'flex',alignItems:'center',flex:1,minWidth:0}}>
          <ul className={styles.menu + (showMobileMenu ? ' ' + styles.menuOpen : '')}>
            <li onClick={() => setShowMobileMenu(false)}>
              <Link to="/">หน้าหลัก</Link>
            </li>
            <li onClick={() => setShowMobileMenu(false)}>
              <Link to="/tv">รายการทีวี</Link>
            </li>
            <li onClick={() => setShowMobileMenu(false)}>
              <Link to="/movies">ภาพยนตร์</Link>
            </li>
            <li onClick={() => setShowMobileMenu(false)}>
              <Link to="/trending">มาใหม่และกำลังฮิต</Link>
            </li>
            <li onClick={() => setShowMobileMenu(false)}>
              <Link to="/mylist">รายการของฉัน</Link>
            </li>
            <li className={styles.menuItem} onClick={() => setShowMobileMenu(false)}>
              <Link to="/filter-language" style={{cursor:'pointer', color:'#fff', padding:'6px 18px', borderRadius:4, textDecoration:'none', fontWeight:500}}>
                เลือกดูตามภาษา
              </Link>
            </li>
          </ul>
          <div className={styles.searchWrap}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="ค้นหาหนัง..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => search && setShowDropdown(true)}
              aria-label="ค้นหาหนังหรือซีรีส์"
            />
            {showDropdown && (
              <div className={styles.dropdown} ref={dropdownRef}>
                {loading && <div className={styles.dropdownItem}>กำลังค้นหา...</div>}
                {!loading && results.length === 0 && (
                  <div className={styles.dropdownItem}>ไม่พบผลลัพธ์</div>
                )}
                {results.map(item => (
                  <div
                    key={item.id + '-' + item.type}
                    className={styles.dropdownItem}
                    onMouseDown={() => handleSelectResult(item)}
                    style={{display:'flex',alignItems:'center',cursor:'pointer'}}
                  >
                    {item.poster && <img src={item.poster} alt={item.name} style={{width:32,height:48,objectFit:'cover',marginRight:12,borderRadius:4}} />}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className={styles.profileWrap}
            style={{marginLeft:'16px', position:'relative', display:'flex', alignItems:'center'}}
            onMouseEnter={() => { if (loggedIn) { clearTimeout(window.__profileDropdownTimer); setShowProfileMenu(true); } }}
            onMouseLeave={() => { if (loggedIn) { window.__profileDropdownTimer = setTimeout(() => setShowProfileMenu(false), 180); } }}
          >
            {loggedIn ? (
              <>
                <button
                  className={styles.profile}
                  style={{background:'transparent',border:'none',padding:0,display:'flex',alignItems:'center',cursor:'pointer'}}
                  title={userEmail || 'โปรไฟล์'}
                  aria-label={userEmail || 'โปรไฟล์'}
                  tabIndex={0}
                  type="button"
                  onClick={() => setShowProfileMenu(v => !v)}
                >
                  <img src="https://occ-0-2164-2163.1.nflxso.net/dnm/api/v6/WvGSDX7b2C3m5h0jK9bQ4FQd0kE/AAAABZ9Q2u8v4vFZk8QkWwX9Q3Uq3z1ZgJd4e3Y5Zc9Ff3h3U2c8O3Pq6Q4t6Q.png?r=1d9" alt="avatar" style={{width:38,height:38,borderRadius:'8px',objectFit:'cover',background:'#222',marginRight:0}} />
                  <span style={{fontSize:18, color:'#fff',verticalAlign:'middle',marginLeft:8}}>{showProfileMenu ? '▲' : '▼'}</span>
                </button>
                {showProfileMenu && (
                  <div
                    className={styles.profileDropdown}
                    style={{right:0, left:'auto', minWidth:220, background:'#181818', borderRadius:8, boxShadow:'0 4px 24px rgba(0,0,0,0.22)', padding:'8px 0', position:'absolute', top:'48px', zIndex:10, border:'none'}}
                  >
                    <div style={{display:'flex',alignItems:'center',padding:'10px 18px 6px 18px'}}>
                      <img src="https://occ-0-2164-2163.1.nflxso.net/dnm/api/v6/WvGSDX7b2C3m5h0jK9bQ4FQd0kE/AAAABZ9Q2u8v4vFZk8QkWwX9Q3Uq3z1ZgJd4e3Y5Zc9Ff3h3U2c8O3Pq6Q4t6Q.png?r=1d9" alt="avatar" style={{width:32,height:32,borderRadius:'6px',objectFit:'cover',background:'#222',marginRight:10}} />
                      <span style={{color:'#fff',fontWeight:500,fontSize:'1.01rem'}}>{localStorage.getItem('profileName') || 'pui'}</span>
                    </div>
                    <div style={{padding:'8px 18px', color:'#fff',display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:20}}>✏️</span> จัดการโปรไฟล์</div>
                    <div style={{padding:'8px 18px', color:'#fff',display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:20}}>👤</span> บัญชี</div>
                    <div style={{padding:'8px 18px', color:'#fff',display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:20}}>❓</span> ศูนย์ช่วยเหลือ</div>
                    <div style={{borderTop:'1px solid #333',margin:'6px 0 0 0'}} />
                    <div style={{padding:'10px 18px 8px 18px', color:'#fff',fontWeight:600,display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={handleProfileMenuLogout}><span style={{fontSize:20,color:'#e50914'}}>⎋</span> ออกจากระบบของ Netflix</div>
                  </div>
                )}
              </> 
            ) : (
              <button
                className={styles.profile}
                style={{background:'transparent',border:'none',padding:0,display:'flex',alignItems:'center',cursor:'pointer'}}
                title="เข้าสู่ระบบ"
                aria-label="เข้าสู่ระบบ"
                tabIndex={0}
                type="button"
                onClick={() => navigate('/login')}
              >
                <span className={styles.profileIcon} role="img" aria-label="login">🔑</span>
                <span style={{color:'#fff',fontWeight:500,marginLeft:8}}>เข้าสู่ระบบ</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
