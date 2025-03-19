function brickReflect(ball, bricks, score, callback) {
  const row = bricks.length;
  const col = bricks[0].length;
  const rad = ball.rad;
  let new_score = score;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const brick = bricks[i][j];
      if (brick.level > 0) {
        if (
          (ball.y - rad <= brick.y1_real &&
            ball.y - rad >= brick.y_real &&
            ball.x >= brick.x_real &&
            ball.x < brick.x1_real) ||
          (ball.y + rad >= brick.y_real &&
            ball.y + rad <= brick.y1_real &&
            ball.x >= brick.x_real &&
            ball.x < brick.x1_real)
        ) {
          brick.level -= 1;
          if (brick.level === 0) {
            new_score += 10;
          }
          ball.dy = -ball.dy;
          console.log(bricks);
        }
        if (
          (ball.x - rad <= brick.x1_real &&
            ball.x - rad >= brick.x_real &&
            ball.y >= brick.y_real &&
            ball.y < brick.y1_real) ||
          (ball.x + rad >= brick.x_real &&
            ball.x + rad <= brick.x1_real &&
            ball.y >= brick.y_real &&
            ball.y < brick.y1_real)
        ) {
          brick.level -= 1;
          if (brick.level === 0) {
            new_score += 10;
          }
          ball.dx = -ball.dx;
        }
      }
    }
  }
  callback(new_score);
}

export default brickReflect;
