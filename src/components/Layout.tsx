import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="p-4 sm:ml-64">
        <main>{children}</main>
      </div>
    </>
  );
}
