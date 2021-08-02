import { useEffect, useState } from "react";
import PlayerSelection from "./PlayerSelection"
import CpuHandRes from "./CpuHandRes";
import PlayerHandRes from "./PlayerHandRes";
import Back from "../Images/Back.jpg"

const Play2 = () => {

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
            return card.value !== value;
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
    }

    const userGoFish = () => {
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

        if (cpuIterated.length === 0) {
            alert("CPU won!")
            return
        }

        const value = cpuIterated[rIndex].value
        setRequest(value)
        cpuAsk(value)
    }

    const passToPlayer = () => {
        setPlayer(true)
        setCpuResponse(false)
    }

    return (
        <>
            <div className="cardDiv">
                {
                    cpuIterated.map((card) => {
                        return (
                            <img src={Back} key={card.code} /> 
                        )
                    })
                }
            </div>
            <section className="mainContent">
                {
                    player 
                    ?
                        <>
                        {
                            cpuResponse
                            ? 
                                <CpuHandRes count={count} request={request} fish={fish} userGoFish={userGoFish} passToCPU={passToCPU} />
                            : 
                                <PlayerSelection playerIterated={playerIterated} ask={ask} />
                        }
                        </>
                    : <PlayerHandRes request={request} count={count} fish={fish} cpuGoFish={cpuGoFish} passToPlayer={passToPlayer} />
                }
            </section>
            <div className="cardDiv">
                {
                    playerIterated.map((card) => {
                        return (
                            <img src={card.image} key={card.code} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Play2