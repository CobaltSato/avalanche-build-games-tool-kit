import type { ChainConfig } from '../chains/types';

export interface ConnectResult {
  account: string;
  chainId: string;
}

export interface TransactionResult {
  hash: string;
}

export interface AdapterEventHandlers {
  onAccountsChanged: () => void;
  onChainChanged: () => void;
}

export interface WalletAdapter {
  readonly name: string;
  isAvailable(): boolean;
  connect(chain: ChainConfig): Promise<ConnectResult>;
  sendContractTransaction(
    contractAddress: string,
    contractABI: string,
    method: string,
    args?: any[],
  ): Promise<TransactionResult>;
  subscribe(handlers: AdapterEventHandlers): void;
  unsubscribe(): void;
}
