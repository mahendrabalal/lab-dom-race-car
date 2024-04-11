window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const game = new Game();

  startButton.addEventListener("click", function () {
    startGame();
  });
  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame () {
    
    game.restart();

  }
  
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      game.player.directionX = 1;
    } else if (event.code === 'ArrowLeft') {
      game.player.directionX = -1;
    }else if(event.code === "ArrowUp") {
      game.player.directionY = -1;
    } else if(event.code === "ArrowDown") {
      game.player.directionY = 1;
    }

  });
  document.addEventListener("keyup", () => {
    game.player.directionX = 0;
    game.player.directionY = 0;
  });


  

  function startGame() {
    console.log("start game");
    game.start();
  }
};

