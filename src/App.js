import React, { useState, useEffect } from 'react'
import { csv, scaleBand, scaleLinear, max } from 'd3'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run
import './App.css'

const csvUrl = 'https://gist.githubusercontent.com/ryan258/1a29d0b1d8c05e2d2f24f654a8ae515e/raw/ab8cc988df7c5ce40e6758af308fec4f129fc51e/UN_Population_2019.csv'

const width = 960
const height = 500
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 200
}

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020']
      return d
    }
    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10))
    })
  }, [])

  if (!data) {
    return <pre>'Loading...'</pre>
  }

  console.log(data[0])

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.right - margin.left

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth])

  // Fortunately scales can tell us their ticks
  // console.log(xScale.ticks())

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* use the tick generation logic */}
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line
              // x1={0}
              // y1={0}
              // x2={0}
              y2={innerHeight}
              stroke="black"
            />
            <text //
              y={innerHeight + 3}
              dy=".71em"
              style={{ textAnchor: 'middle' }}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text //
            key={tickValue}
            style={{ textAnchor: 'end' }}
            x={-3}
            y={yScale(tickValue) + yScale.bandwidth() / 2}
            dy=".32em"
          >
            {tickValue}
          </text>
        ))}
        {data.map((d) => (
          <rect key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()}></rect>
        ))}
      </g>
    </svg>
  )
}

export default App
