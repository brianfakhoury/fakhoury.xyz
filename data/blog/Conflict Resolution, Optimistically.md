---
tags: blog/crypto, blog/mechanisms
date: Aug 15, 2021
publish: true
image: 
slug: optimistic-resolution
origin: https://internetofvalue.substack.com/p/crypto-economies-do-not-own-fighter
description: 
---
# Conflict Resolution, Optimistically

![The Code Of Honor—A Duel in the Bois De Boulogne](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F1d371797-67c7-4bca-b260-188c2aaaf53e_1221x903.jpeg)

There's an analogy I've heard a number of times that is paraphrased as:

> When you go to buy a coffee, it's the fighter jets in the US Military that, after quite a sequence of cause & effect, ensure that your credit card transaction credits the merchant.

This sounds absurd, but it's really not. Provenance in the real world is tricky. Our trust assumptions rest on our courts upholding a fairly neutral account of (paper) law. But what upholds the courts? Well if you're an individual challenger, maybe a police officer or two will "uphold the courts." if you're a large, organized group, or perhaps a nation-state, the military will uphold the courts. The point is that government in the physical world has a sort of monopoly on violence, and under that assumption, we're free to go about making deals and contracts with other people.

Crypto is quite wacky. If someone halfway around the world steals your funds or your favorite NFT project rug pulls, there's no universal authority you go to right the wrong. In fact, with the way crypto is built, you'll likely _never_ be able to resolve the problem after the fact. Crypto economies differ from traditional economies in that:
- Crypto economies are sovereign and self-sustaining, and can even function in a (virtual) vacuum.
- Traditional economies scale with labor, while crypto economies scale with the distribution.

When enough participants of a shared system are at risk of general conflict, we need a mechanism for **consensus.** Paying for your coffee at Starbucks, consensus lies with a centralized authority that is likely Visa or Mastercard (and the courts as a backup if they become unruly). When sending cryptocurrency like bitcoin, the consensus is the proof of work algorithm that miners run on dedicated hardware that underscores the bitcoin network.

It's a huge breakthrough that consensus in crypto is derived from cryptography. There's a side argument to be made around social consensus on which blockchain is legitimate, but assuming the big ones like Bitcoin, Ethereum, and Solana have a sufficient number of people that believe assets in their ecosystem are real, the consensus is then fully derived from cryptography.

The handy thing about cryptography is that it is as sovereign as the laws of physics. There's no human influence, and you're better off trusting (to the nth degree) information made by wallets signing with a private key over trusting information from "people" on social media networks.

### Ethereum scaling solutions

Conflict resolution re-enters the sphere of thought once we look at scaling blockchains by doing things _off-chain_ and then reporting related data _on-chain_. This is essentially what the [rollups](https://insights.deribit.com/market-research/making-sense-of-rollups-part-one-optimistic-vs-zero-knowledge/) do. Think of it as a zip file for transactions. Rather than using precious units of gas on an expensive chain like Ethereum, why not compute the result somewhere else and just post the result? The technical issue is with conflict resolution. In a world without zk-snark rollups (that let us prove the computation was correct with cryptography), we need ways to resolve conflict when a rollup posts the wrong data/results. The elegant consensus for this turns out to simply be **optimistic.**

Optimistic conflict resolution says that we only assume no conflict until there's proof that wrongdoing happened. Optimistic rollups as an Ethereum scaling solution, hence, can zip up any number of transactions and say they happened to Ethereum.

Example: Say I'm a participant in the economy on Arbitrum (an optimistic rollup). I'm providing whatever value by selling NFTs, and Arbitrum makes these transactions way cheaper by computing my complex royalties logic for how much I should get paid when people are trading my art, and then simply posting the resulting balances back to good ole secure Ethereum. If a bad actor colludes with an Arbitrum node to trade one of my NFTs _without_ paying the royalty defined in the smart contract, I'm on the tail end of that and will be upset. Thankfully, conflict resolution is simply going to Ethereum, and asking it to prove the legitimacy of the suspicious transaction. The cryptography will quickly surface that the result is **fraudulent** since I wasn't credited my royalty, and punish the node that colluded with the bad actor. A lose-lose situation for all.

### Oracles

Oracles are so important to blockchain economies because they inform autonomous participants like smart contracts what's going on **outside** (i.e. I want to know the weather in Boston to settle a bet). Oracles are a tough problem because we cannot use cryptography to stop them from posting wrong answers. We can only achieve strong oracles through incentives and reputation. The problem space that intrigues me here is (surprise) optimistic oracles.

Here's a thought experiment. You and I are going to race, 100 meters. I'm confident that I'll smoke you, and you are equally as confident that you will prevail. Let's highlight two variants of outcomes. In one variant, there's a clear winner, and in the other, it's too hard for you and me to tell. In the former case, when the race ends and I win, we're fine settling the bet between us since it was obvious I won. In the second case, we were neck and neck, and we can't be sure that I won. If I try to claim victory, you'll object, and we'll ask our friend who was watching. They say I won and we settle the bet.

An optimistic oracle does _nothing_ most of the time as the resulting data that is needed is entered manually by parties and everyone agrees.

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F01d742ae-6b19-4a36-b168-6bf8871099de_1024x734.png)

[UMA](https://umaproject.org/) has such a neat implementation of this. It's literally a court system built on-chain that acts as the fighter jets for any smart contract ecosystem. Without this system, smart contracts would have to query an oracle like Chainlink for any off-chain info, adding to costs and complexity. With UMA oracles, we can go about making deals & contracts with each other and with smart contracts, knowing that we can integrate with UMA and settle disputes with their DVM (data verification module). I think this is crucial for a crypto economy.

### Parting words (I'm very tired at this point)

Optimistic conflict resolution has served humanity well for centuries and has now shown its prowess in virtual economies. While ZK-proofs (a technology so powerful that it'll be a game-changer for this century) might offer the transcendence step to perfect provenance, in the meantime, let's build optimistically.

---
[1] [https://www.weforum.org/agenda/2020/12/dispute-resolution-is-critical-for-blockchains-successful-growth-heres-5-reasons-why/](https://www.weforum.org/agenda/2020/12/dispute-resolution-is-critical-for-blockchains-successful-growth-heres-5-reasons-why/)
[2] [https://docs.umaproject.org/oracle/econ-architecture](https://docs.umaproject.org/oracle/econ-architecture)