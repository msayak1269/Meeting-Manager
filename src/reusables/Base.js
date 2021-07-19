import React from 'react'
import Nav from "./Nav"

const Base = ({children}) => {
    return ( 
        <div>
            <Nav/>
            {children}
        </div>
     );
}
 
export default Base;