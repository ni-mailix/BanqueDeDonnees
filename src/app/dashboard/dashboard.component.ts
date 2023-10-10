import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { KpiStatService } from '../services/kpi-stat.service';
import { Statistique } from '../models/statistique.model';
import { arrayBuffer } from 'stream/consumers';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent implements OnInit{
  title = 'repartition';
  stats: Statistique={
    stat: '',
    heap_memory:0,
    current_connected:0,
    latest_connected:0,
    avg_response:0,
  };
  dataSet:number[]=[];
  // Doughnut
  public doughnutChartLabels: string[] = [ 'DRH', 'DSI', 'DSP','DCB' ,'DAG'];
  // public doughnutChartLabels: string[] = [ 'Libre', 'Utilisé'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    // { data:this.dataSet, label: 'Utilisation',backgroundColor:['green','red'] },
    { data: [ 350, 30, 100,70,180 ], label: 'Effectif',backgroundColor:['#fff','yellow','#AB4','blue','red'] },
      // { data: [ 250, 130, 70 ], label: 'Series C' }
    ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    
  };
  
/*

.....

*/
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: false,
};
public pieChartLabels =  [ 'DRH', 'DSI', 'DSP','DCB' ,'DAG'];
// public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
public pieChartDatasets = [ {
  data: [ 350, 30, 100,70,180  ],
  // data: [ 300, 500, 100 ],
} ];
public pieChartLegend = true;
public pieChartPlugins = [];
  constructor(public statService:KpiStatService ) {}
  ngOnInit(): void {
    this.statService.getKPI().subscribe(
      (val)=>{
        // this.stats:Statistique
        this.stats.stat=val.nodes.awHss90nTqerMwQw3Qck9A;
        this.stats.heap_memory=val.nodes.awHss90nTqerMwQw3Qck9A.jvm.mem.heap_used_percent;
        this.stats.current_connected=val.nodes.awHss90nTqerMwQw3Qck9A.http.current_open;
        this.stats.latest_connected=val.nodes.awHss90nTqerMwQw3Qck9A.http.total_opened;
        // console.log(this.stats.stat.mem.heap_used_percent+"%")
        this.dataSet.push(100-this.stats.heap_memory);
        this.dataSet.push(this.stats.heap_memory);
      }
    )
    // throw new Error('Method not implemented.');
  }
  }

