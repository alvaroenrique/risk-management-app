/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import CloseIcon from '../icons/icons';
import Chart from './chart';

import {db} from '../firebase';

const tableHeader = [
  '#',
  'Causas',
  'Evento del riesgo',
  'Consecuencias',
  'Probabilidad',
  'Impacto',
  'Nivel de riesgo',
  'Nivel de riesgo (cualitativo)',
];

function EditableTable() {
  const [body, setBody] = useState([]);
  const [editable, setEditable] = useState(false);

  const [newCauses, setNewCauses] = useState('');
  const [newEvent, setNewEvent] = useState('');
  const [newConsequence, setNewConsequence] = useState('');
  const [newProb, setNewProb] = useState('');
  const [newImpact, setNewImpact] = useState('');

  const [timer, setTimer] = useState(false);

  useEffect(() => {
    return db
      .collection('risks')
      .orderBy('riskNum')
      .onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setBody(docs);
        console.log(docs);
      });
  }, []);

  const addRisk = newRisk => {
    db.collection('risks').add(newRisk);
    setTimer(true);
    setTimeout(() => setTimer(false), 500);
  };

  const resetForm = () => {
    setNewCauses('');
    setNewEvent('');
    setNewConsequence('');
    setNewProb('');
    setNewImpact('');
  };

  const isBetween = (a, x, b) => a < x && x <= b;

  const getCualitRiskLevel = (prob, imp) => {
    if (
      (prob <= 0.6 && imp <= 0.2) ||
      (prob <= 0.4 && isBetween(0.2, imp, 0.4))
    )
      return 'Baja';
    if (
      (isBetween(0.6, prob, 0.8) && imp <= 0.2) ||
      (isBetween(0.4, prob, 0.6) && isBetween(0.2, imp, 0.4)) ||
      (prob <= 0.4 && isBetween(0.4, imp, 0.6))
    )
      return 'Moderada';
    if (
      (prob > 0.8 && imp <= 0.2) ||
      (prob > 0.6 && isBetween(0.2, imp, 0.4)) ||
      (isBetween(0.4, prob, 0.8) && isBetween(0.4, imp, 0.6)) ||
      (prob <= 0.4 && isBetween(0.6, imp, 0.8))
    )
      return 'Alta';
    if (
      (prob > 0.8 && isBetween(0.4, imp, 0.6)) ||
      (prob > 0.4 && isBetween(0.6, imp, 0.8)) ||
      (prob > 0.2 && imp > 0.8)
    )
      return 'Extrema';

    return 'ERROR';
  };

  const handleAddRiskButton = () => {
    if (editable) {
      addRisk({
        cause: newCauses,
        event: newEvent,
        consequence: newConsequence,
        prob: parseFloat(newProb),
        impact: parseFloat(newImpact),
        riskLevel: newProb * newImpact,
        riskNum: body.length + 1,
        cualitRiskLevel: getCualitRiskLevel(
          parseFloat(newProb),
          parseFloat(newImpact),
        ),
      });
      setEditable(!editable);
      resetForm();
    } else {
      setEditable(!editable);
    }
  };

  return (
    <>
      <div className="box-container bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              {tableHeader.map(el => (
                <th
                  key={el}
                  className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {body.map(row => (
              <tr key={row.id} className="hover:bg-gray-300">
                <td className="py-4 px-6 border-b border-grey-light">
                  {row.riskNum}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {row.cause}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {row.event}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {row.consequence}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {`${Math.round(row.prob * 100)}%`}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {`${Math.round(row.impact * 100)}%`}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {`${Math.round(row.riskLevel * 100)}%`}
                </td>
                <td
                  className={`py-4 px-6 border-b border-grey-light ${row.cualitRiskLevel}`}
                >
                  {row.cualitRiskLevel}
                </td>
              </tr>
            ))}

            {editable && (
              <tr className="">
                <td className="py-4 px-6 border-b border-grey-light" />
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
      <div className="flex justify-center mt-8">
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

      <div className="chart-container">{!timer && <Chart data={body} />}</div>
    </>
  );
}

export default EditableTable;
