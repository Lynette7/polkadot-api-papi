import process from "node:process";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

function makeClient(endpoint: string): PolkadotClient {
    console.log(`Connecting to endpoint: ${endpoint}`);
    const provider = getWsProvider(endpoint);
    const client = createClient(provider);
    return client;
}

async function printChainInfo(client: PolkadotClient) {
    const chainSpec = await client.getChainSpecData();
    const finalizedBlock = await client.getFinalizedBlock();
    console.log(`Connected to ${chainSpec.name} at block ${finalizedBlock.number}.`);
}

async function main() {
    const polkadotClient = makeClient("wss://rpc.polkadot.io");
    await printChainInfo(polkadotClient);

    console.log(`Done!`);
    process.exit(0);
}

main();
