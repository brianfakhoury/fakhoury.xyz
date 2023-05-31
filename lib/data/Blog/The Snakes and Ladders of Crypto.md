---
tags: blog/crypto, blog/mechanisms
date: Aug 23, 2021
publish: true
image: 
slug: crypto-bridges
origin: https://internetofvalue.substack.com/p/the-virtual-bridges-that-will-power
description: 
---
# The Snakes and Ladders of Crypto

![Puente romano de Alcántara. An old Roman bridge.](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc1528bb-ae8f-47ab-9c8c-5e7b49f99b5f_800x524.jpeg "File:Puente romano de Alcántara, en El Museo Universal.jpg")

I always come back to this metaphor: a blockchain is an economy. Yes, blockchains partake in _our_ economies. But, on their own, networks like Ethereum are their _own_ economy. They are capable of (virtual) production without any external effects.

In the real world, economies are likely to benefit from interacting with one another. This is also the case in crypto. To date, the absolute number of blockchains has, in a Cambrian way, exploded. Bitcoin’s beloved distributed ledger technology was (this is oversimplified) sliced and diced hundreds of times to create cryptocurrencies like Dogecoin that we all know and love. This has collectively built a multi-trillion dollar asset class in the span of a decade, and, as we’ll come to see, the economic opportunity here is only just getting started because of bridges.

![Most Popular Blockchains. With a total count of 253 being tracked. Source: Messari](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fa23f7852-63c8-4db6-8bf4-30d81081a27b_1334x1538.png "image.png")

#### What is a bridge when it comes to blockchains?

Let’s use the United States for this example. Within the US borders, economic activity happens quite freely, being curbed here and there by regulation and law, but mostly replicable and interoperable state by state.

In a closed system, materials originate in the US, are processed here, and the product is sold here. In theory, this would absolutely be a valuable and productive system. In practice, we build bridges and move materials, money, and products across them, dealing with the two-sided complexity of converting from one set of rules to another. We build economic bridges to Canada, Mexico, China, Europe, etc... why? Without getting beyond the scope of my knowledge, it’s because there are valuable economies outside the US that we benefit from interacting with. There are assets elsewhere in the world that, when utilized correctly, make our own assets more productive.

Blockchains are, and I cannot stress this enough, no different aside from having virtual rather than physical goods. In fact, the most shy adopters of crypto have indeed used a bridge. For people in the US, that bridge is likely Coinbase. If we think of Ethereum as its own economy, you need a way to get into that state. What Coinbase has built for us in the US economy is a bridge to the Ethereum economy, wherein Coinbase will hold Ethereum assets in our name and give us an interface for that representation. Should we want to go elsewhere in the Ethereum economy, perhaps to buy an NFT or join a DAO, we would cross the Coinbase bridge, take custody of our assets, and no longer be interacting with that bridge. But while we were still with Coinbase, our assets where merely a US economy representation of them on the real blockchain. When we cross the bridge, we receive those assets in our own wallet, and only then are we independent actors in the Ethereum economy.

#### Enough jargon, what’s the utility here?

Simply put, Ethereum is extremely secure but **slow** and **expensive**. I think MakerDAO’s $DAI is a great example to illustrate this. DAI is a “stablecoin” built on Ethereum. It’s always worth $1, is backed by other crypto assets, and can be used by anyone around the world without permission. Don’t take my word for it, take the billions of dollars of DAI that have been minted for crypto natives to use as a stable asset:

![Amount of DAI in existence over time. Source: daistats.com](Blog/Assets/Amount_of_DAI_in_existence_over_time._Source!_daistats.com.png)

DAI is a great asset, so much so that people want to use it _outside_ of Ethereum. **And here’s a major point on why other blockchains exist: you don’t need the full backing of Ethereum if you want to pay for a coffee with crypto, say in DAI.** For this use case, while blockchains are still very practical, there exist other chains that process transactions must faster than Ethereum, one of these being the (Ethereum friendly) Polygon Network. A transaction on Ethereum ranges from a few dollars worth of Ether to hundreds of dollars worth of Ether. They also take at least 15 seconds to go through and be confirmed. I’m not saying this is bad, Ethereum is massively useful. But when I use Polygon, the transaction is confirmed in a couple seconds and the fee never gets near a penny even.

_“Great! I would like to transact with DAI on Polygon then.”_

Not so fast. DAI is created on Ethereum much like US Dollars are created in the United States. Any DAI that I use on Polygon has to have been brought over either by myself or someone else at some point. Thankfully, the Polygon developers have built a nice bridge for any assets on Ethereum to easily be brought over to Polygon: 

![Ethereum to Polygon Bridge](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F9e420ff1-5b04-43bf-a493-cc81d0ff224c_998x854.png "image.png")

The bridge works by holding custody of the assets on Ethereum, and issuing 1:1 that asset on the Polygon network. This doesn’t require any input from MakerDAO because DAI is permissionless, and DAI issued on Polygon by the bridge is backed by the real thing on Ethereum. But, because of high transaction costs on Ethereum, it’s not cheap to move DAI over. Though once it’s there, it’s easy and inexpensive to use. (for those that are extra curious: MakerDAO is considering **creating** DAI on Polygon in the future through the same collateral process as on Ethereum)

In my head, I think of this Ethereum<>Polygon bridge as a blockchain international highway. Assets leave the borders of Ethereum in bulk, and are redistributed in another economic region. Given that the bridge acts perfectly and does not mess up the accounting for assets on both sides, this is indistinguishable in nature from physical goods crossing physical bridges.

Another easy example here is **Bitcoin**. Compared to Ethereum, the Bitcoin network is even slower and can only do a fraction of the things that Ethereum can do. Regardless, there’s still a trillion dollars of assets on bitcoin. Let’s bring it over the highway and use it in the Ethereum economy?

The difference in this example is that neither Bitcoin developers nor Ethereum developers have built an “official” bridge for bitcoin to come onto ethereum (Ether could never go onto Bitcoin because of limitations of the network).

Therefore, it’s up to third parties to “bridge” bitcoin over. There’s a wide range of solutions here. On one end, you have traditional companies like BitGo who will take people’s bitcoin, and issue them a “wrapped” version on Ethereum ($wBTC), with the ability to come back and “unwrap” the tokens for their original bitcoin. Other solutions focus on permissionless bridges where a group of independent validators put up some collateral for the ability to wrap/unwrap bitcoins with the penalty of losing the collateral should they act maliciously. Examples of this are Ren Protocol and Keep Network.

To sum it up, blockchains have a native asset, like BTC or ETH, and possibly tokens within their network, like DAI, that have utility or need outside of their native chain. Let’s continue.

#### Why go through all this trouble?

It doesn’t end here. Building the bridge from Ethereum is a tough task. With a growing number of blockchains, the number of required bridges will grow exponentially:

![There will be lots of highways between blockchains.](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F8539c1bd-2667-474d-8867-7acfbdc0a4ef_1400x1274.png "image.png")


As is apparent with Bitcoin and Polygon, different blockchains have fundamentally different security/decentralization/fee tradeoffs. On one end, you have something like Binance Smart Chain. It functions very similarly to Ethereum, except it is much more centralized. At the cost of only a few parties controlling the whole thing, fees are cheaper and transactions go through faster. This works fine for an average person with relatively small financial activity, but if you’re a big institution, this amounts to real counterparty risk. NFTs are a popular application of blockchains, but do I really need the same security promises for my ownership of a cat JPG that I do for my financial assets? Probably not, and this is why the market is keen towards different blockchains with different characteristics.

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F1c7fed19-9423-4bdb-9caa-6db27179ffc7_936x808.png "image.png")

#### Scalability and dependency

As bridges get stronger, the economic security of Ethereum actually becomes a better selling factor as I see it: you can leave and come back to the strongest economy with increasing ease. In this regard, asset architects might always elect to mint on ethereum, but have available liquidity on other chains.

On one hand, lots of independent blockchains exist that have nothing in common with Ethereum. For example, Solana can process 50,000 transactions a second with fees that are a fraction of Ethereum’s. This is great for things like trading, but aren’t as useful for something like NFTs. Still, a lot of assets on Solana come from Ethereum through their bridge.

This begs the question, should other blockchains strive to be independent, or share a commonality with Ethereum? The Polygon network elects the latter, choosing to “commit” checkpoints of its own state onto Ethereum, have a built-in asset bridge, and use the same programming language as Ethereum for its smart contracts. Others that do this in one way or another are the Fantom Network, Avalance, Celo, Binance Smart Chain, xDai, and more.

Another variation here is “Layer 2”. While a blockchain like Binance Smart Chain does not depend at all on Ethereum, something like Polygon needs Ethereum to serve as “checkpoints” in case of critical failure. This makes the Polygon network a sort of second layer on top of Ethereum. One that runs faster and cheaper, enabling the underlying layer to be more productive. Sound familiar? “Assets elsewhere that make ours more productive.” Ethereum stands to benefit most from L2 scaling. It’s like having remote colonies that are highly productive and on your side. In this regard, a whole class of technologies have been launching that take the heavy lifting off of Ethereum until it needs a “checkpoint”. These include Optimism, Arbitrum, and many more key players.

This critically improves end user experience as transactions that share the security of Ethereum appear cheaper and faster, and in the background, ultimately settle on Ethereum, the L1.

BUT, there’s a big piece missing here. Going back to the beginning, virtual assets only exist in the economy in which they were created. Having 1 ETH on Ethereum means nothing to Polygon if I can’t use it in the Polygon network. That’s what bridges solve, but in Layer 2 scaling world, there won’t be a winner-takes-all. Polygon, Optimism, Starkware, and Solana will all have functioning ecosystems that users will want to be a part of. If each one has it’s own bridge to Ethereum, great, but that makes switching between them expensive and complex. What we need is true interoperability between blockchains. I need to be able to have DAI on Polygon and move it over to Optimism directly. The DAI that I receive there should still be the 1:1 backed DAI that exists locked on the Ethereum network. If this problem is solved, the native digital economy of the internet will be without limit. No matter where value is created, it will be honored and useable anywhere else.

#### The Connext Way

Connext is a leading project in solving blockchain interoperability. They already have a working bridge [here](https://xpollinate.io/) that allows for transfer of tokens between an assortment of EVM (that more or less means can easily run code built for Ethereum) blockchains:

![Connext enabled bridge.](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fff69ddc1-5a2d-4b44-b759-77df6ded486f_1312x892.png "image.png")

How does this work? It’s actually fairly straightforward if we skip some of the technicality. Since the asset already exists on all these blockchains because of their bridge with Ethereum, Connext creates pools of each token, say DAI, on each network. Then, users and applications alike can swap between the pools by depositing DAI into a pool on one network and taking it out of the other. The benefit of EVM blockchains is that existing addresses and private keys work across any of the networks, so your asset is ready to go in your wallet once the swap is done.

#### fin

This is ultimately the game of snakes and ladders. In a crypto economy where capital is vying to be productive, the game is sped up and slowed down by cross-chain liquidity pools and baked-in asset bridges that will truly make the Internet of Value an unbounded economic arena.

---
[1] [https://stonecoldpat.medium.com/a-note-on-bridges-layer-2-protocols-b01f8fc22324](https://stonecoldpat.medium.com/a-note-on-bridges-layer-2-protocols-b01f8fc22324)
[2] [https://insights.deribit.com/market-research/making-sense-of-rollups-part-one-optimistic-vs-zero-knowledge/](https://insights.deribit.com/market-research/making-sense-of-rollups-part-one-optimistic-vs-zero-knowledge/)