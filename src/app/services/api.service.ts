import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Series, seriesMock } from '../types/Series';
import { SeriesCategory } from '../types/SeriesCategory';
import { SeriesLanguage } from '../types/SeriesLanguage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get mock(): boolean {
    return !!environment.mockData;
  }

  async getAllSeries(): Promise<Array<Series>> {
    if (this.mock) { return seriesMock.multiple(20); }
    return null;
  }

  async getSeriesBySearchString(searchString: string): Promise<Array<Series>> {
    if (this.mock) { return seriesMock.multiple(10); }
    return [
      { id: 1, title: 'Test', language: SeriesLanguage.english, category: SeriesCategory.lightNovel, }
    ];
  }

  async getSeriesById(id: number): Promise<Series> {
    if (this.mock) { return seriesMock.single(`${id}`); }
    return null;
  }

}
