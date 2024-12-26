export interface MergeRequest {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    imported: boolean;
    imported_from: string;
    merged_by?: DeprecatedUser; // Поле устарело, используйте merge_user
    merge_user: User;
    merged_at: string;
    merge_after: string;
    prepared_at: string;
    closed_by?: any;
    closed_at?: any;
    created_at: string;
    updated_at: string;
    target_branch: string;
    source_branch: string;
    upvotes: number;
    downvotes: number;
    author: User;
    assignee: User;
    assignees: User[];
    reviewers: User[];
    source_project_id: number;
    target_project_id: number;
    labels: string[];
    draft: boolean;
    work_in_progress: boolean;
    milestone?: Milestone;
    merge_when_pipeline_succeeds: boolean;
    merge_status: string;
    detailed_merge_status: string;
    sha: string;
    merge_commit_sha?: string;
    squash_commit_sha?: string;
    user_notes_count: number;
    discussion_locked?: boolean;
    should_remove_source_branch: boolean;
    force_remove_source_branch: boolean;
    allow_collaboration: boolean;
    allow_maintainer_to_push: boolean;
    web_url: string;
    references: References;
    time_stats: TimeStats;
    squash: boolean;
    task_completion_status: TaskCompletionStatus;
}

export interface DeprecatedUser {
    id: number;
    name: string;
    username: string;
    state: string;
    avatar_url?: string;
    web_url: string;
}

export interface User extends DeprecatedUser {}

export interface Milestone {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    due_date: string;
    start_date: string;
    web_url: string;
}

export interface References {
    short: string;
    relative: string;
    full: string;
}

export interface TimeStats {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate?: string;
    human_total_time_spent?: string;
}

export interface TaskCompletionStatus {
    count: number;
    completed_count: number;
}

export interface MergeRequestStatistics {
    count: number;
    firstMergeRequestDate: string;
    firstMergeRequestTitle: string;
}
