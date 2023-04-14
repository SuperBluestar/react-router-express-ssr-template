import React from "react"
import { Outlet, NavLink } from "react-router-dom"

const MainLayout = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <Outlet />
    </div>
  )
}

export default MainLayout;
