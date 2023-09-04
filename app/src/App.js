import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddEdit from "./Components/AddEdit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add",
      element: <AddEdit />,
    },
    {
      path: "/edit/:id",
      element: <AddEdit />,
    },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
