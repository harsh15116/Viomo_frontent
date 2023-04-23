import React, { Fragment } from 'react';

import './Home.css';
import Sidenav from './Sidenav';


export default function Home() {
    return (
            <div>
            <Sidenav/>
            <div className="jumbotron">
                <div className="container">
                    <div className="main">
                        <h1>VOIMO</h1>
                        <div className="line1">A smart way to change your voice into video</div>
                        {/* <div className="line2">your voice into video</div> */}
                        {/* <a href="#" class="btn-main"></a> */}
                    </div>
                </div>
            </div>
            
        </div>
    );
}


// export default H