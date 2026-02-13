import { createContext, useEffect, useState } from "react";
import axios from "./axios";

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
          roles: resp.data.roles,
          permissions: resp.data.permissions,
        });
      } catch (err) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
