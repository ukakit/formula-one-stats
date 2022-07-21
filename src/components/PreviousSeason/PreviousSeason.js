import { useState, useEffect } from "react";
import RaceResultDetail from '../RaceResultDetail/RaceResultDetail';
import Spinner from 'react-bootstrap/Spinner';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const PreviousSeason = () => {
    const [seasonsDropdownValue, setSeasonsDropdownValue] = useState(2021)
    const [racesDropdownValue, setRacesDropdownValue] = useState(1)
    const [loading, setLoading] = useState(false);
    const [listOfSeasons, setListOfSeasons] = useState([])
    const [listOfRaces, setListOfRaces] = useState([])
    const [seasonError, setSeasonError] = useState(null);
    const [roundError, setRoundError] = useState(null);
    // API call to get list of seasons
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/seasons.json?limit=200")
        .then(res => {
            if (res.status === 502) {
                setSeasonError(
					'Server Error, please try again later'
				);
                setLoading(false)
                return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setListOfSeasons(data.MRData.SeasonTable.Seasons.reverse().filter(season => season.season !== "2022").map(season => season.season))
            setLoading(false)
        })
        .catch(console.error);
    
    }, [])
    // API call to get all race results from specified season
    useEffect(()=> {
            fetch(`https://ergast.com/api/f1/${seasonsDropdownValue}.json`)
            .then(res => {
                if (res.status === 502) {
                    setRoundError(
                        'Server Error, please try again later'
                    );
                    return;
                } else if (res.status === 200) {
                    return res.json();
                }})
                .then(data => {
                    setListOfRaces(data.MRData.RaceTable.Races.map(race => race.raceName))
                })
                .catch(console.error);
        }, [seasonsDropdownValue])

    return (
        <div className="query-container">
            {loading && 
                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </>
            }
            {/* using MUI, a dropdown and auto complete field is used to give user choices to see results of a specific race */}
            <Box sx={{"display":"flex", flexDirection: "column", alignItems:"center"}}>
                <h2 className="header">Previous Season Race Results Inquiry</h2>
                {seasonError ?
                <h2>{seasonError}</h2>
                :
                <Autocomplete
                    disablePortal
                    options={listOfSeasons}
                    sx={{ width: 300, maxWidth: "80%", py:1}}
                    onChange={(event, newValue) => {
                        setSeasonsDropdownValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Season" />}
                />
                }
                {roundError ?
                <h2>{roundError}</h2>
                :
                <Autocomplete
                    disablePortal
                    options={listOfRaces}
                    sx={{ width: 300, maxWidth: "80%", py:1}}
                    onChange={(event, newValue) => {
                        setRacesDropdownValue(listOfRaces.indexOf(newValue)+1);
                    }}
                    renderInput={(params) => <TextField {...params} label="Race" />}
                />
                }
            </Box>
            {/* the value selected in round number is passed onto component to render the detail of the race */}
            {seasonsDropdownValue &&
                <RaceResultDetail season={seasonsDropdownValue} round={racesDropdownValue} />
            }
        </div>
      );
};

export default PreviousSeason;