import {temperatures} from "./exempletemperatures.js"
import {diagrammeCourant,afficherDiagrammeTemperatures} from './diagrammetemperatures.js'
import { nouvellesCouleurs } from "./couleurs.js";
export function ligneMoisHTML(t){
        return `<tr><td></td>${Array.from(t.mois, element =>  `<td> ${element}</td>`).join(' ')
    }</tr>`
}

console.log(ligneMoisHTML(temperatures));

export function ligneVilleHTML(tville){
    return `<tr><th>${tville.ville}</th>${Array.from(tville.temperatures,element=>`<td>${element}</td>`).join('')}</tr>`
}

export function temperaturesFromTable(t){
    return `<table>
                <caption>${t.description}</caption>
                <thead>${ligneMoisHTML(t)}</thead>
                <tbody>
                    ${Array.from(t.villes, ville=> ligneVilleHTML(ville)).join()}
                </tbody>
            </table>
            `;
}

export function afficherTemperature(t,id){

    document.getElementById(id).innerHTML = temperaturesFromTable(t);
}

export function init(){

    document.getElementById('charger').disabled = true
    document.getElementById('diagramme').disabled = true
    document.getElementById('fichier-temperatures').addEventListener('change',(e)=>{
        onFichierChange(e);
    })

    document.getElementById("charger").addEventListener("click",(e)=>{
        let fichier = document.getElementById('fichier-temperatures')
        let ficContent = fichier.files[0];
        
        let reader = new FileReader()

        reader.onload = onCharger

        reader.readAsText(ficContent);
    })
    
    afficherTemperature(temperatures,'tableau-temperatures')
}

export function onFichierChange(e){
    
    document.getElementById('charger').disabled = ((e.target.value !== null)) ? false  :true
}
let jsonData = null;
let couleurs = null;
export function onCharger(e){
    
    //const jsonData = JSON.parse(e.target.result);
    
    // try{
        jsonData = JSON.parse(e.target.result);
        afficherTemperature(jsonData,'tableau-temperatures')
        document.getElementById("diagramme").disabled = false
        console.log(jsonData.mois.length)
        couleurs = nouvellesCouleurs(jsonData.mois.length)
        document.getElementById('diagramme').addEventListener('click',onDiagramme)
//     }
//     catch(error){
//         console.error('Erreur de lecture')
//     }
 }

export function onDiagramme(e){
    console.log(couleurs)
    afficherDiagrammeTemperatures(jsonData,couleurs,'canvas-temperatures')
}





init()