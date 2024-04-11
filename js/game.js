class Game {
    constructor(){
      this.startScreen = document.getElementById('game-intro');
      this.gameScreen = document.getElementById('game-screen');
      this.gameEndScreen = document.getElementById('game-end');
      this.scoreElement = document.getElementById('score');
      this.livesElement = document.getElementById('lives'); // Define livesElement
      this.player = new Player(
        this.gameScreen,
        200,
        300,
        100,
        200,
        "../images/car.png"
      );
      this.height= 600;
      this.width = 500;
      this.score = 0;
      this.lives = 3;
      this.obstacles = [];
      this.gameIsOver = false;
      this.gameIntervalId = 0;
      this.gameLoopFrequency = Math.round(1000/60);
    }
  
    start(){
      this.gameScreen.style.width = `${this.width}px`;
      this.gameScreen.style.height = `${this.height}px`;
      this.startScreen.style.display = 'none';
      this.gameScreen.style.display = 'block';
      this.gameIntervalId = setInterval(() => {
        this.gameLoop();
      
      }, this.gameLoopFrequency);
    }
    restart(){
      this.gameIsOver = false;
      this.score = 0;
      this.lives = 3;
      this.gameEndScreen.style.display = "none";
      this.gameScreen.style.display = "block";
    
      // Remove existing player
      this.player.element.remove();
    
      // Recreate player object
      this.player = new Player(
        this.gameScreen,
        200,
        300,
        100,
        200,
        "../images/car.png"
      );
    
      // Clear obstacles
      this.obstacles.forEach(obstacle => {
        obstacle.element.remove();
      });
      this.obstacles = [];
    
      // Add new obstacle
      this.obstacles.push(new Obstacle(this.gameScreen));
    
      this.start();
    }
    
  
    gameLoop(){
      this.update();
      if(this.gameIsOver){
        clearInterval(this.gameIntervalId);
        this.gameIsOver();
      }
    }
    update(){
      this.player.move();
      for(let i = 0; i < this.obstacles.length; i++) {
          const obstacle = this.obstacles[i];
          obstacle.move();
  
          // Check collision with player
          if(this.player.didCollide(obstacle)){
              console.log('bang !!! there was a collision');
              this.obstacles.splice(i, 1);
              obstacle.element.remove();
              this.lives--;
              i--;
          } else if (obstacle.top > this.height) {
              this.score++;
              obstacle.element.remove();
              this.obstacles.splice(i, 1);
              i--;
          }
      }
  
      if (this.lives === 0) {
          this.endGame();
      }
  
      if(Math.random() > 0.98 && this.obstacles.length < 1) {
          this.obstacles.push(new Obstacle(this.gameScreen));
      }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());
    
    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }


  
  }