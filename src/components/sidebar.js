import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <ul>
      <li><Link to="/about">about</Link></li>
      <li><Link to="/tutorial/part-zero">Part #0</Link></li>
      <li><Link to="/tutorial/part-one">Part #1</Link></li>
      <li><Link to="/tutorial/part-two">Part #2</Link></li>
      <li><Link to="/tutorial/part-three">Part #3</Link></li>
      <li><Link to="/tutorial/part-four">Part #4</Link></li>
    </ul>
  </div>
)
