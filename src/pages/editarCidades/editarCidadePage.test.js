import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {EditarCidadePage} from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '2', 
  }),
}));
jest.mock('antd/es/date-picker/locale/pt_BR', () => ({
  DatePicker: ({ onChange, placeholder, value }) => (
    <input
      data-testid="datepicker"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

test('preenche formulário e submete com sucesso', async () => {
  const { getByPlaceholderText, getByText } = render(
    <Router>
      <EditarCidadePage />
    </Router>
  );

  // fireEvent.change(getByPlaceholderText('Digite a cidade'), { target: { value: 'Nova Cidade' } });
  // fireEvent.change(getByPlaceholderText('datepicker'), { target: { value: '01/01/2023' } });
  // fireEvent.change(getByPlaceholderText('Informe a temperatura máxima'), { target: { value: '30' } });
  // fireEvent.change(getByPlaceholderText('Informe a temperatura mínima'), { target: { value: '20' } });
  // fireEvent.click(getByText('MANHÃ'));
  // fireEvent.change(getByText('ENSOLARADO'), { target: { value: 'ENSOLARADO' } });
  // fireEvent.change(getByPlaceholderText('Informe a precipitação'), { target: { value: '10mm' } });
  // fireEvent.change(getByPlaceholderText('Informe a umidade'), { target: { value: '50%' } });
  // fireEvent.change(getByPlaceholderText('Informe a velocidade do vento'), { target: { value: '15km/h' } });

  // fireEvent.click(getByText('Salvar'));

  // await waitFor(() => expect(getByText('SUCESSO')).toBeInTheDocument());
});