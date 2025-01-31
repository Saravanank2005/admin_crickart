import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Navigate to="/admin/listproduct" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
