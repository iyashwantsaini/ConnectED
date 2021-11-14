import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Request from "./pages/Auth/Request";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";

function App() {
  return (
    <CustomProvider theme="dark">
      <Login />
      {/* <Register/> */}
    </CustomProvider>
  );
}

export default App;
