import React, { Fragment } from 'react';

import './Home.css';
import Sidenav from './Sidenav';


export default function Home() {
    return (
            <div>
            <Sidenav/>
            <div class="jumbotron">
                <div class="container">
                    <div class="main">
                        <h1>VOIMO</h1>
                        <div className="line1">A smart way to change your voice into video</div>
                        {/* <div className="line2">your voice into video</div> */}
                        {/* <a href="#" class="btn-main"></a> */}
                    </div>
                </div>
            </div>
            <div class="supporting">
                <div class="container">
                    <div class="col">
                        <img src="https://s3.amazonaws.com/codecademy-content/projects/broadway/design.svg"/>
                            <h2>Design</h2>
                            <p>Make your projects look great and interact beautifully.</p>
                            <a href="#" class="btn-default">Learn More</a>
                    </div>
                    <div class="col">
                        <img src="https://s3.amazonaws.com/codecademy-content/projects/broadway/develop.svg"/>
                            <h2>Develop</h2>
                            <p>Use modern tools to turn your design into a web site</p>
                            <a href="#" class="btn-default">Learn More</a>
                    </div>
                    <div class="col">
                        <img src="https://s3.amazonaws.com/codecademy-content/projects/broadway/deploy.svg"/>
                            <h2>Deploy</h2>
                            <p>Use modern tools to turn your design into a web site</p>
                            <a href="#" class="btn-default">Learn More</a>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    );
}


// export default H