import { GlobalProvider } from "./context/GlobalState";
import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <GlobalProvider>
      <Outlet />
    </GlobalProvider>
  );
}

export default App;
