import React, { useState } from 'react';
import axios from 'axios';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { Input, Breadcrumb, Select, Space, InputNumber, DatePicker, Radio, Button, message } from 'antd';
import classNames from 'classnames';
import style from './index.module.css';

const { Search } = Input;

export function CadastroCidadePage() {
    const [cidade, setCidade] = useState('');
    const [data, setData] = useState('');
    const [umidade, setUmidade] = useState('');
    const [precipitacao, setPrecipitacao] = useState('');
    const [temperaturaMaxima, setTemperaturaMaxima] = useState('');
    const [temperaturaMinima, setTemperaturaMinima] = useState('');
    const [clima, setClima] = useState('');
    const [vento, setVento] = useState('');
    const [turno, setTurno] = useState('');

    const [errors, setErrors] = useState({});

    const options = [
        { label: 'MANHÃ', value: 'MANHÃ' },
        { label: 'TARDE', value: 'TARDE' },
        { label: 'NOITE', value: 'NOITE' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const erro = {};
        if (!cidade) erro.cidade = true;
        if (!data) erro.data = true;
        if (!umidade) erro.umidade = true;
        if (!precipitacao) erro.precipitacao = true;
        if (!temperaturaMaxima) erro.temperaturaMaxima = true;
        if (!temperaturaMinima) erro.temperaturaMinima = true;
        if (!clima) erro.clima = true;
        if (!vento) erro.vento = true;
        if (!turno) erro.turno = true;

        if (Object.keys(erro).length > 0) {
            setErrors(erro);
            return;
        }

        try {
            const dados = {
                cidade: cidade,
                clima: {
                    data: data?.format('DD/MM/YYYY'),
                    umidade: umidade,
                    precipitacao: precipitacao,
                    temperatura: temperaturaMaxima,
                    velVento: vento,
                    tempMaxima: temperaturaMaxima,
                    tempMinima: temperaturaMinima,
                    situacaoClima: clima,
                    turno: turno,
                },
            };

            const resposta = await axios.post('http://localhost:8080/cidades', dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (resposta.status === 201) {
                message.success('Sucesso!');
                setCidade('');
                setData(null);
                setUmidade('');
                setPrecipitacao('');
                setTemperaturaMaxima('');
                setTemperaturaMinima('');
                setClima('');
                setVento('');
                setTurno('');
                setErrors({});
            }
        } catch (erro) {
            message.error({
                content: 'Erro!',
            });
        }
    };

    return (
        <main className={style.classe_cidade}>
            <Breadcrumb
                items={[
                    { title: 'Inicial' },
                    { title: <a href="https://db.tec.br/">Cadastro de cidades</a> },
                ]}
            />
            <h1>Cadastro de dados meteorológicos</h1>
            <form onSubmit={handleSubmit} className={style.busca_cidades_data}>
                <div className={style.busca_cidades}>
                    <p className={style.txt_buscar_cidades}>Buscar a cidade</p>
                    <br />
                    <p className={style.txt_cidade_obrigatoria}>Cidade*</p>
                    <Search
                        placeholder="Digite a cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className={classNames(style.barra_pesquisa, { [style.erro_borda]: errors.cidade })}
                        style={{ width: '466px' }}
                    />
                    {errors.cidade && <p className={style.erro_texto}>Informe a cidade.</p>}
                </div>
                <div className={style.selecione_data}>
                    <p className={style.txt_selecione_data}>Selecione a data</p>
                    <p className={style.txt_data}>Data*</p>
                    <Space direction="vertical">
                        <DatePicker
                            locale={locale}
                            format="DD/MM/YYYY"
                            placeholder="Selecione a data"
                            value={data}
                            onChange={(date) => setData(date)}
                            className={classNames({ [style.erro_borda]: errors.data })}
                            style={{ width: '200px' }}
                        />
                    </Space>
                    {errors.data && <p className={style.erro_texto}>Informe a data.</p>}
                </div>
                <div className={style.informe_temperatura}>
                    <p className={style.texto_informe_temperatura}>Informe a temperatura</p>
                    <div className={style.txt_maxima_minima}>
                        <p>Máxima*</p>
                        <p className={style.txt_minima}>Mínima*</p>
                    </div>
                    <div className={style.input_temperatura}>
                        <InputNumber
                            value={temperaturaMaxima}
                            onChange={(value) => setTemperaturaMaxima(value)}
                            className={classNames(style.inputNumber, { [style.erro_borda]: errors.temperaturaMaxima })}
                            formatter={(value) => `${value}ºC`}
                            parser={(value) => value?.replace('ºC', '')}
                        />
                        <InputNumber
                            value={temperaturaMinima}
                            onChange={(value) => setTemperaturaMinima(value)}
                            className={classNames(style.inputNumber, { [style.erro_borda]: errors.temperaturaMinima })}
                            formatter={(value) => `${value}ºC`}
                            parser={(value) => value?.replace('ºC', '')}
                        />
                    </div>
                    {errors.temperaturaMaxima && <p className={style.erro_texto}>Por favor, informe a temperatura máxima.</p>}
                    {errors.temperaturaMinima && <p className={style.erro_texto}>Por favor, informe a temperatura mínima.</p>}
                </div>
                <div className={style.turno}>
                    <p className={style.texto_select_turno}>Selecione o turno</p>
                    <p className={style.texto_turno}>Turno*</p>
                    <Radio.Group
                        options={options}
                        value={turno}
                        optionType="button"
                        className={classNames(style.radioGroup, { [style.erro_borda_radio]: errors.turno })}
                        onChange={(e) => setTurno(e.target.value)}
                    />
                    {errors.turno && <p className={style.erro_texto}>Selecione um turno.</p>}
                </div>
                <div className={style.informe_clima}>
                    <p className={style.texto_informe_temperatura}>Informe o clima</p>
                    <div className={style.campos_clima}>
                        <div className={style.clima_enum}>
                            <p>Clima*</p>
                            <Space wrap>
                                <Select
                                    value={clima}
                                    onChange={(value) => setClima(value)}
                                    className={classNames(style.selectInput, { [style.erro_borda]: errors.clima })}
                                >
                                    {['ENSOLARADO', 'CHUVOSO', 'NUBLADO'].map((opcao) => (
                                        <Select.Option key={opcao} value={opcao}>
                                            {opcao}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                            {errors.clima && <p className={style.erro_texto}>Informe o clima.</p>}
                        </div>
                        <div className={style.precipitacao}>
                            <p className={style.txt_precipitacao}>Precipitação*</p>
                            <InputNumber
                                value={precipitacao}
                                onChange={(value) => setPrecipitacao(value)}
                                className={classNames(style.inputNumber, { [style.erro_borda]: errors.precipitacao })}
                                formatter={(value) => `${value}mm`}
                                parser={(value) => value?.replace('mm', '')}
                            />
                            {errors.precipitacao && <p className={style.erro_texto}>Informe a precipitação.</p>}
                        </div>
                        <div className={style.umidade}>
                            <p>Umidade*</p>
                            <InputNumber
                                value={umidade}
                                onChange={(value) => setUmidade(value)}
                                className={classNames(style.inputNumber, { [style.erro_borda]: errors.umidade })}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '')}
                            />
                            {errors.umidade && <p className={style.erro_texto}>Informe a umidade.</p>}
                        </div>
                        <div>
                            <p>Velocidade do vento*</p>
                            <InputNumber
                                value={vento}
                                onChange={(value) => setVento(value)}
                                className={classNames(style.inputNumber, { [style.erro_borda]: errors.vento })}
                                formatter={(value) => `${value}km/h`}
                                parser={(value) => value?.replace('km/h', '')}
                            />
                            {errors.vento && <p className={style.erro_texto}>Informe a velocidade do vento.</p>}
                        </div>
                    </div>
                    <div className={style.botoes_salvar_cancelar}>
                        <Button className={style.botao_cancelar} type="default" htmlType="button">
                            Cancelar
                        </Button>
                        <Button className={style.botao_salvar} type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    );
}