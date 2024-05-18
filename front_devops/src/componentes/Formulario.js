import { useState } from 'react'
import CampoTexto from './CampoTexto'
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Formulario = ({step, setStep, dataEditar}) => {

    const flagEditar = dataEditar === null ? false : true;

    const [nome, setNome] = useState(flagEditar ? dataEditar.name : '');
    const [cargo, setCargo] = useState(flagEditar ? dataEditar.cargo : '');
    const [areaInteresse, setAreaInteresse] = useState(flagEditar ? dataEditar.areaInteresse : '');


    const criarNovoUsuario = async () => {
        try {
            const response = await axios.post('http://localhost:3001/criarUsers', {
            name: nome,
            cargo: cargo,
            areaInteresse: areaInteresse
            });

            if(response?.data?.result > 0) {
                alert("Registrado com sucesso!");
                setStep(1);
            }
        } catch (error) {
            console.error('Erro ao criar novo usuário:', error);
        }
    };

    const atualizarUsuario = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/atualizarUsers/${dataEditar._id}`, {
            name: nome,
            cargo: cargo,
            areaInteresse: areaInteresse
            });
            
            if(response?.data?.result > 0) {
            alert("Atualizado com sucesso!");
            setStep(1);
        }

        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    //FUNCTIONS
    const onClickNavigateVoltar = () => { setStep(1); }

    return (
        <div className="App">
            <section className="formulario">
                <form>
                    <h2 className='text1'>Preencha informações abaixo</h2>
                    <CampoTexto 
                        obrigatorio={true}
                        label="Nome"
                        placeholder="Digite seu nome" 
                        valor={nome}
                        aoAlterado={valor => setNome(valor)}
                    />
                    <CampoTexto
                        obrigatorio={true}
                        label="Cargo"
                        placeholder="Digite seu cargo" 
                        valor={cargo}
                        aoAlterado={valor => setCargo(valor)}
                    />

                    <CampoTexto
                        obrigatorio={true}
                        label="Área de Interesse"
                        placeholder="Digite a Área de Interesse" 
                        valor={areaInteresse}
                        aoAlterado={valor => setAreaInteresse(valor)}
                    />
                    
                    <div className="d-flex">
                        <div className="p-1">
                            <Button variant="danger" onClick={onClickNavigateVoltar}>Voltar</Button>
                        </div>
                        <div className="p-1">
                            <Button onClick={flagEditar ? atualizarUsuario : criarNovoUsuario} variant="success">{flagEditar ? 'Atualizar' : 'Registrar'}</Button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Formulario