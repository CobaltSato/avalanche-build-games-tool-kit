import type { ChainConfig } from './types';

export const avalancheFuji: ChainConfig = {
  chainId: '0xa869',
  name: 'Avalanche Fuji Testnet',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
  explorerUrl: 'https://testnet.snowtrace.io',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
};
