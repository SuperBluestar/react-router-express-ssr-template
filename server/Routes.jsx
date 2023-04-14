import React from "react";
import HomePage from "../src/pages/Homepage";
import AboutPage from "../src/pages/About";

const sleep = (n = 2000) => new Promise((r) => setTimeout(r, n));
const rand = () => Math.round(Math.random() * 100);

async function homeLoader() {
  await sleep();
  return { data: `Home loader - random value ${rand()}` };
}

export const routes = [
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
];