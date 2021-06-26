import React from 'react';
import './contact.styles.scss'
const Contact = () =>(
<div className ="container"> 
<div>
    <img src="https://fitfoodway.ro/media/pagini/contact.jpg" alt="" />
</div>
<hr/>

    <div  className = "info">
    <div className = "info-piece">
            <div className = 'content '>
            <div className = 'title'> Phone: 0720202020 </div>
            </div>
            </div>
            <div className = "info-piece">
            <div className = 'content '>
            <div className = 'title'> Call Center: monday - friday 9:00 - 17:00 </div>
            </div>
            </div>
            <div className = "info-piece">
            <div className = 'content '>
            <div className = 'title'>Email: bHealthTeam@gmail.com </div>
            </div>
            </div>
    </div>
    </div>
);

export default Contact;

