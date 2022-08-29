import './App.css';
import React from 'react';
import axios from 'axios'


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
      entries: []
    }
    this.handleAPICall = this.handleAPICall.bind(this);
  };
  

  handleAPICall(event) {
    event.preventDefault();
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
      })
    })
  }

  handleDay(event) {
    let days = {...this.state.days}
    let day = event.target.value
    days[day] = !days[day]
    this.setState({days: days})
  }

  handleHelp(event) {
    this.setState(prevState => ({usedHelp: !prevState.usedHelp}))
  }

  handleStartDate(event) {
    let start_date = event.target.value;
    this.setState(prevState => ({startDate: start_date}))
  }

  handleEndDate(event) {
    let end_date = event.target.value;
    this.setState(prevState => ({endDate: end_date}))
  }

  render() {
    const today = new Date().toJSON().slice(0, 10)
    return (
      <div>
        <label htmlFor="Monday">Monday</label>
        <input type="checkbox" name="Monday" value="Monday" onChange={(e) => this.handleDay(e)}></input>
        <label htmlFor="Tuesday">Tuesday</label>
        <input type="checkbox" name="Tuesday" value="Tuesday" onChange={(e) => this.handleDay(e)}></input>
        <label htmlFor="Wednesday">Wednesday</label>
        <input type="checkbox" name="Wednesday" value="Wednesday" onChange={(e) => this.handleDay(e)}></input>
        <label htmlFor="Thursday">Thursday</label>
        <input type="checkbox" name="Thursday" value="Thursday" onChange={(e) => this.handleDay(e)}></input>
        <label htmlFor="Friday">Friday</label>
        <input type="checkbox" name="Friday" value="Friday" onChange={(e) => this.handleDay(e)}></input>
        <label htmlFor="Saturday">Saturday</label>
        <input type="checkbox" name="Saturday" value="Saturday" onChange={(e) => this.handleDay(e)}></input>
        <label htmlFor="Sunday">Sunday</label>
        <input type="checkbox" name="Sunday" value="Sunday" onChange={(e) => this.handleDay(e)}></input>
        <label htmlFor="Help">Include Checked or Revealed Puzzles</label>
        <input type="checkbox" name="Help" value="Help" onChange={(e) => this.handleHelp(e)}></input>
        <label htmlFor="start_date">Start Date</label>
        <input type="date" name="start_date" max={today} onChange={(e) => this.handleStartDate(e)}></input>
        <label htmlFor="end_date">End Date</label>
        <input type="date" name="end_date" max={today} onChange={(e) => this.handleEndDate(e)}></input>

        <input type="submit" onClick={(e) => this.handleAPICall(e)}></input>
        
      <div>
        {this.state.entries.map(entry => {
          return <div key={entry.id}>{entry.puzzle_date} {entry.elapsed_seconds} {entry.day}</div>
        })}
      </div>
      </div>
    );
  }
}

export default App;
