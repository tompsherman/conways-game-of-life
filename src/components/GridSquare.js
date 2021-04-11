import React, { useContext, useEffect, useState} from 'react'
import { GridContext } from "./context/GridContext"

const GridSquare = () => {
    const { startingGrid } = useContext(GridContext)
    const [ display, setDisplay ] = useState()

    useEffect(()=>{
        try {
            if (startingGrid.length > 0) {
                console.log("data incoming:", startingGrid[0].row)
                setDisplay = `${startingGrid[0].row}, ${startingGrid[0].column}`
            }
        } catch {
            console.log("no data to display")
        }
    }, [startingGrid])
    return (
        <div>
            <h6>{display}</h6>
        </div>
    )
}

export default GridSquare
