import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () =>{
    return(
        <div className='nt0' style={{margin:'8px auto 8px 8px'}}>
            <Tilt className="flex items-center justify-center Tilt br2 shadow-2" options={{max:35}}
            style={{height: 100, width: 100}}>
                <div className="Tilt-inner">
                    <img src={brain} alt='logo'/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;