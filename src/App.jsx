import { useState } from 'react'
import './App.css'
import Badge from './Badge'
import StudentList from './StudentList'

function App() {
  

  return (
    <>
      <Badge state={"정상"} />
      <StudentList />
    </>
  )
}

export default App
