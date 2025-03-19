import React, { Component } from 'react';
import './Breakout.css';
import data from './Data/data';
import {
  ballMovement,
  ballReflect,
  paddleMovement,
  renderBrick,
  brickList,
  brickReflect
} from './Functions';
import {
  graphQLFetch,
  getWeatherIcon,
  syncBreakoutGameQuery,
  getBreakoutGameQuery
} from 'components/api/index';

export default class Breakout extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.ball = { ...data.ballObj };
    this.bricks = [];
    this.paddle = { ...data.paddleObj };
    this.mouseX = 400;
    this.state = {
      score: 0,
      colors: ['grey', '#606060'],
      isPaused: true,
      gameOver: false,
      height: 500,
      width: 800
    };
    this.gameLoop = this.gameLoop.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.syncGameState = this.syncGameState.bind(this);
    this.loadGameState = this.loadGameState.bind(this);
  }
  componentDidMount() {
    this.props.callWeatherAPI();
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
    this.bricks = brickList(this.canvas, data.brickObj);
    document.addEventListener('keydown', this.handleKeyDown);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.gameLoop();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }

  // Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was receivedUnderstand this errorAI
  // seems like adding this handleKeyDown eventlistner will cause this error.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isPaused && !this.state.isPaused) {
      this.gameLoop();
    }
    if (!prevState.isPaused && this.state.isPaused) {
      this.syncGameState();
    }
  }

  async syncGameState() {
    const { ball, bricks } = this;
    const { score } = this.state;
    const { id } = this.props.user;
    if (!id) {
      console.log('No user id found, cannot sync game state');
      return false;
    }
    const gameState = {
      id: id,
      bricks: bricks,
      ball: ball,
      score: score
    };
    const query = syncBreakoutGameQuery;
    await graphQLFetch(query, { breakoutGame: gameState });
    console.log('Synced Game States');
    return true;
  }

  async loadGameState() {
    const { id } = this.props.user;
    if (!id) {
      console.log('No user id found, cannot load game state');
      return false;
    }
    const query = getBreakoutGameQuery;
    console.log(id);
    const data = await graphQLFetch(query, { getBreakoutGameId: id });
    console.log(data);
    if (!data.getBreakoutGame) {
      console.log('No game state found for user');
      return false;
    }
    const { ball, bricks, score } = data.getBreakoutGame;
    this.setState({
      score: score
    });
    this.ball = ball;
    this.bricks = bricks;
    console.log('Loaded Game States:', data);
    this.gameLoop();
    return true;
  }

  handleKeyDown(event) {
    if (event.code === 'Space') {
      event.preventDefault();
      this.setState({ isPaused: !this.state.isPaused }, () =>
        console.log('is Paused: ', this.state.isPaused)
      );
    }
  }

  handleMouseMove(event) {
    const rect = this.canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    this.mouseX = mouseX;
  }

  handleRestart() {
    this.setState({ gameOver: false, isPaused: true, score: 0 });
    this.mouseX = 400;
    this.ball = { ...data.ballObj };
    this.paddle = { ...data.paddleObj };
    this.bricks = brickList(this.canvas, data.brickObj);
    this.gameLoop();
  }

  gameLoop() {
    console.log('game loop');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    renderBrick(this.ctx, this.canvas, this.bricks, this.state.colors);
    ballMovement(this.ctx, this.ball);
    const isGameOver = ballReflect(this.ball, this.canvas, this.paddle);
    console.log(isGameOver);
    if (isGameOver) {
      this.setState({ gameOver: true });
      return;
    }
    brickReflect(this.ball, this.bricks, this.state.score, (new_value) => {
      this.setState({ score: new_value });
    });
    paddleMovement(this.ctx, this.paddle, this.mouseX);
    console.log(this.state.isPaused);
    if (this.state.isPaused) {
      return;
    }
    requestAnimationFrame(this.gameLoop);
  }

  render() {
    const { gameOver } = this.state;
    const weatherIcon = getWeatherIcon(this.props.weather);
    const { theme } = this.props;
    return (
      <div
        className="breakout"
        style={{ backgroundColor: theme['background-color'] }}
      >
        <div className="breakout-title" style={{ color: theme['color'] }}>
          <div className="score">{`Score: ${this.state.score}`}</div>
          <div className="title">
            <h1>Breakout Game</h1>
          </div>
          <div className="weather-icon">
            <img src={weatherIcon} alt="weather-icon" />
          </div>
        </div>
        <div
          className="breakout-container"
          style={{ backgroundColor: theme['board-color'] }}
        >
          <div className="canvas-wrapper">
            <canvas
              id="breakout-board"
              ref={this.canvasRef}
              width={String(this.state.width)}
              height={String(this.state.height)}
            ></canvas>
            {gameOver && <h1 className="game-over-text">Game Over</h1>}
          </div>
        </div>
        <div className="reset-text">
          <p className="text">{'Press <Space> to Start the Game'}</p>
          <div className="buttons">
            <button className="restart-button" onClick={this.handleRestart}>
              Restart Game
            </button>
            {this.props.loginStatus === true ? (
              <button className="load-button" onClick={this.loadGameState}>
                Load Game
              </button>
            ) : (
              <button className="load-button" disabled>
                Login to load Game
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
