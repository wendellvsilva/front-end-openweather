import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Header } from './componentes/Header';
import { CadastroCidadePage } from './pages/cadastroCidades';
import ListarCidadePage from './pages/listarCidades';
import { EditarCidadePage } from './pages/editarCidades';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <ul>
            <li><Link to="/">Cadastro</Link></li>
            <li><Link to="/listar">Listar</Link></li>
          </ul>
        </nav>
        <div style={{ marginTop: '20px', marginLeft: '80px' }}>
          <Routes>
            <Route path="/" element={<CadastroCidadePage />} />
            <Route path="/listar" element={<ListarCidadePage />} />
            <Route path="/editar/:id" element={<EditarCidadePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;