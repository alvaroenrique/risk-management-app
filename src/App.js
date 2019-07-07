import React from 'react';

import './css/style.scss';

import EditableTable from './components/editable-table';

function App() {
  return (
    <div>
      <header className="flex justify-center">
        <h1 className="my-10 text-3xl text-center border-b-2 border-grey-dark text-grey-dark">
          SOFTWARE DE GESTIÓN DE RIESGOS
        </h1>
      </header>
      <EditableTable />
    </div>
  );
}

export default App;
