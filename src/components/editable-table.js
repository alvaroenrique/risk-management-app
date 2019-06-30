/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import CloseIcon from '../icons/icons';

const tableHeader = [
  'Causas',
  'Evento del riesgo',
  'Consecuencias',
  'Probabilidad',
  'Impacto',
  'Nivel de riesgo',
];

const auxTableBody = [
  {
    cause: 'Servidor web no parchado',
    event: 'Exposición de datos confidenciales',
    consequence: 'Pérdida de clientes',
    prob: 0.5,
    impact: 0.8,
    riskLevel: 0,
  },
].map(row => {
  const auxRow = {...row};
  auxRow.riskLevel = auxRow.prob * auxRow.impact;
  return auxRow;
});

function EditableTable() {
  const [body, setBody] = useState(auxTableBody);
  const [editable, setEditable] = useState(false);

  const [newCauses, setNewCauses] = useState('');
  const [newEvent, setNewEvent] = useState('');
  const [newConsequence, setNewConsequence] = useState('');
  const [newProb, setNewProb] = useState('');
  const [newImpact, setNewImpact] = useState('');

  const addRisk = newRisk => {
    const auxBody = [...body, newRisk];
    setBody(auxBody);
  };

  const resetForm = () => {
    setNewCauses('');
    setNewEvent('');
    setNewConsequence('');
    setNewProb('');
    setNewImpact('');
  };

  const handleAddRiskButton = () => {
    if (editable) {
      addRisk({
        cause: newCauses,
        event: newEvent,
        consequence: newConsequence,
        prob: newProb,
        impact: newImpact,
        riskLevel: newProb * newImpact,
      });
      setEditable(!editable);
      resetForm();
    } else {
      setEditable(!editable);
    }
  };

  return (
    <div className="w-2/3 mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              {tableHeader.map(el => (
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  {el}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {body.map(row => (
              <tr className="hover:bg-gray-300">
                {Object.values(row).map(el => (
                  <td className="py-4 px-6 border-b border-grey-light">{el}</td>
                ))}
              </tr>
            ))}

            {editable && (
              <tr className="">
                <td className="py-4 px-6 border-b border-grey-light">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Causas"
                    value={newCauses}
                    onChange={e => setNewCauses(e.target.value)}
                  />
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Evento del riesgo"
                    value={newEvent}
                    onChange={e => setNewEvent(e.target.value)}
                  />
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Consecuencias"
                    value={newConsequence}
                    onChange={e => setNewConsequence(e.target.value)}
                  />
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Probabilidad"
                    value={newProb}
                    onChange={e => setNewProb(e.target.value)}
                  />
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Impacto"
                    value={newImpact}
                    onChange={e => setNewImpact(e.target.value)}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="rounded-full py-2 px-4 border-2 border-gray-700 text-gray-900 hover:border-orange-700 p-2 hover:text-orange-700"
          onClick={handleAddRiskButton}
        >
          Agregar riesgo
        </button>
        {editable && (
          <button
            type="button"
            className="rounded-full py-2 border-2 border-red-700 text-red-700 hover:border-orange-700 p-2 hover:text-orange-700 ml-6"
            onClick={() => setEditable(!editable)}
          >
            <CloseIcon svgClasses="text-red-700" svgFill="red" />
          </button>
        )}
      </div>
    </div>
  );
}

export default EditableTable;
