import React from 'react';
import './Navigation.css';
import Logo from '../logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        return(<nav>
            <Logo />
            {isSignedIn === true?
                <>
                    <p className='f3 link dim black underline pa3 pointer'
                    onClick={() => onRouteChange('signout')}>
                    Sign out</p>
                </>
            
            :
                <>
                    <p className='f3 link dim black underline pa3 pointer'
                    onClick={() => onRouteChange('signin')}>
                        Sign In
                    </p>
                    <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick={() => onRouteChange('register')}>
                        Register
                    </p>
                </>
            }
        </nav>);
    
}

export default Navigation;