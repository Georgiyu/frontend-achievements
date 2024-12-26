export interface Commit {
    id: string;
    short_id: string;
    created_at: string;
    parent_ids: string[];
    title: string;
    message: string;
    author_name: string;
    author_email: string;
    authored_date: string;
    committer_name: string;
    committer_email: string;
    committed_date: string;
    trailers: Record<string, string | undefined>;
    extended_trailers: Record<string, string | undefined>;
    web_url: string;
}

export interface CommitStatistics {
    count: number;
    firstCommitDate: string;
    firstCommitTitle: string;
}
