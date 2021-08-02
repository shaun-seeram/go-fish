const PlayerSelection = ({playerIterated, ask}) => {
    return (
        <div className="content">
            <p>Ask the CPU.</p>
            <form action="">
                <label htmlFor="card">Do you have any...</label>
                    <select id="card">
                        {
                            playerIterated.map((card) => {
                                return (
                                    <option value={card.value} key={card.value}>{card.value}</option>
                                )
                            })
                        }
                    </select>
                <button onClick={(e) => {ask(e)}}>Ask</button>
            </form>
        </div>
    )
}

export default PlayerSelection