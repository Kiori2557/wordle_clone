import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    errorElement: <div>404 page not found</div>,
  },
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
