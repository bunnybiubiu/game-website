const query = `query GetBreakoutGame($getBreakoutGameId: Int!) {
  getBreakoutGame(id: $getBreakoutGameId) {
    _id
    ball {
      dx
      dy
      rad
      speed
      x
      y
    }
    bricks {
      brickColumnCount
      brickRowCount
      height
      level
      originY
      width
      x1_real
      x1_render
      x_real
      x_render
      y1_real
      y1_render
      y_real
      y_render
    }
    id
    score
  }
}`;
export default query;
