import React, { Component } from "react";
import { graphQLFetch, getWeatherIcon } from "components/api/index";
import "./Snake.css";

const BOARD_ROW_SIZE = 20;
const BOARD_COL_SIZE = 20;

export default class Snake extends Component {
  constructor() {
    super();
    this.handleKeyBoard = this.handleKeyBoard.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.getRandomPosition = this.getRandomPosition.bind(this);
    this.syncGameState = this.syncGameState.bind(this);
    this.loadGameState = this.loadGameState.bind(this);
    this.getWeatherIcon = this.getWeatherIcon.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    const initSnake = [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
    ];
    const initFood = this.getRandomPosition(initSnake);
    return {
      board: new Array(BOARD_ROW_SIZE)
        .fill(0)
        .map(() => new Array(BOARD_COL_SIZE).fill(0)),
      snake: initSnake,
      food: initFood,
      direction: "RIGHT",
      directionChanged: false,
      speed: 200,
      paused: true,
      gameOver: false,
      score: 0,
    };
  }

  getWeatherIcon() {
    const { weather } = this.props;
    function isEmptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    if (isEmptyObject(weather)) {
      return null;
    }
    return "http:" + weather.current.condition.icon;
  }

  async loadGameState() {
    const id = this.props.user.id;
    if (!id) {
      console.log("No user id found, cannot load game state");
      return false;
    }
    const query = `
      query getGameByID($getSnakeGameId: Int!) {
        getSnakeGame(id: $getSnakeGameId) {
          direction
          food {
            x
            y
          }
          id
          score
          snake {
            x
            y
          }
        }
      }`;
    const data = await graphQLFetch(query, { getSnakeGameId: id });
    if (!data.getSnakeGame) {
      console.log("No game state found for user");
      return false;
    }
    const { snake, food, direction, score } = data.getSnakeGame;
    this.setState({
      snake: snake,
      food: food,
      direction: direction,
      score: score,
    });
    console.log("Loaded Game States:", data);
    return true;
  }

  async syncGameState() {
    const { snake, food, direction, score } = this.state;
    const id = this.props.user.id;
    if (!id) {
      console.log("No user id found, cannot sync game state");
      return false;
    }
    const gameState = {
      id: id,
      snake: snake,
      food: food,
      direction: direction,
      score: score,
    };
    const query = `
      mutation SyncSnakeGame($snakeGame: SnakeGameInput!){
        syncSnakeGame(snakeGame: $snakeGame) {
          _id
          food {
            x
            y
          }
          id
          score
          snake {
            x
            y
          }
          direction
        }
      }`;
    const data = await graphQLFetch(query, { snakeGame: gameState });
    console.log("Saved Game States:", data);
    return true;
  }
  componentDidMount() {
    this.props.callWeatherAPI();
    window.addEventListener("keydown", this.handleKeyBoard);
    this.interval = setInterval(this.moveSnake, this.state.speed);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyBoard);
    clearInterval(this.interval);
  }

  getRandomPosition = (snake) => {
    let min = 1;
    let max_ROW = BOARD_ROW_SIZE - 1;
    let max_COL = BOARD_COL_SIZE - 1;
    let res = {};
    while (true) {
      res = {
        x: Math.floor(Math.random() * (max_ROW - min)) + min,
        y: Math.floor(Math.random() * (max_COL - min)) + min,
      };
      if (!snake.some((dot) => dot.x === res.x && dot.y === res.y)) break;
    }
    return res;
  };

  moveSnake = () => {
    if (this.state.paused) return;
    let dots = [...this.state.snake];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = { x: head.x + 1, y: head.y };
        break;
      case "LEFT":
        head = { x: head.x - 1, y: head.y };
        break;
      case "DOWN":
        head = { x: head.x, y: head.y + 1 };
        break;
      case "UP":
        head = { x: head.x, y: head.y - 1 };
        break;
      default:
        break;
    }

    if (!this.checkCollision(head)) {
      dots.push(head); // Add new head
      if (!this.checkIfEat(head)) {
        // Check if the snake eats food
        dots.shift(); // Remove the tail segment only if it didn't eat
      }
    }
    this.setState({ snake: dots, directionChanged: false });
  };

  checkCollision(head) {
    const { x, y } = head;
    const { snake } = this.state;
    if (
      x >= BOARD_COL_SIZE ||
      x < 0 ||
      y >= BOARD_ROW_SIZE ||
      y < 0 ||
      snake.slice(0, -1).some((dot) => dot.x === x && dot.y === y)
    ) {
      console.log(snake.slice(0, -1).some((dot) => dot.x === x && dot.y === y));
      this.gameOver();
      return true;
    }
    return false;
  }

  checkIfEat(head) {
    const { food, snake } = this.state;
    if (head.x === food.x && head.y === food.y) {
      this.setState({
        score: this.state.score + 10,
        food: this.getRandomPosition(snake),
        snake: [...snake, head],
      });
      return true;
    }
    return false;
  }

  gameOver() {
    clearInterval(this.interval);
    this.setState({ gameOver: true, paused: true }, () => {
      this.syncGameState();
    });
  }
  handleKeyBoard = (event) => {
    let newDirection;
    if (event.keyCode === 32) {
      if (this.state.gameOver) {
        this.setState(this.getInitialState());
        this.interval = setInterval(this.moveSnake, this.state.speed);
      } else {
        this.setState(
          (prevState) => ({ paused: !prevState.paused }),
          () => {
            this.syncGameState();
          },
        );
      }
      event.preventDefault();
      return;
    }
    switch (event.keyCode) {
      case 37:
        newDirection = "LEFT";
        break; // arrow left
      case 38:
        newDirection = "UP";
        break; // arrow up
      case 39:
        newDirection = "RIGHT";
        break; // arrow right
      case 40:
        newDirection = "DOWN";
        break; // arrow down
      default:
        return;
    }
    event.preventDefault();
    const { direction } = this.state;
    // Prevent the snake from reversing
    if (
      !this.state.directionChanged &&
      !(
        direction === newDirection ||
        (direction === "LEFT" && newDirection === "RIGHT") ||
        (direction === "RIGHT" && newDirection === "LEFT") ||
        (direction === "UP" && newDirection === "DOWN") ||
        (direction === "DOWN" && newDirection === "UP")
      )
    ) {
      this.setState({ directionChanged: true, direction: newDirection });
    }
  };

  render() {
    const { gameOver } = this.state;
    const weatherIcon = getWeatherIcon(this.props.weather);
    const { theme } = this.props;
    return (
      <div
        className="board-container"
        style={{
          backgroundColor: theme["background-color"],
          color: theme["color"],
        }}
      >
        <div className="game-title">
          {this.props.loginStatus === true ? (
            <button
              className="load-button"
              onClick={() => {
                this.loadGameState();
              }}
            >
              Load Saved
            </button>
          ) : (
            <button className="log-button">Login to Load</button>
          )}
          <h1>Snake</h1>
          <h1>Score: {this.state.score}</h1>
          {weatherIcon != null && <img src={weatherIcon} alt="weather icon" />}
        </div>
        <div
          className="board"
          style={{ backgroundColor: theme["board-color"] }}
        >
          {gameOver && (
            <div className="game-over">
              Game Over! Press &lt;Space&gt; To Restart
            </div>
          )}
          {!gameOver &&
            this.state.board.map((row, i) => (
              <div key={i} className="row">
                {row.map((_, j) => (
                  <div
                    key={j}
                    className={`col ${
                      this.state.snake.some((dot) => dot.x === j && dot.y === i)
                        ? "snake-cell"
                        : ""
                    } ${
                      this.state.food.x === j && this.state.food.y === i
                        ? "food-cell"
                        : ""
                    }`}
                  ></div>
                ))}
              </div>
            ))}
        </div>
        <p>{"press <space> to start and pause the game"}</p>
      </div>
    );
  }
}
