import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import logo from "assets/gameImages/logo.png";
import "./Navbar.css";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const links = [
      { href: "/games", text: "Games" },
      { href: "/about", text: "About" },
    ];
    return (
      <nav>
        <Link to="/" className="site-title">
          <img src={logo} alt="RPD logo" />
          RPD
        </Link>
        <div className="menu" onClick={() => this.toggleMenu()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={this.state.menuOpen ? "open" : ""}>
          {links.map((link, idx) => (
            <li key={idx} className="nav-items">
              <NavLink to={link.href}>{link.text}</NavLink>
            </li>
          ))}
          {this.props.loginStatus === false ? (
            <li className="google-login">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  (async () => {
                    await this.props.addGoogleUser(credentialResponse);
                    this.props.loggedIn();
                    console.log("Login Successful");
                  })();
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </li>
          ) : (
            <li className="google-logout">
              <button
                onClick={() => {
                  (async () => {
                    await googleLogout();
                    this.props.loggedOut();
                    console.log("Logged out");
                  })();
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
