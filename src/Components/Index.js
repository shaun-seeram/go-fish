import { Link } from "react-router-dom"

const Index = () => {
    return (
        <div className="content intro">
            <h1>Welcome to Go Fish!</h1>
            <p>Upon launch of the game, we will distribute 7 cards to both you and the CPU. Your hands will be immediately flushed of all doubles. The aim of the game is to discard your entire hand before your opponent, by matching as many pairs as possible with your opponent's hand. First to an empty hand wins!</p>
            <p>I've included some code that will constantly  check for pairs in your hand. If you notice that cards are disappearing, it's because you drew a duplicate card from the pile, and we've removed the pair for you.</p>
            <Link to="/play">Lets Play!</Link>
        </div>
    )
}

export default Index