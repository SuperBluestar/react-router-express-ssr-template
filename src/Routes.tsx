import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import AboutPage from './pages/About';

// import Nba from "./pages/NBA/Index"
// import NbaStatistic from "./pages/NBA/Statistic"
// import Detail from "./pages/NBA/Detail"
// import Standing from "./pages/NBA/Standing"

// import Nfl from "./pages/NFL/Index"
// import NflStatistic from "./pages/NFL/Statistic"
// import DetailNfl from "./pages/NFL/Detail"
// import StandingNfl from "./pages/NFL/Standing"

// import Mlb from "./pages/MLB/Index"
// import MlbStatistic from "./pages/MLB/Statistic"
// import DetailMlb from "./pages/MLB/Detail"
// import StandingMlb from "./pages/MLB/Standing"

// import Soccer from "./pages/Soccer/Index"
// import SoccerStatistic from "./pages/Soccer/Statistic"
// import DetailSoccer from "./pages/Soccer/Detail"
// import StandingSoccer from "./pages/Soccer/Standing"

// import NCAANba from "./pages/NCAANBA/Index"
// import NCAANbaStatistic from "./pages/NCAANBA/Statistic"
// import DetailNCAANba from "./pages/NCAANBA/Detail"
// import StandingNCAANba from "./pages/NCAANBA/Standing"

// import NCAANfl from "./pages/NCAANFL/Index"
// import NCAANflStatistic from "./pages/NCAANFL/Statistic"
// import DetailNCAANfl from "./pages/NCAANFL/Detail"
// import StandingNCAANfl from "./pages/NCAANFL/Standing"

// import NHL from "./pages/NHL/Index"
// import NHLStatistic from "./pages/NHL/Statistic"
// import StandingNHL from "./pages/NHL/Standing"

function Router() {
  return (
    // <HomePage {...props} />
    <Routes>
      <Route path='' element={<Homepage />} />
      <Route path='about' element={<AboutPage />} />
      {/* <Route path='basketball'>
        <Route path='' element={<Nba />} />
        <Route path='statistic'>
          <Route path='' element={<NbaStatistic />} />
          <Route path='detail/:team/:id' element={<Detail />} />
        </Route>
        <Route path='standing' element={<Standing />} />
      </Route>
      <Route path='national-football-league'>
        <Route path='' element={<Nfl />} />
        <Route path='statistic'>
          <Route path='' element={<NflStatistic />} />
          <Route path='detail/:team/:id' element={<DetailNfl />} />
        </Route>
        <Route path='standing' element={<StandingNfl />} />
      </Route>
      <Route path='baseball'>
        <Route path='' element={<Mlb />} />
        <Route path='statistic'>
          <Route path='' element={<MlbStatistic />} />
          <Route path='detail/:team/:id' element={<DetailMlb />} />
        </Route>
        <Route path='standing' element={<StandingMlb />} />
      </Route>
      <Route path='soccer'>
        <Route path='' element={<Soccer />} />
        <Route path='statistic'>
          <Route path='' element={<SoccerStatistic />} />
          <Route path='detail/:team/:id' element={<DetailSoccer />} />
        </Route>
        <Route path='standing' element={<StandingSoccer />} />
      </Route>
      <Route path='basketball-college'>
        <Route path='' element={<NCAANba />} />
        <Route path='statistic'>
          <Route path='' element={<NCAANbaStatistic />} />
          <Route path='detail/:team/:id' element={<DetailNCAANba />} />
        </Route>
        <Route path='standing' element={<StandingNCAANba />} />
      </Route>
      <Route path='national-football-league-college'>
        <Route path='' element={<NCAANfl />} />
        <Route path='statistic'>
          <Route path='' element={<NCAANflStatistic />} />
          <Route path='detail/:team/:id' element={<DetailNCAANfl />} />
        </Route>
        <Route path='standing' element={<StandingNCAANfl />} />
      </Route>
      <Route path='hockey'>
        <Route path='' element={<NHL />} />
        <Route path='statistic' element={<NHLStatistic />} />
        <Route path='standing' element={<StandingNHL />} />
      </Route> */}
    </Routes>
  );
}

export default Router;
