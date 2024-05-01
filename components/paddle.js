class Paddle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = 5;
  }

  update() {
    // Move the paddle based on user input
    if (keys.left && this.x > 0) {
      this.x -= this.speed;
    }
    if (keys.right && this.x + this.width < canvas.width) {
      this.x += this.speed;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
