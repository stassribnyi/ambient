# Ambient (Weather Forecast)

[Ambient](https://stassribnyi.github.io/ambient) is a simple and user-friendly page with up-to-date weather forecasts for your favorite locations. Explore the daily forecast as well as predictions for the days to come, and analyze weather trends with an atmospheric conditions chart.

## Motivation

My old React project had grown stale, like yesterday’s bread, and I yearned for something more. The other day, as rain tapped insistently against my window, and the wind rattled the panes, inspiration struck.

And so, in the heart of a bustling city, where raindrops danced on umbrellas and wind howled through narrow alleys, there was a beginning for a little weather project called “Ambient.” The idea was dead simple: to provide real-time updates on the ever-changing moods of the sky.

## Features

- Shows the **Current** temperature with a short description, how it feels like, humidity percentage, wind speed by Beaufort scale, UV index scale and sunrise/sunset time.

- **Hourly** precipitation probability, temperature, and time for the next 24 hours.
- **Daily** forecast for the next 10 days.
- **Atmospheric Conditions Chart** with cloud cover, relative humidity and precipitation probability to visualize weather trends for the next 10 days.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/stassribnyi/ambient.git
   cd ambient
   ```

2. **Install Dependencies:**

   ```bash
   yarn
   ```

3. **Run the Development Server:**

   ```bash
   yarn dev
   ```

4. **Open Your Browser:**
   Visit [http://localhost:5173](http://localhost:5173) to see the Ambient (Weather Forecast) in action!

## Available Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the production-ready app.
- `yarn lint`: Lints code using ESLint.
- `yarn preview`: Previews the production build locally.
- `yarn predeploy`: Builds the app before deploying.
- `yarn deploy`: Deploys the app using GitHub Pages.
- `yarn prepare`: Installs Husky hooks for pre-commit checks.

## How to use

TODO: Update screenshots

To use Ambient, you need to change location to yours, you can do so via menu in the top left corner. The webpage will then display the current, hourly and daily forecast, as well as the chart, for selected location. You can also change the units of measurement for the temperature and wind speed by clicking on the toggle at the top right corner of the webpage.

![Ambient UI](image-4.png)
![Locations manager](image-5.png)

## Tools and Technologies Used

- 🚀 React
- 🛠️ Vite
- ☑ TypeScript
- 💅 MUI
- 🧾 Axios
- 💬 date-fns
- 🖼 @bybas/weather-icons

## Project Preview

Visit the [Ambient Live Preview](https://stassribnyi.github.io/ambient/) for live demos and more information.

## License

This project is licensed under the MIT License.

## TODO: Apply if necessary

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
