import Header from "../components/header/Header"
import Landing from "../components/landing/Landing"
import MatchesDiv from "../components/matches/MatchesDiv"

const Matches = () => {
    return (
        <div className="mathces">      
            <Header mainLink={"Matches"}/>
            <Landing />
            <MatchesDiv />
        </div>
    )
}

export default Matches
