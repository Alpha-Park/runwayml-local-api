# A local API to use RunwayML built with Puppeteer and Express

## Testing purpose only, not intended for production use

## Usage

### Install dependencies (using npm or other package managers)

```bash
npm install
```

### Set environment variables

```bash
cp .env.example .env
```

Then change the values in `.env` to your own credentials to log in to RunwayML, only username & password are supported.

### Run the server

```bash
npm start
```

### Send a request (using [WebHookThing](https://webhookthing.com/))

```bash
npx webhookthing@latest
```

### Congrats! You've just sent a request to RunwayML
