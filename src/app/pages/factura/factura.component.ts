import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: ElementRef;

  visible: boolean = false;
  cliente: any;
  medidor: any;
  tiempo: any;
  fechaDia: any = new Date();
  fecha1: any = new Date();
  fecha2: any = new Date();
  barChartOptions: any;
  barChartLabels: any[] = [];
  barChartType: any;
  barChartLegend: any;
  barChartData: any[] = [];

  constructor(
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {


    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = [
      {
        data: [65, 59, 80, 81, 56, 55, 60], label: 'kW',
        backgroundColor: '#043f79',
      }
    ];

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
      const bufferY = 15;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      (doc as any).addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save(`Factura.pdf`);
      this.spinner.hide();
    });

  }
}
