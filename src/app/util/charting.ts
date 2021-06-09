import { ChartData } from "../interfaces/chart.interface";

export class Charting{

    private colors = [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
    ];

    private chartList : ChartData[] = [];

    constructor(){
    }

    getCharts(data : any){
        this.chartList = [];
        Object.keys(data).forEach(key=>{
            
            if(data[key].length > 0){

                let labels = [];
                let points = [];
                let color = [];
                data[key].forEach((val,index) =>{
                    labels.push(this.titleCase(val.label));
                    points.push(val.data);
                    color.push(this.getColorsAt(index));
                });

                const chart : ChartData = {
                    title : this.titleCase(key),
                    description : 'This chart shows the participation of the user in ' + key,
                    colorSet : color,
                    dataSet : points,
                    labelSet : labels
                };
                
                console.log(chart);
                this.chartList.push(chart);
            }
        });

        return this.chartList;
    }

    private getColorsAt(index : number){
        if(index >= this.colors.length){
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        }
        return this.colors[index];
    }

    private titleCase(str) {
        str = str.toLowerCase();
        str = str.split(' ');
        for (let i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 

        }
        return str.join(' '); 
      }
      


}