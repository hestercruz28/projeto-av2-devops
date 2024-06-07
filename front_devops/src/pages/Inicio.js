import React from "react";
import { Card } from 'react-bootstrap';
import Banner from '../componentes/Banner';

export default function Inicio({ useNavigate }) {
  return (
    <div className="App">
      <Banner />
      <div className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '50%', padding: '20px' }}>
          <Card.Body>
            <h5>
              Bem-vindo ao On Times: Conectando Mentes Tecnológicas! Seja parte da revolução da aprendizagem colaborativa no mundo da tecnologia. No On Times, proporcionamos a você a plataforma perfeita para expandir seus horizontes, aprimorar suas habilidades e se conectar com colegas apaixonados pela inovação. Descubra o Poder da Comunidade: Ao se cadastrar no On Times, você se torna parte de uma comunidade vibrante de entusiastas da tecnologia, onde a colaboração é a chave para o sucesso. Encontre e junte-se a grupos de estudo dedicados aos mais diversos temas, desde desenvolvimento de software até inteligência artificial. Junte-se a nós hoje e descubra o potencial ilimitado da colaboração tecnológica no On Times!
            </h5>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
