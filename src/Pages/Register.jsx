// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import fbIcon from '../../public/images/icons/fb.png';
import gIcon from '../../public/images/icons/google.png';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../Components/Navbar/Navbar';
import { AuthContext } from '../Components/AuthContext/AuthProvider';

const Register = () => {
    const { signWithPopUp, createUser, emailVerify } = useContext(AuthContext);
    const provider = new GoogleAuthProvider();
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)

        const firstName = form.get('first')
        const lastName = form.get('last')
        const email = form.get('email')
        const password = form.get('password')
        const check = form.get('terms')
        console.log(firstName, lastName, email, password, check)

        if(password.length < 6){
            setError('Password must be at least 6 character');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setError('Password must have at least one Uppercase')
            return;
        }
        else if(!check){
            setError('Please accept our Terms and Conditions')
            return;
        }

        // creating user 
        createUser(email, password)
        .then(result=>{
            console.log(result.user)
            setSuccess('Successfully create user')

            // Email verification
            emailVerify(result.user)
            .then(()=>{
                alert('Please verify your email')
            })
            
            // updating name
            updateProfile(result.user, {
                displayName: firstName+ lastName, 
            })
            .then(()=>{console.log("name updated properly")})
            .catch(error=>{console.log(error)})
        })
        .catch(error=>{
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
    return (
        <div>
            <Navbar></Navbar>
            <div className='w-1/2 mx-auto my-10'>
                <div className='border rounded-md border-orange-400'>
                    <h2 className="text-4xl font-bold pl-10 mt-10">Create an account</h2>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control mb-6 border-b-2">
                            <input type="text" name="first" placeholder="First Name" className="input" required />
                        </div>
                        <div className="form-control mb-6 border-b-2">
                            <input type="text" name="last" placeholder="Last Name" className="input"/>
                        </div>
                        <div className="form-control mb-6 border-b-2">
                            <input type="email" name="email" placeholder="Email" className="input" required />
                        </div>
                        <div className="form-control border-b-2">
                            <input 
                            type={showPassword? "text" : "password"}
                             name="password" 
                             placeholder="Password" 
                             className="input" required />
                             <span className='absolute mt-5 md:ml-72 lg:ml-[480px]' onClick={()=>setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> :
                                    <FaEye></FaEye>
                                }
                             </span>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div>
                                <input type="checkbox" name="terms" id="terms" />
                                <label htmlFor="terms" className='font-bold ml-1'>Accept our Terms and Conditions</label>
                            </div>
                            <div>
                                <Link className='font-semibold text-orange-300 underline'>Forget Password?</Link>
                            </div>
                        </div>
                        <dir>
                        {
                                error ? <p className='text-red-600 font-bold'>{error}</p> : ''
                            }
                            {
                                success ? <p className='text-green-600 font-bold'>{success}</p> : ''
                            }
                        </dir>
                        <div className="form-control">
                            <button className="btn btn-warning">Create an account</button>
                        </div>
                        <div className='mt-2'>
                            <p>Already have an account? <Link className='font-semibold text-orange-300 underline' to='/login'>Login</Link></p>
                        </div>
                    </form>
                </div>
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

export default Register;