import React, { Component } from 'react';
import button from 'assets/images/button.png';
import './Home.css';

export default class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="Home">
        <a href="/games">
          <img src={button} className="homeButton" alt="get started!" />
        </a>
      </div>
    );
  }
}
