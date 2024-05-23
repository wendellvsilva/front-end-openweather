import React, { useState } from 'react';
import { Input, Breadcrumb, Select, Space, InputNumber } from 'antd';
import style from './index.module.css';

const { Search } = Input;

const onChange = (value) => {
    console.log('changed', value);
};

export function CadastroCidadePage() {
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
                <div className={style.informe_temperatura}>
                    <p className={style.texto_informe_temperatura}>Informe a temperatura</p>
                    <div className={style.txt_maxima_minima}>
                        <p>Máxima*</p>
                        <p className={style.txt_minima}>Mínima*</p>
                    </div>
                    <div className={style.alinhar_teste}>
                        <InputNumber />
                        <InputNumber />
                    </div>
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
                            <InputNumber />
                        </div>
                        <div className={style.umidade}>
                            <p>Umidade*</p>
                            <InputNumber
                            />
                        </div>
                        <div>
                            <p>Velocidade do vento*</p>
                            <InputNumber />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}