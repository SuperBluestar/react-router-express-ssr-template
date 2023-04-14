import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { routes } from "./Routes";
import { StaticRouter } from "react-router-dom";
import Routes from "../src/Routes";

const PORT = 3000;

const app = express();

const router = express.Router()

router.use("*", async (req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.baseUrl} context={context}>
      <Routes />
    </StaticRouter>
  );
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(`
    <!doctype html>
    <div id="app">${html}</div>
  `);
    res.end();
  }
});

app.use('/', router);

// This basically starts the app
app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
})