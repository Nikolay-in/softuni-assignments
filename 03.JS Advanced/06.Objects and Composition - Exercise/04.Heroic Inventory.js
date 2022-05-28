function heroes(input) {
    let heroes = [];
    for(line of input) {
        let [name, level, items] = line.split(' / ');
        level = Number(level);
        items = (items) ? items.split(', ') : []; 
        let heroObj = {
            name,
            level,
            items
        }
        heroes.push(heroObj);
    }
    console.log(JSON.stringify(heroes));
}
heroes(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']
);