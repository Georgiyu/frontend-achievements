import { Component, inject } from '@angular/core';
import { DATE_SCHEME } from '../../../global/date-scheme';
import { DEVELOPERS } from '../../../global/frontend-developers';
import { GitLabApiService } from '../../../services/gitLab-api.service';
import { MatButtonModule } from '@angular/material/button';
import { FrontPersonCardComponent } from '../../components/front-person-card/front-person-card.component';

@Component({
    selector: 'developer-list',
    imports: [MatButtonModule, FrontPersonCardComponent],
    templateUrl: './developer-list.component.html',
    styleUrl: './developer-list.component.scss',
})
export class DeveloperListComponent {
    readonly DATE_SCHEME = DATE_SCHEME;
    readonly DEVELOPERS = DEVELOPERS;
}
