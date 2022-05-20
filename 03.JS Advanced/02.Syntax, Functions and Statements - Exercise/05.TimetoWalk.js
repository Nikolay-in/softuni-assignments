function timeToWalk(steps, footprint, speed) {
    let dist = steps * footprint;
    let minsBreak = Math.floor(dist / 500);
    let km = dist / 1000;
    let timeInHrs = km / speed;
    let hrs = Math.floor(timeInHrs);
    let mins = Math.floor((timeInHrs % 1) * 60) + minsBreak;
    let secs = Math.round((((timeInHrs % 1) * 60) % 1) * 60);
    console.log(`${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
}
timeToWalk(2564, 0.70, 5.5);