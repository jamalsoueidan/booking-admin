import "./App.css";
import { useReceivePassword } from "./api/bookingApiComponents";

function App() {
  const { mutate: requestPassword, error } = useReceivePassword();

  const onClick = () => {
    requestPassword({
      body: {
        phone: "031317428",
      },
    });
  };

  console.log(error);

  return (
    <button type="button" onClick={onClick}>
      Login
    </button>
  );
}

export default App;
