import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: ElementRef;

  visible: boolean = false;
  tiempo: any;
  fecha1: any = new Date();
  fecha2: any = new Date();
  ChartGenetOptions: any;
  ChartGenetLabels: any[] = [];
  ChartGenetType: any;
  ChartGenetLegend: any;
  ChartGenetData: any[] = [];

  ChartConsuLabels: any[] = [];
  ChartConsuData: any[] = [];
  ChartConsuType: any;

  constructor(
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {


    this.ChartGenetOptions = {
      scaleShowVerticalLines: true,
        responsive: true,
    };

    this.ChartGenetLabels = [
      'Generador 1',
      'Generador 2',
      'Generador 3',
      'Generador 4',
    ];
    this.ChartGenetType = 'polarArea';
    this.ChartGenetLegend = true;
    this.ChartGenetData = [
      {
        data: [11, 16, 12, 10],
        backgroundColor: ['#ffe1b9', '#76eabdab', '#76d7eaab', '#fbb2b2'],
        borderColor: ['#ffb553','#40c793','#008aa5ab','#ec4a4a']
      }
    ];


    //// Grafico Consumo
    this.ChartConsuLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
    this.ChartConsuData =  [
      {
        data: [11, 13, 8, 5],
        backgroundColor: ['#035eaf4d', '#ff00004d', '#ff94004d', '#008e154d'],
        borderColor: ['#024d90','#b30202b2','#ff9400','#005a0d']
      }
    ];
    this.ChartConsuType = 'doughnut';
  }

  mostrar() {
    this.visible = true;

    switch (this.tiempo) {
      case '1': {
        console.log(moment().startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');

        break;
      }
      case '2': {
        console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm');

        break;
      }
      case '3': {
        console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm')
        break;
      }
      case '4': {
        console.log(moment(moment().startOf('week')).add(1, 'day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '5': {
        console.log(moment().startOf('year').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().startOf('year').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '6': {
        console.log(moment(moment().startOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
        break;
      }
      case '7': {
        console.log(moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        break;
      }
      case '8': {
        console.log(moment().startOf('month').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().startOf('month').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '9': {
        console.log(moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
        break;
      }
      case '10': {
        console.log(moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
        break;
      }
      default:
        break;
    }

  }

  imprimir(): void {
    this.spinner.show();
    const div: any = document.getElementById('content');

    const options = {
      background: 'white',
      scale: 3
    };

    const doc = new jsPDF('l', 'mm', 'letter', true);

    html2canvas(div, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 10;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      (doc as any).addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save(`Dashboard.pdf`);
      this.spinner.hide();
    });

  }

}
