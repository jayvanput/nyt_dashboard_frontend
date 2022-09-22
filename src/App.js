import './App.css';
import React from 'react';
import axios from 'axios'
import {FilterPanel, Filter, DateFilter} from "./Filter"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      days: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
      },
      usedHelp: false,
      startDate: null,
      endDate: null,
      entries: [],
      average_solve: "",
    }
    this.handleAPICall = this.handleAPICall.bind(this);
  };
  

  handleAPICall(event) {
    // event.preventDefault();
    let params = new URLSearchParams();
    for (const [key, value] of Object.entries(this.state.days)) {
      if (value) {
        params.append("day", key)
      }
    }
    if (this.state.usedHelp) {
      params.append("used_help", "True")
    }

    if (this.state.startDate) {
      params.append("start_date", this.state.startDate)
    }

    if (this.state.endDate) {
      params.append("end_date", this.state.endDate)
    }
    // console.log(params)
    axios.get("http://localhost:8000/api/entries", {
      auth: {
        username: "jvp119",
        password: process.env.REACT_APP_PASSWORD // Hidden from last commit & value has been changed.
      }, 
      params
    }).then(response => {
      const entries = response.data
      this.setState({
        entries: entries
      }, () => {
        let sum = 0
        for(let i=0;i<entries.length;i++) {
          sum += entries[i]["elapsed_seconds"]
        }
        const avg = sum / entries.length
        const minutes = Math.floor(avg / 60)
        const seconds = Math.round(avg % 60).toString().padStart(2, '0');
        this.setState({average_solve: `${minutes}:${seconds}`})
      })
    })
  }

  handleDayFilter(event) {
    let days = {...this.state.days}
    let day = event.target.value
    days[day] = !days[day]

    this.setState({days: days}, () => {
      this.handleAPICall(event)
    })
  }

  handleHelpFilter(event) {
    this.setState(prevState => ({usedHelp: !prevState.usedHelp}), () => {
      this.handleAPICall(event)
    })
  }

  handleStartDateFilter(event) {
    let start_date = event.target.value;
    this.setState(prevState => ({startDate: start_date}))
  }

  handleEndDateFilter(event) {
    let end_date = event.target.value;
    this.setState(prevState => ({endDate: end_date}))
  }

  render() {
    const WEEKDAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    return (
      <div>
        <div id="dashboard">
          <div class="row">
            <div class="content" id="filters">
              <div class="filter">
                Weekday
                <FilterPanel onToggle={(e) => this.handleDayFilter(e)} options={WEEKDAYS}></FilterPanel>
              </div>
              <div class="filter">
                Help
                <Filter onToggle={(e) => this.handleHelpFilter(e)} value="Help"></Filter>
              </div>
              <div class="filter">
                Date Range
                <DateFilter onToggle={(e) => this.handleStartDateFilter(e)} value="Start Date"></DateFilter>
                <DateFilter onToggle={(e) => this.handleEndDateFilter(e)} value="End Date"></DateFilter>
              </div>
              {/* <input type="submit" onClick={(e) => this.handleAPICall(e)}></input> */}
            </div>
            <div class="content" id="graph">
            <div>
          {this.state.entries.map(entry => {
            return <div key={entry.id}>{entry.puzzle_date} {entry.elapsed_seconds} {entry.day}</div>
          })}
        </div>
            </div>
          </div>
          <div class="row" id="footer">
            <div class="card">
              <h2>Average Time</h2>
              <h1>{this.state.average_solve}</h1>
            </div>
            <div class="card">
              <h2>Best Time</h2>
            </div>
            <div class="card">
              <h2>Last Time</h2>
              <h1>08:06</h1>
            </div>
            <div class="card">
              <h2>Total Solves</h2>
              <h1>637</h1>
            </div>
          </div>
        </div>
        
        
        

        
        
        
      </div>
      // <div>
      //   <label htmlFor="Monday">Monday</label>
      //   <input type="checkbox" name="Monday" value="Monday" onChange={(e) => this.handleDayFilter(e)}></input>
      //   <label htmlFor="Tuesday">Tuesday</label>
      //   <input type="checkbox" name="Tuesday" value="Tuesday" onChange={(e) => this.handleDayFilter(e)}></input>
      //   <label htmlFor="Wednesday">Wednesday</label>
      //   <input type="checkbox" name="Wednesday" value="Wednesday" onChange={(e) => this.handleDayFilter(e)}></input>
      //   <label htmlFor="Thursday">Thursday</label>
      //   <input type="checkbox" name="Thursday" value="Thursday" onChange={(e) => this.handleDayFilter(e)}></input>
      //   <label htmlFor="Friday">Friday</label>
      //   <input type="checkbox" name="Friday" value="Friday" onChange={(e) => this.handleDayFilter(e)}></input>
      //   <label htmlFor="Saturday">Saturday</label>
      //   <input type="checkbox" name="Saturday" value="Saturday" onChange={(e) => this.handleDayFilter(e)}></input>
      //   <label htmlFor="Sunday">Sunday</label>
      //   <input type="checkbox" name="Sunday" value="Sunday" onChange={(e) => this.handleDayFilter(e)}></input>
      //   <label htmlFor="Help">Include Checked or Revealed Puzzles</label>
      //   <input type="checkbox" name="Help" value="Help" onChange={(e) => this.handleHelpFilter(e)}></input>
      //   <label htmlFor="start_date">Start Date</label>
      //   <input type="date" name="start_date" max={today} onChange={(e) => this.handleStartDateFilter(e)}></input>
      //   <label htmlFor="end_date">End Date</label>
      //   <input type="date" name="end_date" max={today} onChange={(e) => this.handleEndDateFilter(e)}></input>

      // </div>
    );
  }
}

export default App;
