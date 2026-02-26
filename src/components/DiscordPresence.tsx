import { useEffect, useState, createContext, useContext } from 'react';

const USER_ID = '413216233530327042';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpotifyData {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
    track_id: string;
}

interface Activity {
    id: string;
    name: string;
    type: 0 | 1 | 2 | 3 | 4 | 5;
    details?: string;
    state?: string;
    application_id?: string;
    assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
    };
    timestamps?: { start?: number; end?: number };
}

interface LanyardData {
    discord_user: {
        id: string;
        username: string;
        display_name: string;
        avatar: string;
        discriminator: string;
    };
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Activity[];
    listening_to_spotify: boolean;
    spotify: SpotifyData | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
    online: '#23a559',
    idle: '#f0b232',
    dnd: '#f23f43',
    offline: '#80848e',
};

const STATUS_LABELS: Record<string, string> = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
};

// ─── Shared data context ──────────────────────────────────────────────────────

const LanyardCtx = createContext<LanyardData | null>(null);

export function LanyardProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<LanyardData | null>(null);

    useEffect(() => {
        let cancelled = false;
        const fetch_ = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
                const json = await res.json();
                if (!cancelled && json.success) setData(json.data);
            } catch { /* silent */ }
        };
        fetch_();
        const id = setInterval(fetch_, 30_000);
        return () => { cancelled = true; clearInterval(id); };
    }, []);

    return <LanyardCtx.Provider value={data}>{children}</LanyardCtx.Provider>;
}

function useLanyard() { return useContext(LanyardCtx); }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAssetUrl(image: string, applicationId?: string): string {
    if (!image) return '';
    if (image.startsWith('spotify:'))
        return `https://i.scdn.co/image/${image.replace('spotify:', '')}`;
    if (image.startsWith('mp:external/'))
        return `https://media.discordapp.net/external/${image.replace('mp:external/', '')}`;
    if (applicationId)
        return `https://cdn.discordapp.com/app-assets/${applicationId}/${image}.png`;
    return image;
}

function formatMs(ms: number): string {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
}

function formatElapsed(start: number): string {
    const diffS = Math.floor((Date.now() - start) / 1000);
    const h = Math.floor(diffS / 3600);
    const m = Math.floor((diffS % 3600) / 60);
    const s = diffS % 60;
    return h > 0
        ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} elapsed`
        : `${m}:${String(s).padStart(2, '0')} elapsed`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SpotifyCard({ spotify }: { spotify: SpotifyData }) {
    const [progress, setProgress] = useState(0);
    const [elapsed, setElapsed] = useState('0:00');

    useEffect(() => {
        const update = () => {
            const { start, end } = spotify.timestamps;
            const total = end - start;
            const current = Date.now() - start;
            setProgress(Math.min((current / total) * 100, 100));
            setElapsed(formatMs(current));
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [spotify]);

    const total = formatMs(spotify.timestamps.end - spotify.timestamps.start);

    return (
        <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
                <img src={spotify.album_art_url} alt={spotify.album}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center border-2 border-neutral-900">
                    <svg className="w-3 h-3 fill-black" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#1DB954] uppercase tracking-wider mb-0.5">Listening to Spotify</p>
                <p className="text-sm font-semibold text-white truncate leading-tight">{spotify.song}</p>
                <p className="text-xs text-neutral-400 truncate leading-tight mt-0.5">by {spotify.artist}</p>
                <p className="text-xs text-neutral-500 truncate leading-tight">on {spotify.album}</p>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-neutral-600 flex-shrink-0">{elapsed}</span>
                    <div className="flex-1 h-1 bg-neutral-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1DB954] rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[10px] text-neutral-600 flex-shrink-0">{total}</span>
                </div>
            </div>
        </div>
    );
}

function ActivityCard({ activity }: { activity: Activity }) {
    const [elapsed, setElapsed] = useState('');

    useEffect(() => {
        if (!activity.timestamps?.start) return;
        const update = () => setElapsed(formatElapsed(activity.timestamps!.start!));
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [activity.timestamps?.start]);

    const largeImg = activity.assets?.large_image
        ? getAssetUrl(activity.assets.large_image, activity.application_id) : '';
    const smallImg = activity.assets?.small_image
        ? getAssetUrl(activity.assets.small_image, activity.application_id) : '';

    return (
        <div className="flex items-start gap-3">
            {largeImg && (
                <div className="relative flex-shrink-0">
                    <img src={largeImg} alt={activity.assets?.large_text || activity.name}
                        className="w-14 h-14 rounded-lg object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    {smallImg && (
                        <img src={smallImg} alt={activity.assets?.small_text || ''}
                            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-neutral-900 object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    )}
                </div>
            )}
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-0.5">Playing a Game</p>
                <p className="text-sm font-semibold text-white truncate leading-tight">{activity.name}</p>
                {activity.details && <p className="text-xs text-neutral-400 truncate leading-tight mt-0.5">{activity.details}</p>}
                {activity.state && <p className="text-xs text-neutral-500 truncate leading-tight">{activity.state}</p>}
                {elapsed && <p className="text-xs text-neutral-600 mt-1">{elapsed}</p>}
            </div>
        </div>
    );
}

// ─── Exported: small avatar badge (top-left of home card) ────────────────────

export function DiscordAvatarTrigger({ onClick }: { onClick: () => void }) {
    const data = useLanyard();
    if (!data) return null;

    const statusColor = STATUS_COLORS[data.discord_status] || STATUS_COLORS.offline;
    const avatarUrl = `https://cdn.discordapp.com/avatars/${USER_ID}/${data.discord_user.avatar}.png?size=64`;

    return (
        <button
            onClick={onClick}
            title="Discord presence"
            className="relative group flex-shrink-0"
            style={{ willChange: 'transform', transition: 'transform 0.15s ease-out' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        >
            <img
                src={avatarUrl}
                alt={data.discord_user.display_name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-700"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* status dot */}
            <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-neutral-900"
                style={{ backgroundColor: statusColor }}
            />
        </button>
    );
}

// ─── Exported: full presence panel (inside DraggableWindow) ──────────────────

export function DiscordPresenceContent() {
    const data = useLanyard();
    if (!data) {
        return (
            <p className="text-sm text-neutral-500 text-center py-4">Loading presence…</p>
        );
    }

    const statusColor = STATUS_COLORS[data.discord_status] || STATUS_COLORS.offline;
    const statusLabel = STATUS_LABELS[data.discord_status] || 'Offline';
    const avatarUrl = `https://cdn.discordapp.com/avatars/${USER_ID}/${data.discord_user.avatar}.png?size=128`;

    const gameActivities = data.activities.filter(
        (a) => a.type === 0 && a.id !== 'spotify:1'
    );
    const hasContent = data.listening_to_spotify || gameActivities.length > 0;

    return (
        <div className="flex flex-col gap-4 pb-2">
            {/* Profile header */}
            <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                    <img
                        src={avatarUrl}
                        alt={data.discord_user.display_name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-neutral-700"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-neutral-900"
                        style={{ backgroundColor: statusColor }}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-white leading-tight">
                        {data.discord_user.display_name}
                    </p>
                    <p className="text-xs text-neutral-500 leading-tight">
                        @{data.discord_user.username}
                    </p>
                </div>
                {/* Status pill */}
                <span
                    className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${statusColor}22`, color: statusColor }}
                >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                    {statusLabel}
                </span>
            </div>

            {/* Divider */}
            {hasContent && <div className="border-t border-neutral-800" />}

            {/* Game activities */}
            {gameActivities.map((act) => (
                <ActivityCard key={act.id} activity={act} />
            ))}

            {/* Separator between game + spotify */}
            {gameActivities.length > 0 && data.listening_to_spotify && (
                <div className="border-t border-neutral-800" />
            )}

            {/* Spotify */}
            {data.listening_to_spotify && data.spotify && (
                <SpotifyCard spotify={data.spotify} />
            )}

            {/* Empty state */}
            {!hasContent && (
                <p className="text-xs text-neutral-600 text-center py-2">No activity right now.</p>
            )}
        </div>
    );
}
