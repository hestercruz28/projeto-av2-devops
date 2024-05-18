import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './componentes/Header';
import Inicio from './pages/Inicio';
import Preenchimento from './pages/Preenchimento';


function App() {

  return (
    <div>
      <BrowserRouter>
          <Header useNavigate={useNavigate} />
              <Routes>
                  <Route path="/" element={<Inicio useNavigate={useNavigate} />} />
                  <Route path="/preenchimento" element={<Preenchimento useNavigate={useNavigate} />} />
              </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
