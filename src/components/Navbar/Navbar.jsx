import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { searchMovies } from '../../api/tmdb';

export default function Navbar() {
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
  function handleProfile() {
    if (!loggedIn) navigate('/login');
  }

  function handleSelectResult(item) {
    setSearch('');
    setShowDropdown(false);
    navigate(`/detail/${item.type}/${item.id}`);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>NETFLIX</Link>
        <div style={{display:'flex',alignItems:'center',flex:1,minWidth:0}}>
          <ul className={styles.menu}>
            <li>
              <Link to="/">หน้าหลัก</Link>
            </li>
            <li>
              <Link to="/tv">รายการทีวี</Link>
            </li>
            <li>
              <Link to="/movies">ภาพยนตร์</Link>
            </li>
            <li>
              <Link to="/trending">มาใหม่และกำลังฮิต</Link>
            </li>
            <li>
              <Link to="/mylist">รายการของฉัน</Link>
            </li>
            <li className={styles.menuItem}>
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
            onMouseEnter={() => { if (loggedIn) { clearTimeout(window.__profileDropdownTimer); setShowProfileMenu(true); } }}
            onMouseLeave={() => { if (loggedIn) { window.__profileDropdownTimer = setTimeout(() => setShowProfileMenu(false), 180); } }}
          >
            <button
              className={styles.profile}
              title={loggedIn ? 'โปรไฟล์' : 'เข้าสู่ระบบ'}
              aria-label={loggedIn ? 'โปรไฟล์' : 'เข้าสู่ระบบ'}
              tabIndex={0}
              type="button"
              onClick={() => { if (!loggedIn) navigate('/login'); }}
            >
              {loggedIn ? (
                <span className={styles.profileIcon} role="img" aria-label="profile">👤</span>
              ) : (
                <span className={styles.profileIcon} role="img" aria-label="login">🔑</span>
              )}
            </button>
            {loggedIn && showProfileMenu && (
              <div
                className={styles.profileDropdown}
                onMouseEnter={() => { clearTimeout(window.__profileDropdownTimer); setShowProfileMenu(true); }}
                onMouseLeave={() => { window.__profileDropdownTimer = setTimeout(() => setShowProfileMenu(false), 180); }}
              >
                <div className={styles.profileName}>{userEmail}</div>
                <button className={styles.profileDropdownItem} onClick={handleProfileMenuProfile} tabIndex={0} type="button">โปรไฟล์</button>
                <button className={styles.profileDropdownItem} onClick={handleProfileMenuLogout} tabIndex={0} type="button">ออกจากระบบ</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
