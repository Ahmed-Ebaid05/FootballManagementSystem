import { memo, useActionState, useState } from "react";
import TeamBox from "./TeamBox"
import axios from "axios";

const MatchBox = ({match}) => {

    const [openControls, setOpenControls] = useState(false);

    const [matchState, setMatchState] = useState(match.match_status);

    const [state, formAction, isPending] = useActionState(
        async (_, formData) => {
            const matchId = formData.get("matchId");
            const status = formData.get("status");

            const res = await axios.post(
                `http://localhost:8080/changeStatues/${matchId}/${status}`
            );

            setMatchState(status);

            console.log(res);
        },
        null
    );

    const mainStatus = [
        {op: 0, text: "Hasn't started yet"},
        {op: 1, text: "First half"},
        {op: 2, text: "Break 1"},
        {op: 3, text: "Second half"},
        {op: 4, text: "Break 2"},
        {op: 5, text: "Extra time half 1half"},
        {op: 6, text: "Break 3"},
        {op: 7, text: "Extra time half 2"},
        {op: 8, text: "Penalties"},
        {op: 9, text: "End Match"},
        {op: 10, text: "End Match With Penalties"},
        {op: 11, text: "Disabled Match"}
    ]

    const homeGoals = match.goals.filter(
        goal => goal.team.id === match.homeTeam.id
    );

    const awayGoals = match.goals.filter(
        goal => goal.team.id === match.awayTeam.id
    );

    let homePenalties = match.penalties.filter(p => p.team.id === match.homeTeam.id && p.scored == 1);
    let awayPenalties = match.penalties.filter(p => p.team.id === match.awayTeam.id && p.scored == 1);

    let status = "";
    let result = ""

    let Time = new Date();
    let Match_Time = match.match_time.substring(0,2);
    Time.setHours(Match_Time, 0, 0, 0);
    let now = new Date();
    let diff = now - Time;
    let minutes = Math.floor(diff / 60000);
    let seconds = Math.floor((diff % 60000) / 1000);

    const handleStatus = () => {
        switch(Number(matchState)) {
            case 0:
                result = match.match_time;
                if (match.match_round == 0)
                    result.innerHTML = `${match.match_time} <br> ${match.match_date}`;
                break;
            case 1:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `${minutes} : ${seconds}`
                break;
            case 2:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `Half time`;
                break;
            case 3:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `${minutes - 15} : ${seconds}`
                break;
            case 4:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `Full time`
            break;
            case 5:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `${minutes - 20} : ${seconds}`
                break;
            case 6:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `Half time`
                break;
            case 7:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `${minutes - 21} : ${seconds}`
                break;
            case 8:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `${homePenalties.length} - ${awayPenalties.length}`;
                break;
            case 9:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `Match Ended`;
                break;
            case 10:
                result = `${homeGoals.length} - ${awayGoals.length}`;
                status = `${homePenalties.length} - ${awayPenalties.length} <br> Match Ended`;
                break;
            case 11:
                result = ` `;
                status = `Diabled Match`;
                break;
        }
    }

    handleStatus();

    console.log("aaaaaaaaaaaaa", match.id);

    return (
        <div className="box" >
            <TeamBox teamType={"home-team"} team={match.homeTeam} goals={homeGoals}/>
            <div className="vs">
                {!isPending? <>
                <p className="result">{result}</p>
                <span className="status">{status}</span>
                <div className={openControls? "controls-arrow open" : "controls-arrow"} onClick={() => setOpenControls(!openControls)}></div></>: <p>isPending</p>}
            </div>
            <div className={openControls? "controls opened" : "controls"}>
                <form action={formAction}>
                    <input type="text" style={{display: 'none'}} name="matchId" value={match.id} />
                    <select name="status"  defaultValue={match.match_status}>
                        {mainStatus.map((state, index) => {
                            return(<option value={state.op} key={index}>{state.text}</option>)
                        })}
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <TeamBox teamType={"away-team"} team={match.awayTeam} goals={awayGoals}/>
        </div>
    )
}

export default memo(MatchBox);
