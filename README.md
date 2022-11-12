# laurent_x_dubois

This is a responsive photography website that I made for a friend of mine.
It uses:

- Node.js and Express
- Scss

It uses no frontend framework nor CSS packages such as Bootstrap. Animations and
responsiveness are implemented using pure CSS and Javascript.

## How to

### ... launch the app?

Build the container:

```COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build```

Run the container:

```docker-compose up prod```

### ... link my email to the contact page

1. Generate the application token as explained here:
[Google instructions](https://support.google.com/accounts/answer/185833?hl=en)

2. Add the token to the `.env` file under `SENDER_GMAIL_PASSWORD`
