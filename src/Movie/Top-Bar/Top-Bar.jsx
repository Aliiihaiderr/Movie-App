import React from "react";
import './Top-Bar.css'
import { useRecoilState } from 'recoil';
import { userAtom } from '../../Login/atoms';
function TopBar() {
    const [user , setUser] = useRecoilState(userAtom)
    const handleClick = (event) => {
        event.preventDefault();
        setUser(null);
        localStorage.removeItem('auth');

    }
    return (
        <div className="topbar">
            <h1>
                Movies
            </h1>
            <div className="right-box">
                <li className="top-bar-list">
                    <a onClick={handleClick} href="" >Logout</a>
                    <a href="">Favorite</a>
                    <a href="">Account</a>
                </li>
            </div>
        </div>
    )
}
export default TopBar