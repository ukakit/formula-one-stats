import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from "react";
import RaceResultDetail from '../RaceResultDetail/RaceResultDetail';


const CurrentSeasonDetail = () => {
    const [dropdownValue, setDropdownValue] = useState("")
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/current.json")
        .then(res => {
            if (res.status === 404) {
                setLoading(false)
                return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setSchedule(data.MRData.RaceTable.Races)
            setLoading(false)
        })
        .catch(console.error);
    
    }, [])
    const handleSelect = (e) => {
        setDropdownValue(e)
    }
    return (
        <>
            {loading && 'Loading results...'}
            {schedule && 
                <DropdownButton 
                id="dropdown-basic-button" 
                title="Round"
                onSelect={handleSelect}
                >
                    {schedule.map((race , idx) => {
                        return <Dropdown.Item key={idx} eventKey={race.round}>{race.raceName}</Dropdown.Item>
                    })}
                </DropdownButton>
            }
            {dropdownValue ?
            <RaceResultDetail season={2022} round={dropdownValue} />
            :
            <h1>Select A Race From the Dropdown to See Race Results</h1>}
        </>
      );
};

export default CurrentSeasonDetail;