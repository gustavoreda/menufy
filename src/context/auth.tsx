import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { Platform } from "react-native";
import { login } from "../controller";

type UserType =
  | {
      userId: number;
      email: string;
      name: string;
      photoUrl: string;
      userType: "commerce" | "user";
    }
  | undefined;

type AuthContextType = {
  loading: boolean;
  user: UserType;
  setUser: (user: UserType) => void;
  signed: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  userType: "commerce" | "user" | "";
  setUserTypeFn: (type: "commerce" | "user") => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();
  const [userType, setUserType] = useState<"commerce" | "user" | "">("");
  const [loading, setLoading] = useState(false);

  const config = {
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    redirectUri:
      Platform.OS === "android"
        ? makeRedirectUri({
            scheme: "com.menufy",
            path: "/auth",
          })
        : undefined,
  };
  const [_, response, promptAsync] = Google.useAuthRequest(config);

  const getUserProfile = async (token: any) => {
    if (!token) return;
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { email, name, picture } = await res.json();
      const { data, type } = await login(name, email, picture, userType);
      setUser({
        email: email,
        name: name,
        photoUrl: picture,
        userId: data.id,
        userType: type,
      });
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      getUserProfile(token);
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await promptAsync();
      setUserType(userType);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao fazer login com Google: ${error.message}`);
      }
    }
  };

  const signOut = () => setUser(undefined);
  const setUserTypeFn = (type: "commerce" | "user") => setUserType(type);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: Boolean(user),
        user,
        signInWithGoogle,
        signOut,
        userType,
        setUserTypeFn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
