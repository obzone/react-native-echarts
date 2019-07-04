import toString from '../../util/toString'

export default function renderChart({width, height}) {
  return `initChart({width: '${width}px', height: '${height}px'})`
}
