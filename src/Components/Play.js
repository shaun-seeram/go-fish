import { useEffect, useState } from "react";

const Play = () => {

    const [deckID, setDeckID] = useState("");
    const [cpuDeck, setCpuDeck] = useState([]);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [playerIterated, setPlayerIterated] = useState([]);
    const [cpuIterated, setCpuIterated] = useState([]);
    const [player, setPlayer] = useState(true);
    const [cpuResponse, setCpuResponse] = useState(false);
    const [request, setRequest] = useState("");
    const [fish, setFish] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {

        fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=14").then((data) => {
            return data.json();
        }).then((jsonData) => {
            setDeckID(jsonData.deck_id);
            setPlayerDeck(jsonData.cards.slice(0,7));         setCpuDeck(jsonData.cards.slice(7))
        });

    }, []);

    useEffect(() => {

        const iteratedArray = []

        cpuDeck.forEach((card) => {
            let noDuplicate = 0;
            cpuDeck.forEach((secondCard) => {
                if (card.value === secondCard.value) {
                    noDuplicate ++
                }

                if (noDuplicate >= 3) {
                    console.log(iteratedArray)
                    console.log("LOOKHERE")
                    if (iteratedArray.some(newCard => newCard.value == card.value)) {
                        console.log("LOOK")
                        return
                    } else {
                        console.log("LOOK")
                        iteratedArray.push(card)
                    }
                }
            });

            if (noDuplicate === 1) {
                iteratedArray.push(card)
            }

            console.log(noDuplicate)
        });
        setCpuIterated(iteratedArray)

    }, [cpuDeck]);

    useEffect(() => {

        const iteratedArray = []

        playerDeck.forEach((card) => {
            let noDuplicate = 0;
            playerDeck.forEach((secondCard) => {
                if (card.value == secondCard.value) {
                    noDuplicate ++
                }

                if (noDuplicate === 3) {
                    console.log(iteratedArray)
                    if (iteratedArray.some(newCard => newCard.value == card.value)) {
                        return
                    } else {
                        iteratedArray.push(card)
                    }
                }
            });

            if (noDuplicate === 1) {
                iteratedArray.push(card)
            }

        });

        setPlayerIterated(iteratedArray)
        
    }, [playerDeck]);

    useEffect(() => {
        console.log(playerIterated)
        console.log(cpuIterated)
    }, [playerIterated, cpuIterated])

    const ask = (e) => {

        e.preventDefault();
        const initCount = cpuIterated.length
        const filteredHand = cpuIterated.filter((card) => {
            return card.value !== e.target.form[0].value;
        });
        setCpuIterated(filteredHand);
        const count = initCount - filteredHand.length;
        setCount(count)
        if (count > 0) {
            const filteredHand = playerIterated.filter((card) => {
                return card.value !== e.target.form[0].value;
            });
            setPlayerIterated(filteredHand);
            setFish(false)
        } else {
            setFish(true)
        }

        if (playerIterated.length === 0) {
            alert("Player won!")
        }
        if (cpuIterated.length === 0) {
            alert("CPU won!")
        }
        setRequest(e.target.form[0].value)
        setCpuResponse(true);

    }

    const cpuAsk = (value) => {
        const initCount = playerIterated.length;
        const filteredHand = playerIterated.filter((card) => {
            return card.value != value;
        });
        setPlayerIterated(filteredHand);
        const count = initCount - filteredHand.length;
        setCount(count);
        if (count > 0) {
            const filteredHand = cpuIterated.filter((card) => {
                return card.value !== value;
            });
            setCpuIterated(filteredHand);
            setFish(false)
        } else {
            setFish(true)
        }
        if (playerIterated.length === 0) {
            alert("Player won!")
        }
        if (cpuIterated.length === 0) {
            alert("CPU won!")
        }
    }

    const userGoFish = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`).then((res) => {
            return res.json()
        }).then((jsonData) => {
            if (jsonData.cards.length === 0) {
                return
            }
            const copyOfDeck = [...playerIterated]
            copyOfDeck.push(jsonData.cards[0])
            setPlayerDeck(copyOfDeck)
        })

        setPlayer(false)

        const rIndex = Math.floor(Math.random() * cpuIterated.length)
        const value = cpuIterated[rIndex].value
        setRequest(value)
        cpuAsk(value)
    }

    const cpuGoFish = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`).then((res) => {
            return res.json()
        }).then((jsonData) => {
            console.log(jsonData)
            if (jsonData.cards.length === 0) {
                return
            }
            const copyOfDeck = [...cpuIterated]
            copyOfDeck.push(jsonData.cards[0])
            setCpuDeck(copyOfDeck)
        })

        setPlayer(true)
        setCpuResponse(false)
    }

    const passToCPU = () => {
        setPlayer(false)
        setCpuResponse(true)

        const rIndex = Math.floor(Math.random() * cpuIterated.length)
        const value = cpuIterated[rIndex].value
        setRequest(value)
        cpuAsk(value)
    }

    const passToPlayer = () => {
        setPlayer(true)
        setCpuResponse(false)
    }

    return (
        player ?
        <>
            <h1>We are playing a game!</h1>
            {
                cpuResponse
                ? null
                : 
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
                    <button onClick={ask}>Ask</button>
                </form>
            }
            {
                cpuResponse 
                ? 
                    <div>
                        <p>The computer had {count} {request}</p>
                            {
                                fish 
                                ? <button onClick={userGoFish}>Go Fish</button>
                                : <button onClick={passToCPU}>Next Turn</button>
                            }
                    </div> 
                : null
            }
        </>
        : 
        <>
            <h1>We are playing a game2!</h1>
            <p>The computer asks, do you have any {request}</p>
            <p>You had {count}</p>
                {
                    fish 
                    ? <button onClick={cpuGoFish}>Go Fish</button>
                    : <button onClick={passToPlayer}>Next Turn</button>
                }
        </>
    )
}

export default Play