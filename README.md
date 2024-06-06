# Lol_stats

This project was made to learn Docker based on the Season 13 League of Legends dataset.

## Table of Contents

- [Project Description](#project-description)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Authors](#authors)

## Project Description

The aim of our project was to create an application that allows users to analyze and compare statistics of characters from the 13th ranked season of League of Legends. The application offers a comprehensive overview of various data regarding champions, such as win rate, pick rate, and ban rate. Additionally, users can analyze the KDA (Kill/Death/Assist Ratio) for each character, which provides a more detailed understanding of champion effectiveness in the game.

### Features

- **Champion Data**: Access to all champions from Season 13.
- **Filtering**: Filter champions by role (TOP, JUNGLE, MID, ADC, SUPPORT).
- **Searching**: Search champions by name.
- **Sorting**: Sort champions alphabetically, by win rate, pick rate, and ban rate.
- **Charts**: View charts displaying pick rate, ban rate, and win rate for all or selected roles.
- **User Authentication**: Simple user login and registration.


## Technologies

The project uses the following technologies:

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Docker for containerization

## Requirements

- Node.js (version 14.x or higher)
- Docker and Docker Compose

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install frontend dependencies:
    ```bash
    cd front
    npm install
    ```

3. Install backend dependencies:
    ```bash
    cd ../back
    npm install
    ```

## Running the Project

### Running with Docker Compose

1. Run the command:
    ```bash
    docker-compose up
    ```

### Running without Docker

1. Run the backend:
    ```bash
    cd backend
    npm start
    ```

2. Run the frontend:
    ```bash
    cd ../frontend
    npm start
    ```

## Authors

- **Mateusz Martyna** - [GitHub](https://github.com/MenLine1)
- **Jakub Matraszek** - [GitHub](https://github.com/Maatras)
