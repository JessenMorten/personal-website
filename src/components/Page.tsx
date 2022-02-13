import { Link } from "gatsby";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Notification, notificationService, NotificationType } from "../services/notificationService";

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

const NavLink: FC<PropsWithChildren<{ to: string }>> = (props) => {
    return <Link
        to={props.to}
        activeClassName="shadow bg-slate-200 dark:bg-slate-700"
        className="
            p-3
            rounded-xl
            text-sm
            font-medium
            text-slate-800
            dark:text-slate-100
            hover:text-slate-900
            dark:hover:text-white">{props.children}</Link>;
};

export const Page: FC<PageProps> = (props) => {
    // Setup notifications
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const notificationObserver = { handle: setNotifications };
    useEffect(() => {
        notificationService.subscribe(notificationObserver);

        return () => {
            notificationService.unsubscribe(notificationObserver);
        };
    }, []);

    // Setup SEO
    let title = props.headline;
    if (!!props.seo) {
        title = props.seo.title || title;
    }

    return (<>
        {/* Helmet */}
        <Helmet>
            <title>{title}</title>
        </Helmet>

        {/* New header */}
        <header className="
                sm:mt-10
                sm:mx-10
                mb-10
                py-3
                px-6
                sm:rounded-xl
                shadow-xl
                flex
                flex-wrap
                justify-between
                items-center
                sm:border-t-2
                sm:border-x-2
                border-b-2
                border-primary-500
                bg-white
                dark:bg-slate-900
                dark:shadow-md
                dark:shadow-primary-700
            ">
            <Link to="/" className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="hover:animate-spin -ml-1 mr-3 h-10 text-primary-500" viewBox="0 0 16 16">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0-1a8 8 0 1 1 0 16A8 8 0 0 1 8 0z" />
                    <path d="M4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5z" />
                </svg>
                <span className="hover:animate-pulse hidden sm:block self-center text-lg font-semibold whitespace-nowrap dark:text-white">mortenjessen.dk</span>
            </Link>
            <nav className="flex flex-row space-x-6">
                <NavLink to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                </NavLink>
                <NavLink to="/apps">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                    </svg>
                </NavLink>
                <NavLink to="/settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                </NavLink>
            </nav>
        </header>

        {/* Main */}
        <main className="animate-fade-in bg-slate-100 dark:bg-slate-800 py-3 px-10 sm:px-16">
            <div className="mb-2">
                {!props.standfirst ? null : (
                    <p className="mb-2 text-sm leading-6 font-semibold text-primary-500">
                        <i>
                            {props.standfirst}
                        </i>
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

            <div className="text-slate-800 dark:text-slate-200 mt-3">
                {props.children}
            </div>
        </main>

        {/* Notifications */}
        <div className="fixed bottom-10 right-10 left-10 sm:left-auto">
            {notifications.map(n => (
                <div key={n.id}>
                    <div className="mt-3 sm:w-96 mx-auto p-3 flex items-center bg-white dark:bg-slate-900 rounded-xl shadow-lg space-x-4">
                        <div className="shrink-0">
                            {n.type !== NotificationType.Information ? null : (
                                <svg className="text-blue-500 w-4 h-4 sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </svg>
                            )}

                            {n.type !== NotificationType.Success ? null : (
                                <svg className="text-green-500 w-4 h-4 sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            )}

                            {n.type !== NotificationType.Warning ? null : (
                                <svg className="text-yellow-500 w-4 h-4 sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            )}

                            {n.type !== NotificationType.Error ? null : (
                                <svg className="text-red-500 w-4 h-4 sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                              </svg>
                            )}

                        </div>
                        <div>
                            <div className="sm:text-lg font-medium sm:font-bold text-slate-900 dark:text-white">{n.title}</div>
                            <p className="text-sm sm:text-base text-slate-500 dark:text-white">{n.message}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
};
