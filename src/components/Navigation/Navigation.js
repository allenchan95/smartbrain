import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
import  './Navigation.css' ;


const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}} className='dtc v-mid tr pr3 bg-black-50'>
          <ProfileIcon  onRouteChange={() => onRouteChange('signout')} toggleModal={toggleModal}/>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'space-between' , alignItems: 'center'}} 
         className='dtc v-mid tr pr1 bg-black-50 '
        >
         <p className='f2 link white dim black  pl5 pointer'> SMART BRAIN</p>
          <ul>
           <li><p onClick={() => onRouteChange('signin')} className='f3 link white dim black  pa3 pointer'>Sign In</p></li>
           <li><p onClick={() => onRouteChange('register')} className='f3 link white dim black  pa3 pointer ba'>Register</p></li>
          </ul>
        </nav>
      );
    }
}

export default Navigation;