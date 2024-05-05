"use client";
import { Directions } from "@mui/icons-material";

export default function Login() {
  const WALL = 5;
  const SPACE = 9;
  const UP = 1;
  const RIGHT = 2;
  const DOWN = 3;
  const LEFT = 4;
  var pointsField: any[] = [];
  var userField: any = [];
  var startPointX: any;
  var startPointY: any;
  var length = 1;

  function generateGame() {
    var coordinates = [];
    coordinates.push(startPointX);
    coordinates.push(startPointY);
    var possibleDirections = getPossibleDirections(
      coordinates[0],
      coordinates[1]
    );
    possibleDirections = possibleDirections.sort(
      (a: any, b: any) => 0.5 - Math.random()
    );
    coordinates = makeStep(
      coordinates[0],
      coordinates[1],
      possibleDirections[0]
    );
    var prevPrevDirection = 0;
    var prevDirection = possibleDirections[0];

    while (true) {
      possibleDirections = getPossibleDirections(
        coordinates[0],
        coordinates[1]
      );

      possibleDirections.filter(
        (direction: any) => direction !== reverseDirection(prevDirection)
      );
      // possibleDirections.remove(reverseDirection(prevDirection));

      var turnBlockRes = turnBlock(prevDirection, prevPrevDirection);
      if (turnBlockRes != 0) {
        possibleDirections.filter(
          (direction: any) => direction !== turnBlockRes
        );
        // possibleDirections.remove((Integer) turnBlockRes);
      }
      if (
        checkIsFinished(coordinates[0], coordinates[1], possibleDirections) &&
        length > pointsField.length * 2
      ) {
        break;
      } else {
        var openedDirections = getOpenedDirections(
          coordinates[0],
          coordinates[1],
          possibleDirections
        );

        if (openedDirections.length === 0) {
          length = 1;
          clearPointsField();
          generateStartPoint();
          coordinates = [];
          coordinates.push(startPointX);
          coordinates.push(startPointY);

          possibleDirections = getPossibleDirections(
            coordinates[0],
            coordinates[1]
          );
          possibleDirections = possibleDirections.sort(
            (a: any, b: any) => 0.5 - Math.random()
          );

          coordinates = makeStep(
            coordinates[0],
            coordinates[1],
            possibleDirections[0]
          );
          prevPrevDirection = 0;
          prevDirection = possibleDirections[0];
        } else {
          openedDirections = openedDirections.sort(
            (a: any, b: any) => 0.5 - Math.random()
          );
          coordinates = makeStep(
            coordinates[0],
            coordinates[1],
            openedDirections[0]
          );
          prevPrevDirection = prevDirection;
          prevDirection = openedDirections[0];
          length++;
        }
      }
    }
    generateUserField();
  }

  function countBorders(x: any, y: any) {
    var counter = 0;
    if (pointsField[x][y] == WALL) {
      return -1;
    }
    if (x > 0 && pointsField[x - 1][y] == WALL) {
      counter++;
    }
    if (y > 0 && pointsField[x][y - 1] == WALL) {
      counter++;
    }
    if (y < pointsField[0].length - 1 && pointsField[x][y + 1] == WALL) {
      counter++;
    }
    if (x < pointsField.length - 1 && pointsField[x + 1][y] == WALL) {
      counter++;
    }
    return counter;
  }

  function generateUserField() {
    for (let i = 0; i < pointsField.length; i++) {
      for (let j = 0; j < pointsField[i].length; j++) {
        var currentCell = pointsField[i][j];
        if (currentCell == WALL) {
          continue;
        }
        var bordersCount = countBorders(i, j);
        if (bordersCount >= 0) {
          userField[i][j] = bordersCount;
        }
      }
    }
  }
  function clearPointsField() {
    pointsField.map((rows: any, i: number) => {
      rows.map((elem: any, j: number) => {
        pointsField[i][j] = SPACE;
      });
    });
  }

  function getOpenedDirections(x: any, y: any, possibleDirections: any) {
    var openedDirections: any = [];
    possibleDirections.map((direction: any) => {
      if (!checkByDirection(x, y, direction)) openedDirections.push(direction);
    });

    return openedDirections;
  }

  function checkByDirection(x: any, y: any, direction: any) {
    switch (direction) {
      case UP:
        {
          return isBlocked(x - 1, y);
        }
        break;
      case RIGHT:
        {
          return isBlocked(x, y + 1);
        }
        break;
      case DOWN:
        {
          return isBlocked(x + 1, y);
        }
        break;
      case LEFT:
        {
          return isBlocked(x, y - 1);
        }
        break;
      default:
        return true;
    }
  }
  function isBlocked(x: any, y: any) {
    return pointsField[x][y] == WALL;
  }
  function isFinish(x: any, y: any) {
    return startPointX == x && startPointY == y;
  }
  function checkByDirectionFinish(x: any, y: any, direction: any) {
    switch (direction) {
      case UP:
        {
          return isFinish(x - 1, y);
        }
        break;
      case RIGHT:
        {
          return isFinish(x, y + 1);
        }
        break;
      case DOWN:
        {
          return isFinish(x + 1, y);
        }
        break;
      case LEFT:
        {
          return isFinish(x, y - 1);
        }
        break;
      default:
        return true;
    }
  }

  function checkIsFinished(x: any, y: any, possibleDirections: any) {
    let checked = false;
    possibleDirections.map((direction: any) => {
      if (checkByDirectionFinish(x, y, direction)) checked = true;
    });
    return checked;
  }

  function turnBlock(prev: any, prevprev: any) {
    if (prev != prevprev) {
      return reverseDirection(prevprev);
    }
    return 0;
  }
  function reverseDirection(direction: any) {
    switch (direction) {
      case UP:
        {
          return DOWN;
        }
        break;
      case RIGHT:
        {
          return LEFT;
        }
        break;
      case DOWN:
        {
          return UP;
        }
        break;
      default:
        return RIGHT;
    }
  }

  function makeStep(x: any, y: any, direction: any) {
    var resultCoordinates = [];
    switch (direction) {
      case UP:
        {
          pointsField[x - 1][y] = WALL;
          resultCoordinates.push(x - 1);
          resultCoordinates.push(y);
        }
        break;
      case RIGHT:
        {
          pointsField[x][y + 1] = WALL;
          resultCoordinates.push(x);
          resultCoordinates.push(y + 1);
        }
        break;
      case DOWN:
        {
          pointsField[x + 1][y] = WALL;
          resultCoordinates.push(x + 1);
          resultCoordinates.push(y);
        }
        break;
      case LEFT:
        {
          pointsField[x][y - 1] = WALL;
          resultCoordinates.push(x);
          resultCoordinates.push(y - 1);
        }
        break;
    }
    return resultCoordinates;
  }

  function getPossibleDirections(x: any, y: any) {
    var directions = [];
    if (x - 1 >= 0) directions.push(UP);
    if (y + 1 < pointsField[0].length) directions.push(RIGHT);
    if (x + 1 < pointsField.length) directions.push(DOWN);
    if (y - 1 >= 0) directions.push(LEFT);
    return directions;
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function generateStartPoint() {
    startPointX = getRandomInt(pointsField.length);
    startPointY = getRandomInt(pointsField[0].length);
    pointsField[startPointX][startPointY] = WALL;
  }

  function seTTT(row: number, col: number) {
    for (var i = 0; i < row; i++) {
      pointsField.push([]);
      for (var j = 0; j < col; j++) {
        pointsField[i].push(SPACE);
      }
    }
    for (var i = 0; i < row; i++) {
      userField.push([]);
      for (var j = 0; j < col; j++) {
        userField[i].push(0);
      }
    }
  }

  return (
    <main className="bg-lightDark">
      <button
        onClick={(e) => {
          seTTT(15, 15);
          generateGame();
          console.table(pointsField);
        }}
      >
        Generate
      </button>
    </main>
  );
}
