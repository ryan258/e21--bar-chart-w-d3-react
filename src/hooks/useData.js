import { useEffect, useState } from 'react'
import { csv } from 'd3'

const csvUrl = 'https://gist.githubusercontent.com/ryan258/1a29d0b1d8c05e2d2f24f654a8ae515e/raw/ab8cc988df7c5ce40e6758af308fec4f129fc51e/UN_Population_2019.csv'

export const useData = () => {
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

  return data
}
