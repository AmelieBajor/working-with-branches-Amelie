class Game {
  constructor(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext("2d");
    this.player = new Player(this.ctx, this.width / 10, this.height / 10);
  }

  play() {
    this.clear();
    this.drawBoundary();
    this.player.draw();

    if (this.getState()) {
      requestAnimationFrame(this.play.bind(this));
    } else {
      this.gameOver();
    }
  }

  getState() {
    let borders = this.player.getBoundary();
    return (
      borders.xMin >= 0 &&
      borders.xMax <= this.width &&
      borders.yMin >= 0 &&
      borders.yMax <= this.height
    );
  }

  gameOver() {
    this.ctx.beginPath();
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("You lose!", this.width / 2, this.height / 2);
  }

  drawBoundary() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

let game = new Game(document.getElementById("game"), 400, 400);
game.play();
