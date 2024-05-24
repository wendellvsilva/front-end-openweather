import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Input, Breadcrumb, Select, Space, InputNumber, DatePicker, Radio, Button, message } from 'antd';
import style from './index.module.css';

const { Search } = Input;

export function CadastroCidadePage() {
    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const plainOptions = ['MANHÃ', 'TARDE', 'NOITE'];

    const onSubmit = async (data) => {
        try {
            const payload = {
                cidade: data.cidade,
                clima: {
                    data: data.data.format("DD/MM/YYYY HH:mm:ss"),
                    umidade: data.umidade.toString(),
                    precipitacao: data.precipitacao.toString(),
                    temperatura: data.temperaturaMaxima.toString(),
                    velVento: data.vento.toString(),
                    tempMaxima: data.temperaturaMaxima.toString(),
                    tempMinima: data.temperaturaMinima.toString(),
                    situacaoClima: data.clima,
                    turno: data.turno,
                }
            };

            const response = await axios.post('http://localhost:8080/cidades', payload);
            if (response.status === 201) {
                message.success('Cidade cadastrada com sucesso!');
                reset();
            }
        } catch (error) {
            message.error('Erro ao cadastrar cidade!');
            console.error('Erro ao cadastrar cidade:', error);
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
            <form onSubmit={handleSubmit(onSubmit)} className={style.busca_cidades_data}>
                <div className={style.busca_cidades}>
                    <p className={style.txt_buscar_cidades}>Buscar a cidade</p>
                    <br />
                    <p className={style.txt_cidade_obrigatoria}>Cidade*</p>
                    <Controller
                        name="cidade"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Search
                                placeholder="Digite a cidade"
                                {...field}
                                className={`${style.barra_pesquisa} ${errors.cidade && style.error}`}
                            />
                        )}
                    />
                </div>
                <div className={style.selecione_data}>
                    <p className={style.txt_selecione_data}>Selecione a data</p>
                    <p className={style.txt_data}>Data*</p>
                    <Space direction="vertical">
                        <Controller
                            name="data"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    className={errors.data && style.error}
                                />
                            )}
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
                        <Controller
                            name="temperaturaMaxima"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    className={`${style.inputNumber} ${errors.temperaturaMaxima && style.error}`}
                                    formatter={(value) => `${value}ºC`}
                                    parser={(value) => value?.replace('ºC', '')}
                                />
                            )}
                        />
                        <Controller
                            name="temperaturaMinima"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    className={`${style.inputNumber} ${errors.temperaturaMinima && style.error}`}
                                    formatter={(value) => `${value}ºC`}
                                    parser={(value) => value?.replace('ºC', '')}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={style.turno}>
                    <p className={style.texto_select_turno}>Selecione o turno</p>
                    <p className={style.texto_turno}>Turno*</p>
                    <Controller
                        name="turno"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Radio.Group
                                {...field}
                                className={`${style.radio} ${errors.turno && style.error}`}
                                options={plainOptions}
                                optionType="button"
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        )}
                    />
                </div>
                <div className={style.informe_clima}>
                    <p className={style.texto_informe_temperatura}>Informe o clima</p>
                    <div className={style.campos_clima}>
                        <div className={style.clima_enum}>
                            <p>Clima*</p>
                            <Space wrap>
                                <Controller
                                    name="clima"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            className={`${style.selectInput} ${errors.clima && style.error}`}
                                            defaultValue="ensolarado"
                                            options={[
                                                { value: 'ENSOLARADO', label: 'ENSOLARADO' },
                                                { value: 'CHUVOSO', label: 'CHUVOSO' },
                                                { value: 'NUBLADO', label: 'NUBLADO' },
                                            ]}
                                        />
                                    )}
                                />
                            </Space>
                        </div>
                        <div className={style.precipitacao}>
                            <p>Precipitação*</p>
                            <Controller
                                name="precipitacao"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        className={`${style.inputNumber} ${errors.precipitacao && style.error}`}
                                        formatter={(value) => `${value}mm`}
                                        parser={(value) => value?.replace('mm', '')}
                                    />
                                )}
                            />
                        </div>
                        <div className={style.umidade}>
                            <p>Umidade*</p>
                            <Controller
                                name="umidade"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        className={`${style.inputNumber} ${errors.umidade && style.error}`}
                                        formatter={(value) => `${value}%`}
                                        parser={(value) => value?.replace('%', '')}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <p>Velocidade do vento*</p>
                            <Controller
                                name="vento"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        className={`${style.inputNumber} ${errors.vento && style.error}`}
                                        formatter={(value) => `${value}km/h`}
                                        parser={(value) => value?.replace('km/h', '')}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <Button type="primary" htmlType="submit">
                    Salvar
                </Button>
            </form>
        </main>
    );
}