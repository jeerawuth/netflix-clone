import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Movies from './pages/Movies';
import Tv from './pages/Tv';
import Trending from './pages/Trending';
import MyList from './pages/MyList';
import FilterByLanguage from './pages/FilterByLanguage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:type/:id" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/mylist" element={<MyList />} />
      <Route path="/filter-language" element={<FilterByLanguage />} />
    </Routes>
  );
}

export default App;
