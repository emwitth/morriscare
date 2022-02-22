import { Component, OnInit } from '@angular/core';
import { CareTaker } from '../interfaces/CareTaker';
import { Roles } from 'src/app/global-variables';
import { ApiModule } from '../modules/api/api.module';

@Component({
  selector: 'app-ct-manage',
  templateUrl: './ct-manage.component.html',
  styleUrls: ['./ct-manage.component.css']
})
export class CtManageComponent implements OnInit {
  careTakers: Array<CareTaker> = new Array<CareTaker>();

  constructor(private api: ApiModule) { }

  ngOnInit(): void {
    // get care takers from back end
    this.careTakers = this.api.getUnregisteredCTs();
    console.log(this.careTakers);
  }

  openApproveDialog(first: string, last: string, id: string) {
    
  }

}
