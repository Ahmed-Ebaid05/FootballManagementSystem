import './Landing.css'

const Landing = () => {
    return (
    <div className="landing">
        <div className="content">
            <div className="text">
                <p>World Cup Event</p>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, molestias repudiandae pariatur.</span>
            </div>
            <ul>
                <li>
                    <p className="num">2</p>
                    <span className="time">weeks</span>
                </li>
                <li>
                    <p className="num">2</p>
                    <span className="time">weeks</span>
                </li>
                <li>
                    <p className="num">2</p>
                    <span className="time">weeks</span>
                </li>
                <li>
                    <p className="num">2</p>
                    <span className="time">weeks</span>
                </li>
                <li>
                    <p className="num">2</p>
                    <span className="time">weeks</span>
                </li>
            </ul>
            <div className="btns">
                <button className="book-ticket">Book Ticket</button>
                <button className="learn-more">Learn More</button>
            </div>
        </div>
    </div>
    )
}

export default Landing
