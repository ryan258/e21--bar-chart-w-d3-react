import React from 'react'

const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }) =>
  data.map((d) => (
    <rect //
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
      key={yValue(d)}
      className="mark"
    >
      {/* make a simple tooltip */}
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  ))

export default Marks
