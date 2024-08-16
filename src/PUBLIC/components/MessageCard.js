import "../../styles/allstyles.css";
import React from "react";

const MessageCard = ({ sender, body }) => {
    const isRightAligned = sender !== "AI"; // Check if sender is not "AI"

    return (
        <>

            <div className={`card text-bg-dark border border-2 mt-3 ${isRightAligned ? ' border-secondary ' : 'border-secondary'}`}>
            <div className={`card-header `} >
                <h6 className={`card-title${isRightAligned ? ' text-end' : ''}`} >
                    {sender}
                </h6>
            </div>
            <div className={`card-body ${isRightAligned ? ' text-bg-success' : 'text-bg-primary'}`}>
                <p className={`card-text${isRightAligned ? ' text-end' : ''}`} >
                    {body}
                </p>
            </div>
        </div>

        </>
        );

};

export default MessageCard;
/*
return (
    <div className={`card text-bg-dark border`}>
        <div className="card-header text-bg-primary">
            <h6 className={`card-title${isRightAligned ? ' text-end' : ''}`}>
                {sender}
            </h6>
        </div>
        <div className="card-body">
            <p className={`card-text${isRightAligned ? ' text-end' : ''}`}>
                {body}
            </p>
        </div>
    </div>
);
primary
secondary
success
danger
warning
info
light
dark
border border-primary border-2 rounded
*/