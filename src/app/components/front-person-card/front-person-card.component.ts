import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    input,
    viewChild,
} from '@angular/core';
import { GitLabApiService } from '../../../services/gitLab-api.service';
import {
    DevelopersCreateDateMap,
    DevelopersEnum,
    DevelopersNamesMap,
} from '../../../global/frontend-developers';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'front-person-card',
    templateUrl: './front-person-card.component.html',
    styleUrl: './front-person-card.component.scss',
    host: {
        '(click)': 'onClick()',
    },
})
export class FrontPersonCardComponent implements AfterViewInit {
    dateBlock = viewChild<ElementRef<HTMLParagraphElement>>('dateBlock');

    developer = input.required<DevelopersEnum>();

    router = inject(Router);

    readonly DevelopersNamesMap = DevelopersNamesMap;

    ngAfterViewInit(): void {
        const date = new Date(DevelopersCreateDateMap.get(this.developer())!);
        const container = this.dateBlock()?.nativeElement;

        if (container && date) startDynamicCounter(date, container);
    }

    onClick(): void {
        this.router.navigate(['.', 'stats'], {
            queryParams: { developer: this.developer() },
        });
    }
}

function startDynamicCounter(
    startDate: Date,
    timerElement: HTMLParagraphElement,
): void {
    if (!timerElement) {
        console.error('Timer element not found');
        return;
    }

    const updateCounter = () => {
        const now = new Date();
        const elapsed = now.getTime() - startDate.getTime();

        const seconds = Math.floor(elapsed / 1000) % 60;
        const minutes = Math.floor(elapsed / (1000 * 60)) % 60;
        const hours = Math.floor(elapsed / (1000 * 60 * 60)) % 24;
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

        timerElement.innerText = `${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`;
    };

    setInterval(updateCounter, 1000);
}
