import process from "node:process";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient, type SS58String, } from "polkadot-api";
import { dot, people, collectives } from "@polkadot-api/descriptors";

function makeClient(endpoint: string): PolkadotClient {
    console.log(`Connecting to endpoint: ${endpoint}`);
    const provider = getWsProvider(endpoint);
    const client = createClient(provider);
    return client;
}

async function printChainInfo(client: PolkadotClient) {
    // This method should not be used in prod since chain info isn't standardized onchain yet
    const chainSpec = await client.getChainSpecData();
    const finalizedBlock = await client.getFinalizedBlock();
    console.log(`Connected to ${chainSpec.name} at block ${finalizedBlock.number}.`);
}

async function getBalance(polkadotClient: PolkadotClient, address: SS58String) {
    const dotApi = polkadotClient.getTypedApi(dot);
    const accountInfo = await dotApi.query.System.Account.getValue(address);
    const { free, reserved } = accountInfo.data;
    return free + reserved;
}

async function getDisplayName(peopleClient: PolkadotClient, address: SS58String): Promise<string | undefined> {
    const peopleApi = peopleClient.getTypedApi(people);
    const accountInfo = await peopleApi.query.Identity.IdentityOf.getValue(address);
    const displayName = accountInfo?.[0].info.display.value?.asText();
    return displayName;
}

interface FellowshipMember {
    address: SS58String;
    rank: number;
}
  
async function getFellowshipMembers(collectivesClient: PolkadotClient): Promise<FellowshipMember[]> {
    const collectivesApi = collectivesClient.getTypedApi(collectives);
    const rawMembers = await collectivesApi.query.FellowshipCollective.Members.getEntries();
    const fellowshipMembers = rawMembers.map((m) => {
        return { address: m.keyArgs[0], rank: m.value };
    });
    return fellowshipMembers;
}

async function main() {
    const polkadotClient = makeClient("wss://rpc.polkadot.io");
    await printChainInfo(polkadotClient);

    const peopleClient = makeClient("wss://polkadot-people-rpc.polkadot.io");
    await printChainInfo(peopleClient);

    const address = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr";
    const balance = await getBalance(polkadotClient, address);
    const displayName = await getDisplayName(peopleClient, address);
    console.log(`Balance of ${displayName} whose address is ${address} is ${balance}.`);

    console.log(`Done!`);
    process.exit(0);
}

main();
