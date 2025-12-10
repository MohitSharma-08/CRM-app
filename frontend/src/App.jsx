import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useState } from "react";
import LoginModal from "./Components/Modal/LoginModal";
import { Provider } from "react-redux";
import { store } from "./redux/store";
export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {!loggedInUser ? (
          <div className="min-h-screen bg-white flex justify-center items-center">
            <LoginModal setLoggedInUser={setLoggedInUser} />
          </div>
        ) : (
          <AppRoutes
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        )}
      </BrowserRouter>
    </Provider>
  );
}
