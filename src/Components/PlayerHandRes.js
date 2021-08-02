const PlayerHandRes = ({request, count, fish, cpuGoFish, passToPlayer}) => {

    const wording = () => {
        if (count === 0) {
            return "none"
        } else {
            return "one"
        }
    }

    return (
        <div className="content">
            <p>The CPU asks... "Do you have any {request}?"</p>
            <p>You have {wording()}.</p>
                {
                    fish 
                    ? <button onClick={cpuGoFish}>Go Fish</button>
                    : <button onClick={passToPlayer}>Next Turn</button>
                }
        </div>
    )
}

export default PlayerHandRes