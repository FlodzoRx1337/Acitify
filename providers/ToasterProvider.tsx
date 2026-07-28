"use client";

import { Toaster } from "react-hot-toast";

function ToasterProvider(): React.ReactElement {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333333",
          color: "#FFFFFF",
        },
      }}
    />
  );
}

export default ToasterProvider;
