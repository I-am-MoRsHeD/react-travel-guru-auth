// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../AuthContext/AuthProvider';

const Navbar = () => {
    const {user, logoutUser} = useContext(AuthContext);

    const handleLogout = () =>{
        logoutUser()
        .then(result =>{
            console.log("user logged out successfully")
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const navlinks = <>
        <li><NavLink to='/'>News</NavLink></li>
        <li><NavLink to='/destination'>Destination</NavLink></li>
        <li><NavLink to='/blog'>Blog</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <img className='w-28' src={logo}></img>
            </div>
            <div className=' mr-32'>
                <div className="form-control">
                    <input type="text" placeholder="Search your destination" className="input input-bordered w-72 " />
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-center">
                {
                    user ? <>
                        <span className='font-bold'>{user.displayName}</span>
                        <a className='btn ml-2 btn-neutral' onClick={handleLogout}>Logout</a>
                    </> :
                    <Link className='btn btn-warning' to='/login'>
                        Login
                     </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;