import { useState } from "react";

const TeamBox = ({teamType, team, goals}) => {

    const [goalsListOpen, setGoalsListOpen] = useState(false);
    const image = `data:image/png;base64,${team.logo}`
    const divClass = `${teamType} team`;

    return (
        <div className={divClass}>
            <div className="image">
                <img src={image} alt="" />
            </div>
            <p className="name">{team.name}</p>
            {goals.length != 0 ? <div onClick={() => setGoalsListOpen(!goalsListOpen)} className={goalsListOpen? "goal-arrow open" : "goal-arrow"}></div> : null}
            <ul className={goalsListOpen? "opened" : null}>
                {goals.map((goal, index) => {
                        const goalText = `${goal.player.name} ${goal.goal_time_min}:${goal.goal_time_sec}`
                        return (<li key={index}>{goalText}</li>)
                    }
                )}
            </ul>
        </div>
    )
}

export default TeamBox
