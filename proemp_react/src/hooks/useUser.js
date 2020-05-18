import React from "react";
import { UserContext } from "../context/User";

export const useUser = () => React.useContext(UserContext);
