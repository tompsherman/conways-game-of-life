import React from 'react'

import './styles/App.css'
import Grid from './components/Grid'

const App = () => {

  return (
      <div className="App">
        <h2>Conway's Game of Life!</h2>
        <Grid />  
      </div>
  );
};

export default App;