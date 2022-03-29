import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-single-data',
  templateUrl: './single-data.component.html',
  styleUrls: ['./single-data.component.css']
})
export class SingleDataComponent implements OnInit {
  data:any = {}
  status = 0

  constructor(private _data:DataService, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._data.getDataSingle(this._route.snapshot.params["id"]).subscribe(result=>{
      this.data = result
    },
    ()=>{
      this.status=1
    },
    ()=>{
      this.status=2
    })
  }


}
