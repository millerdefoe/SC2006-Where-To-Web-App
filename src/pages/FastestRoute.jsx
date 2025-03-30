import React from 'react';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as Bus} from "../assets/Bus.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";

function FastestRoute() {
  const navigate = useNavigate();

  return (
    <div>
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Bus} />
    </div>
  );
}

export default FastestRoute;
