// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PositionTracker {
    struct PlayerPosition {
        uint8 x;
        uint8 y;
        bool initialized; // To track if a position has been set for the player
    }

    mapping(address => PlayerPosition) public positions;

    // Define the boundaries of the 10x10 grid (0-9)
    uint8 private constant CELL_LIMIT = 9;

    enum Direction {
        Up,
        Down,
        Left,
        Right
    }

    event PositionInitialized(address indexed player, uint8 x, uint8 y);
    event PositionMoved(address indexed player, uint8 oldX, uint8 oldY, uint8 newX, uint8 newY);

    modifier onlyInitialized() {
        require(positions[msg.sender].initialized, "Position not initialized for this player");
        _;
    }

    /**
     * @dev Initializes the player's position on the 10x10 grid.
     * @param _x The initial x-coordinate (0-9).
     * @param _y The initial y-coordinate (0-9).
     */
    function initializePosition(uint8 _x, uint8 _y) public {
        require(!positions[msg.sender].initialized, "Position already initialized");
        require(_x <= CELL_LIMIT && _y <= CELL_LIMIT, "Coordinates out of bounds (0-9)");

        positions[msg.sender] = PlayerPosition({x: _x, y: _y, initialized: true});
        emit PositionInitialized(msg.sender, _x, _y);
    }

    /**
     * @dev Moves the player by one step in the specified direction.
     * @param _direction The direction to move (0=Up, 1=Down, 2=Left, 3=Right).
     */
    function move(Direction _direction) public onlyInitialized {
        PlayerPosition storage playerPos = positions[msg.sender];
        uint8 oldX = playerPos.x;
        uint8 oldY = playerPos.y;
        uint8 newX = oldX;
        uint8 newY = oldY;

        if (_direction == Direction.Up) {
            require(newY > 0, "Cannot move up, already at top edge");
            newY--;
        } else if (_direction == Direction.Down) {
            require(newY < CELL_LIMIT, "Cannot move down, already at bottom edge");
            newY++;
        } else if (_direction == Direction.Left) {
            require(newX > 0, "Cannot move left, already at left edge");
            newX--;
        } else if (_direction == Direction.Right) {
            require(newX < CELL_LIMIT, "Cannot move right, already at right edge");
            newX++;
        } else {
            revert("Invalid direction"); // Should not happen with enum, but good for safety
        }

        playerPos.x = newX;
        playerPos.y = newY;
        emit PositionMoved(msg.sender, oldX, oldY, newX, newY);
    }

    /**
     * @dev Retrieves the current position of the caller.
     * @return The x and y coordinates of the player.
     */
    function getPosition() public view onlyInitialized returns (uint8 x, uint8 y) {
        return (positions[msg.sender].x, positions[msg.sender].y);
    }

    /**
     * @dev Retrieves the current position of any player.
     * @param _player The address of the player.
     * @return The x and y coordinates of the player.
     */
    function getPlayerPosition(address _player) public view returns (uint8 x, uint8 y) {
        require(positions[_player].initialized, "Position not initialized for this player");
        return (positions[_player].x, positions[_player].y);
    }
}
