import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Admin = ({children}: {children: React.ReactNode}) => {

  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/users");
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin]);

  return (
    <>
      {children}
    </>
  );
};

export default Admin;