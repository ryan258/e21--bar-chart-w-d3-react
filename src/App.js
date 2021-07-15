import React, { useState, useCallback, useEffect } from 'react'
import { csv, arc, pie } from 'd3'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run
import './App.css'

const csvUrl = 'https://gist.githubusercontent.com/ryan258/1a29d0b1d8c05e2d2f24f654a8ae515e/raw/ab8cc988df7c5ce40e6758af308fec4f129fc51e/UN_Population_2019.csv'

const width = 1500
const height = 1500
const centerX = width / 2
const centerY = height / 2

const pieArc = arc().innerRadius(0).outerRadius(width)

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    csv(csvUrl).then(setData)
  }, [])

  if (!data) {
    return <pre>'Loading...'</pre>
  }

  // console.log(data[0])

  const colorPie = pie().value(1)

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {
          colorPie(data).map((d) => (
            <path fill={d.data['RGB hex value']} d={pieArc(d)} />
          ))

          /* data.map((d, i) => (
          <path
            key={i}
            fill={d['RGB hex value']}
            d={pieArc({
              startAngle: (i / data.length) * 2 * Math.PI,
              endAngle: ((i + 1) / data.length) * 2 * Math.PI
            })
            }
          />
        )) */
        }
      </g>
    </svg>
  )
}

export default App
