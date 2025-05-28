// TMDB API utility
const API_KEY = '6f31fcb6d847395c2c940094a879205f'; // <--- ใส่ API KEY ที่นี่
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(endpoint) {
  let lang = 'th-TH';
  try {
    if (typeof window !== 'undefined') {
      lang = localStorage.getItem('lang') || 'th-TH';
    }
  } catch {}
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${lang}`);
  if (!res.ok) throw new Error('Failed to fetch TMDB');
  return res.json();
}

export async function fetchTrending() {
  return fetchMovies('/trending/all/week');
}

export async function fetchTopRated() {
  return fetchMovies('/movie/top_rated');
}

export async function fetchById(type, id) {
  // รองรับการเปลี่ยนภาษา (อ่านจาก localStorage)
  let lang = 'th-TH';
  try {
    if (typeof window !== 'undefined') {
      lang = localStorage.getItem('lang') || 'th-TH';
    }
  } catch {}
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=${lang}`);
  if (!res.ok) throw new Error('Failed to fetch detail');
  return res.json();
}

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search');
  return res.json();
}
