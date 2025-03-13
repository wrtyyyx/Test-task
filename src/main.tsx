import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';


import './index.css'
import AppRouter from "./router/AppRouter.tsx";
import {Provider} from "react-redux";
import store from "./store";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
)
