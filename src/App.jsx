import { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti'

const generateNewDie = () => {
  return {
    id: nanoid(),
    value: Math.floor(Math.random() * 6) + 1,
    isHeld: false
  }
}

const allNewDice = () => {
  const randomNumbersArray = []
  for (let i = 0; i < 10; i++) {
    randomNumbersArray.push(generateNewDie())
  }
  return randomNumbersArray
}
function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  useEffect(() => {
    dice.map(die => {
      if (die.isHeld && dice.every(every => every.value === die.value)) {
        return setTenzies(prevState => !prevState)
      }
    })
  }, [dice])

  const holdDice = (id) => {
    setDice(prevState => (
      prevState.map(die => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld }
        } else {
          return die
        }
      })
    ))

  }
  const handleClick = () => {
    if (!tenzies) {
      setDice(prevState => (
        prevState.map(die => {
          if (die.isHeld) {
            return die
          } else {
            return generateNewDie()
          }
        })
      ))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  return (
    <main>
      {tenzies && <ReactConfetti />}
      <h1 className='title'>
        Tenzies
      </h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className='dice--container'>
        {dice.map(item => (
          <Die value={item} key={item.id} holdDice={holdDice} />
        ))}
      </div>
      <button className='roll--button' onClick={handleClick}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App
