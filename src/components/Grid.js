import React, { useState } from 'react'
import GridSquare from "./GridSquare"
import { GridContext } from "./context/GridContext"
import GameLogic from "./GameLogic"
import { clone } from "ramda"

const Grid = () => {
    const [toggle, setToggle] = useState(false)

    let grid = []
    let row = 0
    let column = 0

    while (row < 10) {
        for (column = 0; column < 10; column++){
            if ((row === 4 && column === 5) ||
                (row === 5 && column === 5) ||
                (row === 6 && column === 5)) {
                grid.push({
                    row: row,
                    column: column,
                    living: 1,
                    visited: 0
                })
            } else {
                grid.push({
                    row: row,
                    column: column,
                    living: 0,
                    visited: 0
                })
            }
        }
        row += 1
    }

    const newGrid = clone(grid)
   
    const handeClick = (event) => {
        event.preventDefault()
        setToggle(true)
    }

    return (
        <>
            <h1>Grid:</h1>
            <button onClick={handeClick}>run simulation</button>
            <div>
                {toggle ? <GameLogic grid={grid} newGrid={newGrid} /> : null}
            </div>
        </>
        // <div className="grid">
        //     {array.map(row =>
        //         row.map(cell =>
        //             <div className="cell-state" onClick={makeAlive}>
        //                 {cell}
        //             </div>
        //         )
        //     )}
        // </div>
    )
}

export default Grid
