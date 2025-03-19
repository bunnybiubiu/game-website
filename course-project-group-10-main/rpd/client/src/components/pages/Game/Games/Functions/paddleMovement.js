function paddleMovement(ctx, paddleObj, center) {
  ctx.beginPath();
  ctx.fillStyle = paddleObj.color;
  paddleObj.x = center - paddleObj.width / 2;
  paddleObj.center = center;
  ctx.fillRect(paddleObj.x, paddleObj.y, paddleObj.width, paddleObj.height);
  ctx.stroke();
  ctx.closePath();
}

export default paddleMovement;
