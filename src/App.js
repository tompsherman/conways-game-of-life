import React from 'react'

import './App.css'
import Grid from './components/Grid'

const App = () => {
  return (
    <div className="App">

      <h2>Conway's Game of Life!</h2>
      <Grid />
      <button>start</button>
      <button>stop</button>
      <button>clear</button>
      <h4>Generation Number: ____</h4>

    </div>
  );
};

export default App;