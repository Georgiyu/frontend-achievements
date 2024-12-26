import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    defer,
    EMPTY,
    expand,
    filter,
    finalize,
    forkJoin,
    iif,
    map,
    Observable,
    of,
    reduce,
    repeat,
    take,
    takeWhile,
    tap,
} from 'rxjs';
import { Commit, CommitStatistics } from '../interfaces/commit.interface';
import { DATE_SCHEME } from '../global/date-scheme';
import { Discussion } from '../interfaces/discussions.interface';
import {
    MergeRequest,
    MergeRequestStatistics,
} from '../interfaces/merge-request.interface';
import {
    DevelopersEnum,
    DevelopersIdsMap,
} from '../global/frontend-developers';
import { EventActivity, EventTypes } from '../interfaces/event-activity';

const myPrivateToken = 'glpat-uQ3o4JadTJWkiJANgK2G';
const tokenHeader = { 'PRIVATE-TOKEN': myPrivateToken };
const apiBaseUrl = 'https://polygit.polymatica.ru/api/v4/';
const baseRepoUrl = apiBaseUrl + 'projects/51/';

@Injectable({ providedIn: 'root' })
export class GitLabApiService {
    private httpClient = inject(HttpClient);

    commits = signal<Commit[]>([]);
    mergeRequests = signal<MergeRequest[]>([]);
    events = signal<EventActivity[]>([]);
    approveEvents = signal<EventActivity[]>([]);
    commentEvents = signal<EventActivity[]>([]);

    commitStatistics: CommitStatistics = {} as CommitStatistics;
    mergeRequestStatistics: MergeRequestStatistics =
        {} as MergeRequestStatistics;

    getMaxOfDiscussions(): Observable<number> {
        const requests = this.mergeRequests().map(({ iid }) =>
            this.httpClient.get<Discussion[]>(
                baseRepoUrl + 'merge_requests/' + iid + '/discussions',
                {
                    headers: tokenHeader,
                },
            ),
        );

        return forkJoin(requests).pipe(
            map((responses) => {
                const maxFromDiscussions = responses.map((discussions) =>
                    discussions
                        .filter(({ individual_note }) => !individual_note)
                        .reduce(
                            (max, { notes }) => Math.max(max, notes.length),
                            0,
                        ),
                );

                return Math.max(...maxFromDiscussions);
            }),
        );
    }

    getEvents(author: DevelopersEnum): Observable<EventActivity[]> {
        this.events.set([]);

        let page = 1;

        return defer(() => this.fetchEvents(author, page)).pipe(
            expand((events) => {
                if (events.length) {
                    this.events.update((oldevents) => [
                        ...oldevents,
                        ...events,
                    ]);

                    page++;

                    return this.fetchEvents(author, page);
                }

                return EMPTY;
            }),
            reduce(() => {
                this.approveEvents.set(
                    this.events().filter(
                        ({ action_name }) =>
                            action_name === EventTypes.Approved,
                    ),
                );
                this.commentEvents.set(
                    this.events().filter(
                        ({ action_name }) =>
                            action_name === EventTypes.CommentedOn,
                    ),
                );

                return this.events();
            }),
        );
    }

    getCommits(author: DevelopersEnum): Observable<Commit[]> {
        this.commits.set([]);

        let page = 1;

        return defer(() => this.fetchCommits(author, page)).pipe(
            expand((commits) => {
                if (commits.length) {
                    this.commits.update((oldCommits) => [
                        ...oldCommits,
                        ...commits,
                    ]);

                    page++;

                    return this.fetchCommits(author, page);
                }

                return EMPTY;
            }),
            reduce(() => {
                const firstCommit = this.commits()[this.commits().length - 1];

                this.commitStatistics = {
                    count: this.commits().length,
                    firstCommitDate: new Date(
                        firstCommit.committed_date,
                    ).toLocaleString(),
                    firstCommitTitle: firstCommit.title,
                };

                return this.commits();
            }),
        );
    }

    getMergeRequests(author: DevelopersEnum): Observable<MergeRequest[]> {
        this.mergeRequests.set([]);

        let page = 1;

        return defer(() => this.fetchMergeRequests(author, page)).pipe(
            expand((mergeRequests) => {
                if (mergeRequests.length) {
                    this.mergeRequests.update((oldMergeRequests) => [
                        ...oldMergeRequests,
                        ...mergeRequests,
                    ]);

                    page++;

                    return this.fetchMergeRequests(author, page);
                }

                return EMPTY;
            }),
            reduce(() => {
                const firstMergeRequest =
                    this.mergeRequests()[this.mergeRequests().length - 1];

                this.mergeRequestStatistics = {
                    count: this.mergeRequests().length,
                    firstMergeRequestDate: new Date(
                        firstMergeRequest.created_at,
                    ).toLocaleString(),
                    firstMergeRequestTitle: firstMergeRequest.title,
                };

                return this.mergeRequests();
            }),
        );
    }

    private fetchMergeRequests(
        author_username: DevelopersEnum,
        page: number,
    ): Observable<MergeRequest[]> {
        return this.httpClient.get<MergeRequest[]>(
            baseRepoUrl + 'merge_requests',
            {
                headers: tokenHeader,
                params: {
                    author_username,
                    page,
                    created_after: DATE_SCHEME.firstISODay,
                },
            },
        );
    }

    private fetchCommits(
        author: DevelopersEnum,
        page: number,
    ): Observable<Commit[]> {
        return this.httpClient.get<Commit[]>(
            baseRepoUrl + 'repository/commits',
            {
                headers: tokenHeader,
                params: { author, page, since: DATE_SCHEME.firstISODay },
            },
        );
    }

    private fetchEvents(
        author: DevelopersEnum,
        page: number,
    ): Observable<EventActivity[]> {
        return this.httpClient.get<EventActivity[]>(
            apiBaseUrl + `users/${DevelopersIdsMap.get(author)}/events`,
            {
                headers: tokenHeader,
                params: { page },
            },
        );
    }
}
