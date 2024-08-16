export default function ProgressBar(props) {

    return (
          <div className="progress " style={{ height: `${props.height}px` }} role={"progressbar"} aria-label={"Progress Bar"} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            <div
                id={props.id}
                className={`progress-bar ${props.bg} overflow-visible`}
                style={{ width: `${props.percent}%` }}
            >


                    {props.text}

            </div>
          </div>
    )
}