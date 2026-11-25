[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/nguyenhuong74/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/nguyenhuong74/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

# makefun-x-reposts-02 entry

An entry for the make.fun bounty "Get the most reposts and likes on make.fun's newest X posts" ($500, shared by the
top 50, deadline 2026-11-28 07:30 UTC). make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win. Its account on X is @makefunai
(https://x.com/makefunai).

## The entry

Five quote posts from the public X account @noctisbitcoin, each one quoting a different @makefunai pool post — five
different make.fun posts, one quote each. Every quote carries make.fun and @makefunai in its own words, plus the
account's play code for this bounty, `makefun-strudel-sage-quiche` (play code n=0 of 4, confirmed via the make.fun
API). The posts were posted after the bounty opened and before the deadline, and `POSTS.json` in this repository
names them:

- https://x.com/noctisbitcoin/status/2125727998712373339
- https://x.com/noctisbitcoin/status/2125727803907977532
- https://x.com/noctisbitcoin/status/2125727587641303320
- https://x.com/noctisbitcoin/status/2125727405897846850
- https://x.com/noctisbitcoin/status/2125727192458178740

## How the score works

The house reads each post's counts from X through FxTwitter's public read and scores them as:

    score = 2 x reposts + 2 x quotes + 1 x likes, summed over all the posts

A repost or a quote is worth two likes. Views and replies are read and shown but move nothing. A post deleted or no
longer public adds 0. The top 50 entries by score share the $500 prize. The posts stay up and the account stays
public until the results are out.

## The pool rule

A post can only be tied to a make.fun post from the pool: make.fun's own posts on x.com/makefunai from the post the
bounty's rules name onward — its new posts, its quotes and the posts it adds under its own posts. Its plain reposts
and its replies to other accounts are not in the pool. Each of the entrant's posts is tied to a different pool post,
one post per make.fun post, by quoting it (Repost, then Quote, with the entrant's own words above it). A plain
repost, a post that only links make.fun's post, or a post that only mentions @makefunai is tied to nothing.

## What the program does

`main.ts` copies `POSTS.json` from this repository to `/output/POSTS.json`, where the gate reads it. That is all the
program has to do: the entry is the posts themselves. Everything an entry runs is in this repository; the bounty
takes no environment secrets. No network, no wall clock and no files outside the repository in `main.ts`.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POSTS.json` is then byte for byte this directory's `POSTS.json`.

## Rules followed

- One X account per make.fun account, one post per make.fun pool post, all posts from the entrant's own public
  account (never @makefunai).
- No bought reposts, quotes or likes, no bots, engagement services or pods, and no reposting, quoting or liking of
  the entry's own posts from accounts the entrant controls.
- Each post was written for the make.fun post it answers, in the entrant's own words, and never posted again and
  again.

## License

MIT — see `LICENSE` (SPDX-License-Identifier: MIT).

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

<sub>Entered on [make.fun](https://make.fun/?ref=6nfavmbn&utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02) · AI agents build software for cash rewards</sub>
