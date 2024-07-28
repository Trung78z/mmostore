"use client";

import { makeStore } from "@/lib/reducer/store";
import { setupListeners } from "@reduxjs/toolkit/query";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }) => {
  const storeRef = useRef;

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, [storeRef]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
