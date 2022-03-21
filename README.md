## Description

Microservice based product crawler


## Running the app

```bash
# Prep
Move .env.example to .env - adjust settings if needed
$ npm install
$ npm install -g migrate-mongo

# Kubernetes via tilt
Install Tilt https://docs.tilt.dev/install.html for your OS
$ npm run namespace
$ tilt up

# Run migrations
mongo-migrate up

# Access swagger http://localhost:3000/docs
# Access tilt http://localhost:10350
```
