import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Series } from 'src/app/types/Series';


export interface IdPageParams {
  id: string;
}

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  series: Series = null;

  ready = false;
  error = false;
  private params: IdPageParams;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private loading: LoadingService,
    private toast: ToastService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: IdPageParams) => {
      if (this.params && params.id === this.params.id) { return; }
      this.params = params;
      await this.load();
    });
  }

  async load() {

    this.ready = false;
    this.error = false;
    await this.loading.load();
    try {

      this.series = await this.api.getSeriesById(parseInt(this.params.id, 10));

      this.ready = true;
    } catch (error) {
      this.error = true;
      await this.toast.showError(null, error);
    }
    await this.loading.dismiss();
  }

  async showVolumeCovers() {
    await this.alert.alert('This ain\'t ready yet', 'Yeah, no');
  }

}
