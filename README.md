# Card-X

Card-X is a personalized e-cards messaging app that allows users to send e-cards to their friends and family. Users can choose from a variety of card templates, add a personalized message, and send the card to a recipient via email. The app also allows users to save their favorite cards and view a history of sent cards.

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Installation Instructions](#installation-instructions)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [Development Guidelines](#development-guidelines)
  - [Screenshots or Demos](#screenshots-or-demos)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Installation Instructions

To run this application on your local machine, you will need Node.js and MongoDB installed.

1. Clone the repository
2. Install the dependencies by running `npm install` in your terminal
3. Start your MongoDB service (you may use a local MongoDB server or MongoDB Atlas)
4. Create a `.env` file for environment variables in your root directory 
5. Run `npm start` to start the server and react app

## Usage

After logging in, you can browse through our collection of card templates and choose one that you like. Click on a card to personalize your message and send it to your friends or family via email. Your sent cards will be stored in your account for future reference.

## Project Structure

This project uses a standard MVC structure and is organized into a `client` directory for front-end React code, and a `server` directory for back-end Node.js/Express.js code. The `server` directory contains models, routes, and utilities.

## Technologies Used

- [React](https://www.npmjs.com/package/react)
- [MongoDB](https://www.npmjs.com/package/mongodb)
- [Node](https://www.npmjs.com/package/node)
- [Express](https://www.npmjs.com/package/express)

## Development Guidelines

We aim to keep our code clean and well-commented. All contributors should adhere to the following guidelines:
- Use camelCase for variable and function names
- Use ES6 arrow functions where possible
- Add comments to your code

## Screenshots or Demos

TODO: Include screenshots or links to demo videos showcasing the user interface or key features of the application.

## Contributing

We welcome contributions to Card-X! If you'd like to contribute, you can fork our repository, make your changes, and submit a pull request. We suggest using feature branches to avoid conflicts.

## Authors

- [Jose Escoto](https://github.com/escotoj)
- [Phuong To](https://github.com/phuongtoVN)
- [Dan McKay](https://github.com/DanielFMcKay)
- [Rosa Garcia](https://github.com/saway11)
- [Jonathan Fadera](https://github.com/JonathanFadera)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

We would like to thank our Bootcamp instructors and TAs for their constant support and guidance. We would also like to acknowledge the following libraries and packages that have made this project possible:
- Apollo Server: For providing a robust solution for GraphQL server.
- Material UI: For providing beautiful, pre-built React components.
