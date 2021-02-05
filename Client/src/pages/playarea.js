import React, { Component } from "react";
//import { GlobalCounterProvider } from '../helpers/globalvar'
//import Counter from '../helpers/Counter';
import { auth } from "../services/firebase";
import "../Styles.css";
import { Switch } from "react-router-dom";
import { findAllByDisplayValue } from "@testing-library/react";
import { render } from "@testing-library/react";

import "../App.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
  timeout: 10000, //before connect_error and connect_timeout are emitted.
  transports: ["websocket"],
};
const socket = socketIOClient(ENDPOINT, connectionOptions);
let RemovedClickedCard=null;
class Playarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Player1: null,
      Player2: null,
      Player3: null,
      Player4: null,
      SID1: null,
      SID2: null,
      SID3: null,
      SID4: null,
      Activecomingbac1: [],
      Activecomingbac2: [],
      Activecomingbac3: [],
      Activecomingbac4: [],
      showPlayarea: false,
      code: null,
      user: auth().currentUser,
      roomid: null,
      currentID: [],
      message: null,
      Winner: null,
      
      
      receivedCards: [],

      Cards: [51].fill({ null: null }),
    };
    // this.MakeCard= this.MakeCard.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.handlecall = this.handlecall.bind(this);
    this.submitdata = this.submitdata.bind(this);
    // this.callCard= this.callCard.bind(this);
  }

 

  handlecall(event) {
    this.setState({ roomid: event.target.value }); 
  }

    activecard(c)
 { RemovedClickedCard=c;
   console.log("This is removeClickedCard", RemovedClickedCard)
          socket.emit("ActiveCardGoing", c, this.state.currentID);
          console.log("This is socketid going to server", this.state.currentID )
          // let filteredCards=[];
          // THIS REMOVES THE CLICKED CARD FROM PACK
          this.state.receivedCards.splice(this.state.receivedCards.indexOf(RemovedClickedCard),1)
          // this.state.receivedCards=this.state.receivedCards.filter((cd)=>((cd.name !==RemovedClickedCard.name) && (parseInt(cd.value)  !== parseInt(RemovedClickedCard.value))))
      // this.state.receivedCards=filteredCards    
    //  console.log("This is from server socketid", this.state.Activecomingbac1)
    //  ,"and ",this.state.Activecomingbac2,"and ",this.state.Activecomingbac3,"and ",this.state.Activecomingbac4) 
       
       
     
  }


  submitdata() {
    socket.emit("JoinRoom", {
      roomid: parseInt(this.state.roomid),
      useremail: this.state.user.email,
      id: null
    });
    // socket.on("Activecardback", c=>{

      socket.on("Winnerback",winner=>
      {this.setState({Winner:winner})})
      socket.on("Activecardback", (c, currentID)=>{
        console.log("This is socketid coming from server", c,currentID )
        if(currentID===1 || currentID==="[]"){
          currentID=1
        
             this.setState({Activecomingbac1:c}) }
             if(currentID===2)
             this.setState({Activecomingbac2:c})
             if(currentID===3)
             this.setState({Activecomingbac3:c})
             if(currentID===4)
             this.setState({Activecomingbac4:c})
            if(this.Activecomingbac1!==null && this.Activecomingbac2!==null &&this.Activecomingbac3!==null && this.Activecomingbac4!==null ){
              console.log("This is winnerdecission area")
              console.log("This is clicked card 4", this.Activecomingbac1!==null, this.Activecomingbac2,this.Activecomingbac3, this.Activecomingbac4 )
            socket.emit("WinnerDecission", {ACB1:this.state.Activecomingbac1,ACB2:this.state.Activecomingbac2,ACB3:this.state.Activecomingbac3,ACB4: this.state.Activecomingbac4})
            }                              
            });
            if(this.Activecomingbac1!==null && this.Activecomingbac2!==null &&this.Activecomingbac3!==null && this.Activecomingbac4!==null )
   {socket.on("Winnerback",winner=>
   {this.setState({Winner:winner})})}
    //   console.log("This is active card comming bacd from server",c)
    //    this.setState({Activecomingbac: c})});
    
    socket.on("Youjoined", (users, showroom) => {
      console.log(users.length);
      this.setState({
        showPlayarea: showroom,
        currentID: users.length,
        Player1: users[0],
        Player2: users[1], 
        Player3: users[2],
        Player4: users[3],
      });
      // socket.on("Activecardback", d=>{
      //   console.log("This is active card comming bacd from server",d)
      //    this.setState({Activecomingbac: d})});
      //    console.log("Tghis is from server on click",this.state.Activecomingbac)
    });

    socket.on("Roomfull", (data) => {
      this.setState({ message: data });
    });

    socket.on("NewPlayerJoined", (users) => {
      console.log("This is users",users);
      this.setState({
        Player1: users[0],
        Player2: users[1],
        Player3: users[2],
        Player4: users[3],
      });
      // socket.on("Activecardback", d=>{
      //   console.log("This is active card comming bacd from server",d)
      //    this.setState({Activecomingbac: d})});
      //    console.log("Tghis is from server on click",this.state.Activecomingbac)
    });

    socket.on("Cardcoming", (receivedCards) => {
      console.log(receivedCards);
      this.setState({receivedCards: receivedCards})

    });
    // socket.on("Activecardback", d=>{
    //   console.log("This is active card comming bacd from server",d)
    //   this.setState({Activecomingbac: d})});
  }

  async createRoom()
  {
    var RandomV = Math.floor(Math.random() * 100000) + 1;

    await this.setState({ code: RandomV, currentID:1 });
    
    if(this.Activecomingbac1!==null && this.Activecomingbac2!==null &&this.Activecomingbac3!==null && this.Activecomingbac4!==null )
   {socket.on("Winnerback",winner=>
   {this.setState({Winner:winner})})}

    socket.emit("RequestCreateRoom", {
      code: this.state.code,
      id: 1,
      useremail: this.state.user.email,
    });
    socket.on("RoomCreated", (showData, users) => {
      this.setState({
        showPlayarea: showData,
        Player1: users[0],
        Player2: users[1],
        Player3: users[2],
        Player4: users[3],
      });
      socket.on("Cardcoming", (receivedCards) => {
          this.setState({receivedCards: receivedCards})
        console.log(receivedCards);
      });
      // socket.on("Activecardback", d=>{
      //   console.log("This is active card comming bacd from server",d)
      //    this.setState({Activecomingbac: d})});
      //    console.log("Tghis is from server on click",this.state.Activecomingbac)

      socket.on("Activecardback", (c, currentID)=>{
       
        console.log("This is socketid coming from server", c,currentID )
        if(currentID===1 || currentID===""){
          // currentID=1
        
             this.setState({Activecomingbac1:c}) }
             if(currentID===2)
             this.setState({Activecomingbac2:c})
             if(currentID===3)
             this.setState({Activecomingbac3:c})
             if(currentID===4)
             this.setState({Activecomingbac4:c})
            
            
            
            });

      // socket.on("Activecardback", c=>{
      //   console.log("This is active card comming bacd from server",c) 
      //   this.setState({Activecomingbac: c})});

      socket.on("NewPlayerJoined", (users) => {
        console.log(users);
        this.setState({
          Player1: users[0],
          Player2: users[1],
          Player3: users[2],
          Player4: users[3],
        });
      });
    });
  }
  //   async  MakeCard()
  //    {
  //     let c=[];

  //        for ( let i=0; i<13; i++)
  //        c[i]={name:" suit Spade", value: i+2};

  //        for ( let i=13; i<26; i++)
  //        c[i]={name:"suit diamonds", value: i-11};

  //        for ( let i=26; i<39; i++)
  //        c[i]={name:"suit clubs", value: i-24};

  //        for ( let i=39; i<52; i++)
  //        c[i]={name:"suit hearts", value: i-37};

  //    const Shuffled = c.sort(() => 0.5 - Math.random());

  //       await this.setState({
  //         Player1: Shuffled.slice(0,13) ,
  //         Player2: Shuffled.slice(13,26) ,
  //         Player3: Shuffled.slice(26,39) ,
  //         Player4: Shuffled.slice(39,52)

  //        })

  //        console.log(Shuffled);

  //        console.log(this.state.Player1);
  //        console.log(this.state.Player2);

  //    }

  render() {
    var player1Name = this.state.Player1 ? this.state.Player1.useremail : "";
    var player2Name = this.state.Player2 ? this.state.Player2.useremail : "";
    var player3Name = this.state.Player3 ? this.state.Player3.useremail : "";
    var player4Name = this.state.Player4 ? this.state.Player4.useremail : "";
    
     

    // console.log("Playeractive", player1Active+player2Active+player3Active+player4Active)
  //  let cardsItems=null;
  //   if (RemovedClickedCard!=null){
  //     console.log("This is filtercard section",RemovedClickedCard)
  //     // setTodo(todo.filter((c) => c.id !== parseInt(task.target.value)));
  //     let filteredCards=[];
  //     filteredCards=this.state.receivedCards.filter((c)=>c.name !=RemovedClickedCard.name && c.value  != RemovedClickedCard.value)
  //     console.log("This is after filter",filteredCards) 
     const cardsItems = this.state.receivedCards.map((c) =>
            <div className="deck" onClick={()=>this.activecard(c)}> 
            <div class="card" >
                <div class="value">{c.value}
                </div>
                <div className={c.name}> 
                </div> 
            </div></div>
        );



  //  }
  //  else{
  //    cardsItems = this.state.receivedCards.map((c) =>
  //           <div className="deck" onClick={()=>this.activecard(c)}> 
  //           <div class="card" >
  //               <div class="value">{c.value}
  //               </div>
  //               <div className={c.name}> 
  //               </div> 
  //           </div></div>
  //       );
  //  }

    // let card1=   this.state.Player1.map((card) =><div className="deck"><div class="card" >
    // <div class="value" >{card.value}
    // </div>
    // <div className={card.name}>
    // </div>
    // </div></div>) ;
    // let card2=     this.state.Player2.map((card) =><div className="deck"><div class="card" >
    // <div class="value" >{card.value}
    // </div>
    // <div className={card.name}>
    // </div>
    // </div></div>);
    // let card3=     this.state.Player3.map((card) =><div className="deck"><div class="card" >
    // <div class="value" >{card.value}
    // </div>
    // <div className={card.name}>
    // </div>
    // </div></div>);
    // let card4=     this.state.Player4.map((card) =><div className="deck"><div class="card" >
    // <div class="value" >{card.value}
    // </div>
    // <div className={card.name}>
    // </div>
    // </div></div>);
    //  let cardA= card1.forEach(<div className="deck"><p class="card">    </p> </div>);

    return (
      <>
        <div>
          {/* THIS CODE WILL EITHER HIDE THE PLAYAREA OR SHOW THE PLAYAREA */}
          <div style={{ display: this.state.showPlayarea ? "none" : "block" }}>
            <div className="home">
              <h4 className="playarea-header">Welcome to Rang Game Lobby</h4>
              <h4>{this.state.code}</h4>
              <button onClick={this.createRoom}> Create New Room{this.state.code}</button> 
              <p>
                {" "}
                <button onClick={this.submitdata}> Enter Room ID</button>
              </p>
              <span>{this.state.message}</span>
              <input
                type="number"
                placeholder="Enter Room ID"
                onChange={this.handlecall}
              />
            </div>
          </div>
          <div style={{ display: !this.state.showPlayarea ? "none" : "block" }}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <p style={{ background: "tomato" }}>
                <h2>Rang card game</h2>
              </p>
              <div style={{ marginTop: "50px", display: "inline" }}>
                {" "}
                <a class="nav-item nav-link" href="#">
                  Distribute
                </a>
                <a class="nav-item nav-link" href="#">
                  declare winner
                </a>
                <a class="nav-item nav-link" href="#">
                  Endgame
                </a>
                <a class="nav-item nav-link" href="#">
                  Choose 1 player
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
              </div>

              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav"></div>
              </div>
            </nav>
            <div></div>

            <div className="count">
              <button type="button" class=" mb-3 btn btn-success">
                Players online: <span class="badge badge-light"> </span>
              </button>
              <div>The Winner is {this.state.Winner}</div> 
            </div>

            <br />

            <div class="row">
              <div
                class="card text-white bg-primary mb-3"
                style={{ "max-width": "18rem", float: "left" }}
              >
                <div class="card-header">{player1Name}</div>
                <div class="card-body">
                  <h5 class="card-title"></h5>
                  <p class="card-text"></p>
                </div>
              </div>

              <div class="deck">
                <div class="card">
                  <div class="value">
                    {this.state.Activecomingbac1 != null   ? this.state.Activecomingbac1.value : ""}
                   
                  </div>
                  <div
                    className={
                      this.state.Activecomingbac1 != null   ? this.state.Activecomingbac1.name : ""
                    }
                  ></div>
                </div>
              </div>

              <div class="col-4 mb-3"></div>

              <div class="col-4 mb-3"></div>

              <div
                class="card text-white bg-primary mb-3"
                style={{ "max-width": "18rem", float: "right" }}
              >
                <div class="card-header">{player2Name}</div>
                <div class="card-body">
                  <h5 class="card-title"></h5>
                  <p class="card-text">cards coming...</p>
                </div>
              </div>
            </div>
            <div class="deck">
                <div class="card">
                  <div class="value">
                    {this.state.Activecomingbac2 != null   ? this.state.Activecomingbac2.value : ""}
                  </div>
                  <div
                    className={
                      this.state.Activecomingbac2 != null   ? this.state.Activecomingbac2.name : ""
                    }
                  ></div>
                </div>
              </div>
                    

            <div class="row">
              <div
                class="card text-white bg-primary mb-3"
                style={{ "max-width": "18rem", float: "left" }}
              >
                <div class="card-header">{player3Name}</div>

                <div class="card-body">
                  <h5 class="card-title"></h5>
                  <p class="card-text">cards coming...</p>
                </div>
              </div>

              <div class="deck">
                <div class="card">
                  <div class="value">
                    {this.state.Activecomingbac3 != null   ? this.state.Activecomingbac3.value : ""}
                  </div>
                  <div
                    className={
                      this.state.Activecomingbac3 != null   ? this.state.Activecomingbac3.name : ""
                    }
                  ></div>
                </div>
              </div>

              <div class="col-4 mb-3"></div>
              <div class="col-4 mb-3"></div>
              <div
                class="card text-white bg-primary mb-3"
                style={{ "max-width": "18rem", float: "right" }}
              >
                <div class="card-header">{player4Name}</div>
                <div class="card-body">
                  <h5 class="card-title"></h5>
                  <p class="card-text">cards coming...</p>
                </div>
              </div>

              <div class="deck">
                <div class="card">
                  <div class="value">
                    {this.state.Activecomingbac4 != null   ? this.state.Activecomingbac4.value : ""}
                  </div>
                  <div
                    className={
                      this.state.Activecomingbac4 != null   ? this.state.Activecomingbac4.name : ""
                    }
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div >
               
                  {cardsItems} 
                 
              </div>
        </div>
      </>
    );
  }
}
export default Playarea;
