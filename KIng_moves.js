function knightMoves(start, end) {
  const boardSize = 8;
  const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];

  const isValid = (x, y) =>
    x >= 0 && x < boardSize && y >= 0 && y < boardSize;

  const queue = [];
  const visited = new Set();

  queue.push({
    position: start,
    path: [start]
  });

  visited.add(start.toString());

  while (queue.length > 0) {
    const { position, path } = queue.shift();
    const [x, y] = position;

    if (x === end[0] && y === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach(square => console.log(square));
      return path;
    }

    for (const [dx, dy] of moves) {
      const newX = x + dx;
      const newY = y + dy;
      const key = [newX, newY].toString();

      if (isValid(newX, newY) && !visited.has(key)) {
        visited.add(key);
        queue.push({
          position: [newX, newY],
          path: [...path, [newX, newY]]
        });
      }
    }
  }
}         