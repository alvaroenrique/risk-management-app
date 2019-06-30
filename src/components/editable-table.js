/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';

const tableHeader = [
  'Causas',
  'Evento del riesgo',
  'Consecuencias',
  'Probabilidad',
  'Impacto',
  'Nivel de riesgo',
];

function EditableTable() {
  const tableBody = [
    [
      'Servidor web no parchado',
      'Exposición de datos confidenciales',
      'Pérdida de clientes',
      0.5,
      0.8,
      // auto calc
    ],
  ];

  tableBody.forEach(row => {
    row.push(row[3] * row[4]);
  });

  const [body, setBody] = useState(tableBody);
  const [editable, setEditable] = useState(false);

  const [newCauses, setNewCauses] = useState('');
  /* const [newEvent, setNewCauses] = useState('');
  const [newCons, setNewCauses] = useState('');
  const [newProb, setNewCauses] = useState('');
 */
  const addRisk = newRisk => {
    newRisk.push(newRisk[3] * newRisk[4]);
    const auxBody = [...body, newRisk];

    setBody(auxBody);
  };

  const handleAddRiskButton = () => {
    if (editable) {
      addRisk([
        newCauses,
        'Exposición de datos confidenciales',
        'Pérdida de clientes',
        0.5,
        0.8,
        // auto calc
      ]);
      setEditable(!editable);
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
                {row.map(el => (
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
                    placeholder="Jane Doe"
                    aria-label="Full name"
                    value={newCauses}
                    onChange={e => setNewCauses(e.target.value)}
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
          className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleAddRiskButton}
        >
          Agregar riesgo
        </button>
      </div>
    </div>
  );
}

export default EditableTable;
