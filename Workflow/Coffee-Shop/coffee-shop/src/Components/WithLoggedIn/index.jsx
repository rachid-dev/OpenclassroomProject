import {userDataContext} from '../../utils/Context';
import { useContext, useEffect, useState } from 'react';
import {Navigate} from 'react-router-dom'

const WithLoggedIn = ({WrappedComponent}) => {
    const {userData, setUserData} = useContext(userDataContext);
    const [trigger, setTrigger] = useState(false);
    let expirationTime = 15* 60 * 1000 // 15 min
    let timer;

    const events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress",
    ];
    
    // Logout function
    const logout = () => {// reminder for myself : pass this function to header so that it can logout properly trough logout button
        console.log("logged out")

        events.forEach(event => {
            window.removeEventListener(event, resetLogoutTimer)
        })

        setUserData({isLoggedIn : false});
        sessionStorage.clear();
    }

    // Set the time of inactivity in milliseconds we wait before logging the user off
    //we return the the timerId
    const setLogoutTimer = () => {
        console.log("logged in");
        return setTimeout(logout,expirationTime)
    }

    
    //reset our timer if activity is detect
    const resetLogoutTimer = ()=>{
        //clear the previous timer
        if(timer) clearTimeout(timer);

        //set the new timer
        timer = setLogoutTimer();
    }

    if( trigger ){
        timer = setLogoutTimer();
        
        events.forEach(event => {
            window.addEventListener(event, resetLogoutTimer)
        })
        setTrigger(false);
    }

    useEffect(() => {

        setTrigger(true);

    },[])
    

    return userData.isLoggedIn ? <WrappedComponent/>: <Navigate to='/login' replace/>
}

export default WithLoggedIn;