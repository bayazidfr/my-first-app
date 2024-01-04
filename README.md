# FlashCard App

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **FlashCard App** is a powerful and intuitive tool designed to help users effortlessly create, manage, and study flashcards. Whether you're a student preparing for exams or someone with a passion for continuous learning, this application offers a user-friendly interface to cater to all your flashcard needs.

**Key Features:**

- Create, edit, and delete flashcards with ease.
- Seamlessly sort and filter flashcards for quick access.
- Quickly search for specific flashcards to streamline your study sessions.
- Effortlessly flip flashcards to reveal answers and test your knowledge.

## Demo

Explore the app online: [FlashCard App Demo](https://bayazidfr.github.io/my-first-app/)

## Installation

To run the **FlashCard App** locally on your machine, follow these straightforward steps:

1. Clone the GitHub repository to your local machine:

    ```shell
    git clone https://github.com/bayazidfr/my-first-app.git
    ```

2. Navigate to the project directory:

    ```shell
    cd my-first-app
    ```

3. Install the required dependencies:

    ```shell
    npm install
    ```

## Usage

Here's how to use the **FlashCard App** effectively:

1. Start the JSON-Server to serve flashcard data on port 5000:

    ```shell
    json-server --watch db.json --port 5000
    ```

2. Start the React app:

    ```shell
    npm start
    ```

3. Open your web browser and access the app at [http://localhost:3000](http://localhost:3000).

**App Usage:**

- **Add New Flashcards:** Simply fill out the form in the "FlashCardPage" section.
- **See Newly Added Flashcards:** Just refresh the page to view your new additions.
- **Manage Flashcards:** Utilize the FlashCardList component to handle your flashcards efficiently.
- **Search for Flashcards:** Take advantage of the search bar to quickly locate specific flashcards.
- **Filter Flashcards:** Choose from various status options, including All, Learned, Want to Learn, and Noted.
- **Edit and Delete Flashcards:** Conveniently use the provided buttons within each card.
- **Flip Flashcards:** Click on the cards to seamlessly reveal their back side and test your knowledge.

## Technologies Used

The **FlashCard App** is built with the following technologies:

- **React:** A widely-used JavaScript library for creating user interfaces.
- **JSON-Server:** A comprehensive fake REST API solution that requires zero coding, providing quick and easy data management.

## Contributing

Contributions to the **FlashCard App** are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request to the `master` branch of the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
