import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomDropdown.module.css';

export default function CustomDropdown({ options, value, onChange, className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className={styles.dropdown}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen(o => !o)}
        tabIndex={0}
      >
        {selected.label}
      </button>
      {open && (
        <ul className={styles.menu}>
          {options.map(opt => (
            <li
              key={opt.value}
              className={value === opt.value ? styles.active : ''}
              onClick={() => { setOpen(false); onChange(opt.value); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
