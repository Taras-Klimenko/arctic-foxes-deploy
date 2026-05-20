"use client";
import { useEffect, useState, createContext, useContext } from "react";
import type { UserType } from "@/entities/user/model";
import ApplicationLayout from "./ApplicationLayout";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useReduxHooks";
import { refreshTokenThunk } from "@/entities/user/api/UserApiThunk";

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser должен использоваться внутри UserProvider");
  }

  return context;
}

// Компонент приложения на React - это функция, у нее обязательно должен быть return
function UserProvider({ children }: { children: React.ReactNode }) {
  const [userState, setUser] = useState<UserType | null>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  // const { dispatch } = useAlerts();

  useEffect(() => {
    dispatch(refreshTokenThunk());
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ApplicationLayout>{children}</ApplicationLayout>
    </UserContext.Provider>
  );
}

export default UserProvider;
