import { Routes } from '@angular/router';
import { DeveloperStatsComponent } from './pages/developer-stats/developer-stats.component';
import { DeveloperListComponent } from './pages/developer-list/developer-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: 'stats',
        component: DeveloperStatsComponent,
    },
    {
        path: 'list',
        component: DeveloperListComponent,
    },
];
