# Booking Admin Application

Preview: https://victorious-water-04353a503.2.azurestaticapps.net/

The Booking Admin application manage appointments for users. It is built using the React library and the Shopify Polaris design system. The application serves as the front-end layer that communicates with the back-end Booking API, providing seamless and user-friendly management of appointments, shifts, and user-related tasks.

## Deployment

```js
npm run build
```

This will install deps, download openapi.yml and generate the typesafe react-query hook, and start the dev server.

## Development

```js
npm install
npm run fb-openapi //fetch and build openapi
npm run dev
```

## Github Actions:

### pull request

1. Running chromatic (storybook)
2. Validate that build works (in case any api generation failling for some reason)

### main branch

1. Deploy Azure Static Web App

## Vite configuration

You need to configure vite to point to the api.

```js
export default defineConfig({
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:7071/api",
        changeOrigin: true,
        secure: false,
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
```

## Articles

- How to convert openapi to use-query:
  https://xata.io/blog/openapi-typesafe-react-query-hooks

- Link an existing Azure Functions app
  https://learn.microsoft.com/en-us/azure/static-web-apps/functions-bring-your-own#link-an-existing-azure-functions-app
