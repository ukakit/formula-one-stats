import { useState, useEffect } from "react";
import DriverChampionResultDetail from "../DriverChampionResultDetail/DriverChampionResultDetail";
import Spinner from 'react-bootstrap/Spinner';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const PreviousDriverChampion = () => {
    const [seasonsDropdownValue, setSeasonsDropdownValue] = useState(2021)
    const [loading, setLoading] = useState(false);
    const [listOfSeasons, setListOfSeasons] = useState([])
    const [error, setError] = useState(null);
    // API call to get list of seasons
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/seasons.json?limit=200")
        .then(res => {
            if (res.status === 502) {
                setError(
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
                <h2 className="header">Previous World Drivers' Champion Inquiry</h2>
                {error 
                ?
                    <h2>{error}</h2>
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
            </Box>

            {seasonsDropdownValue &&
                <DriverChampionResultDetail season={seasonsDropdownValue}/>
            }
        </div>
      );
};

export default PreviousDriverChampion;