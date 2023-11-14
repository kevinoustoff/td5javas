import {
  Chart,
  Colors,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend
} from './chartjsdist/chart.js';

Chart.register(
  Colors,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend
);


export let diagrammeCourant = null

export function datasetsTemperatures(t,couleurs){
  let datasets = []
  console.log(couleurs)
  datasets = Array.from(t.villes,(element,index)=>
      ({
        label: element.ville,
        data: element.temperatures,
        borderColor: couleurs[index]
      }) 
  )
  return datasets;
}

export function diagrammeTemperatures(t,couleurs,canevas){

  if(diagrammeCourant)
    diagrammeCourant.destroy();

  return new Chart(canevas,{
    type:'line',
    data:{
     labels: t.mois,
      datasets: datasetsTemperatures(t,couleurs)
    },
    options:{
      title:{display:true,text:'description'},
      datasets: { line: { lineTension:0, fill: false }},
      responsive: false
    }
      
  })
}

export function afficherDiagrammeTemperatures(t,couleurs,id){
  let canvasDom = document.getElementById(id)
  diagrammeCourant = diagrammeTemperatures(t,couleurs,canvasDom)
}

