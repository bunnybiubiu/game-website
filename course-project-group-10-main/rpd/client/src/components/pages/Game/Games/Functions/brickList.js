function brickList(canvas, brickObj) {
  const originY = 40;
  const row = 5;
  const col = 8;
  const bricks = Array.from({ length: row }, () => Array(col).fill(0));
  const margin = brickObj.margin;
  brickObj.width = canvas.width / col;
  const width = brickObj.width;
  const height = brickObj.height;
  let y = originY;
  for (let i = 0; i < row; i++) {
    let x = 0;
    y = y + brickObj.height;
    for (let j = 0; j < col; j++) {
      const brick = {
        ...brickObj,
        x_render: x + 2,
        y_render: y + 2,
        x1_render: x + width - 2,
        y1_render: y + height - 2,
        x_real: x,
        y_real: y,
        x1_real: x + width,
        y1_real: y + height,
      };
      bricks[i][j] = brick;
      x = x + width;
    }
  }
  return bricks;
}

export default brickList;
