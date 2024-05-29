import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { CadastroCidadePage } from '..'; 
import '@testing-library/jest-dom';

jest.mock('axios');

describe('CadastroCidadePage', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  it('renderiza os elementos do formulário corretamente', () => {
  
    render(<CadastroCidadePage />);
    const heading = screen.getByText('Cadastro de dados meteorológicos');
    expect(screen.getByText('Digite a cidade')).toBeInTheDocument();
    // expect(screen.getByText('Selecione a data')).toBeInTheDocument();
    // expect(screen.getByText('Máxima*')).toBeInTheDocument();
    // expect(screen.getByText('Mínima*')).toBeInTheDocument();
    // expect(screen.getByText('Clima*')).toBeInTheDocument();
    // expect(screen.getByText('Precipitação*')).toBeInTheDocument();
    // expect(screen.getByText('Umidade*')).toBeInTheDocument();
    // expect(screen.getByText('Velocidade do vento*')).toBeInTheDocument();
  });
});

      
