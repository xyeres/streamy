export default function secondsToTime(e) {
  if (!e || isNaN(e)) return '--:--'
  let m = Math.floor(e % 3600 / 60).toString().padStart(1, '0'),
    s = Math.floor(e % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}