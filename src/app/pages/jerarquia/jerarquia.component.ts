import { Component, OnInit } from '@angular/core';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
import { JerarquiaModel } from '../../modelos/jerarquia';

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {
  searchValue = '';
  visible = false;
  listofJerarquia: JerarquiaModel[] = [];
  listOfDisplayData: any[] = [];
  
  constructor(
    private jerarquiaService: JerarquiaService
  ) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listofJerarquia.filter((item: any) => (item.descripcion.indexOf(this.searchValue) !== -1));
  }

  ngOnInit(): void {

    this.jerarquiaService.getJerarquia().toPromise().then(
      (data : JerarquiaModel[]) => {
        this.listofJerarquia=data;
        this.listOfDisplayData = [...this.listofJerarquia];
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
