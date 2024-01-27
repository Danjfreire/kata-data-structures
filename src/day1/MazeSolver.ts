const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // base cases
    // 1 - off the map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }

    // 2 - at a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // 3 - at a seen point
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // 4 - at the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    //pre-recursion
    seen[curr.y][curr.x] = true;
    path.push(curr);

    //recursion
    for (const direction of directions) {
        const [x, y] = direction;
        const isEnd = walk(
            maze,
            wall,
            { x: curr.x + x, y: curr.y + y },
            end,
            seen,
            path,
        );
        if (isEnd) {
            return true;
        }
    }

    //post-recursion
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
