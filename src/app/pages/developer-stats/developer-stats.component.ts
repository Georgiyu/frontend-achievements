import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    inject,
    viewChild,
} from '@angular/core';
import { GitLabApiService } from '../../../services/gitLab-api.service';
import { ActivatedRoute } from '@angular/router';
import {
    DevelopersCounOfIssuesMap,
    DevelopersEnum,
} from '../../../global/frontend-developers';
import { concatMap } from 'rxjs';

@Component({
    selector: 'app-developer-stats',
    imports: [],
    templateUrl: './developer-stats.component.html',
    styleUrl: './developer-stats.component.scss',
})
export class DeveloperStatsComponent implements AfterViewInit {
    private activatedRoute = inject(ActivatedRoute);
    gitLabApiService = inject(GitLabApiService);

    mergePageRef = viewChild<ElementRef<HTMLDivElement>>('mergePage');

    developer!: DevelopersEnum;
    isCommitsReady = false;
    isMergeReady = false;
    maxDiscussions = 0;

    readonly DevelopersCounOfIssuesMap = DevelopersCounOfIssuesMap;

    ngOnInit() {
        this.developer = this.activatedRoute.snapshot.queryParams['developer'];

        const fixDeveloper_1 = (
            this.developer === 'mikhnenkovos'
                ? 'Oleg Mikhnenkov'
                : this.developer
        ) as DevelopersEnum;

        this.gitLabApiService
            .getCommits(fixDeveloper_1)
            .subscribe(() => (this.isCommitsReady = true));

        this.gitLabApiService.getEvents(this.developer).subscribe();

        const fixDeveloper_2 = (
            this.developer === 'Serg' ? 'SerNek' : this.developer
        ) as DevelopersEnum;

        this.gitLabApiService
            .getMergeRequests(fixDeveloper_2)
            .pipe(concatMap(() => this.gitLabApiService.getMaxOfDiscussions()))
            .subscribe((max) => {
                this.maxDiscussions = max;
                this.isMergeReady = true;
            });
    }

    ngAfterViewInit(): void {
        commitBackgroundDots();
        mergeBackgroundLines();
        resolvedIssues();
        approvedMrs();
        commentedMrs();
    }
}

function commitBackgroundDots() {
    const background = document.querySelectorAll('.commit-background');

    background!.forEach((item) => {
        for (let i = 0; i < 200; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = Math.random() * window.innerWidth + 'px';
            dot.style.top = Math.random() * window.innerHeight + 'px';
            dot.style.animationDelay = Math.random() * 10 + 's';
            item.appendChild(dot);
        }
    });
}

function mergeBackgroundLines() {
    const background = document.querySelectorAll('.merge-requests-background');

    background!.forEach((item) => {
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'line';
            line.style.left = Math.random() * window.innerWidth + 'px';
            line.style.animationDelay = Math.random() * 3 + 's';
            item.appendChild(line);
        }
    });
}

function resolvedIssues() {
    const background = document.querySelectorAll('.resolved-issues-background');

    background!.forEach((item) => {
        for (let i = 0; i < 100; i++) {
            const checkmark = document.createElement('div');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✔';
            checkmark.style.left = Math.random() * window.innerWidth + 'px';
            checkmark.style.animationDelay = Math.random() * 5 + 's';
            item.appendChild(checkmark);
        }
    });
}

function approvedMrs() {
    const background = document.querySelectorAll('.my-comments-background');

    background!.forEach((item) => {
        for (let i = 0; i < 100; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * window.innerWidth + 'px';
            bubble.style.animationDelay = Math.random() * 6 + 's';
            item.appendChild(bubble);
        }
    });
}

function commentedMrs() {
    const background = document.querySelectorAll('.comments-left-background');

    background!.forEach((item) => {
        for (let i = 0; i < 50; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.style.left = Math.random() * window.innerWidth + 'px';
            square.style.top = Math.random() * window.innerHeight + 'px';
            square.style.animationDelay = Math.random() * 8 + 's';
            item.appendChild(square);
        }
    });
}
