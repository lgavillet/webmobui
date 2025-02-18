export default function formatTimestamp(timestamp) {
  timestamp = parseInt(timestamp, 10)
  let hours   = Math.floor(timestamp / 3600)
  let minutes = Math.floor((timestamp - (hours * 3600)) / 60)
  let seconds = timestamp - (hours * 3600) - (minutes * 60)

  if (minutes < 10) minutes = "0" + minutes
  if (seconds < 10) seconds = "0" + seconds
  return minutes + ':' + seconds
}
