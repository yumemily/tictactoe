import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      squares: ['','','','','','','','',''],
      nextPlayer: false // false is x true is O
    }
  }

  setParentsState = (obj) =>{
    this.setState(obj)
  }



  render() {
    return (
      <div>
        <Board { ...this.state} setParentsState={this.setParentsState}/>
      </div>
    );
  }
}

export default App;
