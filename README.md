# WorkersBot

An easy way to set up an application commands bot for Discord using CloudFlare Workers.

## Setup

### Creating a bot

Go to https://discord.com/developers/applications and click `New Application`. Enter a name, check agree, and click `Create`.

Scroll down to APPLICATION ID and click `Copy` (Save this for later).

Scroll down to PUBLIC KEY and click `Copy` (Save this for later).

Open the left menu and click `Bot`. Click `RESET TOKEN`, `Yes do it!`, and then `Copy` under TOKEN (Save this for later).

### Inviting the bot

Open the left menu and click `Installation`.

Check `Guild Install`, change Install Link to `Discord Provided Link`, click `Copy`, and click `Save Changes`.

The link will look similar to `https://discord.com/oauth2/authorize?client_id=1337065840757382170`. Open the link in your browser and select the server you want to add the bot to.

### Creating a worker

Go to https://dash.cloudflare.com/ and click `Workers & Pages` in the left menu.

Copy `Account ID` from the right and save it for later.

Click `Create application`, `Create Worker`, name it "workers-bot" (or change that and change it in wrangler.toml as well), and then `Deploy`.

Go to https://dash.cloudflare.com/profile and click `API Tokens`.

Click `Create Token`, `Use Template` next to Edit Cloudflare Workers.

At Account Resources select your account.

At Zone Resources select All Zones.

Click `Continue To Summary`, `Create Token`, and `Copy`. (Save this for later).

### Configure Secrets

Add the following secrets to your GitHub repository in Settings -> Secrets and variables -> Actions -> New repository secret.
- **DISCORD_TOKEN**

> Looks something like `MT2zNlAxNjU3NDcMNvM7MjE3Np.Pb4bw4.4sWqupEfAQ8TrxiDhUu5NDdcVCGghWQZ_fAFsX`

- **DISCORD_APPLICATION_ID**

> Looks something like `2537025970295382974`

- **CF_API_TOKEN**

> Looks something like `15qmHnOjZE2Phe5Dds7xZ8739gwSakzDSh2_Vpzj`

- **CF_ACCOUNT_ID**

> Looks something like `6a3be964eac67f3d29f050fb9331efda`

Add the following secrets to your CloudFlare worker in Settings -> Variables.
- **PUBLIC_KEY**

> Looks something like `fb0da82d97a222d40edc0c60e2a22c7c6439a32c5930879dcfd88484f05de518`

## Optional

### Configure Workers KV

Add the following to `wrangler.toml` replacing `NAMESPACE_ID` with your own namespace id. 

It will look something like `a49a00e7a31646db99be51789ff1475b`.
```toml
kv_namespaces = [
  { binding = "NAMESPACE", id = "NAMESPACE_ID" }
]
```

## Usage

Run the `update_commands.yml` and `publish.yml` GitHub Actions workflows to update the commands and publish the worker.

On https://discord.com/developers/applications/ Open your bot, open the left menu and click `General Information`. Find INTERACTIONS ENDPOINT URL and set it to `https://workers-bot.your-username.workers.dev` (change your-username to your cloudflare username).

Restart Discord and try one of the example commands in `commands.js`.

## Modifying the commands

Edit `commands.js` to add, remove, or modify commands, and `worker.js` to change how they respond. If you change command logic but keep the definitions the same, you won't have to run the `update_commands.yml` workflow, but otherwise you will need to. After editing, run `publish.yml` to update the worker, and restart Discord.

You will need to refer to the [Discord API documentation](https://discord.com/developers/docs/interactions/application-commands) to understand how to structure the commands and their logic.
