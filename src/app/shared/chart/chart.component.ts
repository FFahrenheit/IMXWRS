import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() public title = 'Interest in charts';
  @Input() public description = 'This chart shows my interest in charts';

  @ViewChild('canvasChart') chart;
  private canvas;
  private ctx;
  
  constructor() { }

  ngOnInit(){}

  ngAfterViewInit() {
    this.canvas = this.chart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    })
  }

}
