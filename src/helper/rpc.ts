import { JsonRpcProvider } from '@ethersproject/providers'
import { INetworkConfig } from '../types'
import View from '../abi/View.json'
const { AssistedJsonRpcProvider } = require('assisted-json-rpc-provider')
const scanApiKey = 'XGNAITEY1AI67HU25JTZTGSNCAE614F1VD'
export const getRPC = (networkConfig: INetworkConfig) => {
  const { rpcGetLog, scanApi } = networkConfig
  const rpcProvider: JsonRpcProvider = new JsonRpcProvider(rpcGetLog)
  rpcProvider.setStateOverride({
    [networkConfig.derivable.logic]: {
      code: View.deployedBytecode,
    },
  } as any)
  const option =
    typeof scanApi === 'string'
      ? {
          url: scanApi,
          maxResults: 1000,
          rangeThreshold: 0,
          rateLimitCount: 1,
          rateLimitDuration: 5000,
          apiKeys: scanApiKey ? [scanApiKey] : [],
        }
      : scanApi
  const provider = new AssistedJsonRpcProvider(rpcProvider, option)
  return provider
}
