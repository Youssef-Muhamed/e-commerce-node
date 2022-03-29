import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/interfaces/data'
@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css']
})
export class AllDataComponent implements OnInit {

  isLoading=true
  data:Data[] = []
  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this._data.getData().subscribe(result=>{
      this.data = result
    },
    ()=>{

    },
    ()=>{
      this.isLoading=false
    })
  }


}
