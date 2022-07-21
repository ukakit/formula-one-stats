import { useState, useEffect } from "react";
import RaceResultDetail from '../RaceResultDetail/RaceResultDetail';
import Spinner from 'react-bootstrap/Spinner';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';


const CurrentSeason = () => {
    const [loading, setLoading] = useState(false);
    const [totalRounds, setTotalRounds] = useState(0);
    const [listOfRaces, setListOfRaces] = useState([])
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    // API call to get list of names for current season, and total number of rounds
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/current.json")
        .then(res => {
            if (res.status === 404) {
                setError(
					'Server Error, please try again later'
				);
                setLoading(false)
                return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setListOfRaces(data.MRData.RaceTable.Races.map(race => race.raceName))
            setTotalRounds(data.MRData.RaceTable.Races.length)
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
            {error 
            ?
            <h2>{error}</h2>    
            :
            // using MUI, a dropdown and auto complete field is used to give user choices to see results of a specific race
            <>
                <Box sx={{"display":"flex", flexDirection: "column", alignItems:"center"}}>
                    <h2 className="header">2022 Season Race Results Inquiry</h2>
                    <Autocomplete
                        disablePortal
                        options={listOfRaces}
                        sx={{ width: 300, maxWidth: "80%"}}
                        onChange={(event, newValue) => {
                            setValue(listOfRaces.indexOf(newValue)+1);
                        }}
                        renderInput={(params) => <TextField {...params} label="Round" />}
                        />
                </Box>
                {/* the value selected in round number is passed onto component to render the detail of the race */}
                {value 
                ?
                <RaceResultDetail season={2022} round={parseInt(value)} totalRounds={totalRounds} />
                :
                <h1 className="pending-selection-text">Select A Race From the Dropdown to See Race Results</h1>
                }
            </>
            }
        </div>
      );
};


export default CurrentSeason;