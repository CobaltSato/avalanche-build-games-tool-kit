'use client';

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { WalletService } from './service/WalletService';
import { MetaMaskAdapter } from './adapters/metamask';
import { avalancheFuji } from './chains/avalanche-fuji';
import type { WalletContextValue, WalletProviderProps } from './types';

export const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({
  chain = avalancheFuji,
  adapter,
  contractAddress,
  contractABI,
  children,
}: WalletProviderProps) {
  const serviceRef = useRef<WalletService | null>(null);

  if (!serviceRef.current) {
    serviceRef.current = new WalletService(
      adapter ?? new MetaMaskAdapter(),
      chain,
      contractAddress,
      contractABI,
    );
  }

  const service = serviceRef.current;

  const [state, setState] = useState(service.getState());

  useEffect(() => {
    service.init();
    const unsubscribe = service.subscribe(setState);
    return () => {
      unsubscribe();
      service.destroy();
    };
  }, [service]);

  const connectWallet = useCallback(() => service.connect(), [service]);
  const sendTransaction = useCallback(
    (method: string, args?: any[]) => service.sendTransaction(method, args),
    [service],
  );
  const callView = useCallback(
    (method: string, args?: any[]) => service.callView(method, args),
    [service],
  );

  const value: WalletContextValue = {
    ...state,
    connectWallet,
    sendTransaction,
    callView,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
