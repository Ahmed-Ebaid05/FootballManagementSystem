import { useState } from 'react';
import './header.css'


const Header = ({mainLink}) => {

    const [openedUl, setOpenedUl] = useState(false);

    const links = ["Home", "Matches", "Teams", "Table", "Contact"];

    return (
        <header>
            <div className="container">
                <img src="../../../public/images/logo.png (1).webp" alt="" />
                <nav className={openedUl ? "open" : "close"}>
                    <ul>
                        {links.map((link, index) => {
                            if (mainLink == link)
                                return (<li className="active" key={index}><a href="/">{link}</a></li> )
                            else
                                return (<li key={index}><a href="/">{link}</a></li>)
                        })}
                    </ul>
                </nav>
                <div className="btns">
                    <i className="fa-solid fa-bars bars fa-2x" onClick={() => setOpenedUl(!openedUl)}></i>
                    <button className="login-btn">Log in</button>
                    <button className="signup-btn">Sign up</button>
                </div>
            </div>
        </header>
    )
}

export default Header
