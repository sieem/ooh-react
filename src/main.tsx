import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css'
import { PagesRoute } from './routes/pagesRoute';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/page/0-1" />}>
        </Route>
        <Route path="page" element={<PagesRoute />}>
          <Route path=":pageIdEven-:pageIdOdd" element={<PagesRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
