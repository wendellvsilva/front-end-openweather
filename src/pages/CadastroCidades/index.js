import React, { useState } from 'react';
import axios from 'axios';
import { Input, Breadcrumb, Select, Space, InputNumber, DatePicker, Radio, Button, message } from 'antd';
import style from './index.module.css';

const { Search } = Input;

export function CadastroCidadePage() {
    const [cidade, setCidade] = useState('');
    const [data, setData] = useState('');
    const [umidade, setUmidade] = useState('');
    const [precipitacao, setPrecipitacao] = useState('');
    const [temperaturaMaxima, setTemperaturaMaxima] = useState('');
    const [temperaturaMinima, setTemperaturaMinima] = useState('');
    const [clima, setClima] = useState('ENSOLARADO');
    const [vento, setVento] = useState('');
    const [turno, setTurno] = useState('MANHÃ');

    const opcoesTurno = ['MANHÃ', 'TARDE', 'NOITE'];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const dados = {
                cidade: cidade,
                clima: {
                    data: data?.format('YYYY-MM-DD'),
                    umidade: umidade,
                    precipitacao: precipitacao,
                    temperatura: temperaturaMaxima,
                    velVento: vento,
                    tempMaxima: temperaturaMaxima,
                    tempMinima: temperaturaMinima,
                    situacaoClima: clima,
                    turno: turno,
                }
            };

            const resposta = await axios.post('http://localhost:8080/cidades', dados, {
                headers:{
                    "Content-Type": 'application.json'
                }
            });
            if (resposta.status === 201) {
                message.success('Sucesso!');
                setCidade('');
                setData(null);
                setUmidade('');
                setPrecipitacao('');
                setTemperaturaMaxima('');
                setTemperaturaMinima('');
                setClima('ENSOLARADO');
                setVento('');
                setTurno('MANHÃ');
            }
        } catch (erro) {
            message.error('Erro!');
            console.error('Erro:', erro);
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
                        className={`${style.barra_pesquisa}`}
                    />
                </div>
                <div className={style.selecione_data}>
                    <p className={style.txt_selecione_data}>Selecione a data</p>
                    <p className={style.txt_data}>Data*</p>
                    <Space direction="vertical">
                        <DatePicker
                            value={data}
                            onChange={(date) => setData(date)}
                        />
                    </Space>
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
                            className={`${style.inputNumber}`}
                            formatter={(value) => `${value}ºC`}
                            parser={(value) => value?.replace('ºC', '')}
                        />
                        <InputNumber
                            value={temperaturaMinima}
                            onChange={(value) => setTemperaturaMinima(value)}
                            className={`${style.inputNumber}`}
                            formatter={(value) => `${value}ºC`}
                            parser={(value) => value?.replace('ºC', '')}
                        />
                    </div>
                </div>
                <div className={style.turno}>
                    <p className={style.texto_select_turno}>Selecione o turno</p>
                    <p className={style.texto_turno}>Turno*</p>
                    <Radio.Group
                        value={turno}
                        onChange={(e) => setTurno(e.target.value)}
                        className={style.radio}
                    >
                        {opcoesTurno.map((opcao) => (
                            <Radio.Button key={opcao} value={opcao}>{opcao}</Radio.Button>
                        ))}
                    </Radio.Group>
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
                                    className={style.selectInput}
                                >
                                    {['ENSOLARADO', 'CHUVOSO', 'NUBLADO'].map((opcao) => (
                                        <Select.Option key={opcao} value={opcao}>{opcao}</Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </div>
                        <div className={style.precipitacao}>
                            <p>Precipitação*</p>
                            <InputNumber
                                value={precipitacao}
                                onChange={(value) => setPrecipitacao(value)}
                                className={style.inputNumber}
                                formatter={(value) => `${value}mm`}
                                parser={(value) => value?.replace('mm', '')}
                            />
                        </div>
                        <div className={style.umidade}>
                            <p>Umidade*</p>
                            <InputNumber
                                value={umidade}
                                onChange={(value) => setUmidade(value)}
                                className={style.inputNumber}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '')}
                            />
                        </div>
                        <div>
                            <p>Velocidade do vento*</p>
                            <InputNumber
                                value={vento}
                                onChange={(value) => setVento(value)}
                                className={style.inputNumber}
                                formatter={(value) => `${value}km/h`}
                                parser={(value) => value?.replace('km/h', '')}
                            />
                        </div>
                    </div>
                    <div className={style.botoes_salvar_cancelar}>
                        <Button className={style.botao_salvar} type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    );
}