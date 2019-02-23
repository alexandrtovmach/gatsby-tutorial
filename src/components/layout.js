import React from "react"

import Header from "./header";
import Sidebar from "./sidebar";

export default ({ children }) => (
  <>
    <Header />
    <div style={{ margin: `0 auto`, maxWidth: 650 }}>
      <Sidebar />
      <div style={{ padding: `5em 0` }}>
        {children}
      </div>
    </div>
  </>
)