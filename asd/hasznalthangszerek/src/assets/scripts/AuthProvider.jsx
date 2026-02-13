import { createContext, useEffect, useState } from "react";
import axios from "./axios";
import Loading from "../Components/Loading";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const resp = await axios.get("api/login/me");

        setAuth({
          user: resp.data.email,
          role: resp.data.role,
          permissions: resp.data.permissions,
        });
      } catch (err) {
        setAuth({ user: null, role: null, permissions: [] });
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
