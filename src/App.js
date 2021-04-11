import React, {useEffect, useState} from 'react'

import './App.css'
import Grid from './components/Grid'
import { GridContext } from "./components/context/GridContext"

const App = () => {
  const [ startingGrid, setStartingGrid ] = useState()

  useEffect(()=>{
    console.log("starting grid in App", startingGrid)
  }, [startingGrid])

  return (
    <GridContext.Provider value={{ startingGrid, setStartingGrid }}>
      <div className="App">
  
        <h2>Conway's Game of Life!</h2>
        <Grid />
        <button>start</button>
        <button>stop</button>
        <button>clear</button>
        <h4>Generation Number: ____</h4>
  
      </div>
    </GridContext.Provider>
  );
};

export default App;