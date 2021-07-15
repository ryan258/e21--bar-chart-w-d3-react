import React, { useState, useCallback, useEffect } from 'react'
import { csv, arc, pie } from 'd3'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run
import './App.css'

const csvUrl = 'https://gist.githubusercontent.com/ryan258/1a29d0b1d8c05e2d2f24f654a8ae515e/raw/ab8cc988df7c5ce40e6758af308fec4f129fc51e/UN_Population_2019.csv'

const width = 960
const height = 500

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    csv(csvUrl).then(setData)
  }, [])

  if (!data) {
    return <pre>'Loading...'</pre>
  }

  return <svg width={width} height={height}></svg>
}

export default App
