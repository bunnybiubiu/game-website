import brickList from "./brickList.js";

function renderBrick(ctx, canvas, bricks, colors) {
  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      if (bricks[i][j].level === 0) {
        continue;
      }
      ctx.beginPath();
      ctx.rect(
        bricks[i][j].x_render,
        bricks[i][j].y_render,
        bricks[i][j].x1_render - bricks[i][j].x_render,
        bricks[i][j].y1_render - bricks[i][j].y_render,
      );
      ctx.fillStyle = colors[bricks[i][j].level - 1];
      ctx.storkeSytle = "black";
      ctx.lineWidth = 2;
      ctx.save();
      ctx.clip();
      ctx.lineWidth *= 2;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    }
  }
  return;
}

export default renderBrick;
