import React from "react"
import { Link } from "gatsby"

import logoSrc from "../images/logo.png"

export default () => (
  <header>
    <Link to="/">
      <img src={logoSrc} alt="logo" width="60px" height="60px" />
    </Link>
    That's header
  </header>
)
