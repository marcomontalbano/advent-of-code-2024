// Day 14: Restroom Redoubt
// https://adventofcode.com/2024/day/14

type Point = {
  x: number;
  y: number;
};

type Robot = {
  position: Point;
  velocity: Point;
};

export function parseInput(input: string): Robot[] {
  return input.split("\n").map((line) => {
    const [p, v] = line.split(" ");
    const [px, py] = p.slice(2).split(",").map(Number);
    const [vx, vy] = v.slice(2).split(",").map(Number);
    return {
      position: { x: px, y: py },
      velocity: { x: vx, y: vy },
    };
  });
}

export function moveRobot(
  robot: Robot,
  spaceSize: { width: number; height: number },
): Robot {
  let newX = robot.position.x + robot.velocity.x;
  let newY = robot.position.y + robot.velocity.y;

  if (newX < 0) {
    newX = spaceSize.width + newX;
  }

  if (newX >= spaceSize.width) {
    newX = newX - spaceSize.width;
  }

  if (newY < 0) {
    newY = spaceSize.height + newY;
  }

  if (newY >= spaceSize.height) {
    newY = newY - spaceSize.height;
  }

  return {
    position: {
      x: newX,
      y: newY,
    },
    velocity: robot.velocity,
  };
}

export function moveRobotForSeconds(
  robots: Robot,
  spaceSize: { width: number; height: number },
  seconds: number,
): Robot {
  let robot = robots;
  for (let i = 0; i < seconds; i++) {
    robot = moveRobot(robot, spaceSize);
  }
  return robot;
}

export function moveRobotsForSeconds(
  robots: Robot[],
  spaceSize: { width: number; height: number },
  seconds: number,
): Robot[] {
  return robots.map((robot) => moveRobotForSeconds(robot, spaceSize, seconds));
}

export function runProgram_part1(
  robots: Robot[],
  spaceSize: { width: number; height: number },
  seconds: number,
): number {
  const robotsAfterSeconds = moveRobotsForSeconds(robots, spaceSize, seconds);

  const filtered = robotsAfterSeconds.reduce((acc, robot) => {
    if (
      robot.position.x !== Math.floor(spaceSize.width / 2) &&
      robot.position.y !== Math.floor(spaceSize.height / 2)
    ) {
      const bool =
        `${(Math.floor(robot.position.y / (spaceSize.height / 2)))}${(Math
          .floor(robot.position.x / (spaceSize.width / 2)))}`;

      const quadrant = parseInt(bool, 2);

      const value = acc.get(quadrant) || [];
      value.push(robot.position);
      return acc.set(quadrant, value);
    }

    return acc;
  }, new Map<number, Point[]>());

  return filtered
    .values()
    .map((v) => v.length)
    .reduce((acc, v) => acc * v, 1);
}
