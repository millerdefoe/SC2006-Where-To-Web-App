import React from 'react';
import { ReactComponent as Bus } from "../assets/Bus.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from '../components/ModeOfTransport';
import CongestionLevelIndicator from '../components/CongestionLevelIndicator';
import "../styles/DisplayCongestionLevels.css";
import "../styles/common.css";

function DisplayCongestionLevels() {
    const routeData = {  // route data is hard coded for now 
        station1: {
            crowdLevel: "h",
            stationName: "Tanjong Katong",
            badgeLabel: "TEL"
        },

        station2: {
            crowdLevel: "h",
            stationName: "Promenade",
            badgeLabel: "DTL"
        },

        station3: {
            crowdLevel: "30%",
            stationName: "Chinatown",
            badgeLabel: "NEL"
        },

        station4: {
            crowdLevel: "SEA",
            stationName: "Opp Tg Katong Rd Sth P/G",
            badgeLabel: "48"
        },

        station5: {
            crowdLevel: "SDA",
            stationName: "Opp Botanic Gdns Stn",
            badgeLabel: "14"
        }
    }

    const mrtIndicators = [];
    const busIndicators = []; 

    // dynamically create indicators based on the number of stations indicated in route data above 
    for (const[key, station] of Object.entries(routeData)) {
        const indicator = (
            <CongestionLevelIndicator 
                key = {key}
                CrowdLevel={station.crowdLevel}
                StopName={station.stationName}
                BadgeLabel={station.badgeLabel}/>

        );

        // sorts stations into MRT stations and Bus stops according to whether or not the badge label is numerical 
        if (!isNaN(Number(station.badgeLabel))){
            busIndicators.push(indicator);
        }

        else {
            mrtIndicators.push(indicator); 
        }
    }

  return (
    <div className="main-container">
        <SettingsButton/>
        <HomeButton/>
        <NavBar/>
        <ModeOfTransport Icon={Bus}/>

        <div className="congestionLevel-container">
            <div className="congestionLevel-header">Congestion Levels</div>
            <div className="congestionLevel-container2">
                <div className="mrt-container">
                    <div className="congestionLevel-header" style={{fontSize:"1.5vw", paddingRight:"70%"}}>MRT Stations</div>
                        {mrtIndicators}
                    
                </div>
                <div className="bus-container">
                    <div className="congestionLevel-header" style={{fontSize:"1.5vw", paddingRight:"70%"}}>Bus Stops</div>
                    {busIndicators}
                </div>
            </div>
        </div>
    </div>
  );
}

export default DisplayCongestionLevels;
