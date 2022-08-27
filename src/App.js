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
      entries: []
    }
    this.handleAPICall = this.handleAPICall.bind(this);
  }

  handleAPICall(event) {
    event.preventDefault();
    let params = new URLSearchParams();
    
    for (const [key, value] of Object.entries(this.state.days)) {
      if (value) {
        params.append("day", key)
      }
    }

    // console.log(params)
    axios.get("http://localhost:8000/api/entries", {
      auth: {
        username: "jvp119",
        password: "N4aCXiE3akAK"
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

  render() {
    return (
      <div>
        <label for="Monday">Monday</label>
        <input type="checkbox" name="Monday" value="Monday" onChange={(e) => this.handleDay(e)}></input>
        <label for="Monday">Tuesday</label>
        <input type="checkbox" name="Tuesday" value="Tuesday" onChange={(e) => this.handleDay(e)}></input>
        <label for="Monday">Wednesday</label>
        <input type="checkbox" name="Wednesday" value="Wednesday" onChange={(e) => this.handleDay(e)}></input>
        <label for="Monday">Thursday</label>
        <input type="checkbox" name="Thursday" value="Thursday" onChange={(e) => this.handleDay(e)}></input>
        <label for="Monday">Friday</label>
        <input type="checkbox" name="Friday" value="Friday" onChange={(e) => this.handleDay(e)}></input>
        <label for="Monday">Saturday</label>
        <input type="checkbox" name="Saturday" value="Saturday" onChange={(e) => this.handleDay(e)}></input>
        <label for="Monday">Sunday</label>
        <input type="checkbox" name="Sunday" value="Sunday" onChange={(e) => this.handleDay(e)}></input>
        <input type="submit" onClick={(e) => this.handleAPICall(e)}></input>
      <div>
        {this.state.entries.map(entry => {
          return <div key={entry.id}>{entry.puzzle_date} {entry.elapsed_seconds}</div>
        })}
      </div>
      </div>
    );
  }
}

export default App;
