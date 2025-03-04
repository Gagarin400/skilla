import React from 'react';
import CallsList from './components/CallsList/CallsList';
import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <CallsList />
    </div>
  );
};

export default App;