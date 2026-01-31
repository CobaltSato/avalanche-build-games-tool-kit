'use client';

import { avalancheFuji } from '@avalanche-wallet';
import { useWalkGame } from './useWalkGame';
import { GameBoard } from './components';

export function WalkGameClient() {
  const {
    gameMap,
    playerPos,
    isInitialized,
    isCleared,
    isTxPending,
    account,
    chainId,
    isConnected,
    txStatus,
    txMessage,
    connectWallet,
    initialize,
  } = useWalkGame();

  return (
    <>
      <div className="game-container">
        {!isConnected ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div>
            <p>
              Account: {`${account!.slice(0, 6)}...${account!.slice(-4)}`}
            </p>
            {chainId?.toLowerCase() !== avalancheFuji.chainId && (
              <p style={{ color: 'red' }}>Please switch to Fuji Testnet!</p>
            )}
          </div>
        )}

        {isConnected && !isInitialized && (
          <button
            onClick={initialize}
            disabled={isTxPending || chainId !== avalancheFuji.chainId}
          >
            {isTxPending ? 'Initializing...' : 'Initialize Position'}
          </button>
        )}

        {txStatus !== 'idle' && <p>{txMessage}</p>}

        <GameBoard
          gameMap={gameMap}
          playerPos={playerPos}
          isInitialized={isInitialized}
        />
      </div>
      <p>Use Arrow keys or WASD to move.</p>

      {isCleared && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>CLEAR!</h2>
          </div>
        </div>
      )}
    </>
  );
}
