import React, { Component } from "react";
import "./About.css";

export default class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="about-section">
          <h1>About Us Page</h1>
          <h2>
            Welcome to RPD RETROPLAY DUO—your go-to destination for classic
            gaming with a modern twist!
          </h2>
          <p>
            Here at RetroPlay DUO, we’re all about reviving the fun and
            simplicity of retro games while adding new, unique features to make
            them even more engaging. Our website currently offers two beloved
            classics, Snake and Brick Breaker (also known as the breakout game),
            both optimized for a seamless web experience. Whether you’re in for
            a quick nostalgic break or aiming for a new high score, we’ve
            designed RPD RetroPlay DUO to be an immersive, enjoyable place for
            all players. What makes RetroPlay DUO different? We’re committed to
            delivering a rich, adaptive experience.
          </p>
          <ul>
            <h2>Our key features include:</h2>
            <li>
              <strong>Weather-Adaptive Backgrounds</strong>: Let the game change
              with your environment! Our website automatically adjusts its
              background colors to reflect the weather, creating a unique
              atmosphere each time you play.
            </li>
            <li>
              <strong>API Integration</strong>: Our web API enables smooth,
              efficient game interactions, allowing the site to load and respond
              quickly.
            </li>
            <li>
              <strong>Seamless Sign-In and Data Storage</strong>: With easy
              sign-in options and secure data storage, you can save your
              progress and keep track of your game stats effortlessly.
            </li>
          </ul>
          <p>
            We’ve built RPD RetroPlay DUO on a reliable and modern tech stack,
            including React, MongoDB, and GraphQL, so you can count on a
            high-performance, responsive gaming experience every time. Ready to
            dive back into the classics? Join us and bring the retro magic to
            life!
          </p>
        </div>

        <div className="about-head">
          <h2>Our Team</h2>
        </div>
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="container">
                <h2>Ziqi Jin</h2>
                <p className="title">Member 1</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>Ziqi@example.com</p>
                <button className="button">Contact</button>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="container">
                <h2>Xinyue Li</h2>
                <p className="title">Member 2</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>Xinyue@example.com</p>
                <button className="button">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
