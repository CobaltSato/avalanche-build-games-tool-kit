import type { ChainConfig } from './chains/types';
import type { WalletAdapter } from './adapters/types';

export type TxStatus = 'idle' | 'pending' | 'success' | 'error';

export interface WalletState {
  /** Connected account address */
  account: string | null;
  /** Current chain ID in hex (e.g. '0xa869') */
  chainId: string | null;
  /** Whether a wallet is connected */
  isConnected: boolean;
  /** Current transaction status */
  txStatus: TxStatus;
  /** Human-readable transaction message */
  txMessage: string;
}

export interface WalletActions {
  /** Request wallet connection */
  connectWallet: () => Promise<void>;
  /** Send a named contract method as a transaction */
  sendTransaction: (method: string, args?: any[]) => Promise<void>;
  /** Call a read-only (view) contract method */
  callView: (method: string, args?: any[]) => Promise<any>;
}

export type WalletContextValue = WalletState & WalletActions;

export interface WalletProviderProps {
  /** Chain configuration. Default: Avalanche Fuji Testnet */
  chain?: ChainConfig;
  /** Wallet adapter instance. Default: MetaMaskAdapter */
  adapter?: WalletAdapter;
  /** Deployed contract address (typically from env var) */
  contractAddress?: string;
  /** Contract ABI as a JSON string (typically from env var) */
  contractABI?: string;
  children: React.ReactNode;
}
