import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { cars } from './demo';
import CarItem from './CarItem';
import axios from 'axios';

class App extends Component {

  state = {
    values: [],
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
      .then(res => {
        this.setState({
          values: res.data
        })
      })
  }

  render() {
    return (
      <div className="App">
        <ul>
          {
            this.state.values.map((val: any) => (
              <li key={val.id}>{val.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default App;
