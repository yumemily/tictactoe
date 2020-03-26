import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'
import FacebookLogin from 'react-facebook-login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: ['', '', '', '', '', '', '', '', ''],
      nextPlayer: false, // false is x true is O
      history: [],
      user: '',
      scores: [],
    }
  }

  setParentsState = (obj) => {
    this.setState(obj)
  }

  showPast = (item, idx) => {
    this.setState({ squares: item.squares, nextPlayer: item.nextPlayer, history: this.state.history.filter((e, i) => i < idx) })
  }

  responseFacebook = (response) => {
    console.log(response)
    this.setState(
      { user: response.name }
    )
  }

  // call this function when player wins
  postData = async (duration) => {
    console.log('here')
    let data = new URLSearchParams();
    data.append("player", this.state.user); // data that you want to post (key,value)
    data.append("score", duration); //figure out how to get time elapsed
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    console.log('ddd', response)
    // this.getData();
  }

  getData = async () => {
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let result = await fetch(url)
    let data = await result.json()

    let scores = data.items
    console.log(scores)
    this.setState({ scores: scores })
  }

  componentWillMount(nextProps, nextState) {
    {
      this.getData();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.status === true) {
      this.getData();
      console.log(this.scores)
      // this.setState({winner: false})
      this.setState({ gameOver: true })
    }
  }

  reset = () => {
    this.getData();
    this.setState({
      squares: ['', '', '', '', '', '', '', '', ''],
      nextPlayer: false, // false is x true is O
      history: [],

    });
  };


  render() {
    // if (!this.state.user) {
    //   return (

    //     <FacebookLogin
    //       appId="641934443292841"
    //       autoLoad={true}
    //       fields="name,email,picture"
    //       callback={this.responseFacebook}
    //     />
    //   )
    // }

    return (

      <div>
        <FacebookLogin
          appId="641934443292841"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
        <h2>User Info: {this.state.user} </h2>
        <ul>
          {this.state.history.map((item, idx) => {
            return (<li><button onClick={() => this.showPast(item, idx)}>Go to move {idx + 1} </button></li>)
          })}
        </ul>
        <h1>Score history</h1>
        <ol>
          {this.state.scores.map((item) => {
            return (<li>{item.player} {item.score}</li>)
          })}
        </ol>
        <Board {...this.state} setParentsState={this.setParentsState} postData={this.postData} getData={this.getData} />
        <button onClick={() => this.reset()}>Reset</button>
      </div>
    );
  }
}

export default App;
