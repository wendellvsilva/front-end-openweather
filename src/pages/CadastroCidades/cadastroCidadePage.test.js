import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { CadastroCidadePage } from '.';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('CadastroCidadePage', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  it('renderiza os elementos do formulário corretamente', () => {
    render(<CadastroCidadePage />);

    expect(screen.getByText('Cadastro de dados meteorológicos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite a cidade')).toBeInTheDocument();
    expect(screen.getByText('Selecione a data')).toBeInTheDocument();
    expect(screen.getByText('Máxima*')).toBeInTheDocument();
    expect(screen.getByText('Mínima*')).toBeInTheDocument();
    expect(screen.getByText('Clima*')).toBeInTheDocument();
    expect(screen.getByText('Precipitação*')).toBeInTheDocument();
    expect(screen.getByText('Umidade*')).toBeInTheDocument();
    expect(screen.getByText('Velocidade do vento*')).toBeInTheDocument();
  });

  it('submete o formulário com todos os campos preenchidos', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    render(<CadastroCidadePage />);

    // Preenche todos os campos do formulário
    fireEvent.change(screen.getByPlaceholderText('Digite a cidade'), { target: { value: 'São Paulo' } });
    fireEvent.change(screen.getByPlaceholderText('Selecione a data'), { target: { value: '2024/05/20' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a umidade'), { target: { value: '60' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a precipitação'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a temperatura máxima'), { target: { value: '30' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a temperatura mínima'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a velocidade do vento'), { target: { value: '15' } });
    fireEvent.change(screen.getByPlaceholderText('Selecione o clima'), { target: { value: 'ENSOLARADO' } });
    fireEvent.click(screen.getByLabelText('MANHÃ'));

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/cidades',
        {
          cidade: 'São Paulo',
          clima: {
            data: '20/05/2024',
            umidade: '60',
            precipitacao: '20',
            velVento: '15',
            tempMaxima: '30',
            tempMinima: '20',
            situacaoClima: 'ENSOLARADO',
            turno: 'MANHÃ',
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );
    });

    expect(screen.getByText('Sucesso!')).toBeInTheDocument();
  });

  it('mostra mensagem de erro quando campos obrigatórios não são preenchidos', async () => {
    render(<CadastroCidadePage />);

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(screen.getByText('Por favor, preencha todos os campos obrigatórios antes de salvar.')).toBeInTheDocument();
    });
  });

  it('mostra mensagem de erro quando a requisição falha', async () => {
    axios.post.mockRejectedValueOnce(new Error('Erro na requisição'));

    render(<CadastroCidadePage />);
    fireEvent.change(screen.getByPlaceholderText('Digite a cidade'), { target: { value: 'São Paulo' } });
    fireEvent.change(screen.getByPlaceholderText('Selecione a data'), { target: { value: '2024/05/20' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a umidade'), { target: { value: '60' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a precipitação'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a temperatura máxima'), { target: { value: '30' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a temperatura mínima'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Digite a velocidade do vento'), { target: { value: '15' } });
    fireEvent.change(screen.getByPlaceholderText('Selecione o clima'), { target: { value: 'ENSOLARADO' } });
    fireEvent.click(screen.getByLabelText('MANHÃ'));

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/cidades',
        {
          cidade: 'São Paulo',
          clima: {
            data: '20/05/2024',
            umidade: '60',
            precipitacao: '20',
            velVento: '15',
            tempMaxima: '30',
            tempMinima: '20',
            situacaoClima: 'ENSOLARADO',
            turno: 'MANHÃ',
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );
    });

   
    expect(screen.getByText('Erro na requisição')).toBeInTheDocument();
  });
});