# Booking Admin Application

This application gives each user/member access to their own bookings, schedule etc., allows them to edit their own bookings, schedule their time-work, and so on. Also see other members of the group bookings.

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
