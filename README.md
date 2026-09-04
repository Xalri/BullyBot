# RexBully Discord Bot

A small event-driven Discord bot built with Node.js and `discord.js`. It demonstrates how to listen for message and voice-state events, filter events for a configured user, and respond through the Discord API.

The bot was created for a private server as a playful automation project. Its responses are intentionally configurable and should only be used in communities where all participants are comfortable with the behavior.

## Features

- Loads credentials and runtime configuration from environment variables.
- Responds to messages from a configured target username with a randomly selected reply.
- Adds a reaction before replying to create a lightweight interaction flow.
- Detects when the configured user leaves a voice channel and posts a notification.
- Uses Discord gateway intents for guilds, messages, message content, and voice-state updates.

## Requirements

- Node.js 18 or newer
- A Discord application and bot token
- A Discord server where the bot has been invited
- The required Discord privileged intents enabled in the Developer Portal:
  - Message Content Intent
  - Server Members Intent is not required by the current implementation

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   TOKEN=your-discord-bot-token
   TARGET_USERNAME=discord_username
   ```

3. Invite the bot to a server with permission to:

   - View channels
   - Send messages
   - Add reactions
   - Read message history

4. Start the bot:

   ```bash
   node index.js
   ```

   A successful startup logs the bot account and the configured target username.

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `TOKEN` | Yes | Discord bot token. Keep this secret. |
| `TARGET_USERNAME` | Yes | Username whose messages and voice-state changes are handled. |

The destination channel and guild are currently configured as constants in `index.js` so the bot remains scoped to its original server setup.

## How It Works

1. `ClientReady` confirms that the bot has authenticated successfully.
2. `MessageCreate` ignores other bots and users who do not match `TARGET_USERNAME`.
3. Matching messages receive a reaction and a randomly selected response.
4. `VoiceStateUpdate` checks whether the configured user has left a voice channel, then posts a notification to the configured channel.

This event-driven approach keeps the bot idle between Discord gateway events and avoids polling.

## Security Notes

- Use a dedicated bot account with only the permissions it needs.
- Enable only the gateway intents required by the application.
- Review and customize the response list before deploying the bot to a shared or public community.

## Development Check

Validate the JavaScript syntax without connecting to Discord:

```bash
node --check index.js
```