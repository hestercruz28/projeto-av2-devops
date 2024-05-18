import React, { useState } from "react";
import TableList from "../componentes/TableList";
import Formulario from "../componentes/Formulario";

export default function Preenchimento({useNavigate}) {

  const [step, setStep] = useState(1);
  const [dataEditar, setDataEditar] = useState(null);

    //FUNCTIONS
    const getCompStep = () => {
        switch (step) {
            case 1:
                return <TableList step={step} setStep={setStep} setDataEditar={setDataEditar}/>;
            case 2:
                return <Formulario step={step} setStep={setStep} dataEditar={dataEditar}/>;
            default:
                return <TableList step={step} setStep={setStep} />;
        }
    }

  return (
    <div>
      {getCompStep()}
    </div>
  );
}