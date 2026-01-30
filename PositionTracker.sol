// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PositionTracker
 * @dev 各アドレスの2D座標(x,y)を記録するシンプルなコントラクト。
 *      座標は 0 から 9 の範囲にクランプされます。
 */
contract PositionTracker {

    // プレイヤーの座標を格納する構造体
    struct Point {
        int16 x;
        int16 y;
    }

    // アドレスと座標をマッピング
    mapping(address => Point) public positions;
    // 初期化済みかどうかを記録するマッピング
    mapping(address => bool) public hasInitialized;

    // イベント定義
    event Initialized(address indexed player, int16 x, int16 y);
    event Moved(address indexed player, int16 newX, int16 newY);

    /**
     * @dev 呼び出し元の座標を (0,0) に初期化します。
     *      既に初期化済みの場合はrevertします。
     */
    function initialize() public {
        require(!hasInitialized[msg.sender], "PositionTracker: Already initialized");
        
        hasInitialized[msg.sender] = true;
        positions[msg.sender] = Point(0, 0);
        
        emit Initialized(msg.sender, 0, 0);
    }

    /**
     * @dev プレイヤーの位置を移動させます。
     * @param dx x方向の移動量 (-1, 0, 1 のみ)
     * @param dy y方向の移動量 (-1, 0, 1 のみ)
     *      - 斜め移動 (dxとdyが両方非ゼロ) は禁止です。
     *      - 座標は 0..9 の範囲にクランプされます。
     */
    function move(int8 dx, int8 dy) public {
        require(hasInitialized[msg.sender], "PositionTracker: Not initialized yet");
        require((dx >= -1 && dx <= 1) && (dy >= -1 && dy <= 1), "PositionTracker: Invalid delta values");
        require(dx == 0 || dy == 0, "PositionTracker: Diagonal movement is forbidden");

        Point memory currentPosition = positions[msg.sender];
        
        // 新しい座標を計算
        int16 newX = currentPosition.x + dx;
        int16 newY = currentPosition.y + dy;

        // 盤面の範囲(0-9)にクランプする
        if (newX < 0) {
            newX = 0;
        } else if (newX > 9) {
            newX = 9;
        }

        if (newY < 0) {
            newY = 0;
        } else if (newY > 9) {
            newY = 9;
        }

        // 座標を更新
        positions[msg.sender] = Point(newX, newY);

        emit Moved(msg.sender, newX, newY);
    }

    /**
     * @dev 指定されたアドレスの現在の座標を返します。
     * @param _player 座標を取得したいアドレス
     * @return (x座標, y座標)
     */
    function getPosition(address _player) public view returns (int16, int16, bool) {
        Point memory pos = positions[_player];
        bool initialized = hasInitialized[_player];
        return (pos.x, pos.y, initialized);
    }
}
