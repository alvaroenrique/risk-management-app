import React from 'react';
import './css/style.scss';

import EditableTable from './components/editable-table';

function App() {
  return (
    <div>
      <header className="flex justify-center">
        <h1 className="py-8 text-3xl">SOFTWARE DE GESTIÓN DE RIESGOS</h1>
      </header>
      <EditableTable />
    </div>
  );
}

export default App;
