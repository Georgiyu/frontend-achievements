export interface Discussion {
    id: string;
    individual_note: boolean;
    notes: Note[];
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
    resolved_by: User;
    resolved_at: string;
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
    old_line?: any;
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
    old_line?: any;
    new_line: number;
}

export interface CommandsChanges {
    [key: string]: any; // Dynamic structure for future expansion
}
