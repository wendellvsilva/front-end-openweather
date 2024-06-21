import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { EditarCidadePage } from './EditarCidadePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '2', 
  }),
}));

test('preenche formulário e submete com sucesso', async () => {
  const { getByPlaceholderText, getByText } = render(<EditarCidadePage />);


  fireEvent.change(getByPlaceholderText('Digite a cidade'), { target: { value: 'Nova Cidade' } });
  fireEvent.change(getByPlaceholderText('Selecione a data'), { target: { value: '01/01/2023' } });
  fireEvent.change(getByPlaceholderText('Informe a temperatura máxima'), { target: { value: '30ºC' } });
  fireEvent.change(getByPlaceholderText('Informe a temperatura mínima'), { target: { value: '20ºC' } });
  fireEvent.click(getByText('MANHÃ'));
  fireEvent.change(getByText('ENSOLARADO'));
  fireEvent.change(getByPlaceholderText('Informe a precipitação'), { target: { value: '10mm' } });
  fireEvent.change(getByPlaceholderText('Informe a umidade'), { target: { value: '50%' } });
  fireEvent.change(getByPlaceholderText('Informe a velocidade do vento'), { target: { value: '15km/h' } });

  fireEvent.click(getByText('Salvar'));


  await waitFor(() => expect(getByText('SUCESSO')).toBeInTheDocument());
});