import { render } from "@testing-library/react";
import React, { Component, useState } from "react";
import '../App.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";




export default class Lobby extends Component 
{
    constructor(props)
    {
     super(props);
     this.state= { code: null, 
        joincode: null
     };
     this.createRoom= this.createRoom.bind(this);
     this.handlecall= this.handlecall.bind(this);
     this.submitdata= this.submitdata.bind(this);
    
    }
    
     async createRoom(){
        var randomV = Math.floor((Math.random() * 3000) + 1); 
        this.setState({code: randomV})
     }

     handlecall(event)
     {
         this.setState({joincode: event.target.value})
     }

    

render() {
        
    return (
    <div className="home">
    <h4 className="playarea-header">Welcome to Rang Game Lobby</h4>
    <h4>{this.state.code}</h4>
    <button onClick ={this.createRoom}> Create New Room</button>
   <p> <button onClick ={this.submitdata}> Enter Room ID</button></p>
    <input type="number" placeholder="Enter Room ID" onChange={this.handlecall}/>
 
   
   </div>
    );
    }
}




