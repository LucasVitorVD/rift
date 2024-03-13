"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { TokenProps } from "@/interfaces/spotify";

interface SpotifyContextProps {
  token: TokenProps | undefined;
}

interface SpotifyContextProviderProps {
  children: React.ReactNode;
}

export const SpotifyContext = createContext<SpotifyContextProps | undefined>(
  undefined
);

export const SpotifyContextProvider = ({
  children,
}: SpotifyContextProviderProps) => {
  const getToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "",
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? "",
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao obter token de acesso: ${response.statusText}`);
    }
  
    const token: TokenProps = await response.json();

    localStorage.setItem("spotifyToken", token.access_token)
  
    return token
  };

  const { data: token } = useQuery({
    queryKey: ["spotifyToken"],
    queryFn: async () => await getToken(),
    refetchInterval: 3600000
  });

  return (
    <SpotifyContext.Provider value={{ token }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotifyContext = () => {
  const context = useContext(SpotifyContext)!;

  return context;
};
