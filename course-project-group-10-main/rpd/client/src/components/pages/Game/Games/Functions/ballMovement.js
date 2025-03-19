async function ballMovement(ctx, ballObj) {
  ctx.beginPath();
  ctx.fillStyle = "#303030";
  ctx.arc(ballObj.x, ballObj.y, 10, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.strokeWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ballObj.x += ballObj.dx;
  ballObj.y += ballObj.dy;
}

export default ballMovement;
