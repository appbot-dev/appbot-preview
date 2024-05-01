class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isDestroyed = false;
  }

  draw(ctx) {
    if (!this.isDestroyed) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}

function createBricks() {
  const bricks = [];
  const brickWidth = 80;
  const brickHeight = 30;
  const padding = 10;
  const rows = 5;
  const cols = 8;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (brickWidth + padding) + padding;
      const y = row * (brickHeight + padding) + padding;
      const brick = new Brick(x, y, brickWidth, brickHeight, "#0077b6");
      bricks.push(brick);
    }
  }

  return bricks;
}
