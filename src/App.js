import './App.css';
import React from 'react';
import axios from 'axios'
import {FilterPanel, Filter, DateFilter} from "./Filter"
import {StatCards} from "./Statcard"
import {Graph} from "./Graph"
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
      usedHelp: true,
      startDate: this.getDateString(10),
      endDate: this.getDateString(),
      entries: [],
    }
    this.handleAPICall = this.handleAPICall.bind(this);
  };
  
  getDateString(offset=0) {
    var date = new Date();
    date.setDate(date.getDate() - offset);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2,0);
    let day = date.getDate();
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`
  }
  componentDidMount() {
    this.handleAPICall()
  }

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
    axios.get("http://172.105.11.42/api/entries/", {
      auth: {
        username: "jvp119",
        password: "N4aCXiE3akAK" // Hidden from last commit & value has been changed.
      }, 
      params: params
    }).then(response => {
      const entries = response.data
      this.setState({
        entries: entries,
      })
    }).catch(error => {
      console.error(error.response.data)
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
    this.setState(prevState => ({startDate: start_date}), () => {
      this.handleAPICall(event)
    })
  }

  handleEndDateFilter(event) {
    let end_date = event.target.value;
    this.setState(prevState => ({endDate: end_date}), () => {
      this.handleAPICall(event)
    })
  }

  render() {
    const WEEKDAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    let solve_times = this.state.entries.map((entry) => {
      return entry["elapsed_seconds"]
    })
    let entries_sort = this.state.entries.sort(function(a, b) {
      const date1 = new Date(a["solve_date"])
      const date2 = new Date(b["solve_date"])
      return date1 - date2
  })
    return (
      <div>
        <div id="dashboard">
          <div className="row">
            <div className="content" id="filters">
              <div className="filter">
                Weekday
                <FilterPanel onToggle={(e) => this.handleDayFilter(e)} options={WEEKDAYS}></FilterPanel>
              </div>
              <div className="filter">
                Help
                <Filter onToggle={(e) => this.handleHelpFilter(e)} value="Help" checked={true}></Filter>
              </div>
              <div className="filter">
                Date Range
                <DateFilter onToggle={(e) => this.handleStartDateFilter(e)} label="Start Date" startvalue={this.state.startDate}></DateFilter>
                <DateFilter onToggle={(e) => this.handleEndDateFilter(e)} label="End Date" startvalue={this.state.endDate}></DateFilter>
              </div>
              {/* <input type="submit" onClick={(e) => this.handleAPICall(e)}></input> */}
            </div>
            <div className="content" id="graph">
              <Graph entries={entries_sort}></Graph>
            </div>
          </div>
          <StatCards solve_times={solve_times}></StatCards>
        </div>
      </div>
    );
  }
}

export default App;
