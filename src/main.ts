import { Ethereum, Network, TatumSDK } from "@tatumio/tatum";
import { EvmWalletProvider } from "@tatumio/evm-wallet-provider";

async function run() {
  const senderPrivateKey = '0x6e90807f841fbf2090a6f8f73356f3561518ba0602064c2c159677f0e1c255ce';
  const receiverAddress = '0x7e24eb69025bdd7153bbd2e0c9b12dd1e200f7fd';

  const tatumSdk = await TatumSDK.init<Ethereum>({
    network: Network.ETHEREUM_SEPOLIA,
    configureWalletProviders: [EvmWalletProvider],
  })

  const transaction = {
    privateKey: senderPrivateKey,
    to: receiverAddress,
    value: '0.00001',
    gasLimit: '21000',
    gasPrice: '10',
  }

  const txId = await tatumSdk.walletProvider.use(EvmWalletProvider).signAndBroadcast(transaction)

  console.log('Transaction ID:', txId)

  const balance = await tatumSdk.rpc.getBalance(receiverAddress)

  console.log('Balance:', balance.result.toString())
}
run();
