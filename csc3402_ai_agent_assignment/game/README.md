# Checkers Game with AI Agent

Welcome to the **Checkers Game with AI Agent**! This project implements a traditional checkers game with an AI-powered player that can make strategic moves based on artificial intelligence techniques.

## Table of Contents
- [Installation](#installation)
- [Running the Game](#running-the-game)
- [How the AI Works](#how-the-ai-works)

## Installation

Before running the game, you need to install **Node.js**, which is required for this project.

### 1. Install Node.js
- Download and install the latest version of Node.js from the official website: [Node.js Download](https://nodejs.org/).
- Follow the installation instructions based on your operating system (Windows, Mac, or Linux).

### 2. Installing Dependencies
- After Node.js is installed, you can install the project dependencies by following these steps:

#### **Windows**:
1. In the root directory of the project, you will find two batch files:
   - `install_dependencies.bat`: Installs the required Node.js modules.
   - `start.bat`: Starts the game.
   
   Simply double-click the `install_dependencies.bat` file to install all dependencies automatically.


#### **Linux/Mac**:
1. Open a terminal and navigate to the `game` directory:
   ```bash
    cd game

    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

## Additional installations
If you get an error, stating that `next` is not recognized, run
```bash
   npm install next
```