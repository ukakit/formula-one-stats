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


    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/seasons.json?limit=200")
        .then(res => {
            if (res.status === 404) {
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
    useEffect(()=> {
            fetch(`https://ergast.com/api/f1/${seasonsDropdownValue}.json`)
            .then(res => {
                if (res.status === 404) {
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
            <Box sx={{"display":"flex", flexDirection: "column", alignItems:"center"}}>
                <h2 className="header">Previous Season Race Results Inquiry</h2>
                <Autocomplete
                    disablePortal
                    options={listOfSeasons}
                    sx={{ width: 300, maxWidth: "80%"}}
                    onChange={(event, newValue) => {
                        setSeasonsDropdownValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Season" />}
                />
                <Autocomplete
                    disablePortal
                    options={listOfRaces}
                    sx={{ width: 300, maxWidth: "80%"}}
                    onChange={(event, newValue) => {
                        setRacesDropdownValue(listOfRaces.indexOf(newValue)+1);
                    }}
                    renderInput={(params) => <TextField {...params} label="Race" />}
                />
            </Box>

            {seasonsDropdownValue &&
                <RaceResultDetail season={seasonsDropdownValue} round={racesDropdownValue} />
            }
        </div>
      );
};

export default PreviousSeason;