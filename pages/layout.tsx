import React, { useState } from "react";
import Navbar from "@/src/components/shared/Navbar";

function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

export default Layout;
