import { notificationService } from "./notificationService";

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
    getThemeSetting: () => ThemeSetting;
    setThemeSetting: (themeSetting: ThemeSetting) => void;
    activateTheme: () => void;
}

export const themeService = ((): ThemeService => {
    const themeSettingKey = "ThemeSetting";

    const getThemeSetting = () => {
        // Return default on serverside render
        if (typeof window === "undefined") {
            return ThemeSetting.System;
        }

        // Check in local storage
        const localStorageTheme = localStorage.getItem(themeSettingKey);
        if (Object.keys(ThemeSetting).includes(localStorageTheme)) {
            return localStorageTheme as ThemeSetting;
        } else {
            return ThemeSetting.System;
        }
    }

    const getActiveTheme = () => {
        // Return default on serverside render
        if (typeof window === "undefined") {
            return ActiveTheme.Light;
        }

        // Check in local storage
        const themeSetting = getThemeSetting();
        if (themeSetting === ThemeSetting.Dark) {
            return ActiveTheme.Dark;
        } else if (themeSetting === ThemeSetting.Light) {
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
        if (Object.keys(ThemeSetting).includes(theme)) {
            localStorage.setItem(themeSettingKey, String(theme));
            notificationService.success(
                "Theme saved!",
                `Theme has been set to '${theme}'`
            );
        }
        activateTheme();
    };

    const activateTheme = () => {
        if (typeof window === "undefined") {
            // Cannot set theme during server-side rendering
            return;
        }

        const activeTheme = getActiveTheme();

        if (activeTheme === ActiveTheme.Dark) {
            window.document.body.className = "dark bg-slate-800";
        } else {
            window.document.body.className = "bg-slate-100";
        }
    };

    return {
        setThemeSetting: setThemeSetting,
        getThemeSetting: getThemeSetting,
        getActiveTheme: getActiveTheme,
        activateTheme: activateTheme
    };
})();
