import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Layout from "./components/admin/Layout";
import Dashboard from "./components/admin/Dashboard";
import AddBlog from "./components/admin/AddBlog";
import ListBlog from "./components/admin/ListBlog";
import Comments from "./components/admin/Comments";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Loader from "./components/Loader";

const App = () => {
  const { token } = useAppContext();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/blog/:id",
      element: <Blog />,
    },
    {
      path: "/admin",
      element: token ? <Layout /> : <Login />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "addBlog",
          element: <AddBlog />,
        },
        {
          path: "listBlog",
          element: <ListBlog />,
        },
        {
          path: "comments",
          element: <Comments />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
};

export default App;
