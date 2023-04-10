import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { routes } from "./Routes";

import { StaticRouterProvider, createStaticHandler, createStaticRouter } from "react-router-dom/server";

const PORT = 3000;

const app = express();

const router = express.Router()

export function createFetchRequest(req: express.Request): Request {
  let origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

router.use("*", async (req, res) => {
  let { query, dataRoutes } = createStaticHandler(routes);
  let remixRequest = createFetchRequest(req);
  let context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  let dataRouter = createStaticRouter(dataRoutes, context);
  let html = ReactDOMServer.renderToString(
    <StaticRouterProvider
      router={dataRouter}
      context={context}
      nonce="the-nonce"
    />
  );
  res.send("<!DOCTYPE html>" + html);
});

app.use('/', router);

// This basically starts the app
app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
})