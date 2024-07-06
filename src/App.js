import { RouterProvider } from "react-router-dom";
import manHome from "./pages/ManHome";
import router from "./router";



import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose="4000" theme="colored" />
    </Provider>
  );
}

export default App;
