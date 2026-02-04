// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PositionTracker {
    struct Position {
        uint8 x;
        uint8 y;
    }

    mapping(address => Position) public playerPositions;

    enum Direction {
        Up,
        Down,
        Left,
        Right
    }

    function initializePosition(uint8 _x, uint8 _y) public {
        require(_x < 10, "Initial x is out of bounds");
        require(_y < 10, "Initial y is out of bounds");
        playerPositions[msg.sender] = Position(_x, _y);
    }

    function move(Direction _direction) public {
        Position storage currentPosition = playerPositions[msg.sender];

        if (_direction == Direction.Up) {
            require(currentPosition.y > 0, "Cannot move up");
            currentPosition.y--;
        } else if (_direction == Direction.Down) {
            require(currentPosition.y < 9, "Cannot move down");
            currentPosition.y++;
        } else if (_direction == Direction.Left) {
            require(currentPosition.x > 0, "Cannot move left");
            currentPosition.x--;
        } else if (_direction == Direction.Right) {
            require(currentPosition.x < 9, "Cannot move right");
            currentPosition.x++;
        }
    }

    function getPosition(address _player) public view returns (Position memory) {
        return playerPositions[_player];
    }
}
