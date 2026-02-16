# Consensus mechanism that has an upper limit on when a txn will be included, regardless of the fee

Is there a consensus mechanism for a blockchain that allows for a transaction that bids a gas price of $p$, and where the minimum gas price $g$ over the next period, say of many months, is $g>p$?

The advantage of this design that has a guarantee here would be that a user can have a gurantee that a transaction will go through at a low price, say for some cost sensitive transaction. The downsides would probably be the following:
- Potential way to attack validators by filling up memory with "valid" transactions that will be invalid in the near future, but which cannot be thrown out immediately.

See also: [[cryptoeconomics]]