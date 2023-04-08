import "./App.css";
import { useReceivePassword } from "./api/bookingApiComponents";

function App() {
  const { mutate: requestPassword, data } = useReceivePassword();

  const onClick = () => {
    requestPassword({
      body: {
        phone: "31317428",
      },
    });
  };

  console.log(data);

  return (
    <button type="button" onClick={onClick}>
      Login
    </button>
  );
}

export default App;
