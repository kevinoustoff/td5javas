
export function nouvellesCouleurs(n){
    let couleurs = []

    for(let i =0; i<couleurs.length;i++){
        const h = i*360/n;
        const s = 97;
        const l = 42;

        couleurs.push(`hsl(${h},${s},${l})`)
    }

    return couleurs
}
