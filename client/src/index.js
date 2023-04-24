import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Table1 from './table1'
import Table2 from './table2'
import Table3 from './table3'
import Table4 from './table4'
import Table5 from './table5'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Table1 />
      <br/>
      <Table2 />
      <br/>
      <Table3 />
      <br/>
      <Table4 />
      <br/>
      <Table5 />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
