import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyForm from "./Components/MyForm";
import AboutPage from "./Components/About";
import RequireAuth from "./Components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyForm />,
  },
  {
    path: "about",
    element: (
      <RequireAuth>
        <AboutPage />
      </RequireAuth>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
