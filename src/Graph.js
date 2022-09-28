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
        const labels = this.props.entries.map((entry) => {
            return entry["solve_date"]
          });
        const times = this.props.entries.map((entry) => {
            return entry["elapsed_seconds"]
          });
        let data = {
            labels: labels,
            datasets: [{
                label: "My dataset",
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