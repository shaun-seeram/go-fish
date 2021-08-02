const CpuHandRes = ({count, request, fish, userGoFish, passToCPU}) => {

    const wording = () => {
        if (count === 0) {
            return "no"
        } else {
            return "one"
        }
    }

    return (
        <div className="content">
            <p>The CPU had {wording()} {request}</p>
                {
                    fish 
                    ? <button onClick={userGoFish}>Go Fish</button>
                    : <button onClick={passToCPU}>Next Turn</button>
                }
        </div> 
    )
}

export default CpuHandRes