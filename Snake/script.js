(function () {
    let FPS = 10;
    const SIZE = 40;
    let frames = 0;
  
    let board;
    let snake;
    let food;
    let score = 0;
    let scoreBoard;
    let gameOverMessage;
  
    let gameStarted = false;
    let gamePaused = false;
    let gameOver = false;
    let intervalId;
  
    function init() {
        board = new Board(SIZE);
        snake = new Snake([[4, 4], [4, 5], [4, 6]]);
        food = new Food();
        scoreBoard = document.createElement("div");
        scoreBoard.style.position = "absolute";
        scoreBoard.style.top = "0";
        scoreBoard.style.right = "0";
        scoreBoard.style.fontFamily = "Arial, sans-serif";
        scoreBoard.innerHTML = "Score: " + score;
        document.body.appendChild(scoreBoard);
        gameOverMessage = document.createElement("div");
        gameOverMessage.style.position = "absolute";
        gameOverMessage.style.top = "50%";
        gameOverMessage.style.left = "50%";
        gameOverMessage.style.transform = "translate(-50%, -50%)";
        gameOverMessage.style.fontFamily = "Arial, sans-serif";
        gameOverMessage.style.display = "none";
        gameOverMessage.style.fontSize = "2em";
        gameOverMessage.style.color = "red";
        gameOverMessage.innerHTML = "Game Over";
        document.body.appendChild(gameOverMessage);
    }
  
    function resetBoard() {
        const cells = document.querySelectorAll("#board td");
        cells.forEach(cell => {
            cell.style.backgroundColor = board.color;
        });
    }
  
    window.addEventListener("keydown", (e) => {
        if(gameOver && e.key === "s"){
            resetBoard();
            gameOver = false;
            gameOverMessage.style.display = "none";
            score = 0;
            scoreBoard.innerHTML = "Score: " + score;
            snake = new Snake([[4, 4], [4, 5], [4, 6]]);
            food = new Food();
            gameStarted = true;
            startGame();
        } else {
            switch (e.key) {
                case "ArrowUp":
                    snake.changeDirection(0);
                    break;
                case "ArrowRight":
                    if(snake.direction !== 3){
                        snake.changeDirection(1);
                    }
                    break;
                case "ArrowDown":
                    snake.changeDirection(2);
                    break;
                case "ArrowLeft":
                    if(snake.direction === 0 || snake.direction === 2){
                        snake.changeDirection(3);
                    }
                    break;
                case "s":
                    if(!gameStarted){
                        startGame();
                    }
                    break;
                case "p":
                    if(gameStarted){
                        togglePause();
                    }
                    break;
                default:
                    break;
            }
        }
    });
  
    class Board {
        constructor(size) {
            this.element = document.createElement("table");
            this.element.setAttribute("id", "board");
            this.color = "#ccc";
            document.body.appendChild(this.element);
            for (let i = 0; i < size; i++) {
                const row = document.createElement("tr");
                this.element.appendChild(row);
                for (let j = 0; j < size; j++) {
                    const field = document.createElement("td");
                    row.appendChild(field);
                }
            }
        }
    }
  
    class Food {
        constructor() {
            this.position = this.randomPosition();
            this.color = Math.random() < 0.67 ? "#000" : "#f00";
            this.points = this.color === "#000" ? 1 : 2;
            this.render();
        }
  
        randomPosition() {
            return [Math.floor(Math.random() * SIZE) + 1, Math.floor(Math.random() * SIZE) + 1];
        }
  
        update() {
            this.position = this.randomPosition();
            this.color = Math.random() < 0.67 ? "#000" : "#f00";
            this.points = this.color === "#000" ? 1 : 2;
            this.render();
        }
  
        render() {
            const cell = document.querySelector(`#board tr:nth-child(${this.position[0]}) td:nth-child(${this.position[1]})`);
            if (cell) {
                cell.style.backgroundColor = this.color;
            }
        }
    }
  
    class Snake {
        constructor(body) {
            this.body = body;
            this.color = "#222";
            this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
            this.render();
        }
  
        walk() {
            const head = this.body[this.body.length - 1];
            let newHead;
            switch (this.direction) {
                case 0:
                    newHead = [head[0] - 1, head[1]];
                    break;
                case 1:
                    newHead = [head[0], head[1] + 1];
                    break;
                case 2:
                    newHead = [head[0] + 1, head[1]];
                    break;
                case 3:
                    newHead = [head[0], head[1] - 1];
                    break;
                default:
                    break;
            }
            this.body.push(newHead);
            const oldTail = this.body.shift();
            this.render();
            const oldTailCell = document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`);
            if (oldTailCell) {
                oldTailCell.style.backgroundColor = board.color;
            }
        }
  
        changeDirection(direction) {
            this.direction = direction;
        }
  
        render() {
            this.body.forEach(field => {
                const cell = document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`);
                if (cell) {
                    cell.style.backgroundColor = this.color;
                }
            });
        }
    }
  
    function startGame() {
        gameStarted = true;
        frames = 0;
        FPS = 10; // Reset FPS
        clearInterval(intervalId);
        intervalId = setInterval(run, 1000 / FPS);
    }
  
    function togglePause() {
        gamePaused = !gamePaused;
        if (gamePaused) {
            clearInterval(intervalId);
        } else {
            intervalId = setInterval(run, 1000 / FPS);
        }
    }
  
    function run() {
        frames++;
        if (frames % 60 === 0) {
            FPS += 1; // Aumenta a velocidade a cada 60 frames
            clearInterval(intervalId);
            intervalId = setInterval(run, 1000 / FPS);
        }
        snake.walk();
        if (snake.body[snake.body.length - 1][0] === food.position[0] && snake.body[snake.body.length - 1][1] === food.position[1]) {
            snake.body.unshift([]); // Adiciona um novo quadradinho ao corpo da cobra
            score += food.points; // Atualiza a pontuação
            scoreBoard.innerHTML = "Score: " + score; // Atualiza o quadro de pontuação
            food.update(); // Atualiza a posição da comida
        }
        // Verifica se a cobra bateu na parede ou em si mesma
        const head = snake.body[snake.body.length - 1];
        if (head[0] <= 0 || head[0] > SIZE || head[1] <= 0 || head[1] > SIZE || snake.body.slice(0, -1).some(part => part[0] === head[0] && part[1] === head[1])) {
            gameOver = true;
            gameOverMessage.style.display = "block";
            clearInterval(intervalId);
        }
    }
    
    init();
  })();
  