import React, { useState } from 'react';

export default function ConfirmationToast(props) {
    const [confirm, setConfirm] = useState('bottom-end');

    const handleToastClose = () => {
        // Call the close handler passed as a prop
        props.onClose();
    };
    return (
        <div aria-live="polite" aria-atomic="true" className={props.show === 'show' ? 'blur-background' : ''}>
            <div className="toast-container border position-fixed top-50 start-50 translate-middle p-4">
                <div className={`toast ${props.show} border-warning border-2 text-bg-${props.bg} p-2 `}  role="alert" aria-live="assertive" aria-atomic="true">
                    {props.message}
                    <div className="d-flex mt-2 pt-2 border-top justify-content-center">
                        <button type="button" className="btn btn-danger btn-sm" /*data-bs-dismiss="toast"*/ onClick={handleToastClose}>Cancel</button>
                        <button type="button" className="btn btn-primary btn-sm ms-4">Upload</button>
                    </div>
                </div>
            </div>
        </div>


    )
};