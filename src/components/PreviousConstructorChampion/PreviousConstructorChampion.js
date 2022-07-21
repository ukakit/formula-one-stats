import { useState, useEffect } from "react";
import ConstructorChampionResultDetail from "../ConstructorChampionResultDetail/ConstructorChampionResultDetail";
import Spinner from 'react-bootstrap/Spinner';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const PreviousConstructorChampion = () => {
    const [seasonsDropdownValue, setSeasonsDropdownValue] = useState(2021)
    const [loading, setLoading] = useState(false);
    const [listOfSeasons, setListOfSeasons] = useState([])

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
                <h2 className="header">Previous World Constructors' Champion Inquiry</h2>
                <Autocomplete
                    disablePortal
                    options={listOfSeasons}
                    sx={{ width: 300, maxWidth: "80%", py:1}}
                    onChange={(event, newValue) => {
                        setSeasonsDropdownValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Season" />}
                />
            </Box>

            {seasonsDropdownValue &&
                <ConstructorChampionResultDetail season={seasonsDropdownValue}/>
            }
        </div>
      );
};

export default PreviousConstructorChampion;