const syncBreakoutGameQuery = `
mutation SyncBreakoutGame($breakoutGame: breakoutGameInput!) {
  syncBreakoutGame(breakoutGame: $breakoutGame) {
    _id
    ball {
      dx
      dy
      rad
      speed
      x
      y
    }
    id
    score
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
  }
}`;
export default syncBreakoutGameQuery;
