import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { EntidadService } from 'src/app/servicios/entidad.service';
import { MedidorService } from 'src/app/servicios/medidores.service';
import { FacturaService } from './../../servicios/factura.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { centroCostoService } from 'src/app/servicios/centroCosto.service';
import { grupoService } from 'src/app/servicios/grupo.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: ElementRef;

  visible: boolean = false;
  visibleFecha: boolean = false;
  fecha: any;
  // cliente: any;
  centroCosto: any;
  //  medidor: any;
  grupo: any;
  tiempo: any;
  listOfEntidad: any[] = [];
  listOfCentroCosto: any[] = [];
  listOfGrupo: any[] = [];
  listOfGrupoFiltrado: any[] = [];
  factores: any;
  /*  listOfMedidor: any[] = [];
    listOfMedidorFiltrado: any[] = [];*/
  fechaDia: any = new Date();
  fecha1: any = new Date();
  fecha2: any = new Date();
  barChartOptions: any;
  barChartLabels: any[] = [];
  barChartType: any;
  barChartLegend: any;
  barChartData: any[] = [];
  dataFactura: any;
  totalMedicion: number;
  totalGeneracion: number;
  totalEnee: number;
  detallePerdidas: any[] = [];
  consumoHistorico: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    /*    private serviceEntidad: EntidadService,
        private serviceMedidor: MedidorService,*/
    private serviceFactura: FacturaService,
    private serviceCentroCosto: centroCostoService,
    private serviceGrupo: grupoService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit() {
    this.serviceCentroCosto.getCentroCosto()
      .toPromise()
      .then((data: any) => {
        this.listOfCentroCosto = data;
        this.serviceGrupo.getGrupo()
          .toPromise()
          .then((data: any) => this.listOfGrupo = data)
      })

    this.dataFactura = '';

    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      tooltips: {
        callbacks: {
          label: t => t.yLabel.toLocaleString('en-US') + ' kWh'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            // Create scientific notation labels
            callback: value => value.toLocaleString('en-US') + ' kWh'
          }
        }]
      }
    };
    this.barChartType = 'bar';
    this.barChartLegend = true;
  }

  mostrar() {
    this.visible = false;
    this.fecha1 = undefined;
    this.fecha2 = undefined;
    
    let data: any[] = [];
    switch (this.tiempo) {
      case '1': {
        this.fecha1 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '2': {
        this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().add(-1, 'day').endOf('day').add(1, 'm').format('YYYY-MM-DD HH:mm');

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
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').add(1, 'm').format('YYYY-MM-DD HH:mm')
        break;
      }
      case '7': {
        this.fecha1 = moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').add(1, 'm').format('YYYY-MM-DD HH:mm');
        break;
      }
      case '8': {
        this.fecha1 = moment().startOf('month').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '9': {
        this.fecha1 = moment(moment().add(-1, 'M').startOf('month')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().add(-1, 'M').endOf('month')).add(1, 'm').format('YYYY-MM-DD HH:mm');
        break;
      }
      case '10': {
        this.fecha1 = moment(moment().add(-1, 'y').startOf('year')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().add(-1, 'y').endOf('year')).add(1, 'm').format('YYYY-MM-DD HH:mm');
        break;
      }
      case '11': {
        if (this.fecha != undefined && this.fecha.length > 0) {
          this.fecha1 = moment(this.fecha[0]).format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment(this.fecha[1]).format('YYYY-MM-DD HH:mm');
        }
        break;
      }
      default:
        break;
    }
    if (this.centroCosto === undefined || this.fecha1 === undefined || this.fecha2 === undefined) {
      this.nzMessageService.warning('No se puede mostrar el reporte, revise el medidor y las fechas seleccionadas y seleccione los correctos.');
    }
    else {
      /*      this.serviceFactura.getDetalle(this.fecha1, this.fecha2, this.medidor.id)
              .toPromise()
              .then((datos: any) => {
                this.dataFactura = datos;
                this.detallePerdidas = this.dataFactura.detallePerdidas;
                this.barChartLabels = this.dataFactura.consumoHistorico.map((item) => item.label);
                data = this.dataFactura.consumoHistorico.map((item) => item.valor);
      
                this.barChartData = [
                  {
                    data, label: 'kW',
                    backgroundColor: '#043f79',
                  }
                ];
              });*/
      this.serviceFactura.getConsumoMedidores(this.centroCosto.id, this.fecha1, this.fecha2)
        .toPromise()
        .then((datos: any) => {
          this.dataFactura = datos
          this.totalMedicion = 0
          this.totalGeneracion = 0
          this.totalEnee = 0
          this.dataFactura.map((data) => {
            this.totalMedicion += (data.final - data.inicial)*data.operacion
            this.totalGeneracion += data.Generacion * data.operacion
            this. totalEnee += data.Enee * data.operacion
          })
          this.barChartLabels=[]
          data=[]

          this.barChartLabels.push(this.fecha2)
          data.push(this.totalMedicion)
      
          this.barChartData = [
              {
                data, label: 'kW',
                backgroundColor: '#043f79',
              }
            ];
        })

      if (this.grupo) {
        this.serviceFactura.getFactores(this.grupo.id)
          .toPromise()
          .then((datos: any) => {
            this.factores = datos
          })
      }
      this.visible = true;
    }
  }

  changeCentroCosto(centroCosto) {
    this.listOfGrupoFiltrado = this.listOfGrupo.filter(x => x.centroCostoId === centroCosto.id);
    this.grupo = undefined;
  }
  changeRango(index) {
    this.visibleFecha = index === '11' ? true : false;
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
