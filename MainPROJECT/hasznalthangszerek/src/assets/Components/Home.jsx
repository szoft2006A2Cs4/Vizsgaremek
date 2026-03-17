import "../../index.css";
import Nav from "./Nav";
import Introduction from "./Introduction";
import PseMain from "./pseMain";
import Drawer from "./CatDrawer";
import axios from "../scripts/axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../scripts/AuthProvider";
import CatField from "./CatField";

function Home({ instruments, cats, scats, isLoading }) {
  const { auth } = useContext(AuthContext);

  const loggedIn = !auth.user;

  return !loggedIn ? (
    <div>
      <Nav />
      <CatField cats={cats} />
      <PseMain ins={instruments} />
    </div>
  ) : (
    <div>
      <Nav cats={cats} scats={scats} loading={isLoading} />
      <Introduction />
      <PseMain ins={instruments} isLoading={isLoading} />
      <Drawer />
    </div>
  );
}

export default Home;
