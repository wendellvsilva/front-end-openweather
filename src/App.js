import { Header } from './componentes/Header';
import React from 'react';
// import { CadastroCidadePage } from './pages/cadastroCidades';
import  ListarCidadePage from './pages/listarCidades';

function App() {
  return (
    <div className="App">
     <Header/>
     <div style={{ marginTop: '20px', marginLeft:'80px' }}>
       
       <ListarCidadePage/>
     </div>

    </div>
  );
}

export default App;