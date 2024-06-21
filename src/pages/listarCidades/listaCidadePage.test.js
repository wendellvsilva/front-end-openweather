import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import ListarCidadePage from '.';

jest.mock('axios');

describe('ListarCidadePage', () => {
    beforeEach(() => {
        axios.get.mockClear();
        axios.get.mockResolvedValue({
            data: {
                content: [
                    {
                        id: 4,
                        cidade: 'TESTE VALORES 40 RECIFE',
                        clima: {
                            data: '2024-06-30',
                            umidade: '40',
                            precipitacao: '40',
                            velVento: '40',
                            tempMaxima: '49',
                            tempMinima: '40',
                            situacaoClima: 'NUBLADO',
                            turno: 'NOITE',
                        },
                    },
                ],
            },
        });
    });

    test('Renderização inicial', async () => {
        render(
            <Router>
                <ListarCidadePage />
            </Router>
        );
        expect(screen.getByText('Lista de Dados Meteorológicos')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite a cidade')).toBeInTheDocument();
    });

    test('Deve preencher o campo', async () => {
        render(
            <Router>
                <ListarCidadePage />
            </Router>
        );
        const input = screen.getByPlaceholderText('Digite a cidade');
        expect(input).toBeInTheDocument();
    });

    test('Buscar cidade e verificar textos', async () => {
        render(
            <Router>
                <ListarCidadePage />
            </Router>
        );
        const inputCidadeListar = screen.getByPlaceholderText('Digite a cidade');
        fireEvent.change(inputCidadeListar, { target: { value: 'TESTE VALORES 40 RECIFE' } });
        fireEvent.keyDown(inputCidadeListar, { key: 'Enter', code: 'Enter' });

        expect(await screen.findByText('TESTE VALORES 40 RECIFE')).toBeInTheDocument();
        expect(await screen.findByText('Máx 49º/Min 40º')).toBeInTheDocument();
        expect(await screen.findByText('NUBLADO')).toBeInTheDocument();
        expect(await screen.findByText('NOITE')).toBeInTheDocument();
    });

    test('Não deve exibir "Editar" e "Excluir" quando a cidade não for encontrada', async () => {
        axios.get.mockResolvedValueOnce({
            data: { content: [] }
        });

        render(
            <Router>
                <ListarCidadePage />
            </Router>
        );

        const inputCidadeListar = screen.getByPlaceholderText('Digite a cidade');
        fireEvent.change(inputCidadeListar, { target: { value: 'Cidade Vazia' } });
        fireEvent.keyDown(inputCidadeListar, { key: 'Enter', code: 'Enter' });

        expect(inputCidadeListar.value).toBe('Cidade Vazia');
        expect(await screen.queryByText('Excluir')).not.toBeInTheDocument();
        expect(await screen.queryByText('Editar')).not.toBeInTheDocument();
    });

    test('Excluir cidade', async () => {
        render(
            <Router>
                <ListarCidadePage />
            </Router>
        );

        const inputCidadeListar = screen.getByPlaceholderText('Digite a cidade');
        fireEvent.change(inputCidadeListar, { target: { value: 'TESTE VALORES 40 RECIFE' } });
        fireEvent.keyDown(inputCidadeListar, { key: 'Enter', code: 'Enter' });

        const excluirLink = await screen.findByText('Excluir');
        axios.delete.mockResolvedValueOnce({});
        fireEvent.click(excluirLink);

        await waitFor(() => {
            expect(screen.queryByText('TESTE VALORES 40 RECIFE')).not.toBeInTheDocument();
        });
    });

    test('Editar cidade', async () => {
        render(
            <Router>
                <ListarCidadePage />
            </Router>
        );

        const inputCidadeListar = screen.getByPlaceholderText('Digite a cidade');
        fireEvent.change(inputCidadeListar, { target: { value: 'TESTE VALORES 40 RECIFE' } });
        fireEvent.keyDown(inputCidadeListar, { key: 'Enter', code: 'Enter' });

        const editarLink = await screen.findByText('Editar');
        expect(editarLink).toBeInTheDocument();
        fireEvent.click(editarLink);
        expect(window.location.pathname).toBe('/editar/4');
    });
});
