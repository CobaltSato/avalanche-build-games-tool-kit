export interface ChainConfig {
  /** Chain ID in hex (e.g. '0xa869') */
  chainId: string;
  /** Human-readable chain name */
  name: string;
  /** RPC endpoint URL */
  rpcUrl: string;
  /** Block explorer URL */
  explorerUrl: string;
  /** Native currency metadata */
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
