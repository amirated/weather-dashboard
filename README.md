# Weather Dashboard

## Overview

This Weather App project is a React application that leverages the [Open Weather](https://openweathermap.org/) API to provide real-time weather information for specified locations. It is designed to be user-friendly, accessible, and visually appealing. The project integrates several libraries and tools to enhance functionality and streamline development.

## Features

**Open Weather API Integration:** Fetches accurate and up-to-date weather information for the specified location, including temperature, conditions, and forecasts.

**TypeScript:** The project is developed using TypeScript to enhance code readability, maintainability, and to catch potential errors during development.

**Tailwind CSS:** Utilizes the Tailwind CSS framework for styling, ensuring a visually pleasing user interface.

**Axios:** Makes use of Axios for efficient and easy HTTP requests to interact with the Open Weather API.

**React Accessible Accordion:** Integrates the React Accessible Accordion library to provide an accessible and interactive accordion component for displaying additional weather details or forecasts.

**React Icons:** Enhances the user interface with a variety of customizable icons from the React Icons library, providing clear visual indications of the application features.

**Dnd-kit:** Implements drag-and-drop functionality using Dnd-kit for a seamless and intuitive user experience, allowing users to rearrange locations or customize their view.

## Setup

Follow these steps to setup and run this project in development:

### Run `yarn`

Installs the dependencies.

### Create `.env` file

Create an account on Open Weather to get your API key.
Then add these lines in a `.env` file in the root directory of this project.
```
REACT_APP_OPENWEATHER_API_KEY=<PASTE_YOUR_API_KEY_HERE>
REACT_APP_CURRENT_WEATHER_API_ENDPOINT=https://api.openweathermap.org/data/2.5/weather
REACT_APP_WEEK_WEATHER_API_ENDPOINT=https://api.openweathermap.org/data/2.5/forecast
```
 
### Run `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Build

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
