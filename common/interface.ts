export interface IBroadcast {
    channelId: string;
    description: string;
    title: string;
    thumbnails: string;
    liveChatId: string;
    publishedAt: string;
    broadcastId: string;
    dbInfo?: any;
}

export interface IPlayer {
    channelId: string;
    displayName: string;
    additionalInfo: any;
}

export interface IPrivateBattleUserAdditionalInfo {
    inGameName: string;
    playCount: number;
    xp: number | string;
}