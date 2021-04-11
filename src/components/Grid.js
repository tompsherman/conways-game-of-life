import React, { useEffect, useContext } from 'react'
import GridSquare from "./GridSquare"
import { GridContext } from "./context/GridContext"

const Grid = () => {
    const { setStartingGrid } = useContext(GridContext)

    let items = []
    let row = 0
    let column = 0

    while (row < 25) {
        for (column = 0; column < 25; column++){
            items.push({
                row: row,
                column: column,
                living: false
            })
        }
        row += 1
    }

    useEffect(()=>{
        console.log("updated")
        setStartingGrid(items)
    }, [])

    return (
        <>
            <h1>Grid:</h1>
            < GridSquare />
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
