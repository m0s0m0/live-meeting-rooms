# Live Meeting Rooms

*Originally built in 2020. README rewritten and secrets cleaned out in 2026 before making this public — the code itself is unchanged from 2020.*

Real-time synchronized viewing rooms: anyone can create a room, share the link, and everyone who joins watches the same video in sync — play, pause, and seek on one screen apply to everyone in the room instantly. A late joiner is caught up automatically rather than having to hit "sync" themselves.

**What this is, precisely:** synchronized media playback across a shared room, built on WebSockets — not video calling. There's no camera/mic/WebRTC between participants; the "meeting" is everyone watching the same stream together in lockstep, with authenticated accounts and a per-room host.

## Tech stack
Node.js, Express, Socket.IO, Passport (local auth), EJS templating, PostgreSQL, bcrypt.

## How it works

Each client connection opens a Socket.IO socket. Entering a room name/number joins (or creates) a Socket.IO room; from then on, server-side events are scoped to that room only, so an action in one room never touches another.

**Host-driven sync.** The first socket into a room is marked `host`. The host socket carries the canonical state for the room — current video, current player, and the playback queue per player type — stored directly on Socket.IO's room object:

```
io.sockets.adapter.rooms['room-' + roomnum]
│   .host, .hostName, .users, .currPlayer, .length
├── .currVideo / .prevVideo   (per player: yt / dm / vimeo / html5)
├── .queue                    (per player: [{ videoId, title }])
└── .sockets                  (connected socket IDs)
```

When someone calls `play`/`pause`/`seek`, the server re-emits that action to every other socket in the room. When a new socket joins an already-running room, it reads the host's current state instead of starting from scratch — that's what makes sync automatic rather than something each viewer has to trigger.

**Multi-player support.** Started with YouTube's API only; adding DailyMotion, Vimeo, and HTML5 players meant abstracting player control behind a common interface, since each provider's API behaves differently. Players are initialized up front and shown/hidden rather than torn down, so switching players mid-session preserves your position in whichever video you came from.

## Running locally

```bash
npm install
cp .env.example .env   # fill in your own DB connection and API keys
npm run dev
```

Needs a YouTube Data API v3 key (`YT3_API_KEY`) and, optionally, a Dailymotion SDK key (`DM_API_KEY`) in `.env`.

```bash
npm test   # CI test suite
```
