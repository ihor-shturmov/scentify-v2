import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '../components/header';
import { Home } from '../pages/home';
import { PerfumeDetail } from '../pages/perfume-detail';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';

export function App() {
  const location = useLocation();

  // Don't show header on auth pages
  const hideHeader = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fragrances" element={<Home />} />
        <Route path="/fragrances/:id" element={<PerfumeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
