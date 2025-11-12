import React, { createContext, useContext, RefObject } from "react";

const ScrollContainerContext = createContext<RefObject<HTMLDivElement> | null>(null);

export const ScrollContainerProvider = ({
  value,
  children,
}: {
  value: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) => <ScrollContainerContext.Provider value={value}>{children}</ScrollContainerContext.Provider>;

export function useScrollContainer() {
  const ctx = useContext(ScrollContainerContext);
  return ctx;
}

export default ScrollContainerContext;


