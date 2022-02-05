import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import { ThemeSetting, ActiveTheme, themeService } from "../services/themeService";

export interface Seo {
    title?: string;
}

export interface PageProps {
    children: JSX.Element | JSX.Element[];
    headline: string;
    standfirst?: string;
    subhead?: string;
    seo?: Seo;
}

export const Page: FC<PageProps> = (props) => {
    const [activeTheme, setActiveTheme] = useState(themeService.getActiveTheme());

    const darkBody = <body className="dark bg-slate-800" />;
    const lightBody = <body className="bg-slate-100" />;

    let title = props.headline;

    if (!!props.seo) {
        title = props.seo.title || title;
    }

    return (
        <div>
            {/* Helmet */}
            <Helmet>
                {activeTheme === ActiveTheme.Dark ? darkBody : lightBody}
                <title>{title}</title>
            </Helmet>

            {/* Header */}
            <header className="bg-primary-500 dark:bg-primary-700 p-2 px-10">
                <div className="container mx-auto">
                    {Object.keys(ThemeSetting).map((themeSetting, index) => (
                        <button
                            key={index}
                            className="
                                mr-5
                                text-slate-800
                                hover:text-slate-900
                                dark:text-slate-300
                                dark:hover:text-slate-400
                                font-semibold
                                transition-colors
                                duration-300"
                            onClick={() => setActiveTheme(themeService.setThemeSetting(themeSetting as ThemeSetting))}>{themeSetting}</button>
                    ))}
                </div>
            </header>

            {/* Main */}
            <main className="bg-slate-100 dark:bg-slate-800 p-10">
                <div className="container mx-auto">
                    <div className="mb-2">
                        {!props.standfirst ? null : (
                            <p className="mb-2 text-sm leading-6 font-semibold text-primary-500">
                                {props.standfirst}
                            </p>
                        )}

                        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                            {props.headline}
                        </h1>
                    </div>


                    {!props.subhead ? null : (
                        <p className="mb-2 text-lg text-slate-700 dark:text-slate-400 font-semibold">
                            {props.subhead}
                        </p>
                    )}

                    <hr className="border-primary-500 my-5" />

                    <div className="text-slate-800 dark:text-slate-200">
                        {props.children}
                    </div>
                </div>
            </main>
        </div>
    );
};
