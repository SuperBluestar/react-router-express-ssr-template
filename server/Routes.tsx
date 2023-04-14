import React from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "../src/pages/Homepage";
import AboutPage from "../src/pages/About";
import MainLayout from "../src/layouts/MainLayout";

const sleep = (n = 2000) => new Promise((r) => setTimeout(r, n));
const rand = () => Math.round(Math.random() * 100);

async function homeLoader() {
  await sleep();
  return { data: `Home loader - random value ${rand()}` };
}

export const routes: RouteObject[] = [
  {
    path: "",
    loader: homeLoader,
    element: <MainLayout />,
    children: [
      {
        path: "",
        loader: homeLoader,
        element: <HomePage />,
      },
      {
        path: "about",
        loader: homeLoader,
        element: <AboutPage />,
      },
    ],
  },
];