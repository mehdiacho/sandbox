import React, { useState } from 'react';

export default function NotificationToast(props) {

    return (

            <div aria-live="polite" aria-atomic="true" className="">
                <div className="toast-container position-fixed bottom-0 end-0 p-4">
                    <div className={`toast ${props.show} border-warning border-2 text-bg-${props.bg} p-2 `}  role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">{props.message}</div>
                            <button type={'button'} className={'btn-close me-2 m-auto'} data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>

    );
};