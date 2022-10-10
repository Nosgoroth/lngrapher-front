import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { clearAllMockGenerators } from 'src/app/types/MockGenerator';
import { Series } from 'src/app/types/Series';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  seriesResults: Array<Series> = null;
  searching = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  async onSearchChange($event: any) {
    if (!$event?.detail?.value) {
      this.seriesResults = null;
      return;
    }
    this.searching = true;
    this.seriesResults = await this.api.getSeriesBySearchString($event?.detail?.value);
    this.searching = false;
  }

  regenerateMocks() {
    clearAllMockGenerators();
    this.onSearchChange({detail: { value: 'qwe'}});
  }

}
