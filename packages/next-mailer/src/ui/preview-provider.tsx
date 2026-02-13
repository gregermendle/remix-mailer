"use client";

import React from "react";
import { RM_DATA_KEY } from "../common/constants.js";

export type PreviewData = {
  selected: { title: string; rendered: string } | null;
  previews: string[];
};

const PreviewContext = React.createContext<PreviewData | null>(null);

function PreviewProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PreviewData;
}) {
  return (
    <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
  );
}

function usePreviews(): PreviewData {
  const context = React.useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreviews must be used within a PreviewProvider");
  }
  return context;
}

export { PreviewProvider, usePreviews, RM_DATA_KEY };
