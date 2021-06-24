import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedidorService } from 'src/app/servicios/medidores.service';
import { MedidorModel, ColumnItem } from '../../modelos/medidor';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.css']
})
export class MedidorComponent implements OnInit {
  expandSet = new Set<any>();
  isVisible = false;
  validateForm: FormGroup;
  searchValue = '';
  visible = false;
  accion: string;

  medidorEdit;
  Datamedidor;

  listofMedidor: MedidorModel[]=[];
  listOfDisplayData: MedidorModel[] = [];

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
      sortFn: (a: any, b: any) => a.tipo-b.tipo,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Disponible',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.estado-b.estado,
      sortDirections: ['ascend', 'descend', null],
    }
  ];

  constructor(
    private fb:FormBuilder,
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
      (data : MedidorModel[]) => {
        this.listofMedidor=data;
        this.listOfDisplayData = [...this.listofMedidor];
      },
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

  guardar():void {

  }

  editar(data): void {
    this.accion = 'editar';
    this.isVisible = true;
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
      descripcion: ['', [Validators.required]],
      dependenciaId: [null],
    });
  }
}
