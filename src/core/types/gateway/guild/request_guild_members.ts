export interface RequestGuildMembers {
    guild_id: string;
    query?: string | null;
    limit?: number | null;
    presences?: boolean | null;
    user_ids?: string[] | string | null;
    nonce?: string | null;
}