import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ListarCidadePage from '.';

jest.mock('axios');

describe('ListarCidadePage', () => {
    beforeEach(() => {
        axios.get.mockClear();
        axios.get.mockResolvedValue({
            data: {
                content: [
                    {
                        id: 10,
                        cidade: 'Belo Horizonte',
                        clima: {
                            data: '2024-06-17',
                            umidade: '1',
                            precipitacao: '1',
                            temperatura: null,
                            velVento: '1',
                            tempMaxima: '1',
                            tempMinima: '1',
                            situacaoClima: 'ENSOLARADO',
                            turno: 'MANHÃ',
                        },
                    },
                ],
            },
        });
    });

    test('Verificar os textos', async () => {
        render(<ListarCidadePage />);
        expect(await screen.findByText('Lista de Dados Meteorológicos')).toBeInTheDocument();
        expect(await screen.findByText('Belo Horizonte')).toBeInTheDocument();
        expect(await screen.findByText('Máx 1º/Min 1º')).toBeInTheDocument();
        expect(await screen.findByText('ENSOLARADO')).toBeInTheDocument();
        expect(await screen.findByText('MANHÃ')).toBeInTheDocument();
    });

    test('Deve preencher o campo', async () => {
        render(<ListarCidadePage />);
        const input = screen.getByPlaceholderText('Digite a cidade');
        expect(input).toBeInTheDocument();
    });

    test('Não deve exibir "Editar" e "Excluir" quando a cidade não for encontrada', async () => {
      

        render(<ListarCidadePage />);
        const inputCidadeListar = screen.getByTestId('input_busca_listar');
        fireEvent.change(inputCidadeListar, { target: { value: 'Cidade Vazia' } });
        fireEvent.keyDown(inputCidadeListar, { key: 'Enter', code: 'Enter' });

        expect(inputCidadeListar.value).toBe('Cidade Vazia');
        expect(await screen.queryByText('Temperatura')).toBeInTheDocument();
        expect(await screen.queryByText('Excluir')).not.toBeInTheDocument();
        expect(await screen.queryByText('Editar')).not.toBeInTheDocument();
    });
});