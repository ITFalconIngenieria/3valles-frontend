import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MedidorService } from 'src/app/servicios/medidores.service';
import { MedidorModel } from '../../modelos/medidor';

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.css']
})
export class MedidorComponent implements OnInit {
  searchValue = '';
  visible = false;
  listofMedidor: MedidorModel[]=[];
  listOfDisplayData: MedidorModel[] = [];

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
    this.listOfDisplayData = this.listofMedidor.filter((item: MedidorModel) => (item.codigo.indexOf(this.searchValue) !== -1));
    console.log(this.listOfDisplayData);
  }

  ngOnInit(): void {
    this.medidorService.getMedidor().toPromise().then(
      (data : MedidorModel[]) => {
        this.listofMedidor=data;
        this.listOfDisplayData = [...this.listofMedidor];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
