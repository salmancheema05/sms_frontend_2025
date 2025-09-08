import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/admin";
import { StateProvider } from "./context/stateProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StateProvider>
            <Routers />
          </StateProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
