import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import breakoutImg from 'assets/gameImages/breakout.png';
import snakeImg from 'assets/gameImages/snake.png';
import './Game.css';

export default class Game extends Component {
  render() {
    return (
      <div className="Games-container">
        <div className="Games">
          <Link to="/games/snake" className="parent">
            <img className="child" src={snakeImg} alt="snake image" />
          </Link>
          <h2 className="game-title">Snake</h2>
        </div>
        <div className="Games">
          <Link to="/games/breakout" className="parent">
            <img className="child" src={breakoutImg} alt="breakout image" />
          </Link>
          <h2 className="game-title">Breakout</h2>
        </div>
      </div>
    );
  }
}
