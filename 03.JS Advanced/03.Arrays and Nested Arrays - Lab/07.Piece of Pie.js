function pie(pies, start, end) {
    let startIndex = pies.indexOf(start);
    let endIndex = pies.indexOf(end) + 1;
    let newPies = pies.slice(startIndex, endIndex);
    return newPies;
}
console.log(pie(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie'
));