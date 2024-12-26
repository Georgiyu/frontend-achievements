export interface EventActivity {
    id: number;
    project_id: number;
    action_name: EventTypes;
    target_id: number;
    target_iid: number;
    target_type: string;
    author_id: number;
    target_title: string;
    created_at: string;
    note: Note;
    author: User;
    imported: boolean;
    imported_from: string;
    author_username: string;
}

export interface Note {
    id: number;
    type: string;
    body: string;
    attachment?: any;
    author: User;
    created_at: string;
    updated_at: string;
    system: boolean;
    noteable_id: number;
    noteable_type: string;
    project_id: number;
    commit_id?: any;
    position: Position;
    resolvable: boolean;
    resolved: boolean;
    resolved_by?: User | null;
    resolved_at?: string | null;
    confidential: boolean;
    internal: boolean;
    imported: boolean;
    imported_from: string;
    noteable_iid: number;
    commands_changes: CommandsChanges;
}

export interface User {
    id: number;
    username: string;
    name: string;
    state: string;
    locked: boolean;
    avatar_url: string;
    web_url: string;
}

export interface Position {
    base_sha: string;
    start_sha: string;
    head_sha: string;
    old_path: string;
    new_path: string;
    position_type: string;
    old_line?: number | null;
    new_line: number;
    line_range: LineRange;
}

export interface LineRange {
    start: Line;
    end: Line;
}

export interface Line {
    line_code: string;
    type: string;
    old_line?: number | null;
    new_line: number;
}

export interface CommandsChanges {
    [key: string]: any;
}

export enum EventTypes {
    CommentedOn = 'commented on',
    PushedTo = 'pushed to',
    Approved = 'approved',
}
