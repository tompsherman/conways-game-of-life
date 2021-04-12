import React, { useEffect, useState } from 'react'

const GameLogic = (props) => {
    const [grid, setGrid] = useState()

    useEffect(()=>{
        setGrid(props.grid)
    }, [])

    console.log("grid update:", grid[88].living)

    const gridLength = grid.length * 0.5

    const nextGridMap = (numberLiving, row, column) => {
        let index = row.toString() + column.toString()

        if (numberLiving >= 2 && numberLiving <= 3 && grid[parseInt(index)].living === 1){
            props.newGrid[parseInt(index)].living = 1
        } else if (numberLiving === 3 && grid[parseInt(index)].living === 0){
            props.newGrid[parseInt(index)].living = 1
        } else {
            props.newGrid[parseInt(index)].living = 0
        }
        return 0
    }

    //check for living neighbors:
    const checkLivingNorth = (matrix, row, column) => {
        let index = (row - 1).toString() + column.toString()
        return matrix[parseInt(index)].living === 1
    }
    const checkLivingNorthEast = (matrix, row, column) => {
        let index = (row - 1).toString() + (column + 1).toString()
        return matrix[parseInt(index)].living === 1
    }
    const checkLivingNorthWest = (matrix, row, column) => {
        let index = (row - 1).toString() + (column - 1).toString()
        return matrix[parseInt(index)].living === 1
    }

    const checkLivingSouth = (matrix, row, column) => {
        let index = (row + 1).toString() + column.toString()
        return matrix[parseInt(index)].living === 1
    }
    const checkLivingSouthEast = (matrix, row, column) => {
        let index = (row + 1).toString() + (column + 1).toString()
        return matrix[parseInt(index)].living === 1
    }
    const checkLivingSouthWest = (matrix, row, column) => {
        let index = (row + 1).toString() + (column - 1).toString()
        return matrix[parseInt(index)].living === 1
    }

    const checkLivingWest = (matrix, row, column) => {
        let index = row.toString() + (column - 1).toString()
        return matrix[parseInt(index)].living === 1
    }

    const checkLivingEast = (matrix, row, column) => {
        let index = row.toString() + (column + 1).toString()
        return matrix[parseInt(index)].living === 1
    }

    const findNeighbors = (matrix, row, column) => {
        let numberLiving = 0

        if (row > 0 && checkLivingNorth(matrix, row, column)){
            numberLiving += 1
        }
        if (row > 0 && column < gridLength - 1 && checkLivingNorthEast(matrix, row, column)){
            numberLiving += 1
        }
        if (row > 0 && column > 0 && checkLivingNorthWest(matrix, row, column)){
            numberLiving += 1
        }

        if (row < gridLength - 1 && checkLivingSouth(matrix, row, column)){
            numberLiving += 1
        }
        if (row < gridLength - 1 && column < gridLength - 1 && checkLivingSouthEast(matrix, row, column)){
            numberLiving += 1
        }
        if (row < gridLength - 1 && column > 0 && checkLivingSouthWest(matrix, row, column)){
            numberLiving += 1
        }

        if (column > 0 && checkLivingWest(matrix, row, column)){
            numberLiving += 1
        }
        if (column < gridLength - 1 && checkLivingEast(matrix, row, column)){
            numberLiving += 1
        }

        nextGridMap(numberLiving, row, column)

        console.log("numberLiving:", numberLiving)

        return numberLiving
    }

    const findBodies = (matrix, row, column) => {
        let deadList = []

        if (row > 0 && !checkLivingNorth(matrix, row, column)){
            deadList.push({ row: row - 1, column: column })
        }
        if (row > 0 && column < gridLength - 1 && !checkLivingNorthEast(matrix, row, column)){
            deadList.push({ row: row - 1, column: column + 1 })
        }
        if (row > 0 && column > 0 && !checkLivingNorthWest(matrix, row, column)){
            deadList.push({ row: row - 1, column: column - 1 })
        }

        if (row < gridLength - 1 && !checkLivingSouth(matrix, row, column)){
            deadList.push({ row: row + 1, column: column })
        }
        if (row < gridLength - 1 && column < gridLength - 1 && !checkLivingSouthEast(matrix, row, column)){
            deadList.push({ row: row + 1, column: column + 1 })
        }
        if (row < gridLength - 1 && column > 0 && !checkLivingSouthWest(matrix, row, column)){
            deadList.push({ row: row + 1, column: column - 1 })
        }

        if (column > 0 && !checkLivingWest(matrix, row, column)){
            deadList.push({ row: row, column: column - 1 })
        }
        if (column < gridLength - 1 && !checkLivingEast(matrix, row, column)){
            deadList.push({ row: row, column: column + 1 })
        }

        console.log("the dead list:", deadList)

        return deadList
    }

    grid.map((node) => {
        let deadNeighbors = []

        if (node.living === 1){
            console.log("we got a live one!", node.row, node.column)
            findNeighbors(grid, node.row, node.column)
            let index = node.row.toString() + node.column.toString()
            grid[index].visited = 1
            deadNeighbors = findBodies(grid, node.row, node.column)
            deadNeighbors.map((body) => {
                findNeighbors(grid, body.row, body.column)
                return 0
            })
        }
        return 0
    })

    props.newGrid.map((node) => {
        if (node.living === 1){
            console.log("the generation continues:", node.row, node.column)
        } else {
            console.log("oh he dead.")
        }
        return 0
    })

    return (
        <>
            <h3>game logic:</h3>
            <h5>{grid[88].living}</h5>
        </>
    )
}

export default GameLogic
