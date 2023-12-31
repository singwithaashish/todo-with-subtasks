import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../typings";


interface AuthState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const mockUser = {
  email: "admin@gmail.com",
  password: "admin", // This w0uld be a hashed password in a real system.
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
      });
    
      useEffect(() => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      }, [user]);
    

  const login = (email: string, password: string) => {
    if (email === mockUser.email && password === mockUser.password) {
      // Here, instead of JWT, we are just storing the user in the local storage.
      // this is because JWT tokens cannot be signed with a symmetric key in the browser.
      // so we will just store the user in the local storage and use that to check if the user is logged in.
        const payload = { email, password };

        // mock token creation by just stringifying the payload
        const token = JSON.stringify(payload); 

        // set token in local storage
        localStorage.setItem("authToken", token);

        // set user in the state
        setUser(payload);
        return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
