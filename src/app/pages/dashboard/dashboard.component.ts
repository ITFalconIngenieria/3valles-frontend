import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { FacturaService } from 'src/app/servicios/factura.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: ElementRef;

  visible: boolean = false;
  visibleFecha: boolean = false;
  tiempo: any;
  fecha: any;
  fecha1: any = new Date();
  fecha2: any = new Date();
  ventaEnee: number = 0;
  compraEnee: number = 0;
  generacion: number = 0;
  perdida: number = 0;
  consumo: number = 0;
  dataGeneracion: any[] = [];
  dataConsumo: any[] = [];

  ChartGenetOptions: any;
  ChartGenetLabels: any[] = [];
  ChartGenetType: any;
  ChartGenetLegend: any;
  ChartGenetData: any[] = [];
  backgroundColor = ["#4FC3F7", "#E57373", "#FFF176", "#CE93D8", "#F06292", "#FFAB91", "#18FFFF", "#AED581", "#80CBC4", "#81F7F3", "#F79F81", "#F781F3", "#F2F5A9", "#DC90A3", "#EF517B", "#04B4AE", "#BDBDBD", "#FA8258", "#F5A9D0", "#FCCBC", "#FFE0B2", "#CFD8DC", "#FFD180", "#BCAAA4", "#EEEEEE", "#82B1FF", "#B2FF59", "#FF4081", "#C5CAE9", "#EEFF41"]
  //borderColor = ["#0D47A1" , "#D50000" , "#FFFF00" , "#76FF03" , "#FF3D00" , "#AB47BC" , "#00E676"]

  ChartConsuOptions: any;
  ChartConsuLabels: any[] = [];
  ChartConsuData: any[] = [];
  ChartConsuType: any;

  constructor(
    private spinner: NgxSpinnerService,
    private serviceFactura: FacturaService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit() {
  }

  mostrar() {
    this.fecha1 = undefined;
    this.fecha2 = undefined;
    this.visible = false;
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
        if (this.fecha != undefined && this.fecha.length>0 ) {
          this.fecha1 = moment(this.fecha[0]).format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment(this.fecha[1]).format('YYYY-MM-DD HH:mm');
        }
        break;
      }
      default:
        break;
    }

    if (this.fecha1 === undefined || this.fecha2 === undefined) {
      this.nzMessageService.warning('No se puede mostrar el reporte, revise las fechas seleccionadas y seleccione un rango de tiempo correcto.');
    }
    else {
      this.serviceFactura.getResumen(this.fecha1, this.fecha2)
        .toPromise()
        .then((datos: any) => {
          this.ventaEnee = datos.detalleConsumo.filter((item) => item.id == 1012)[0].Consumo;
          this.compraEnee = datos.detalleGeneracion.filter((item) => item.tipoEntidad === true).map((item) => item.Consumo).reduce((a, b) => a + b)

          this.generacion = datos.totalGeneracion - this.compraEnee;
          this.consumo = datos.totalConsumo - this.ventaEnee;
          this.perdida = datos.totalGeneracion - datos.totalConsumo;

          this.dataGeneracion = datos.detalleGeneracion.filter((item) => item.tipoEntidad === false);
          this.dataConsumo = datos.detalleConsumo.filter((item) => item.tipoEntidad === false);

          this.ChartGenetOptions = {
            scaleShowVerticalLines: true,
            responsive: true,
            tooltips: {
              enabled: true,
              callbacks: {
                label: function (t, d) {
                  return d.labels[t.index] + ': ' + d.datasets[0].data[t.index].toLocaleString('en-US') + ' kWh';
                },
              },
            },
            scale: {
                ticks: {
                  callback: value => value.toLocaleString('en-US') + ' kWh'
                }
            }
          };

          this.ChartGenetLabels = datos.detalleGeneracion.filter((item) => item.tipoEntidad === false).map((item) => item.medidor);

          this.ChartGenetType = 'polarArea';
          this.ChartGenetLegend = true;
          this.ChartGenetData = [
            {
              data: datos.detalleGeneracion.filter((item) => item.tipoEntidad === false).map((item) => item.Consumo),
              backgroundColor: this.backgroundColor,
              borderColor: this.backgroundColor
            }
          ];

          //// Grafico Consumo
          this.ChartConsuOptions = {
            responsive: true,
            tooltips: {
              callbacks: {
                label: function (t, d) {
                  return d.labels[t.index] + ': ' + d.datasets[0].data[t.index].toLocaleString('en-US') + ' kWh';
                },
              },
            }
          };
          this.ChartConsuLabels = datos.detalleConsumo.filter((item) => item.tipoEntidad === false).map((item) => item.medidor);
          this.ChartConsuData = [
            {
              data: datos.detalleConsumo.filter((item) => item.tipoEntidad === false).map((item) => item.Consumo),
              backgroundColor: this.backgroundColor,
            }
          ];
          this.ChartConsuType = 'doughnut';
        })
      this.visible = true;
    }
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

    const doc = new jsPDF('p', 'mm', 'letter', true);

    html2canvas(div, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
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
