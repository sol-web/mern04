import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import User from './components/User'

function App() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers').then((response) => {
      //console.log(response.data)
      setListOfUsers(response.data)
      //console.log(listOfUsers)
    })
  }, [listOfUsers])

  const createUser = () => {
    axios
      .post('http://localhost:3001/createUser', { name, age, username })
      .then((rspinse) => {
        alert('사용자 등록 성공')
        setListOfUsers([...listOfUsers, { name, age, username }])
      })
  }

  return (
    <div className="App">
      <h1>사용자 목록</h1>
      <div className="grid">
        {listOfUsers.map((user) => {
          return (
            <div>
              <User user={user} />
            </div>
          )
        })}
      </div>

      <div className="register">
        <input
          className="input"
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type="text"
          placeholder="Usename"
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className="button" onClick={createUser}>
          사용자 등록
        </button>
      </div>
    </div>
  )
}

export default App
