import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { EntidadService } from 'src/app/servicios/entidad.service';
import { MedidorService } from 'src/app/servicios/medidores.service';
import { FacturaService } from './../../servicios/factura.service';

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
  listOfEntidad: any[] = [];
  listOfMedidor: any[] = [];
  listOfMedidorFiltrado: any[] = [];
  fechaDia: any = new Date();
  fecha1: any = new Date();
  fecha2: any = new Date();
  barChartOptions: any;
  barChartLabels: any[] = [];
  barChartType: any;
  barChartLegend: any;
  barChartData: any[] = [];
  dataFactura: any;
  detallePerdidas: any[] = [];
  consumoHistorico: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private serviceEntidad: EntidadService,
    private serviceMedidor: MedidorService,
    private serviceFactura: FacturaService
  ) {

  }

  ngOnInit() {

    this.dataFactura = '';
    this.serviceEntidad.getEntidadFilter()
      .toPromise()
      .then((data: any) => {
        this.listOfEntidad = data;
        this.serviceMedidor.getMedidorEntidad()
          .toPromise()
          .then((datos: any) => this.listOfMedidor = datos);
      });

    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    this.barChartType = 'bar';
    this.barChartLegend = true;

  }

  mostrar() {
    this.visible = true;
    let data: any[] = [];
    switch (this.tiempo) {
      case '1': {
        this.fecha1 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');

        break;
      }
      case '2': {
        this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm');

        break;
      }
      case '3': {
        this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm')
        break;
      }
      case '4': {
        this.fecha1 = moment(moment().startOf('week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '5': {
        this.fecha1 = moment().startOf('year').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '6': {
        this.fecha1 = moment(moment().startOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
        break;
      }
      case '7': {
        this.fecha1 = moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        break;
      }
      case '8': {
        this.fecha1 = moment().startOf('month').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '9': {
        this.fecha1 = moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
        break;
      }
      case '10': {
        this.fecha1 = moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
        break;
      }
      default:
        break;
    }

    this.serviceFactura.getDetalle()
      .toPromise()
      .then((datos: any) => {
        this.dataFactura = datos[0];

        [...this.dataFactura.detallePerdidas].forEach(element => {
          // tslint:disable-next-line: forin
          for (const key in element) {
            this.detallePerdidas = [...this.detallePerdidas, element[key]];
          }
        });


        [...this.dataFactura.consumoHistorico].forEach(index => {
          // tslint:disable-next-line: forin
          for (const key in index) {
            this.barChartLabels = [...this.barChartLabels, moment(key).format('YYYY-MM-DD')];
            data = [...data, index[key]];
          }
        });

        this.barChartData = [
          {
            data, label: 'kW',
            backgroundColor: '#043f79',
          }
        ];
        console.log(this.detallePerdidas);


      });

  }

  changeEntidad(id) {
    this.listOfMedidorFiltrado = this.listOfMedidor.filter(x => x.entidadId === id);
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
