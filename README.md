# Next.js Locator App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The application is designed to show the locations of nearby food trucks on a map using geolocation data.

## Project Overview

The app fetches data from the backend Spring Boot API to display the food truck locations and allows users to search and filter results based on coordinates and text input. 

Please note that fetching the current geolocation is **not working in production** due to SSL certificate requirements. However, it works fine in local environments. More details on how to set up SSL are provided below.

## Dependencies

This project uses several dependencies to manage state, UI, and API communication. Below is a list of key dependencies used in this project:

- **Next.js**: Framework for server-rendered or statically exported React applications.
- **React**: Library for building user interfaces.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Redux**: State management library for predictable state management in large applications.
- **Redux Toolkit**: A set of tools for efficient Redux development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for the browser and Node.js for API requests.
- **ESLint**: A tool for identifying and fixing problems in JavaScript and TypeScript code.


## Deployed Application

- **Frontend**: Deployed at [http://13.233.248.231:3000/](http://13.233.248.231:3000/)
- **Backend**: Deployed at [Backend API (Spring Boot)](https://theroyalraj-locator-backend.sliplane.app)

## Getting Started

### Local Development

To run the development server on your local machine, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/theroyalraj/food-truck-frontend.git
cd food-truck-frontend
```

   
2. **Install dependencies:**:
```bash
npm install
# or
yarn install
```

3. **Start the development server**:
```bash
npm run dev
# or
yarn dev
```

4. **Try**: Open http://localhost:3000 in your browser to see the app


 **Geolocation Notes**:
Geolocation functionality works locally but requires SSL to function correctly in production. When running locally, geolocation will work out of the box at http://localhost:3000. In production, ensure that your deployment uses HTTPS (SSL certificate) to enable the feature.


 **Backend Deployment**
The backend for this application is deployed using Spring Boot on Docker and is accessible at the following URL:
To view the backend repository and learn more about the API, visit https://theroyalraj-locator-backend.sliplane.app/api the GitHub repository https://github.com/theroyalraj/locator.git.



#### Developer Details

- ***Name***: Utkarsh Raj
- ***Email***: raj.utkarsh001@gmail.com
- ***LinkedIn***: https://www.linkedin.com/in/theroyalraj/