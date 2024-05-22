import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'components/shared/Navbar';
import { appRoutes } from 'config/routes';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <HashRouter>
        <Navbar />
        <Routes>
          {appRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
