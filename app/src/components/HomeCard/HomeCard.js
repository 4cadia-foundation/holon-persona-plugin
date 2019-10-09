import React from 'react'

import './HomeCard.css'

export default function HomeCard(props) {
    return(
        <div className="accordion-section">
            <button className="accordion">
                <p className="accordion-title"> {props.title}</p>
            </button>

            <div className="accordion-content">

                <div className="accordion-text" 
                    dangerouslySetInnerHTML={(props.content)}
                />
                
            </div>
        </div>
    )
}