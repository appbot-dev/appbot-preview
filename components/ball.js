class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = -2;
    this.dy = -2;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Reverse direction when hitting the walls
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.dx *= -1;
    }
    if (this.y - this.radius < 0) {
      this.dy *= -1;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
