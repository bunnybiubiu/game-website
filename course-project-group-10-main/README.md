[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/eD9oPTLm)
# RetroPlay DUO
**Name: Ziqi Jin**

**Matric Number: A0290561E**

**Email: E1326014@u.nus.edu**
## Problem Statements
+ Project Title
  ### RetroPlay DUO
+ 4-5 line description of the project

  * This is a game website that includes some retro games. The users can comment and rate the game below each of them. There is also a gaming community feature where users can post pictures and text. The website will only contain two games right now including **Snake** and **Brick Breaker**. The website theme will change according to the website.

+ What APIs Are Used
  * **Weather API**
  * **GPT API**
  * **Google Oauth API**

+ Figma design (if completed)
![alt text](https://github.com/IT5007-2410/course-project-group-10/blob/main/pic/main_page/figma.png)
+ First Consultation (Suggestions From Professor)
  1. figma design
  2. start coding
  3. figure out what needs to go into the front end and back end
  4. Code 1 game first
  5. Todo for later: integrate with weather api and gpt api
+ Second Consultation
  1. Google API for auth
  2. Save status of the game in the backend.
  3. Save multiple games for a particular user.
  4. Weather API + ChatGPT to apply custom themes for users.

# Introduction to Features in the Website
## Navigation Bar
### contents
1.	Home Page - Provides users with an easy way to return to the main landing page.
2.	Game - Directs users to the game section, allowing quick access to play.
3.	About - Offers information about the project, helping users understand its purpose and features.
### feature
The navigation bar includes a responsive hamburger menu that automatically adjusts based on screen size. On smaller screens, it condenses into a simple icon, expanding to display links to Home, Game, and About sections for easy access.

![alt text](https://github.com/IT5007-2410/course-project-group-10/blob/main/pic/main_page/navbar.png)
## Home Page
![alt text](https://github.com/IT5007-2410/course-project-group-10/blob/main/pic/main_page/home.png)
## Game Page
### contents
1. The game page displays two game images: 'Snake' and 'Breakout'.
2. Users can click the images to start playing the respective game.
### features
1. **Interaction**: Each game image responds to mouse hover by zooming in to indicate interactivity.


![alt text](https://github.com/IT5007-2410/course-project-group-10/blob/main/pic/game_image/games.png)
## Snake Game
### features
1. **Snake Game Page**: A classic Snake game enhanced with additional features.
2. **Save and Load Game State**: Players can save the current game state by pressing the space bar, provided they are logged in. Saved game states can also be loaded from the database for continuity.
3. **Dynamic Theme Colors**: The game uses the Weather API and GPT API to generate a unique theme color scheme for fonts, backgrounds, and the game board, creating a dynamic, personalized experience.
4. **Weather Icon**: A weather icon is displayed to forecast local weather, keeping players informed while they play.

![alt text](https://github.com/IT5007-2410/course-project-group-10/blob/main/pic/game_image/snake.png)
## Brakout Game
### features
1. **Brick Breakout Game Page**: A classic Brick Breakout game built with enhanced functionality for saving and managing game progress.
2. **Save and Load Game States**: Players can save multiple game states, with each state linked to their user account. Saved games can be reloaded for continued gameplay, as long as the user is logged in.
3. **HTML Canvas for Performance**: The game is developed using the HTML <canvas> element for fast response and rendering, ensuring smooth gameplay.
4. **Controls and Features**: Players can press the space bar to pause, resume, or save the game state. A restart button is also provided to start a new game easily.
5. **Dynamic Theme Colors**: Integrated Weather API and GPT API dynamically generate theme colors based on the weather and time of day. For example, darker, eye-friendly colors are used at night to enhance the playing experience.

![alt text](https://github.com/IT5007-2410/course-project-group-10/blob/main/pic/game_image/breakout.png)
## About Page
![alt text](https://github.com/IT5007-2410/course-project-group-10/blob/main/pic/main_page/about.png)
using a template for this about page: [W3schools Link](https://www.w3schools.com/howto/howto_css_about_page.asp)

# Rubric Fullfilment
## General
+ **Relevance of Problem Statement**: The RetroPlay DUO project capitalizes on the growing interest in personalized and immersive digital experiences. By blending nostalgic retro games with cutting-edge technologies like the GPT and Weather APIs, the project meets a unique niche in the gaming industry. This combination allows users to experience classic games in new ways that adapt to both their personal preferences and real-time environmental conditions, making the gaming experience highly relevant in today’s technology-driven society. The relevance is underscored by the increasing demand for interactive and adaptive digital content, positioning RetroPlay DUO as a forward-thinking solution in entertainment technology.
+ **Solution Architecture**: RetroPlay DUO is built on a modern, scalable technology stack that ensures a responsive and engaging user experience:
  * **Frontend**: The RetroPlay DUO platform is developed using Create React App, which sets up a modern React application by configuring the build environment with best practices. This foundation allows for efficient development and easy maintenance.
For navigation within the single-page application, React Router is employed via the react-router-dom package. It manages the application's routes, enabling bookmarkable URLs and ensuring users can navigate easily between the different sections of the site, such as individual game interfaces and community pages. This approach helps in maintaining a seamless and dynamic user experience without full page reloads, crucial for the interactive features driven by real-time APIs.
  * **Backend**: The backend of RetroPlay DUO is powered by Node.js and Express, which provide a robust server-side solution capable of handling API integrations, data processing, and user session management efficiently. The integration of GraphQL enhances these capabilities by allowing precise and flexible data queries and mutations, which streamlines interactions with the MongoDB database. This setup is ideal for supporting the real-time functionality of the platform, enabling quick and non-blocking data operations crucial for a seamless user experience.
  * **Database**: Our database is structured to efficiently manage user data and game states for the RetroPlay DUO platform. User data and game states for Snake and Brick Breaker are stored in separate collections, streamlining the organization and retrieval processes. This approach enhances the manageability of the database, allowing for quick access and updates to user profiles and game progress. This organizational strategy supports the dynamic content adaptation of the platform and ensures a personalized gaming experience by efficiently handling the data specific to each user and game.
+ **Legal Aspects and Business Model**: RetroPlay DUO is envisioned as an open-source project, which encourages community collaboration and innovation, allowing developers from around the world to contribute to its development. This approach not only accelerates problem-solving and feature expansion but also helps in building a dedicated user base. For monetization, the project can adopt advertising models, affiliate marketing, and potentially premium accounts that offer exclusive features or ad-free experiences, providing a steady revenue stream while keeping the core offerings accessible.
+ **Competition Analysis**: The gaming market is saturated with both modern and retro gaming solutions; however, RetroPlay DUO differentiates itself by integrating real-time environmental data and AI-driven content customization into the gaming experience. This not only sets the platform apart from traditional retro game emulators but also from modern gaming platforms that lack this level of personalization and adaptability. By focusing on these innovative features, RetroPlay DUO is well-positioned to capture the interest of users who seek a more engaging and tailored gaming experience, giving it a competitive edge in a fast-evolving market.

## Implementation
### FrontEnd Strucutre Overview
The front-end of RetroPlay DUO is meticulously organized to ensure that each major section of the application operates independently, enhancing maintainability and scalability. Here’s a breakdown of the structure.

```
src$ tree -L 6
.
├── App.css
├── App.jsx
├── App.test.js
├── assets
│   ├── gameImages
│   │   ├── Games_Background.png
│   │   ├── breakout.png
│   │   ├── logo.png
│   │   └── snake.png
│   └── images
│       ├── background.png
│       └── button.png
├── components
│   ├── Navbar.css
│   ├── Navbar.jsx
│   ├── api
│   │   ├── getBreakoutGameQuery.js
│   │   ├── getWeatherIcon.js
│   │   ├── graphQLFetch.jsx
│   │   ├── index.js
│   │   └── syncBreakoutGameQuery.js
│   └── pages
│       ├── About
│       │   ├── About.css
│       │   └── About.jsx
│       ├── Game
│       │   ├── Game.css
│       │   ├── Game.jsx
│       │   └── Games
│       │       ├── Breakout.css
│       │       ├── Breakout.jsx
│       │       ├── Data
│       │       │   └── data.js
│       │       ├── Functions
│       │       │   ├── ballMovement.js
│       │       │   ├── ballReflect.js
│       │       │   ├── brickList.js
│       │       │   ├── brickReflect.js
│       │       │   ├── index.js
│       │       │   ├── paddleMovement.js
│       │       │   └── renderBrick.js
│       │       ├── Snake.css
│       │       └── Snake.jsx
│       ├── Home
│       │   ├── Home.css
│       │   └── Home.jsx
│       └── index.js
├── index.css
├── index.jsx
├── reportWebVitals.js
└── setupTests.js
```
+ **Navbar Component**: Acts as the central navigation hub of the application, linking to the `Home`, `Game`, and `About` pages. Each link in the Navbar directs to a distinct page component, ensuring that navigation is seamless and intuitive.
+ **Page Component**: `Home`, `Game`, `About`: Each of these pages is encapsulated within its own directory under the pages folder. This separation ensures that modifications to one page do not impact the others, adhering to best practices in software development for modular design.
+ **Game Page Complexity**: The Game page is more complex, hosting the specific components for the Snake and Breakout games. It manages its own state and logic, which are crucial for the interactive elements of the games.
  * **Data Management**: data such as the initial positions and properties of bricks and balls in the Breakout game are stored in `Data/data.js`. This centralization of game data simplifies tweaks and maintenance.
  * **Game Functions**: The logic for game mechanics, such as ball movement, collision detection, and brick setup, is isolated in separate functions within the `Functions` directory. This not only makes the code cleaner and more manageable but also facilitates easier updates and potential expansions in game functionality.
+ **Network Connection and Architecture**: Runs primarily on port `3000`, which is the default port for development servers started by Create React App. This port serves the static and dynamic content of the web application directly to the users' browsers.

## BackEnd Design and Implementation
The backend of RetroPlay DUO is built on Node.js using the Express framework, which serves as the backbone for managing server-side logic and API requests. The system is designed to support complex game state management and user interactions efficiently. Here's an overview of the backend structure and key functionalities:
+ **Node.js and Express**: These technologies provide a robust environment for building efficient, scalable server applications. Express simplifies the routing and middleware setup, making it easier to write secure, modular, and fast applications.
+ **Apollo Server**: Apollo Server: Integrated with Express, Apollo Server supports GraphQL API capabilities, enabling a well-defined schema and efficient data fetching. This setup allows clients to request exactly what they need, reducing overhead and improving the performance of data interactions.
+ **Dynamic Content Adaptation**: An innovative feature of the backend is the integration with OpenAI's API, which is used to dynamically generate theme settings based on current weather conditions fetched from another API. This feature uses AI to tailor the user interface of the games in real-time, enhancing the user experience based on environmental factors.
+ **Security and CORS**: Security is a priority, with CORS settings meticulously configured to allow interactions only from trusted sources, thus protecting against cross-origin vulnerabilities.
+ **Network Connection and Architecture**: Operates on port `8080`. The Express server along with Apollo Server for GraphQL is configured to listen on this port. The backend handles all API requests from the front end, processing these requests, interacting with the database, and returning the necessary data back to the front end.

## Database Design and Implementation
The RetroPlay DUO database, hosted on MongoDB, is meticulously organized into four key collections, each serving distinct purposes within the gaming platform. Here’s an overview of each collection and their roles:
+ `googleUsers`: This collection stores user data for those who register or log in via Google OAuth. Each document in the collection contains user information such as a unique identifier `id`, `name`, and `email`.
+ `counters`: The counters collection is used to maintain a simple counter for the IDs in the googleUsers collection. It holds a single document with a field current that tracks the latest user ID assigned, facilitating the auto-increment functionality when new users are added. A unique index on `id` guarantees that each game state can be uniquely identified and retrieved without conflicts.
+ `snakeGame`: Dedicated to storing the state of the Snake game for each user or session. It includes the game ID (`id`), the current `score`, the positions of the `snake` segments (snake as an array of positions), and the position of the `food`.
+ `breakoutGame`: Similar to the `snakeGame` collection, `breakoutGame` stores the state of the Breakout game sessions. It tracks the game ID, the current score, the positions of all `bricks`, and the position and movement of the `ball`. As with the Snake game, a unique index on `id` ensures that each Breakout game state is uniquely accessible.

## Integration
1. API Integration
   + The front end communicates with the back end primarily through a GraphQL API, served by Apollo Server integrated with Express on the back end. This setup allows for precise and efficient queries and mutations, reducing the amount of unnecessary data transfer and enabling a more responsive user experience.
   + The back end's GraphQL endpoint `/graphql` is configured to handle all data-related interactions, including fetching game states, user data, and processing game interactions.
2. Data Fetching and Updates
   + Using GraphQL, the front end can request specific data it needs, which reduces the load on the network and speeds up response times. For example, when a user logs in, the front end fetches user details via a GraphQL query that retrieves user information based on the provided email.
   + Mutations are used to update data such as game states. When a game of Snake or Breakout is played, the front end sends mutations to the back end to synchronize the game’s progress, including scores, game positions, and other relevant game metrics.
3. Real-Time Data Handling
   + Although not real-time by default, GraphQL can handle dynamic content updates that are essential for game state synchronization. For instance, after pausing a game session, the front end sends a request to update the user’s score and other game details to the back end, which then updates these details in the database.
4. Dynamic Theme Generation
   + The front end can also send requests to the back end for dynamic theme generation based on the current weather. This is done via a separate RESTful endpoint `/api/generate-theme`, where the front end posts the current weather conditions, and the back end uses this data, along with OpenAI's API, to generate a theme that is then sent back to the front end.
5. Security and CORS Configuration
   + CORS(Cross-Origin Resource Sharing): Given that the front end and back end may not always be served from the same origin during development (e.g., front end on `localhost:3000` and back end on `localhost:8080`), configuring CORS is essential. The back end is configured to allow requests from the front end’s origin, ensuring that the browser permits these cross-origin requests.

## Misc Software Engineering Aspects
### Documentation
+ **Comprehensive Coverage**: The RetroPlay DUO project features thorough documentation that covers all aspects of the system architecture, including detailed comments within the codebase to explain the functionality and interaction between components. Documentation also includes set
+ **Accessible and Clear**: Information is structured to be easily accessible to new developers and stakeholders, using clear language and illustrative examples. Each module’s documentation is maintained alongside the code, ensuring coherence and ease of updates.
### Usability 
+ **User-Centric Design**: The RetroPlay DUO interface is designed with a focus on user experience, ensuring that navigation is intuitive and the gaming experience is engaging. Responsive design principles are applied so that the website operates seamlessly across different devices and screen sizes.
+ **Feedback and Interactivity**: The application provides real-time feedback to user actions, such as game state updates and theme changes based on environmental conditions. Interactive elements like buttons and links have clear visual cues to improve usability.

### Modularization/Library Integration
+ **Component-Based Architecture**: The front end is structured around reusable React components, which enhances the maintainability and scalability of the application. Each component is designed to have a single responsibility and can be tested independently.
+ **External LIbraries and Framworks**: Integration with well-established libraries and frameworks like `React`, `Node.js`,`Express`, and `MongoDB` demonstrates effective use of external resources. Apollo Server is used for GraphQL integration, ensuring efficient data fetching and state management.

### Code Originality
+ **Innovative Solutions**: The integration of AI and real-time weather data to customize game themes represents an original approach not commonly seen in retro gaming platforms. This innovation not only enhances user engagement but also showcases the project’s unique blend of technologies.
+ **Unique Game Features**: The adaptation of classic games with new mechanics and AI-driven customization adds originality to the game design, setting RetroPlay DUO apart from typical retro game emulators.

## Novel Features
### Front-End Innovations
+ **Dynamic Theme Adaption: One of the most distinctive features of RetroPlay DUO is the dynamic adaptation of the game interface based on real-time weather conditions. Using the Weather API, the front-end retrieves the current weather and, through integration with the OpenAI API, generates thematic elements that reflect these conditions. For example, on a rainy day, the game themes might incorporate darker, more reflective styles, while sunny weather could brighten the color palette. During night time, generating darker color to protect human eyes.

### Back-End Innovation
  + **Real-Time Data Processing**: The back-end is engineered to handle real-time data efficiently to support the front-end's dynamic theming and personalization features. This includes processing weather data and user preferences on-the-fly to adjust game settings and UI elements instantly.
  + **Goolge OAuth Integration for Enhanced Security and User Management**: The integration of Google OAuth in RetroPlay DUO streamlines the login process and bolsters security. This approach enables secure management of user sessions and data, offering a seamless experience while safeguarding data integrity and privacy. Additionally, the OAuth system is leveraged to manage individual game states, allowing users to save their progress and resume play seamlessly across sessions. This feature not only enhances user convenience but also personalizes the gaming experience by maintaining continuity in gameplay.

### API Integration
  + **Weather API**: Integrated into the core gameplay experience to fetch real-time weather conditions that influence the game’s thematic elements. This API is pivotal for the dynamic theme adaptation feature, making each gaming session unique based on current weather.
  + **Google OAuth API**: Utilized for authenticating users, managing sessions, and personalizing user experiences. This integration not only streamlines the login process but also secures user data and customizes interactions based on user profiles.
  + **OpenAI API**: Employed to generate customizable themes and game elements dynamically. This innovative use of AI distinguishes RetroPlay DUO by providing a responsive and immersive user interface that adjusts according to environmental inputs and user preferences.

# Presentation Video
This is the link for presentation: [presentation google drive](https://drive.google.com/drive/folders/1s7dIGMpg_pbgSsHc4IuuS-pjA7Bgh0kg?usp=sharing)

# Installation
[Installation Instructions](rpd/README.md)
