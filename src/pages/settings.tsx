import React, { FC, useState } from "react";
import { Button, Page } from "../components";
import { themeService, ThemeSetting } from "../services/themeService";

const SettingsPage: FC = () => {
    const [currentThemeSetting, setCurrentThemeSetting] = useState(themeService.getThemeSetting());

    const changeTheme = (newThemeSetting: ThemeSetting) => {
        themeService.setThemeSetting(newThemeSetting);
        setCurrentThemeSetting(newThemeSetting);
    }

    return (
        <Page headline="Settings" standfirst="Customize your experience!">
            <div className="border-slate-400 border-2 rounded-xl p-3">
                <h2 className="text-xl">Theme</h2>

                {Object.keys(ThemeSetting).map(themeSetting => (
                    <div key={themeSetting} className="mt-3">
                        <Button
                            disabled={currentThemeSetting === themeSetting}
                            text={themeSetting}
                            onClick={() => changeTheme(themeSetting as ThemeSetting)}
                        />
                    </div>
                ))}
            </div>
        </Page>
    )
}

export default SettingsPage
