import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { CadastroCidadePage } from '.';
import '@testing-library/jest-dom';


jest.mock('axios');
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

describe('CadastroCidadePage', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });


  describe('Componente de busca de cidades', () => {
    it('Deve preencher o campo', () => {
      render(<CadastroCidadePage />);

      const input = screen.getByPlaceholderText('Digite a cidade');
      fireEvent.change(input, { target: { value: 'São Paulo' } });

      expect(input.value).toBe('São Paulo');
    });
  });

  describe('Componente de seleção de data', () => {
    it('Deve selecionar a data corretamente', () => {
      render(<CadastroCidadePage />);

      const datePicker = screen.getByPlaceholderText('Selecione a data');
      fireEvent.change(datePicker, { target: { value: '2024/05/20' } });

      expect(datePicker.value).toBe('2024/05/20');
    });
  });



  



  describe('Componente de informação do clima', () => {
   

    it('Deve preencher a precipitação corretamente', () => {
      const { getByTestId } = render(<CadastroCidadePage />);

      const inputUmidade = getByTestId('input_precipitacao')
      fireEvent.change(inputUmidade, { target: { value: '1' } });

      expect(inputUmidade.value).toBe('1mm');
    });

    it('Deve preencher a umidade corretamente', () => {
      const { getByTestId } = render(<CadastroCidadePage />);

      const inputUmidade = getByTestId('input_umidade')
      fireEvent.change(inputUmidade, { target: { value: '60' } });

      expect(inputUmidade.value).toBe('60%');
    });

    it('Deve preencher a velocidade do vento corretamente', () => {
      const { getByTestId } = render(<CadastroCidadePage />);

      const inputVento = getByTestId('input_vento');
      fireEvent.change(inputVento, { target: { value: '15' } });

      expect(inputVento.value).toBe('15km/h');
    });
  });

  it('renderiza os elementos do formulário corretamente', () => {
    render(<CadastroCidadePage />);
    screen.debug();
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


  it('mostra mensagem de erro quando campos obrigatórios não são preenchidos', async () => {
    render(<CadastroCidadePage />);

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(screen.getByText('Por favor, preencha todos os campos obrigatórios antes de salvar.')).toBeInTheDocument();
    });
  });
});
