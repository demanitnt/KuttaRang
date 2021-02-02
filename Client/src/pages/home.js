import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render()
    {
        return(
            <div className="home">
            <selection>
            <div className="jumbotron jumbotron-fluid py-5"    >
            <div className="container text-conter py-5>">
            <h1 className="display-4"> Welcome to <h2 className="display-1">
            <p style={{ background: "tomato"}}> Rang Game</p></h2></h1>
            <p className="lead"> A Great Place to Play Rang Cards Game </p>
            <div className="mt-4">
            <Link className="btn btn-primary px-5 mr-3" to="/signup"> 
            Create New Account  </Link>
            <Link className="btn btn-primary px-5 mr-3" to="/login"> 
            Login to Your Account</Link>
            
             
                
                
                
                </div>
            

            </div>
            
            </div>


            </selection>
            </div>
        )
    }
}