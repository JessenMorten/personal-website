export enum ThemeSetting {
    Dark = "Dark",
    Light = "Light",
    System = "System"
}

export enum ActiveTheme {
    Dark = "Dark",
    Light = "Light"
}

export interface ThemeService {
    getActiveTheme: () => ActiveTheme;
    setThemeSetting: (themeSetting: ThemeSetting) => ActiveTheme;
}

export const themeService = ((): ThemeService => {
    const themeKey = "theme";

    const getActiveTheme = () => {
        // Return default on serverside render
        if (typeof window === "undefined") {
            return ActiveTheme.Light;
        }

        // Check in local storage
        const localStorageTheme = localStorage.getItem(themeKey);
        if (localStorageTheme === ThemeSetting.Dark) {
            return ActiveTheme.Dark;
        } else if (localStorageTheme === ThemeSetting.Light) {
            return ActiveTheme.Light;
        }

        // Check if system prefers dark
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return ActiveTheme.Dark;
        }

        // Return default
        return ActiveTheme.Light;
    };

    const setThemeSetting = (theme: ThemeSetting) => {
        localStorage.setItem(themeKey, String(theme));
        return getActiveTheme();
    };

    return {
        getActiveTheme: getActiveTheme,
        setThemeSetting: setThemeSetting
    };
})();
