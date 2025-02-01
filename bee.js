class Bee {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 60;
  }

  draw(x, y) {
    this.x = x;
    this.y = y;

    push();
    fill(255, 255, 204);
    stroke(185, 185, 134);
    ellipse(x - 15, y + 8, 15, 10); // left bottom wing
    ellipse(x + 15, y + 8, 15, 10); // right bottom wing
    ellipse(x - 15, y - 2, 25, 20); // left top wing
    ellipse(x + 15, y - 2, 25, 20); // right top wing

    noStroke();
    fill(250, 205, 70);
    ellipse(x, y, 24, 34); // bee's body
    fill(70);
    rect(x - 13, y - 5, 26, 8, 6);
    arc(x, y + 12, 16, 16, 0, PI, OPEN);

    stroke(70);
    line(x - 5, y - 12, x - 10, y - 20); // right antenna
    ellipse(x - 10, y - 20, 3);
    line(x + 5, y - 12, x + 10, y - 20); // left antenna
    ellipse(x + 10, y - 20, 3);
    pop();
  }

  clicked(px, py) {
    const d = dist(px, py, this.x, this.y);
    return d <= this.radius;
  }
}
