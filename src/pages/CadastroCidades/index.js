import React, { useState } from 'react';
import { Input, Breadcrumb, Select, Space, InputNumber, DatePicker, Radio } from 'antd';
import style from './index.module.css';

const { Search } = Input;

const onDateChange = (date, dateString) => {
    console.log(date, dateString);
};

export function CadastroCidadePage() {
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const plainOptions = ['MANHÃ', 'TARDE', 'NOITE'];
    const [turno, setTurno] = useState('MANHÃ');

    const onTurnoChange = ({ target: { value } }) => {
        console.log('Turno selecionado:', value);
        setTurno(value);
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
            <div className={style.busca_cidades_data}>
                <div className={style.busca_cidades}>
                    <p className={style.txt_buscar_cidades}>Buscar a cidade</p>
                    <br />
                    <p className={style.txt_cidade_obrigatoria}>Cidade*</p>
                    <Search
                        placeholder="Digite a cidade"
                        onSearch={onSearch}
                        className={style.barra_pesquisa}
                    />
                </div>
                <div className={style.selecione_data}>
                    <p className={style.txt_selecione_data}>Selecione a data</p>
                    <p className={style.txt_data}>Data*</p>
                    <Space direction="vertical">
                        <DatePicker onChange={onDateChange} />
                    </Space>
                </div>
                <div className={style.informe_temperatura}>
                    <p className={style.texto_informe_temperatura}>Informe a temperatura</p>
                    <div className={style.txt_maxima_minima}>
                        <p>Máxima*</p>
                        <p className={style.txt_minima}>Mínima*</p>
                    </div>
                    <div className={style.alinhar_teste}>
                        <InputNumber
                            formatter={(value) => `${value}ºC`}
                            parser={(value) => value?.replace('ºC', '')} />
                        <InputNumber
                            formatter={(value) => `${value}ºC`}
                            parser={(value) => value?.replace('ºC', '')} />
                    </div>
                </div>
                <div className={style.turno}>
                    <p className={style.texto_select_turno}>Selecione o turno</p>
                    <p className={style.texto_turno}>Turno*</p>
                    <Radio.Group
                        options={plainOptions}
                        onChange={onTurnoChange}
                        value={turno}
                        optionType="button"
                    />
                </div>
                <div className={style.informe_clima}>
                    <p className={style.texto_informe_temperatura}>Informe o clima</p>
                    <div className={style.campos_clima}>
                        <div className={style.clima_enum}>
                            <p>Clima*</p>
                            <Space wrap>
                                <Select
                                    defaultValue="ensolarado"
                                    className={style.selectInput}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'ensolarado', label: 'Ensolarado' },
                                        { value: 'chuvoso', label: 'Chuvoso' },
                                        { value: 'nublado', label: 'Nublado' },
                                    ]}
                                />
                            </Space>
                        </div>
                        <div className={style.precipitacao}>
                            <p>Precipitação*</p>
                            <InputNumber
                                formatter={(value) => `${value}mm`}
                                parser={(value) => value?.replace('mm', '')} />
                        </div>
                        <div className={style.umidade}>
                            <p>Umidade*</p>
                            <InputNumber
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '')} />
                        </div>
                        <div>
                            <p>Velocidade do vento*</p>
                            <InputNumber
                                formatter={(value) => `${value}km/h`}
                                parser={(value) => value?.replace('km/h', '')} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}