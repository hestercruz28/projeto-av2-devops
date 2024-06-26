import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function TableList({step, setStep, setDataEditar}) {

  const [dataUsers, setDataUsers] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:3001/registros')
      .then((response) => {
        setDataUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  
  //FUNCTIONS
  const onClickNavigateFormulario = () => { setDataEditar(null);setStep(2); }

  const excluirUsuario = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/excluir/${userId}`);
      
      if(response?.data?.result > 0) {
        alert("Excluído com sucesso!");

        // Atualize o state dataUsers após a exclusão
        setDataUsers((prevDataUsers) => prevDataUsers.filter(user => user.codigo_registro !== userId));

      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <div className="margin-top-header d-flex justify-content-center align-items-center">
      <Card style={{ width: '50%' }}>
        <Card.Body>
          <Card.Title>
            <Button variant="success" onClick={onClickNavigateFormulario}>Cadastrar</Button>
          </Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Área de interesse</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {dataUsers.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.cargo}</td>
                    <td>{data.area_interesse}</td>
                    <td><Button variant="primary" onClick={() => {setDataEditar(data);setStep(2);}}>Editar</Button> <Button variant="danger" onClick={() => {excluirUsuario(data.codigo_registro);}}>Excluir</Button></td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TableList;