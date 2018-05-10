import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css'
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const today = new Date();

class App extends Component {

  state = {
    top100Days: [],
    top100AllTime: [],
    current: true
  }


 getFCCdata(url, stateName) {
  console.log(1);
   axios.get(url).then(({data}) => {
     this.setState({[stateName]: data} );
     console.log(this.state.top100Days);
   })
 }

 viewChange(value){
   if(this.state.current !== value){
     this.setState({current: value});
   }
 }

 componentDidMount() {
   this.getFCCdata('https://fcctop100.herokuapp.com/api/fccusers/top/recent', "top100Days");
   this.getFCCdata('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', "top100AllTime");
 }

  render() {
    const {top100Days, top100AllTime, current} = this.state;
    return (
      <div className="App">
        <h1 className="text-center color"><img src={logo} id="logo" alt="Free Code Camp Logo"/> Free Code Camp <br/> Camper Leaderboard</h1>
        <Table striped bordered condensed hover className="color">
        <thead>
          <tr>
            <th>Place</th>
            <th>Camper's name</th>
            <th onClick={(event)=> this.viewChange(true)}>Last 30 days {current && (<i className="fa fa-caret-down"></i>)}</th>
            <th onClick={(event)=> this.viewChange(false)}>Best of all time {current === false && (<i className="fa fa-caret-down"></i>)}</th>
          </tr>
        </thead>
        <tbody>
          {current && (top100Days.map((row, index) =>(
            <tr key={row.username}>
              <td>{index + 1}</td>
              <td><a href={`https://www.freecodecamp.org/${row.username}`}>
              <Image src={row.img} className="imageHeight"/>
               {row.username}
              </a></td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
            </tr>
           )
          ))}

               {current === false && (top100AllTime.map((row, index) =>(
            <tr key={row.username}>
              <td>{index + 1}</td>
              <td><a href={`https://www.freecodecamp.org/${row.username}`}>
              <Image src={row.img} className="imageHeight"/>
               {row.username}
              </a></td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
            </tr>
           )
          ))}

        </tbody>
        </Table>
        <p className="text-center">Made by Mirza Sisic &copy;{today.getFullYear()} </p>
      </div>
    );
  }
}

export default App;
