import React from "react";
import Navbar from "components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import { About, Home, Game } from "components/pages/index";
import { Snake, Breakout } from "components/pages/index";
import { jwtDecode } from "jwt-decode";
import { graphQLFetch } from "components/api";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: 0,
        email: "",
        name: "",
      },
      loginStatus: false,
      weather: {},
      theme: {},
    };
    this.loadUser = this.loadUser.bind(this);
    this.addGoogleUser = this.addGoogleUser.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.callWeatherAPI = this.callWeatherAPI.bind(this);
    this.setThemeByWeather = this.setThemeByWeather.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.weather !== this.state.weather) {
      this.setThemeByWeather(this.state.weather);
    }
    if (prevState.loginStatus !== this.state.loginStatus) {
      this.callWeatherAPI();
    }
  }

  async setThemeByWeather(weatherData) {
    const API_BASE_URL =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_BASE_URL
        : "";
    const response = await axios.post(`${API_BASE_URL}/api/generate-theme`, {
      weather: weatherData,
    });
    const new_theme = response.data;
    this.setState({ theme: new_theme }, () => {
      console.log("Theme data:", this.state.theme);
    });
  }

  async callWeatherAPI() {
    if (this.state.loginStatus === false) {
      console.log("User not logged in, cannot call weather API");
      return;
    }
    const API_KEY = "d8107de69027443cbf0141215242110";
    const API_URL = "http://api.weatherapi.com/v1/current.json";
    const location = "Singapore";
    const response = await axios.get(
      `${API_URL}?key=${API_KEY}&q=${location}&aqi=no`,
    );
    this.setState({ weather: response.data }, () => {
      console.log("Weather data:", this.state.weather);
    });
  }

  loggedIn() {
    this.setState({ loginStatus: true });
  }

  loggedOut() {
    this.setState({ loginStatus: false });
  }

  async loadUser(user) {
    const query = `
      query Query($email: String!) {
        getGoogleUser(email: $email) {
          id
          email
          name 
        }
      }
    `;
    console.log(user);
    if (!user) {
      console.log("No user data");
      return;
    }
    const { email } = user.addGoogleUser;
    const data = await graphQLFetch(query, { email: email });
    this.setState({ user: data.getGoogleUser }, () =>
      console.log("successfully set up user:", this.state.user),
    );
  }

  async addGoogleUser(credentialResponse) {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);
    if (!decoded) {
      console.log("No decoded data");
      return;
    }
    if (!decoded.email_verified) {
      console.log("Email not verified");
      return;
    }
    const googleUser = {
      name: decoded.name,
      email: decoded.email,
    };
    const query = `
      mutation Mutation($user: GoogleUserInput!) {
        addGoogleUser(user: $user) {
          id
          email
          name
        }
      }
    `;
    const data = await graphQLFetch(query, { user: googleUser });
    console.log(data);
    this.loadUser(data);
    return data;
  }

  render() {
    return (
      <div className="App">
        <Navbar
          loginStatus={this.state.loginStatus}
          addGoogleUser={this.addGoogleUser}
          loggedIn={this.loggedIn}
          loggedOut={this.loggedOut}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Game />} />
          <Route
            path="/games/snake"
            element={
              <Snake
                theme={this.state.theme}
                callWeatherAPI={this.callWeatherAPI}
                weather={this.state.weather}
                user={this.state.user}
                loginStatus={this.state.loginStatus}
              />
            }
          />
          <Route
            path="/games/breakout"
            element={
              <Breakout
                theme={this.state.theme}
                callWeatherAPI={this.callWeatherAPI}
                weather={this.state.weather}
                user={this.state.user}
                loginStatus={this.state.loginStatus}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
