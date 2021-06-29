import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedidorService } from 'src/app/servicios/medidores.service';
import { MedidorModel, ColumnItem, PMEMedidorModel, RolloverModel, variableModel } from '../../modelos/medidor';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.css']
})
export class MedidorComponent implements OnInit {
  expandSet = new Set<any>();
  isVisible = false;
  isVisibleRollover = false;
  validateForm: FormGroup;
  validateFormRollover: FormGroup;
  searchValue = '';
  visible = false;
  accion: string;
  permiso: any;
  idMedidor
  idRollover;
  codigoMedidor;
  medidorEdit;
  dataMedidor;

  listofMedidor: MedidorModel[] = [];
  listOfDisplayData: MedidorModel[] = [];
  listOfPME: PMEMedidorModel[] = [];
  listOfVariable: variableModel[] = [];
  listOfDataRollover: RolloverModel[] = [];
  listOfDataRolloverMedidor: RolloverModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.sourceId - b.sourceId,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Tipo',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.tipo - b.tipo,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Disponible',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.estado - b.estado,
      sortDirections: ['ascend', 'descend', null],
    }
  ];

  constructor(
    private fb: FormBuilder,
    private medidorService: MedidorService,
    private nzMessageService: NzMessageService
  ) { }

  onExpandChange(id: any, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listofMedidor.filter((item: MedidorModel) => item.descripcion.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
    this.accion = 'new';
    this.medidorService.getMedidor().toPromise().then(
      (data: MedidorModel[]) => {
        this.listofMedidor = data;
        this.listOfDisplayData = [...this.listofMedidor];
      },
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    );

    this.medidorService.getMedidorPME().toPromise().then(
      (data: PMEMedidorModel[]) => this.listOfPME = data,
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    );

    this.medidorService.getRollover().toPromise().then(
      (data: RolloverModel[])=> this.listOfDataRollover =data,
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    );

    this.limpiar();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.accion = 'new';
    this.limpiar();
  }

  handleOk(): void {
    this.isVisible = false;
  }

  guardar(): void {
    this.dataMedidor = {
      sourceId: (this.validateForm.value.sourceId === null || this.validateForm.value.sourceId === undefined) ? 0 : this.validateForm.value.sourceId,
      descripcion: (this.validateForm.value.descripcion === '' || this.validateForm.value.descripcion === undefined) ? 'N/A' : this.validateForm.value.descripcion,
      lecturaMax: (this.validateForm.value.lecturaMax === null || this.validateForm.value.lecturaMax === undefined) ? '0' : this.validateForm.value.lecturaMax + '',
      multiplicador: (this.validateForm.value.multiplicador === null || this.validateForm.value.multiplicador === undefined) ? '1' : this.validateForm.value.multiplicador + '',
      observacion: (this.validateForm.value.observacion === null || this.validateForm.value.observacion === '' || this.validateForm.value.observacion === undefined) ? 'N/A' : this.validateForm.value.observacion,
      tipo: (this.validateForm.value.tipo === 'true') ? true : false,
      estado: true
    }

    if (this.accion === 'editar') {
      this.medidorService.putMedidor(this.medidorEdit, this.dataMedidor)
        .toPromise()
        .then((data: MedidorModel) => {
          for (const item of this.listofMedidor.filter(x => x.id === this.medidorEdit)) {
            item.sourceId = this.dataMedidor.sourceId;
            item.descripcion = this.dataMedidor.descripcion;
            item.lecturaMax = this.dataMedidor.lecturaMax;
            item.multiplicador = this.dataMedidor.multiplicador;
            item.observacion = this.dataMedidor.observacion;
            item.tipo = this.dataMedidor.tipo;
            item.estado = this.dataMedidor.estado;
          }
          this.accion = 'new';
          this.limpiar();
          this.isVisible = false;
          this.nzMessageService.success('El registro fue guardado con éxito');
        },
          (error) => {
            this.nzMessageService.warning('El registro no pudo ser guardado, por favor intente de nuevo o contactese con su administrador');
            console.log(error);
            this.limpiar();
            this.accion = 'new';
            this.isVisible = false;
          }
        )
    } else {
      this.medidorService.postMedidor(this.dataMedidor)
        .toPromise()
        .then((data: MedidorModel) => {
          this.listofMedidor = [...this.listofMedidor, data];
          this.listOfDisplayData = [...this.listofMedidor];
          this.nzMessageService.success('El registro fue guardado con éxito');
        },
          (error) => {
            this.nzMessageService.warning('El registro no pudo ser guardado, por favor intente de nuevo o contactese con su administrador');
            console.log(error);
            this.limpiar();
          }
        )
    }
    this.isVisible = false;
  }

  editar(data): void {
    this.accion = 'editar';
    this.isVisible = true;
    this.medidorEdit = data.id;
    this.validateForm = this.fb.group({
      sourceId: [data.sourceId, [Validators.required]],
      descripcion: [data.descripcion],
      lecturaMax: [data.lecturaMax],
      multiplicador: [data.multiplicador],
      observacion: [data.observacion],
      tipo: [(data.tipo === false) ? 'false' : 'true']
    })
  }

  eliminar(data): void {
    this.medidorService.deleteMedidor(data.id, { estado: false })
      .toPromise()
      .then(() => {
        this.nzMessageService.success('El registro fue eliminado con éxito');
        this.listofMedidor = this.listofMedidor.filter(x => x.id !== data.id);
        this.listOfDisplayData = [...this.listofMedidor];
      }, (error) => {
        this.nzMessageService.warning('El registro no pudo ser eleminado, por favor intente de nuevo o contactese con su administrador');
        console.log(error);
      })
  }

  cancel(): void {
    this.nzMessageService.info('Su registro sigue activo');
  }

  limpiar() {
    this.validateForm = this.fb.group({
      sourceId: [null, [Validators.required]],
      descripcion: [''],
      lecturaMax: [null],
      multiplicador: [null],
      observacion: [''],
      tipo: ['true']
    });
  }

  //ROLLOVER

  showModalRollover(data): void {
    this.isVisibleRollover = true;
    this.codigoMedidor = data.sourceId + ' - ' + data.descripcion;
    this.idMedidor = data.id;
    this.listOfDataRolloverMedidor = this.listOfDataRollover.filter(x => x.medidorId === this.idMedidor);

    this.medidorService.getVariablesPME(this.idMedidor).toPromise().then(
      (data: variableModel[]) => {
        this.listOfVariable = data;
      },
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    );
  }

  handleCancelRollover(): void {
    this.accion = 'new';
    this.isVisibleRollover = false;
    this.limpiarRollover();
  }

  handleOkRollover(): void {
    this.limpiarRollover()
    this.isVisibleRollover = false;
  }

  limpiarRollover() {
    this.validateFormRollover = this.fb.group({
      fecha: [null, [Validators.required]],
      variableMedidorId: [null, [Validators.required]],
      lecturaAnterior: [0, [Validators.required]],
      lecturaNueva: [0, [Validators.required]],
      observacion: ['']
    });
  }

  guardarRollover() {
    /* tslint:disable-next-line: max-line-length
    const observacion = (this.validateForm.value.observacion === '' || this.validateForm.value.observacion === null) ? 'N/A' : this.validateForm.value.observacion;
    // this.validateForm.value.fecha = moment(this.validateForm.value.fecha).format('YYYY-MM-DD HH:mm:ss')
    const dataRollover = {
      medidorId: this.idMedidor,
      fecha: moment(this.validateForm.value.fecha).toISOString(),
      energia: (this.validateForm.value.energia === 'false') ? false : true,
      lecturaAnterior: `${this.validateForm.value.lecturaAnterior}`,
      lecturaNueva: `${this.validateForm.value.lecturaNueva}`,
      observacion,
      estado: true
    };

    if (this.accion === 'editar') {
      this.medidoresService.putRollovers(this.idRollover, dataRollover)
        .toPromise()
        .then(
          () => {

            this.ShowNotification(
              'success',
              'Guardado con éxito',
              'El registro fue guardado con éxito'
            );
            for (const item of this.listOfDataRolloverMedidor.filter(x => x.id === this.idRollover)) {
              item.medidorId = dataRollover.medidorId;
              item.fecha = dataRollover.fecha;
              item.energia = dataRollover.energia;
              item.lecturaAnterior = dataRollover.lecturaAnterior;
              item.lecturaNueva = dataRollover.lecturaNueva;
              item.observacion = dataRollover.observacion;
              item.estado = dataRollover.estado;
            }
            for (const item of this.listOfDataRollover.filter(x => x.id === this.idRollover)) {
              item.medidorId = dataRollover.medidorId;
              item.fecha = dataRollover.fecha;
              item.energia = dataRollover.energia;
              item.lecturaAnterior = dataRollover.lecturaAnterior;
              item.lecturaNueva = dataRollover.lecturaNueva;
              item.observacion = dataRollover.observacion;
              item.estado = dataRollover.estado;
            }

            this.accion = 'new';
            this.limpiarRollover();

          },
          (error) => {
            this.ShowNotification(
              'error',
              'No se pudo guardar',
              'El registro no pudo ser guardado, por favor revise los datos ingresados sino comuníquese con el proveedor.'
            );
            this.accion = 'new';
            this.limpiarRollover();
            console.log(error);

          }
        );
    } else {
      this.medidoresService.postRollovers(dataRollover)
        .toPromise()
        .then(
          (data: any) => {

            this.ShowNotification(
              'success',
              'Guardado con éxito',
              'El registro fue guardado con éxito'
            );
            this.listOfDataRolloverMedidor = [...this.listOfDataRolloverMedidor,
            {
              energia: data.energia,
              estado: data.estado,
              fecha: data.fecha,
              id: data.id,
              lecturaAnterior: data.lecturaAnterior,
              lecturaNueva: data.lecturaNueva,
              medidorId: data.medidorId,
              observacion: data.observacion
            }];
            this.listOfDataRollover = [...this.listOfDataRollover,
            {
              energia: data.energia,
              estado: data.estado,
              fecha: data.fecha,
              id: data.id,
              lecturaAnterior: data.lecturaAnterior,
              lecturaNueva: data.lecturaNueva,
              medidorId: data.medidorId,
              observacion: data.observacion
            }];
            this.limpiarRollover();

          },
          (error) => {
            this.ShowNotification(
              'error',
              'No se pudo guardar',
              'El registro no pudo ser guardado, por favor revise los datos ingresados sino comuníquese con el proveedor.'
            );
            this.limpiarRollover();
            console.log(error);
          }
        );
    }*/
  }

  editarRollover(data) {
    this.idRollover = data.id;
    this.accion = 'editar';
    this.validateFormRollover = this.fb.group({
      fecha: [data.fecha],
      variableMedidorId: [data.variableMedidorId],
      lecturaAnterior: [data.lecturaAnterior],
      lecturaNueva: [data.lecturaNueva],
      observacion: [data.observacion]
    });
  }

  eliminarRollover(data) {
    this.medidorService.deleteRollover(data.id, { estado: false })
      .toPromise()
      .then(
        () => {
          this.nzMessageService.success('El registro fue eliminado con éxito');
          this.listOfDataRolloverMedidor = this.listOfDataRolloverMedidor.filter(x => x.id !== data.id);
          this.listOfDataRollover = this.listOfDataRollover.filter(x => x.id !== data.id);
        },
        (error) => {
          this.nzMessageService.warning('El registro no pudo ser eleminado, por favor intente de nuevo o contactese con su administrador');
          console.log(error);
        }
      );
  }
}
