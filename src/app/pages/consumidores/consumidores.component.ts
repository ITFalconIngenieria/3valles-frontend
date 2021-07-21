import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { EntidadModel, ColumnItem  } from 'src/app/modelos/entidad';
import { EntidadService } from 'src/app/servicios/entidad.service';
import { MedidorService } from 'src/app/servicios/medidores.service';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MedidorEntidadModel } from '../../modelos/entidad';
import { JerarquiaModel } from '../../modelos/jerarquia';
import { variableModel } from '../../modelos/medidor';

@Component({
  selector: 'app-consumidores',
  templateUrl: './consumidores.component.html',
  styleUrls: ['./consumidores.component.css']
})
export class ConsumidoresComponent implements OnInit {
  expandSet = new Set<any>();
  isVisible = false;
  isVisibleTransformacion = false;
  visibleDrawer=false;

  validateForm: FormGroup;
  validateFormMedidores: FormGroup;
  searchValue = '';
  visible = false;

  accion: string;
  accionMedidor:string;
  accionTransformacion:string;
  idMedidor:number;

  entradaEdit;
  dataEntrada;

  listofEntidad: EntidadModel[] = [];
  listOfDisplayData: EntidadModel[] = [];
  listofMedidor: MedidorEntidadModel[] = [];
  listofJerarquia: JerarquiaModel[]=[];
  listofVariableMedidor: variableModel[]=[];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.codigo.localeCompare(b.codigo),
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
    }
  ];

  constructor(
    private fb: FormBuilder,
    private entidadService: EntidadService,
    private jerarquiaService:JerarquiaService,
    private medidorService:MedidorService,
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
    this.listOfDisplayData = this.listofEntidad.filter((item: EntidadModel) => item.codigo.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
    this.accion = 'new';
    this.entidadService.getEntidad(0).toPromise().then(
      (data: EntidadModel[]) => {
        this.listofEntidad = data;
        this.listOfDisplayData = [...this.listofEntidad];
      },
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    );
    this.limpiar();
    this.limpiarMedidor();
    this.limpiarTransformacion();
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
    const observacion = (this.validateForm.value.observacion === '' || this.validateForm.value.observacion === null) ? 'N/A' : this.validateForm.value.observacion;

    this.dataEntrada = {
      codigo: this.validateForm.value.codigo,
      descripcion: this.validateForm.value.descripcion,
      tipo: (this.validateForm.value.tipo === 'true') ? true:false,
      entidad: 0,
      observacion: observacion,
      estado: true
    }

    if (this.accion === 'editar') {
      this.entidadService.putEntidad(this.entradaEdit, this.dataEntrada)
        .toPromise()
        .then((data: EntidadModel) => {
          for (const item of this.listofEntidad.filter(x => x.id === this.entradaEdit)) {
            item.codigo = this.dataEntrada.codigo;
            item.descripcion = this.dataEntrada.descripcion;
            item.tipo = this.dataEntrada.tipo;
            item.observacion = this.dataEntrada.observacion;
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
      this.entidadService.postEntidad(this.dataEntrada)
        .toPromise()
        .then(
          (data: EntidadModel) => {
            this.listofEntidad = [...this.listofEntidad, data];
            this.listOfDisplayData = [...this.listofEntidad];
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

    this.entradaEdit = data.id;
    this.validateForm = this.fb.group({
      codigo: [data.codigo, [Validators.required]],
      descripcion: [data.descripcion],
      tipo: [(data.tipo === false) ? 'false' : 'true'],
      observacion: [data.observacion]
    })
  }


  eliminar(data): void {
    this.entidadService.deleteEntidad(data.id, { estado: false })
      .toPromise()
      .then(() => {
        this.nzMessageService.success('El registro fue eliminado con éxito');
        this.listofEntidad = this.listofEntidad.filter(x => x.id !== data.id);
        this.listOfDisplayData = [...this.listofEntidad];
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
      codigo: ['', [Validators.required]],
      descripcion: [''],
      tipo:['false'],
      observacion:['']
    });
  }

  //ASIGNACION MEDIDORES
  open(data): void {
    this.visibleDrawer = true;
    this.idMedidor=data.id;

    this.entidadService.getMedidorEntidad(this.idMedidor).toPromise().then(
      (data:MedidorEntidadModel[])=>{
        this.listofMedidor=data;
      },
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    )

    this.jerarquiaService.getJerarquia().toPromise().then(
      (data:JerarquiaModel[])=>{
        this.listofJerarquia=data;
      },
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    )

    this.medidorService.getAllVariablesPME().toPromise().then(
      (data:variableModel[])=>{
        this.listofVariableMedidor=data;
      },
      (error) => {
        this.nzMessageService.warning('No se pudo conectar al servidor, revise su conexión a internet o comuníquese con el proveedor.');
        console.log(error);
      }
    )


  }

  close(): void {
    this.visibleDrawer= false;
  }

  editarMedidor(data){}

  eliminarMedidor(data){}

  handleCancelMedidor():void{
    this.visibleDrawer = false;
    this.accionMedidor = 'new';
    this.limpiarMedidor();
  }

  limpiarMedidor():void{
    this.validateFormMedidores = this.fb.group({
      variableMedidorId: [null, [Validators.required]],
      jerarquiaId: [null, [Validators.required]],
      fecha:[null],
      observacion:['']
    });
  }

  handleOkMedidor(): void {
    this.visibleDrawer = false;
  }

  //TRANSFORMACIONES
  handleCancelTransformacion():void{
    this.isVisibleTransformacion = false;
    this.accionTransformacion = 'new';
    this.limpiarTransformacion();
  }

  handleOkTransformacion(): void {
    this.isVisibleTransformacion = false;
  }

  limpiarTransformacion():void{

  }

  showModalTransformacion(): void {
    this.isVisibleTransformacion = true;
  }

  editarTransformacion(data){}


  eliminarTransformacion(data){}

}