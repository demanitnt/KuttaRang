const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require("constants");
const express = require("express");
const http = require("http");
const { emit, on } = require("process");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001; 
const index = require("./routes/index");

const app = express(); 
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);  
  
let interval;
var users = [];
let CP1;
let CP2; 
let CP3;
let CP4; 
let AC1;
let AC2; 
let AC3;  
let AC4;
let SID=[];

  
 io.on(  "connection", (socket) =>    


   
 

 {    
  socket.on("ActiveCardGoing", (c, currentID)=>{     
    console.log("This is from client",c,currentID)    
    io.in(users[0].socketId).in(users[1].socketId).in(users[2].socketId).in(users[3].socketId).emit("Activecardback", c, currentID )
      
  }) 


  socket.on("WinnerDecission",(ACB1)=>{ 
    console.log("This is data winnerDecission",)
  const ClickedCardArray=[];
  if(ACB1.ACB1!==null && ACB1.ACB2!==null &&ACB1.ACB3!==null && ACB1.ACB4!==null ){
  ClickedCardArray[0]=ACB1.ACB1;
  console.log("This is clickedarrady 0 winnerDecission",ACB1)
  ClickedCardArray[1]=ACB1.ACB2;
  // .Activecomingbac2;
  ClickedCardArray[2]=ACB1.ACB3;
  // .Activecomingbac3;
  ClickedCardArray[3]=ACB1.ACB1;
  // .Activecomingbac4;

    let winner=1; 
    max= ClickedCardArray[0]
    console.log("The index of max",ClickedCardArray.indexOf(max))
    for (i=1; i<4;i++)
    {
    if (ClickedCardArray[i].name=== max.name) 
     {
       if(ClickedCardArray[i].value> max.value) 
      max=ClickedCardArray[i];
      
      else continue;}
     }
    
     winner=ClickedCardArray.indexOf(max);
     if(winner===0)
     {winner="Player 1"}
     if(winner===1)
     {winner="Player 2"}
     if(winner===2)
     {winner="Player 2"}
     if(winner===3)
     {winner="Player 3"}
     
     
      io.in(users[0].socketId).in(users[1].socketId).in(users[2].socketId).in(users[3].socketId).emit("Winnerback",  )     
  }
  
  })
     
  

    // console.log("This is from client on click",c, "and ",socketid,"and user[0].socketid",users[0].socketId) 
    // if(socketid===users[0].socketId){
    //     io.in(users[0].socketId).emit("Activecardback", {ClickedCard1:c})
    //     console.log("This is by client 1",socketid,"and : ",users[0].socketId, "and clicked on ",c)}
    // else if (socketid===users[1].socketId) {
    //  io.in(users[1].socketId).emit("Activecardback",{ClickedCard2:c})
    //  console.log("This is by client 2",socketid,"and : ",users[1].socketId,"and clicked on ",c)}
    //  else if (socketid===users[2].socketId){
    // io.in(users[2].socketId).emit("Activecardback",{ClickedCard3:c}) 
    // console.log("This is by client 3",socketid,"and : ",users[2].socketId,"and clicked on ",c)  }
    // else if (socketid===users[3].socketId){ 
    //  io.in(users[3].socketId).emit("Activecardback",{ClickedCard4:c})      
    //  console.log("This is by client 4",socketid,"and : ",users[3].socketId,"and clicked on ",c)} 
// } 
// )  
 
  
  
                                    socket.on("RequestCreateRoom", (data) => {
                                                      users.push({ ...data, socketId: socket.id });  
                                                      socket.join(data.code);
 
                                                      console.log(data.code); 

                                                      console.log(socket.id);
                                                      console.log("this is data:", users);
                                                      console.log(io.sockets.adapter.rooms.get(data.code).size);
                                                      socket.emit("RoomCreated", true, users);
                                                    //   socket.on("ActiveCardGoing", c=>{    
                                                    //     console.log("This is from client on click",c)  
                                                    //    socket.to(users[0].socketId).emit("Activecardback", c)
                                                    //     socket.to(users[1].socketId).emit("Activecardback", c)
                                                    //     socket.to(users[2].socketId).emit("Activecardback", c)
                                                    //     socket.to(users[3].socketId).emit("Activecardback", c) 
                                                    // } 
                                                    // ) 
                                                                              } 
                                              );

  function MakeCard() { 
                          let c = [];
                          console.log("Sala makecard chala");

                          for (let i = 0; i < 13; i++) c[i] = { name: " suit Spade", title: i - 11, value: i + 2 };

                          for (let i = 13; i < 26; i++)
                          c[i] = { name: "suit diamonds", title: i - 11, value: i - 11 };

                          for (let i = 26; i < 39; i++) c[i] = { name: "suit clubs", title: i - 11, value: i - 24 };

                          for (let i = 39; i < 52; i++) c[i] = { name: "suit hearts", title: i - 11, value: i - 37 };

                      const Shuffled = c.sort(() => 0.5 - Math.random());

                          CP1 = Shuffled.slice(0, 13);   
                          CP2 = Shuffled.slice(13, 26);  
                          CP3 = Shuffled.slice(26, 39);   

                          CP4 = Shuffled.slice(39, 52);
                      }

   
  socket.on("JoinRoom", (data) =>     
              {
                  console.log(io.sockets.adapter.rooms.get(data.roomid));
        
                if (io.sockets.adapter.rooms.get(data.roomid))  
                
                {   
                      var ids = io.sockets.adapter.rooms.get(data.roomid).size;    
                      console.log(ids);
 
                    if (io.sockets.adapter.rooms.get(data.roomid).size < 4) 
                          {    
               
                                data.id = ids + 1;
                                users.push({ ...data, socketId: socket.id }); 
                    socket.join(data.roomid);
                    socket.to(data.roomid).emit("NewPlayerJoined", users);
                    socket.emit("Youjoined", users, true);
        
                              if (io.sockets.adapter.rooms.get(data.roomid).size == 4) 
                                    {   
                                          MakeCard();
                    
                                      //  socket.emit("Cardcoming", CP4);
                                       io.in(users[0].socketId).emit("Cardcoming", CP1);
                                       io.in(users[1].socketId).emit("Cardcoming", CP2);
                                       io.in(users[2].socketId).emit("Cardcoming", CP3);
                                              console.log("this is cp4", CP4);
                                       io.in(users[3].socketId).emit("Cardcoming", CP4); 
          
                                    //    socket.on("ActiveCardGoing", c=>{    
                                    //     console.log("This is from client on click",c)  
                                    //    socket.to(users[0].socketId).emit("Activecardback", c)
                                    //     socket.to(users[1].socketId).emit("Activecardback", c)
                                    //     socket.to(users[2].socketId).emit("Activecardback", c)
                                    //     socket.to(users[3].socketId).emit("Activecardback", c) 
                                    // } 
                                    // )  
          
                                       
                                    } 
    
                              else   
                                    {
                                      socket.emit("Roomfull", "Room Full");
                                    }
                          } 
                }
              
              }
            );

  // Emitting a new message. Will be consumed by the client 

}

                        )          
server.listen(port, () => console.log(`Listening on port ${port}`));
  
  

