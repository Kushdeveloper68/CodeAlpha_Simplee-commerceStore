// layout for the entire application
import React from "react";
import {Navbar, Footer} from "./components";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
}