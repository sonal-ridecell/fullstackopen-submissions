import { useState } from 'react'

const StatisticLine = ({text, value}) => <><tr><td>{text}</td><td>{value}</td></tr></>

const Statistics = ({good, bad, neutral}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const percentage = good / total * 100
  if (total) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={percentage} />
        </tbody>
      </table>
    )
  }
  return <p>No feedback given</p>
}

const Button = ({handler, text}) => <button onClick={handler}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <Button handler={() => setGood(good + 1)} text="good"/>
      <Button handler={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handler={() => setBad(bad + 1)} text="bad"/>
      <h3>statistics</h3>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App