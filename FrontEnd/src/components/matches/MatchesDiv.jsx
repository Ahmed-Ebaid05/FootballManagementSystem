import { useEffect, useState } from "react";
import axios from "axios";
import MatchBox from "./MatchBox";
import './Matches.css'

const MatchesDiv = () => {

    const [matches, setMatches] = useState([]);

    useEffect ( () => {
        const fetchMatches = async () => {
            try {
                const matchesRes = await axios.get("http://localhost:8080/getMatchesByRound/1");
                setMatches(matchesRes.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMatches();
    }, [])

    return (
    <div className="matches">
        <div className="container">
            <div className="round">
                <p>Round: <span>1</span></p>
                <span className="date">23-Apr-2026</span>
            </div>
            {matches.map((match, index) => {
                return <MatchBox match={match} key={index}/>   
            })}
        </div>
    </div>
    )
}

export default MatchesDiv
