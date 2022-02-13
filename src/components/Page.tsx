import { Link } from "gatsby";
import React, { FC, PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

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
    </>
    );
};
