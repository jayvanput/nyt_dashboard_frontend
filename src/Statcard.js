import './App.css';
import React from 'react';

export class StatCards extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
        <div className="row" id="footer">
            <StatCard func={getAverageTime} solve_times={this.props.solve_times} text="Average Time"></StatCard>
            <StatCard func={getMinTime} solve_times={this.props.solve_times} text="Best Time"></StatCard>
            <StatCard func={getLatestTime} solve_times={this.props.solve_times} text="Latest Time"></StatCard>
            <StatCard func={getTotalSolves} solve_times={this.props.solve_times} text="Total Solves"></StatCard>
          </div>
        )
    }
}

function convertSecondsToStringTime(number) {
    const minutes = Math.floor(number / 60)
    const seconds = Math.round(number % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`
}

function getAverageTime(arr) {
    let sum = 0
    for(let i=0;i<arr.length;i++) {
        sum += arr[i]
    }
    const avg = sum / arr.length
    let str_time = convertSecondsToStringTime(avg)
    return str_time
}

function getMinTime(arr) {
    let min = Math.min(...arr)
    let str_time = convertSecondsToStringTime(min)
    return str_time
}

function getLatestTime(arr) {
    let min_time = convertSecondsToStringTime(arr[0])
    return min_time
}

function getTotalSolves(arr) {
    return arr.length
}

export function StatCard(props) {
    let metric = props.solve_times.length !== 0 ? props.func(props.solve_times) : ""
    return (
        <div className="card">
            <h2>{props.text}</h2>
            <h1>{metric}</h1>
        </div>
    )
}