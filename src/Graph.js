import './App.css';
import React from 'react';
import "./Graph.css"
import { Bar as BarJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

export class Graph extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let sorted_entries = this.props.entries.map((entry) => {
            return {
                "puzzle_date":entry["puzzle_date"],
                "elapsed_seconds": entry["elapsed_seconds"], 
                "solve_date": entry["solve_date"]
            }
          }).sort((a, b) => a.puzzle_date.localeCompare(b.puzzle_date));
        console.log(sorted_entries)
        const labels = sorted_entries.map((entry) => {
            return entry["solve_date"]
          });
        const times = sorted_entries.map((entry) => {
            return entry["elapsed_seconds"]
          });
        const puzzle_dates = sorted_entries.map((entry) => {
            return entry["puzzle_date"]
        }); 
        let data = {
            labels: labels,
            datasets: [{
                backgroundColor: '#1976d2',
                borderColor: '#1976d2',
                data: times
            }]
        }
        let options = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 0,
                    ticks: {
                    }
                },
                xAxis: {
                    ticks: {
                        maxTicksLimit: 12
                    }
                }
            },
            maintainAspectRatio: false
        }
        return (
            <div id="graph_box">
                <Line
                    data={data}
                    options={options}
                />
            </div>
        )
    }
}