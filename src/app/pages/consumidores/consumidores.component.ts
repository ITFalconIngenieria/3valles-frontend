import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EntidadModel } from 'src/app/modelos/entidad';
import { EntidadService } from 'src/app/servicios/entidad.service';

@Component({
  selector: 'app-consumidores',
  templateUrl: './consumidores.component.html',
  styleUrls: ['./consumidores.component.css']
})
export class ConsumidoresComponent implements OnInit {
  searchValue = '';
  visible = false;
  listofEntidad: EntidadModel[] = [];
  listOfDisplayData: EntidadModel[] = [];

  constructor(
    private fb: FormBuilder,
    private entidadService: EntidadService
  ) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listofEntidad.filter((item: EntidadModel) => (item.descripcion.indexOf(this.searchValue) !== -1));
    console.log(this.listOfDisplayData);
  }


  ngOnInit(): void {
    this.entidadService.getEntidad(0).toPromise().then(
      (data: EntidadModel[]) => {
        this.listofEntidad = data;
        this.listOfDisplayData = [...this.listofEntidad];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

