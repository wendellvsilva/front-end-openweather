import { Header } from './componentes/Header';
import React from 'react';
import { CadastroCidadePage } from './pages/cadastroCidades';

function App() {
  return (
    <div className="App">
     <Header/>
     <div style={{ marginTop: '20px', marginLeft:'80px' }}>
       <CadastroCidadePage/>
       
     </div>

    </div>
  );
}

export default App;