import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData } from 'src/app/interfaces/chart.interface';
import { StatsDetailsModalComponent } from '../stats-details-modal/stats-details-modal.component';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  
  @Input() public chart : ChartData = null; 
  @Input() public title = 'Interest in charts';
  @Input() public description = 'This chart shows my interest in charts';
  @Input() public labels =  ['Red','Blue','Yellow'];
  @Input() public colors = ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)'];
  @Input() public data = [300, 50, 100];

  @ViewChild('canvasChart') canvasChart;
  @ViewChild('viewStats') statsModal : StatsDetailsModalComponent;

  private canvas;
  private ctx;
  private myChart : Chart;
  
  constructor() { }

  ngOnInit(){}

  ngAfterViewInit() {
    this.canvas = this.canvasChart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    this.myChart = new Chart(this.canvasChart.nativeElement, {
      type: 'pie',
      data: {
        labels: this.chart?.labelSet || this.labels,
        datasets: [{
          label: this.chart?.title || this.title,
          data: this.chart?.dataSet || this.data,
          backgroundColor: this.chart?.colorSet || this.colors,
          hoverOffset: 4
        }]
      },
      options: {
        onClick: this.showData.bind(this)
      }
    });
  }

  showData(evt, arr){
    if(arr?.length){
      let index = arr[0].index;
      console.log(index);
  
      console.log(this.chart.labelSet[index].toLowerCase());
    }else{
      console.log('all');
    }
  }

  public details(){
    console.log(this.chart);
    this.statsModal.openDetails();
  }

}
