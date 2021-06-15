import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MedidorService } from 'src/app/servicios/medidores.service';
import { MedidorModel, vMedidorModel } from '../../modelos/medidor';

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.css']
})
export class MedidorComponent implements OnInit {
  searchValue = '';
  visible = false;
  listofMedidor: vMedidorModel[]=[];
  listOfDisplayData: vMedidorModel[] = [];

  constructor(
    private fb:FormBuilder,
    private medidorService: MedidorService
  ) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listofMedidor.filter((item: vMedidorModel) => (item.codigo.indexOf(this.searchValue) !== -1));
    console.log(this.listOfDisplayData);
  }

  ngOnInit(): void {
    this.medidorService.getvMedidor().toPromise().then(
      (data : vMedidorModel[]) => {
        this.listofMedidor=data;
        this.listOfDisplayData = [...this.listofMedidor];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
