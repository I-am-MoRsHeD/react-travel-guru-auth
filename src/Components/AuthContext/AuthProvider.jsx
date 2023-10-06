import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase/firebase.config';


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    // popup login with google
    const  signWithPopUp = (provider) =>{
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    // create user
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // logging in user
    const signUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logging out user
    const logoutUser = () =>{
        setLoading(true)
        return signOut(auth);
    }

    // email verify
    const emailVerify = (result) =>{
        sendEmailVerification(result)
    }

    // for reset password
    const resetPassword = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)

        })
        return ()=> {
            unSubscribe();
        };
    },[])

    const authInfo = {
        user,
        loading,
        signWithPopUp,
        createUser,
        signUser,
        logoutUser,
        resetPassword,
        emailVerify,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;