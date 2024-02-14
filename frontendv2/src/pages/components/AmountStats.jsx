

function AmountStats({ availableUsers ,Score}){
    return(
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">User TopScore</div>
                <div className="stat-value">{availableUsers}</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Users</button> 
                </div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Score</div>
                <div className="stat-value">{Score}</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View History</button> 
                </div>
            </div>
        </div>
    )
}

export default AmountStats