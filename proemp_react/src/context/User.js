import React from "react";
import firebase from "firebase";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const updateUser = fireUser => {
    setUser(fireUser);
    localStorage.setItem("user", fireUser);
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    firebase.auth().signOut();
    console.log("avestruz");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, removeUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
