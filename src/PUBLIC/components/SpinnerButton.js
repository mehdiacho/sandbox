import React from "react";

export default function SpinnerButton(props) {

    return (

            <button hidden={props.hidden} disabled={props.disabled} type={"button"} className="btn btn-primary btn-upload text" onClick={props.onClick} style={{marginTop: '15px', marginBottom: '10px'}}>
                <span className={`spinner-border  ${props.status}`} style={{height: '20px', width: '20px'}} aria-hidden="true"></span>
                <strong className={'ms-2'} role="status">{props.text}</strong>
            </button>
    )
}