import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeriesSaytComponent } from './components/series-sayt/series-sayt.component';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { SeriesListItemComponent } from './components/series-list-item/series-list-item.component';
import { SeriesGraphComponent } from './components/series-graph/series-graph.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        SeriesSaytComponent,
        SeriesListComponent,
        SeriesListItemComponent,
        SeriesGraphComponent,
        MenuButtonComponent
    ],
    entryComponents: [],
    exports: [
        SeriesSaytComponent,
        SeriesListComponent,
        SeriesListItemComponent,
        SeriesGraphComponent,
        MenuButtonComponent
    ]
})
export class SharedModule { }
