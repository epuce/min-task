export interface AppConfig extends Window {
    user: string,
    user_permissions: string[]
}

export class AppConfig {
    get getConfig() {
        return window as AppConfig;
    }
}
