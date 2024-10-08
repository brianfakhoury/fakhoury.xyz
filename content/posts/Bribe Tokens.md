---
tags:
  - crypto
  - programming
  - hacking
date: Jan 24, 2022
publish: true
image: 
slug: bribe-tokens
origin: https://mirror.xyz/fakhoury.eth/AEUye97BSEsNaHtxomYsi5OTTvNlVlK5QUqKb_WjR5Y
description: 
title: Bribe Tokens
---
Context: I had written this as a note many months ago. On reflection, I think the term _bribe token_ might better be reserved for the ongoing “Curve” wars and the rise of DeFi gauge bribes…

## 🧙🏼‍♂️ Gaming the blockchain

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0-solc-0.7/contracts/token/ERC20/ERC20.sol";

contract BigBlockToken is ERC20("Big Block Gang", "BB") {
    fallback() external {
        require(block.gaslimit >= 25_000_000, "your block is too small ;)");
        ERC20._mint(block.coinbase, 1);
    }
}
```

_Figure 1. Simple Miner Incentivisation Token. Inspired by [@thegostep](https://twitter.com/thegostep/status/1364660556234383366/photo/1)_

The unfortunate reality of a state machine with distributed consensus is that there will be politics. Just like the legacy financial system was supplanted by the coded rules of defi, the politics of tomorrow will be coded in smart contracts.

Today, this looks like harmless on-chain voting. Tomorrow, it looks like the simple contract above. Roughly stated, that contract is an ERC20 token that can only be minted to Ethereum miners (and future validators) that submit blocks of 25M gas or greater. Just like a majority of tokens on Ethereum, this one has no inherent value. But if I'm a third party that wants larger blocks, perhaps because I run a large farm and would benefit from centralization or I'm a nation-state that wants to take over Ethereum, I can simply buy these tokens off a Uniswap market (seeded by the miners). What's the effect? Miners are now incentivized to collect these tokens. It's MEV gone wrong.

## ⛏ Digging Deeper

The quick solution to the above is to code a block limit into the Ethereum protocol and include it in one of the many upgrades that happen every year. Indeed, that's exactly what should happen this summer with the London hard fork.

But what happens when you generalize this? I think bribe tokens are primed to change the way the politics of blockchain economies work. In fact, there's quite an elegant analogy in this concept. Consider:

- Lobbying → buying bribe tokens
- Politicians → contract deployer and social promoter
- Protocols → legislature

While I don't expect the base layer blockchain protocol to be the ultimate victim of bribe tokens, though I'm sure we'll continue to see renditions of the above, the real target is the existent DeFi protocols.

_💡 Important aside: bribe tokens are always created by a third party with no on-chain relationship to the target. Otherwise, this would just be standard community incentives through rewards._

## Example

I think a protocol that could be an easy target of a bribe token campaign is a dex aggregator like 1inch. Given that order routing is a commodity, an actor might want to incentivize order flow to _not_ go through the 1inch contract. This could happen if 1inch consistently got worse-than-optimal prices.

In this case, the bribe token would have the following functionality: Mint for every sandwich attack on a 1inch trade.

Here's a skeleton implementation:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0-solc-0.7/contracts/token/ERC20/ERC20.sol";

contract Make1InchIrrelevant is ERC20("F 1inch", "f1inch") {
			// set Helper contract as minter
}

contract Helper {
		// escrow token ahead of 1inch transaction
		// log pool balance
		// require change in second transaction
		// return token difference/profit
		Make1InchIrrelevant._mint(/* mint token to caller address */)
}
```

Now, any actor who agrees with the anti-1inch political view can purchase/bid these tokens and contribute toward consensus incentives to front-run 1inch trades.

## Okay, but what's the opportunity?

If bribe tokens succeed in being used effectively, I would hope to see a "Gauntlet network for bribe tokens". If set up as an effective, altruistic DAO, I imagine a protocol that acts in public goods-like service to ensure the social arbitrage of a protocol is not left unchecked. Restated, this means that the irrational behavior of blockchain participants does not cause a contract to not function as intended (exogenously). In the case of 1inch, ensuring that it cannot have a sandwichgate attack.