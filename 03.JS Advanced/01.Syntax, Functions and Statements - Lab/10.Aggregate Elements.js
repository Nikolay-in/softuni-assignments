function aggregateEls(arr) {
    console.log(arr.reduce((a,b) => a + b));
    let sum2 = 0;
    arr.forEach(el => {
        sum2 += 1/el;        
    });
    console.log(sum2);
    let concat = '';
    arr.forEach(el => {
        concat += el;
    });
    console.log(concat);
}
aggregateEls([1, 2, 3]);