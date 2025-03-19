function ballReflect(ballObj, canvas, paddleObj) {
  const paddleHalfWidth = paddleObj.width / 2;
  if (ballObj.x - ballObj.rad <= 0 || ballObj.x + ballObj.rad >= canvas.width) {
    ballObj.dx = -ballObj.dx;
  }
  if (
    ballObj.y + ballObj.rad >= paddleObj.y &&
    ballObj.y + ballObj.rad <= paddleObj.y + paddleObj.height &&
    ballObj.x >= paddleObj.x &&
    ballObj.x <= paddleObj.x + paddleObj.width
  ) {
    const offset = ballObj.x - paddleObj.center;
    const theta = -90 + (offset / paddleHalfWidth) * 60; // the maximum angle is 60 degrees
    const radian = (Math.PI * theta) / 180;
    ballObj.dx = ballObj.speed * Math.cos(radian);
    ballObj.dy = ballObj.speed * Math.sin(radian);
  }
  if (ballObj.y - ballObj.rad <= 1) {
    ballObj.dy = -ballObj.dy;
  }
  if (ballObj.y - ballObj.rad >= canvas.height) {
    return true;
  }
  return false;
}

export default ballReflect;
