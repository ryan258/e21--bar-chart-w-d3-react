import React from 'react'
import { scaleBand, scaleLinear, max, format } from 'd3'
import AxisBottom from './components/AxisBottom'
import AxisLeft from './components/AxisLeft'
import Marks from './components/Marks'
import { useData } from './hooks/useData'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run

const width = 960
const height = 500
const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 220
}
const xAxisLabelOffset = 50

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>'Loading...'</pre>
  }

  // console.log(data[0])

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.right - margin.left

  const yValue = (d) => d.Country
  const xValue = (d) => d.Population

  const siFormat = format('.2s')
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B')

  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]).paddingInner(0.1)

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])

  // Fortunately scales can tell us their ticks
  // console.log(xScale.ticks())

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* use the tick generation logic */}
        <AxisBottom //
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text //
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
          className="axis-label"
        >
          Population
        </text>
        <Marks data={data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat} />
      </g>
    </svg>
  )
}

export default App
