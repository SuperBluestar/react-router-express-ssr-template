import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore The .tsx ending seems to be needed, not 100% sure why
import { routes } from "./Routes";

import { StaticRouterProvider, createStaticHandler, createStaticRouter } from "react-router-dom/server";

const PORT = 3000;

const app = express();

const router = express.Router()

// This does the server-side rendering on the '/' route, works because we are a single page app
// router.get("/", (req, res, next) => {
//   console.log("get request");
//   fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Could not render the app server-side");
//     }
    
//     const query = req.query ?? {}
//     const token = (query['token'] ?? '') as string
//     if (token === '') {
//         console.log("get redirect");
//         const uri1 = `https://member-access.telmate.com/oauth/authorize?client_id=${AppId}&locale=en&redirect_uri=https%3A%2F%2Fwww.games.wowsee.me%2Foriginal&response_type=code&x_telmate_facility=1LLnoeJW04IrZZESsRtodl1PLN8qhQY9uvsTg7bLxByCgv8AUUvkHDsWsi3VHhZ7b85wdxc83SG9kBdvBXyNkg&state=${generateHash()}`
//         return res.redirect(uri1)
//     }
//     console.log("token is passed ", token);
//     const postData = querystring.stringify({
//       'client_id' : AppId,
//       'client_secret': AppSecret,
//       'code': token,
//       'grant_type' : 'authorization_code',
//       'redirect_uri' : 'https://www.games.wowsee.me/original'
//     });
//     const postOptions = {
//       hostname: 'member-access.telmate.com',
//       path: '/oauth/token',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(postData),
//         origin: 'https://www.games.wowsee.me/original',
//         referer: 'https://www.games.wowsee.me/original',
//       },
//     };
    
//     const reqPost = https.request(postOptions, (resPost) => {
//       console.log("post request");
//       resPost.on('data', (chunk) => {
//         const resObj = JSON.parse(chunk.toString())
//         console.log("post data", resObj);
//         const meGetOptions = {
//           hostname: 'member-access.telmate.com',
//           path: '/api/v1/me.json',
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${resObj.access_token}`,
//             origin: 'https://www.games.wowsee.me/original',
//             referer: 'https://www.games.wowsee.me/original',
//           },
//         };
//         const meReq = https.request(meGetOptions, (meRes) => {
//           console.log("json request");
//           meRes.on('data', (chunk2) => {
//             const me: {
//               "id": number,
//               "first_name": string,
//               "last_name": string,
//               "sso_token": string | null,
//               "snap_user": {
//                 "id": number,
//                 "first_name": string,
//                 "last_name": string,
//                 "email": string
//               },
//             } = JSON.parse(chunk2.toString())
//             console.log("json data ", me);
//             // return res.render('index', {
//             //     filteredGames: filteredGames,
//             //     countOfGames: games.length,
//             //     activeCategory: activeCategory,
//             //     categories: categories,
//             //     me: me
//             // });
//             const ssr = ReactDOMServer.renderToString(<App first_name={me.first_name} last_name={me.last_name} user_id={me.id.toString()} />);
//             return res.send(
//               data.replace(
//                 "<div id=\"root\"></div>",
//                 `<div id="root1">${ssr}</div>`
//               )
//             );
//           })
//         })
//         meReq.on('error', (error2) => {
//             console.log("Error2: ", error2)
//         })
//         meReq.end();
//       });
//     });
//     reqPost.on('error', (error) => {
//       console.error("Req1: ", error);
//     });
//     reqPost.write(postData);
//     reqPost.end();
//   });
// });
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