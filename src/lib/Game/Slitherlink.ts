
class Slitherlink{
    WALL = 5;
    SPACE = 9;
    UP = 1;
    RIGHT = 2;
    DOWN = 3;
    LEFT = 4;

    pointsField:any;
    ui:any;
    userField:any;
    startPointX:number;
    startPointY:number;
    length = 1;

    constructor(row:number,col:number){
        this.pointsField = [];
        this.userField = [];
        for (let i = 0; i < row; i++) {
            this.pointsField.push([]);
            for (let j = 0; j < col; j++) {
                this.pointsField[i].push(this.SPACE);
            }
        }
        for (let i = 0; i < row; i++) {
            this.userField.push([]);
            for (let j = 0; j < col; j++) {
                this.userField[i].push(0);
            }
        }
    }
}



package sk.tuke.gamestudio.game;

import { AnyArray } from "mongoose";
import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

public class Slitherlink2 {


    public Slitherlink(int row, int col) {

    }

    public ArrayList<ArrayList<Integer>> getPointsField() {
        return pointsField;
    }

    public ArrayList<ArrayList<Integer>> getUserField() {
        return userField;
    }

    public void setUserField(ArrayList<ArrayList<Integer>> userField) {
        this.userField = userField;
    }

    public void generateGame() {
        ui = new ConsoleUI(this);
        generateStartPoint();
        ArrayList<Integer> coordinates = new ArrayList<>();
        coordinates.add(startPointX);
        coordinates.add(startPointY);

        ArrayList<Integer> possibleDirections = getPossibleDirections(coordinates.get(0), coordinates.get(1));
        Collections.shuffle(possibleDirections);
        coordinates = makeStep(coordinates.get(0), coordinates.get(1), possibleDirections.get(0));
        int prevPrevDirection = 0;
        int prevDirection = possibleDirections.get(0);

        while (true) {
            possibleDirections = getPossibleDirections(coordinates.get(0), coordinates.get(1));
            possibleDirections.remove(reverseDirection(prevDirection));
            int turnBlockRes = turnBlock(prevDirection, prevPrevDirection);
            if (turnBlockRes != 0) {
                possibleDirections.remove((Integer) turnBlockRes);
            }
            if (checkIsFinished(coordinates.get(0), coordinates.get(1), possibleDirections) && length > pointsField.size() * 2) {
                break;
            } else {
                ArrayList<Integer> openedDirections = getOpenedDirections(coordinates.get(0), coordinates.get(1), possibleDirections);

                if (openedDirections.isEmpty()) {
                    length = 1;
                    clearPointsField();
                    generateStartPoint();
                    coordinates.clear();
                    coordinates.add(startPointX);
                    coordinates.add(startPointY);

                    possibleDirections = getPossibleDirections(coordinates.get(0), coordinates.get(1));
                    Collections.shuffle(possibleDirections);
                    coordinates = makeStep(coordinates.get(0), coordinates.get(1), possibleDirections.get(0));
                    prevPrevDirection = 0;
                    prevDirection = possibleDirections.get(0);
                } else {
                    Collections.shuffle(openedDirections);
                    coordinates = makeStep(coordinates.get(0), coordinates.get(1), openedDirections.get(0));
                    prevPrevDirection = prevDirection;
                    prevDirection = openedDirections.get(0);
                    length++;
                }
            }

        }
        generateUserField();
    }

    private void clearPointsField() {
        for (ArrayList<Integer> rows : pointsField) {
            Collections.fill(rows, SPACE);
        }
    }

    private int countBorders(int x, int y) {
        int counter = 0;
        if (pointsField.get(x).get(y) == WALL) {
            return -1;
        }
        if (x > 0 && pointsField.get(x - 1).get(y) == WALL) {
            counter++;
        }
        if (y > 0 && pointsField.get(x).get(y - 1) == WALL) {
            counter++;
        }
        if (y < pointsField.get(0).size() - 1 && pointsField.get(x).get(y + 1) == WALL) {
            counter++;
        }
        if (x < pointsField.size() - 1 && pointsField.get(x + 1).get(y) == WALL) {
            counter++;
        }
        return counter;
    }

    public void generateUserField() {
        for (int i = 0; i < pointsField.size(); i++) {
            for (int j = 0; j < pointsField.get(i).size(); j++) {
                int currentCell = pointsField.get(i).get(j);
                if (currentCell == WALL) {
                    continue;
                }
                int bordersCount = countBorders(i, j);
                if (bordersCount >= 0) {
                    userField.get(i).set(j, bordersCount);
                }
            }
        }
    }

    private ArrayList<Integer> makeStep(int x, int y, int direction) {
        ArrayList<Integer> resultCoordinates = new ArrayList<>();
        switch (direction) {
            case UP: {
                pointsField.get(x - 1).set(y, WALL);
                resultCoordinates.add(x - 1);
                resultCoordinates.add(y);
            }
            break;
            case RIGHT: {
                pointsField.get(x).set(y + 1, WALL);
                resultCoordinates.add(x);
                resultCoordinates.add(y + 1);
            }
            break;
            case DOWN: {
                pointsField.get(x + 1).set(y, WALL);
                resultCoordinates.add(x + 1);
                resultCoordinates.add(y);
            }
            break;
            case LEFT: {
                pointsField.get(x).set(y - 1, WALL);
                resultCoordinates.add(x);
                resultCoordinates.add(y - 1);
            }
            break;
        }
        return resultCoordinates;
    }

    private Integer reverseDirection(int direction) {
        return switch (direction) {
            case UP -> DOWN;
            case RIGHT -> LEFT;
            case DOWN -> UP;
            default -> RIGHT;
        };
    }

    private boolean checkByDirection(int x, int y, int direction) {
        return switch (direction) {
            case UP -> isBlocked(x - 1, y);
            case RIGHT -> isBlocked(x, y + 1);
            case DOWN -> isBlocked(x + 1, y);
            case LEFT -> isBlocked(x, y - 1);
            default -> true;
        };
    }

    private boolean checkByDirectionFinish(int x, int y, int direction) {
        return switch (direction) {
            case UP -> isFinish(x - 1, y);
            case RIGHT -> isFinish(x, y + 1);
            case DOWN -> isFinish(x + 1, y);
            case LEFT -> isFinish(x, y - 1);
            default -> true;
        };
    }

    private boolean isBlocked(int x, int y) {
        return pointsField.get(x).get(y) == WALL;
    }

    private boolean isFinish(int x, int y) {
        return startPointX == x && startPointY == y;
    }

    private int turnBlock(int prev, int prevprev) {
        if (prev != prevprev) {
            return reverseDirection(prevprev);
        }
        return 0;
    }

    private ArrayList<Integer> getOpenedDirections(int x, int y, ArrayList<Integer> possibleDirections) {
        ArrayList<Integer> openedDirections = new ArrayList<>();
        for (int direction : possibleDirections)
            if (!checkByDirection(x, y, direction)) openedDirections.add(direction);

        return openedDirections;
    }

    private ArrayList<Integer> getPossibleDirections(int x, int y) {
        ArrayList<Integer> directions = new ArrayList<>();
        if (x - 1 >= 0) directions.add(UP);
        if (y + 1 < pointsField.get(0).size()) directions.add(RIGHT);
        if (x + 1 < pointsField.size()) directions.add(DOWN);
        if (y - 1 >= 0) directions.add(LEFT);
        return directions;
    }

    private boolean checkIsFinished(int x, int y, ArrayList<Integer> possibleDirections) {
        for (int direction : possibleDirections)
            if (checkByDirectionFinish(x, y, direction)) return true;
        return false;
    }

    private void generateStartPoint() {
        Random rand = new Random();
        startPointX = rand.nextInt(pointsField.size());
        startPointY = rand.nextInt(pointsField.get(0).size());
        pointsField.get(startPointX).set(startPointY, WALL);
    }

    public boolean checkWinCondition() {
        for (int i = 0; i < userField.size(); i++) {
            for (int j = 0; j < userField.get(i).size(); j++) {
                int cellValue = userField.get(i).get(j);
                if (cellValue != WALL) {
                    int bordersCount = countBorders(i, j);
                    if (bordersCount != cellValue) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}