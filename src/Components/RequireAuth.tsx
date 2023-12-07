import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function RequireAuth({ children }: Props) {
  const user = localStorage.getItem("name");

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default RequireAuth;
