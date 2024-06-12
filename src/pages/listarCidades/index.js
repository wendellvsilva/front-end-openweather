import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from "./index.module.css";
import classNames from 'classnames';
import { Input, Table } from 'antd';
import { format } from 'date-fns';

const ListarCidadePage = () => {
    const [cidade, setCidade] = useState('');
    const [data, setData] = useState([]);
    const { Search } = Input;

    const handleSubmit = (value) => {
        axios.get(`http://localhost:8080/cidades/buscar?nome=${value}`)
            .then(response => {
                const cidades = response.data.content.map(item => ({
                    key: item.id,
                    data: format(new Date(item.clima.data), 'dd/MM/yyyy'),
                    cidade: item.cidade,
                    temperatura: item.clima.temperatura,
                    clima: item.clima.situacaoClima,
                    turno: item.clima.turno,
                    description: `Umidade: ${item.clima.umidade}, Precipitação: ${item.clima.precipitacao}, Velocidade do Vento: ${item.clima.velVento}, Temperatura Máxima: ${item.clima.tempMaxima}, Temperatura Mínima: ${item.clima.tempMinima}`
                }));
                setData(cidades);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar a cidade:", error);
                setData([]);
            });
    };

    const columns = [
        { title: 'Data', dataIndex: 'data', key: 'data' },
        { title: 'Cidade', dataIndex: 'cidade', key: 'cidade' },
        { title: 'Temperatura', dataIndex: 'temperatura', key: 'temperatura' },
        { title: 'Clima', dataIndex: 'clima', key: 'clima' },
        { title: 'Turno', dataIndex: 'turno', key: 'turno' },
        {
            dataIndex: '',
            key: 'z',
            render: () => <a>Editar</a>,
        },
        {
            dataIndex: '',
            key: 'x',
            render: () => <a>Excluir</a>,
        },
    ];

    useEffect(() => {
        axios.get('http://localhost:8080/cidades')
            .then(response => {
                const formattedData = response.data.content.map(item => ({
                    key: item.id,
                    data: format(new Date(item.clima.data), 'dd/MM/yyyy'),
                    cidade: item.cidade,
                    temperatura: item.clima.temperatura,
                    clima: item.clima.situacaoClima,
                    turno: item.clima.turno,
                    description: `Umidade: ${item.clima.umidade}, Precipitação: ${item.clima.precipitacao}, Velocidade do Vento: ${item.clima.velVento}, Temperatura Máxima: ${item.clima.tempMaxima}, Temperatura Mínima: ${item.clima.tempMinima}`
                }));
                setData(formattedData);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os dados:", error);
            });
    }, []);

    return (
        <>
            <h1 className={style.h1}>Cadastro de dados meteorológicos</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(cidade); }} className={style.busca_cidades_data}>
                <div className={style.busca_cidades}>
                    <p className={style.txt_buscar_cidades}>Buscar a cidade</p>
                    <br />
                    <p className={style.txt_cidade_obrigatoria}>Cidade*</p>
                    <Search
                        placeholder="Digite a cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        onSearch={handleSubmit}
                        className={classNames(style.barra_listar)}
                        style={{ width: '466px' }}
                    />
                </div>
            </form>
            <Table 
                columns={columns} 
                dataSource={data} 
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => record.cidade !== 'Not Expandable',
                }}
            />
        </>
    );
};

export default ListarCidadePage;