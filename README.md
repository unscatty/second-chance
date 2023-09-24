# Second Chance (Fetch's Take-home exercise)
Adopt your perfect companion. A web app to find your perfect furry friend.

Go to site https://unscatty.github.io/second-chance/


## How to run this project locally

#### Clone the repo

```bash
git clone https://github.com/unscatty/second-chance/
```
#### Go to the project directory

```bash
cd second-chance
```

#### Install `pnpm`

```bash
npm install -g pnpm
```
or read the docs [here](https://pnpm.io/installation)

#### Install dependencies

```bash
pnpm install
```
#### Add environment variables

Example `.env.local` file


```bash
cp .env.example .env.local
```
```bash
VITE_DOGS_ENDPOINT='https://frontend-take-home-service.fetch.com'
```

Modify the `VITE_DOGS_ENDPOINT` variable inside `.env.local` file to point to the correct endpoint.


#### Run the project

```bash
pnpm run dev
```

Go to [localhost:4000](http://localhost:4000)

## Tech Stack
This project uses the [Vitesse](https://github.com/antfu/vitesse) template.

- Vue 3
- Vite (for bundling)
- Pinia (for state management)
- UnoCSS (Tailwind CSS alternative)
- Vitest (Testing library)
- SSG (Static Site Generation)
- TypeScript
- Vue Router
- Vue Query (for data fetching and caching)
- Headless UI (for accessible components)
- Heroicons
- GitHub Actions (for CI/CD)
- GitHub Pages (for deployment)
- Axios (for HTTP requests)
- ESLint and Prettier (for code formatting and linting)

## Deployment
Project is deployed using GitHub Pages via GitHub Actions. Deployment is triggered on every push to `main` branch.

## TODO
- [ ] Better dark mode support (some styles are broken)
- [ ] Add more tests
- [ ] Filter dogs by location
- [ ] Search dogs closer to your location, using the browser's geolocation API
- [ ] Use route's query params to filter dogs
- [ ] Send email to user when they got a match
- [ ] Be more user friendly when there are no dogs to show
- [ ] More alert notifications when something goes wrong

## Authors
Carlos Aguilera - [@unscatty](https://github.com/unscatty/)

