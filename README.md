# Booking Admin Application

The Booking Admin application manage appointments for users. It is built using the React library and the Shopify Polaris design system. The application serves as the front-end layer that communicates with the back-end Booking API, providing seamless and user-friendly management of appointments, shifts, and user-related tasks.

## Deployment

```js
npm run build
```

It download the openapi.yml from booking-api repostory and then generate typesafe react-query hook.

## Development

```js
npm install
npm run build-openapi
npm run dev
```

This will install deps, download openapi.yml and generate the typesafe react-query hook.

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
