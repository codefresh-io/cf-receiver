export interface NotificationsConfig {
    debug: Boolean
    endPointBuilder: () => string,
    reconnectDelay: number
}
