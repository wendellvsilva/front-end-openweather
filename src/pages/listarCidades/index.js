import React, { useState, useEffect } from 'react';
import axios from 'axios';    
import style from "./index.module.css";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Input, Table, Tag } from 'antd';
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
                    temperatura: `Máx ${item.clima.tempMaxima}º/Min ${item.clima.tempMinima}º`,
                    clima: item.clima.situacaoClima,
                    turno: item.clima.turno,
                    
                }));
                setData(cidades);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar a cidade:", error);
                setData([]);
            });
    };

    const renderTags = (turno) => {
        let color;
        let backgroundColor;
        switch (turno) {
            case 'MANHÃ':
                color = '#FAAD14';
                backgroundColor = '#FFFBE6';
                break;
            case 'TARDE':
                color = '#FA541C';
                backgroundColor = '#FFF2E8';
                break;
            case 'NOITE':
                color = '#722ED1';
                backgroundColor = '#F9F0FF';
                break;
            default:
                color = '#000000';
                backgroundColor = '#FFFFFF';
        }
        return (
            <Tag
                key={turno}
                style={{ color: color, backgroundColor: backgroundColor }}
            >
                {turno.toUpperCase()}
            </Tag>
        );
    };

    const deletarCidade = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/cidades/${id}`);
            console.log("APAGOU!");
            
            setData(data.filter(item => item.key !== id));
        } catch (error) {
            console.error("ERRO AO APAGAR:", error);
        }
    };

    const columns = [
        { title: 'Data', dataIndex: 'data', key: 'data' },
        { title: 'Cidade', dataIndex: 'cidade', key: 'cidade' },
        { title: 'Temperatura', dataIndex: 'temperatura', key: 'temperatura' },
        { title: 'Clima', dataIndex: 'clima', key: 'clima' },
        { title: 'Turno', dataIndex: 'turno', key: 'turno', render: (turno) => renderTags(turno) },
        {
            dataIndex: '',
            key: 'edit',
            render: (text, record) => (
                <Link to={`/editar/${record.key}`} className={style.txt_table_action}>Editar</Link>
            )},
        {
            dataIndex: '',
            key: 'x',
            render: (text, record) => <a onClick={() => deletarCidade(record.key)} className={style.txt_table_action} >Excluir</a>,
        },
    ];

    const descricao = [
        { title: 'Precipitação', dataIndex: 'precipitacao', key: 'precipitacao', render: (value) => `${value}mm` },
        { title: 'Umidade', dataIndex: 'umidade', key: 'umidade', render: (value) => `${value}%` },
        { title: 'Velocidade do vento', dataIndex: 'velVento', key: 'velVento', render: (value) => `${value}km/h` },
    
    ]
    useEffect(() => {
        axios.get('http://localhost:8080/cidades')
            .then(response => {
                const formattedData = response.data.content.map(item => ({
                    key: item.id,
                    data: format(new Date(item.clima.data), 'dd/MM/yyyy'),
                    cidade: item.cidade,
                    temperatura: `Máx ${item.clima.tempMaxima}º/Min ${item.clima.tempMinima}º`,
                    clima: item.clima.situacaoClima,
                    turno: item.clima.turno,
                    description: (
                        <Table
                            columns={descricao}
                            dataSource={[{ umidade: item.clima.umidade, precipitacao: item.clima.precipitacao, velVento: item.clima.velVento }]}
                           
                            
                        />
                    )
                }));
                setData(formattedData);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os dados:", error);
            });
    }, []);

    return (
        <>
            <h1 className={style.h1}>Lista de Dados Meteorológicos</h1>
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
                        data-testid="input_busca_listar"
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