import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
import { JerarquiaModel, vJerarquiaModel } from '../../modelos/jerarquia';

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {
  searchValue = '';
  visible = false;
  listofJerarquia: vJerarquiaModel[] = [];
  listOfDisplayData: vJerarquiaModel[] = [];
  
  constructor(
    private fb: FormBuilder,
    private jerarquiaService: JerarquiaService
  ) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listofJerarquia.filter((item: vJerarquiaModel) => (item.descripcion.indexOf(this.searchValue) !== -1));
    console.log(this.listOfDisplayData);
  }

  ngOnInit(): void {

    this.jerarquiaService.getVJerarquia().toPromise().then(
      (data : vJerarquiaModel[]) => {
        this.listofJerarquia=data;
        this.listOfDisplayData = [...this.listofJerarquia];
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
