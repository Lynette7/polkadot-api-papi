# Polkadot API (PAPI)

- Polkadot API is used to connect to the Polkadot network. The Polkadot Client Interface is the high-level API (on top of PAPI) for interacting
with the network through polkadot API.

- PAPI has been used to connect to the Polkadot relay chain and other system chains like peoples and collective.

- The Polkadot relay chain is the central chain of the Polkadot network, responsible for coordinatingthe entire system of connected blockchains(parachains).

- System chains are specialized parachains that provide core functionalities to support the network's ecosystem. They are designed to help manage essential network functions, such as governance, staking and other foundational tasks for Polkadot's efficiency.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.32. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
