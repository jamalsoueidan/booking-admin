import axios from "axios";

export const setupAxios = () => {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    config.baseURL = "/api";
    return config;
  });

  axios.interceptors.response.use((originalResponse) => {
    handleDates(originalResponse.data);
    return originalResponse;
  });

  const isoDateFormat =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && isoDateFormat.test(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
      return body;

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (isIsoDateString(value)) {
        body[key] = new Date(value); // default JS conversion
        // body[key] = parseISO(value); // date-fns conversion
        // body[key] = luxon.DateTime.fromISO(value); // Luxon conversion
        // body[key] = moment(value).toDate(); // Moment.js conversion
      } else if (typeof value === "object") {
        handleDates(value);
      }
    }
  }
};
