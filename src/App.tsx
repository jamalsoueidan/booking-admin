import axios from "axios";
import "./App.css";
import { useAuthReceivePassword } from "./api/bookingShopifyApi";

axios.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: "/api", // use your own URL here or environment variable
  };
});

function App() {
  const { mutate: requestPassword, error } = useAuthReceivePassword();

  const onClick = () => {
    requestPassword({ data: { phone: "12345678" } });
  };

  console.log(error?.response?.data.error);

  return (
    <button type="button" onClick={onClick}>
      Login
    </button>
  );
}

export default App;
