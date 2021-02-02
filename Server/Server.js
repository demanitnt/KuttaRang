const express = require("express");
const http = require("http");
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
 
var currentID = io.on(  "connection", (socket) => 

 { 
  socket.on("ActiveCardGoing", c=>{    
    console.log("This is from client on click",c) 
    socket.emit(c); 
    socket.to(users[0].socketId).emit("Activecardback", c) 
     socket.to(users[1].socketId).emit("Activecardback", c)
    socket.to(users[2].socketId).emit("Activecardback", c) 
     socket.to(users[3].socketId).emit("Activecardback", c)   
} 
) 
 
  
  
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

                          for (let i = 0; i < 13; i++) c[i] = { name: " suit Spade", value: i + 2 };

                          for (let i = 13; i < 26; i++)
                          c[i] = { name: "suit diamonds", value: i - 11 };

                          for (let i = 26; i < 39; i++) c[i] = { name: "suit clubs", value: i - 24 };

                          for (let i = 39; i < 52; i++) c[i] = { name: "suit hearts", value: i - 37 };

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
                    
                                       socket.emit("Cardcoming", CP4);
                                       socket.to(users[0].socketId).emit("Cardcoming", CP1);
                                       socket.to(users[1].socketId).emit("Cardcoming", CP2);
                                       socket.to(users[2].socketId).emit("Cardcoming", CP3);
                                              console.log("this is cp4", CP4);
                                       socket.to(users[3].socketId).emit("Cardcoming", CP4); 
          
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
  
  