import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Admin = ({children}: {children: React.ReactNode}) => {

  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/users");
  }, []);

  return (
    <>
      {isAdmin && children}
    </>
  );
};

export default Admin;