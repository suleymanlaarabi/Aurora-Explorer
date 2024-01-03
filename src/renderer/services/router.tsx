import { Navigate, createBrowserRouter } from "react-router-dom";
import Edit from "../components/views/Edit";
import FileExplorer from "../components/views/FileExplorer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FileExplorer />,
  },
  {
    path: "edit/:name",
    element: <Edit />,
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
