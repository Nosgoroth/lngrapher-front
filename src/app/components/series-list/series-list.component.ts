import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Series } from 'src/app/types/Series';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss'],
})
export class SeriesListComponent implements OnInit {

  @Input() series: Array<Series> = [];

  constructor(private router: Router) { }

  ngOnInit() {}

  openSeriesPage(item: Series) {
    this.router.navigateByUrl('/series/' + item.id);
  }

}
