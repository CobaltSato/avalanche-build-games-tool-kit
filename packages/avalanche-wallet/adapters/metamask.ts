'use client';

import { BrowserProvider, Contract } from 'ethers';
import type { ChainConfig } from '../chains/types';
import type {
  WalletAdapter,
  ConnectResult,
  TransactionResult,
  AdapterEventHandlers,
} from './types';

export class MetaMaskAdapter implements WalletAdapter {
  readonly name = 'MetaMask';

  private provider: BrowserProvider | null = null;
  private handlers: AdapterEventHandlers | null = null;

  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum;
  }

  async connect(chain: ChainConfig): Promise<ConnectResult> {
    if (!window.ethereum) {
      throw new Error(
        'MetaMask is not installed. Please install it to use this dApp.',
      );
    }

    const browserProvider = new BrowserProvider(window.ethereum);
    await browserProvider.send('eth_requestAccounts', []);

    const signer = await browserProvider.getSigner();
    const account = await signer.getAddress();
    const network = await browserProvider.getNetwork();
    const chainId = `0x${network.chainId.toString(16)}`;

    this.provider = browserProvider;

    return { account, chainId };
  }

  async sendContractTransaction(
    contractAddress: string,
    contractABI: string,
    method: string,
    args: any[] = [],
  ): Promise<TransactionResult> {
    if (!this.provider) {
      throw new Error('Wallet not connected.');
    }

    const signer = await this.provider.getSigner();
    const contract = new Contract(
      contractAddress,
      JSON.parse(contractABI),
      signer,
    );

    const tx = await contract[method](...args);
    await tx.wait();

    return { hash: tx.hash };
  }

  subscribe(handlers: AdapterEventHandlers): void {
    const { ethereum } = window;
    if (!ethereum?.on) return;

    this.handlers = handlers;

    ethereum.on('accountsChanged', handlers.onAccountsChanged);
    ethereum.on('chainChanged', handlers.onChainChanged);
  }

  unsubscribe(): void {
    const { ethereum } = window;
    if (!ethereum?.removeListener || !this.handlers) return;

    ethereum.removeListener(
      'accountsChanged',
      this.handlers.onAccountsChanged,
    );
    ethereum.removeListener('chainChanged', this.handlers.onChainChanged);

    this.handlers = null;
  }
}
