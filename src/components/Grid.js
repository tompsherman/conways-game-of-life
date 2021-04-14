import React, { Component } from 'react'
import { clone } from "ramda"
import "../styles/Grid.css"
import Controls from "./Controls"

class Grid extends Component {
    constructor(props) {
        super(props);
        this.width = 25;
        this.height = 25;
        this.state = {
            grid: Array(this.width * this.height).fill({}),
            speed: 0,
            seededGrid: false,
        }
    }
    
    gridReset = () => {
        console.log("interval id 1:", this.intervalId)

        clearInterval(this.intervalId)
        console.log("interval id 2:", this.intervalId)

        let startBlank = []
        let column = 0
        let row = 0

        while (row < this.width){
            console.log("grid in gridreset:", this.state.seededGrid)

            if(this.state.seededGrid){
                for(column = 0; column < this.height; column++){
                    startBlank.push({
                        row: row,
                        column: column,
                        living: Math.floor(Math.random() * 4 === 1 ? 1 : 0)
                    })
                }
                row += 1
            } else {
                for (column = 0; column < this.height; column++){
                    startBlank.push({
                        row: row,
                        column: column,
                        living: 0
                    })
                }
                row += 1
            }
        }
        this.setState({grid: startBlank})
    }

    componentDidMount(){
        this.gridReset()
        this.setState({
            speed: 1000
        })
    }

    runProgram = (event) => {
        event.preventDefault()
        console.log("running program...", this.intervalId)
        console.log("interval id:", this.intervalId)

        let newGrid = clone(this.state.grid)

        this.state.grid.map((node) => {
            let numberLiving = 0
            if (node.row > 0 && this.state.grid[(node.row - 1) * this.width + node.column].living %2 !== 0){
                numberLiving += 1
            }
            if (node.row > 0 && node.column < this.width -1 && this.state.grid[(node.row - 1) * this.width + node.column + 1].living%2 !== 0){
                numberLiving += 1
            }
            if (node.column < this.width -1 && this.state.grid[node.row * this.width + node.column + 1].living%2 !== 0){
                numberLiving += 1
            }
            if (node.row < this.width -1 && node.column < this.width -1 && this.state.grid[(node.row + 1) * this.width + node.column + 1].living%2 !== 0){
                numberLiving += 1
            }
            if (node.row < this.width -1 && this.state.grid[(node.row + 1) * this.width + node.column].living%2 !== 0){
                numberLiving += 1
            }
            if (node.row < this.width -1 && node.column > 0 && this.state.grid[(node.row + 1) * this.width + (node.column - 1)].living%2 !== 0){
                numberLiving += 1
            }
            if (node.column > 0 && this.state.grid[node.row * this.width + (node.column - 1)].living%2 !== 0){
                numberLiving += 1
            }
            if (node.row > 0 && node.column > 0 && this.state.grid[(node.row - 1) * this.width + (node.column - 1)].living%2 !== 0){
                numberLiving += 1
            }

            let index = node.row * this.width + node.column

            if ((numberLiving >= 2 && numberLiving <= 3 && this.state.grid[index].living === 1) || (numberLiving >= 2 && numberLiving <= 3 && this.state.grid[index].living === 3)){
                newGrid[index] = { ...newGrid[index], living: 1 }
            } else if ((numberLiving === 3 && this.state.grid[index].living === 0) || (numberLiving === 3 && this.state.grid[index].living === 2)){
                newGrid[index] = { ...newGrid[index], living: 3 }
            } else if (this.state.grid[index].living === 1 || this.state.grid[index].living === 3){
                newGrid[index] = { ...newGrid[index], living: 2 }
            } else {
                newGrid[index] = { ... newGrid[index], living: 0 }
            }
            return this.state.grid
        })
        this.setState({
            grid: newGrid
        })
    }

    handleClick = (event, node) => {
        event.preventDefault()
        // if (!this.intervalId){
            let index = node.row * this.width + node.column
            let updateGrid = this.state.grid

            updateGrid[index] = 
                node.living === 1 ? { ...node, living: 0 } : { ...node, living: 1}
                this.setState({
                    grid: updateGrid
                })
        // }
    }

    playContinuous = (event) => {
        event.preventDefault()
        clearInterval(this.intervalId)
        this.intervalId = setInterval(()=>{
            this.runProgram(event)
        }, this.state.speed)
    }

    pause = (event) => {
        event.preventDefault()
        clearInterval(this.intervalId)
    }

    slower = (event) => {
        event.preventDefault()
        console.log(this.state.speed)
        clearInterval(this.intervalId)
        this.setState(() => ({
            speed: this.state.speed * 1.2
        }))
        this.playContinuous(event)
    }

    faster = (event) => {
        event.preventDefault()
        clearInterval(this.intervalId)
        this.setState(() => ({
            speed: this.state.speed * 0.7
        }))
        this.playContinuous(event)
    }

    seededGrid = (event) => {
        event.preventDefault()
        clearInterval(this.intervalId)
        console.log("grid seeded in seed funciton:", this.state.seededGrid)
        this.setState({
            seededGrid: true
        })
    }

    unseededGrid = (event) => {
        event.preventDefault()
        clearInterval(this.intervalId)
        this.setState({
            seededGrid: false
        })
        this.gridReset()
    }

    render(){
        return (
            <>
                <h1>Conway's Game of Life!</h1>

                <div className="grid-container">
                    {this.state.grid.map((node, index) => {
                        return (
                            <button
                                onClick={(event) => this.handleClick(event, node)}
                                key={index}
                                className={node.living === 1 ? "cell-living" : node.living === 2 ? "just-died" : node.living === 3 ? "new-birth" : "cell"}
                            ></button>
                        )
                    })}
                </div>
                <div>
                    <Controls 
                        runProgram={this.runProgram}
                        gridReset={this.gridReset}
                        speed={this.speed}
                        intervalId={this.intervalId}
                        playContinuous={this.playContinuous}
                        slower={this.slower}
                        faster={this.faster}
                        seededGrid={this.seededGrid}
                        unseededGrid={this.unseededGrid}
                        pause={this.pause}
                    />
                </div>
            </>
        )
    }
    
}

export default Grid
