import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../store/AccessTokenStore";
import { useAuthContext } from "../../contexts/AuthContext";

const LoggedRoute = ({ children }) => {
  const token = getAccessToken()
  const { user } = useAuthContext()

  if(token || user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default LoggedRoute