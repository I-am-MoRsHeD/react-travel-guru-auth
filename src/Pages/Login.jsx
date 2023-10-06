// eslint-disable-next-line no-unused-vars
import React, { useContext, useRef, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import fbIcon from '../../public/images/icons/fb.png';
import gIcon from '../../public/images/icons/google.png';
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../Components/AuthContext/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();

    const { signWithPopUp, signUser, resetPassword } = useContext(AuthContext);
    const provider = new GoogleAuthProvider();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email')
        const check = form.get('checkbox')
        const password = form.get('password')

        setSuccess('')
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 character');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setError('Password must have at least one Uppercase')
            return;
        }
        else if (!check) {
            setError('Please Check in remember me')
            return;
        }

        // signing up user
        signUser(email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('Successfully signing up')
                navigate('/');
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleGoogle = () => {
        signWithPopUp(provider)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleForgetPass = () => {
        const email = emailRef.current.value;
        if(!email){
            setError('Please provide an Email')
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            setError('Please provide a valid email')
        }

        // for reset
        resetPassword(email)
        .then(()=>{
            alert('Please check your email')
        })
        .catch(error=>{
            console.log(error)
        })
    }


    return (
        <div>
            <Navbar></Navbar>
            <div className='w-1/2 mx-auto my-10'>
                <div className='border rounded-md border-orange-400'>
                    <h2 className="text-4xl font-bold pl-10 mt-10">Login</h2>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control mb-6 border-b-2">
                            <input
                                type="email"
                                ref={emailRef}
                                name="email"
                                placeholder="UserName or Email" className="input"
                                required />
                        </div>
                        <div className="form-control border-b-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="input" required />
                            <span className='absolute mt-5 md:ml-72 lg:ml-[480px]' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <FaEyeSlash></FaEyeSlash> :
                                    <FaEye></FaEye>}
                            </span>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div>
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                <label htmlFor="checkbox" className='font-bold ml-1'>Remember Me</label>
                            </div>
                            <div>
                                <Link onClick={handleForgetPass} className='font-semibold text-orange-300 underline'>Forget Password?</Link>
                            </div>
                        </div>
                        <div>
                            {
                                error ? <p className='text-red-600 font-bold'>{error}</p> : ''
                            }
                            {
                                success ? <p className='text-green-600 font-bold'>{success}</p> : ''
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-warning">Login</button>
                        </div>
                        <div className='mt-2'>
                            <p>Do not have an account? <Link className='font-semibold text-orange-300 underline' to='/register'>Create an account</Link></p>
                        </div>
                    </form>
                </div>
                {/* PopUp componenets */}
                <div className='w-5/6 mt-8 mx-auto'>
                    <p className='text-center'>Or</p>
                    <div className='flex border-orange-300 justify-start rounded-full py-1 px-2 border'>
                        <img className='w-10 md:mr-16 lg:mr-28' src={fbIcon} alt="" />
                        <button className='font-semibold'>Continue with Facebook</button>
                    </div>
                    <div className='flex justify-start mt-2 rounded-full py-1 px-2 border border-orange-300'>
                        <img className='w-10 md:mr-16 lg:mr-28' src={gIcon} alt="" />
                        <button onClick={handleGoogle} className='font-semibold'>Continue with Google</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login; 