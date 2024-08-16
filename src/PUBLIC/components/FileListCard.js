import React from "react";

export default function FileListCard(props) {
    return (
        <div className={'card file-list-card text-bg-dark rounded-start-4 rounded-end-4 m-3 '}>
            <div className="card-body  ">
                <div className="row">
                    <div className="col-7  d-flex flex-column justify-content-start">
                        <p className="card-text file-name font-monospace">{props.name}</p>
                        <p className="card-text file-size">{Math.round(props.size /(1024))} KB </p>
                    </div>
                    <div className="col-5 d-flex mb-auto justify-content-end " >
                        <button
                            //style={{opacity: 1.7}}
                            type={'button'}
                            className="btn-close btn-close-danger  "
                            onClick={() => props.deleteFile(props.id)}
                            value={'Input'}
                            disabled={props.disabled}
                            aria-label="Close"

                        />
                    </div>
                </div>

                {/*<img src="..." class="rounded-bottom-1" alt="...">
<img src="..." class="rounded-start-2" alt="...">
<img src="..." class="rounded-end-circle" alt="...">
<img src="..." class="rounded-start-pill" alt="...">
<img src="..." class="rounded-5 rounded-top-0" alt="...">*/}


            </div>
        </div>

    )
}
