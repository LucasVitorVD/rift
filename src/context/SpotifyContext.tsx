"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { TokenProps } from "@/interfaces/spotify";
import { getToken } from "@/lib/api/spotify";

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
