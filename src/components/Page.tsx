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
                <NavLink to="/settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
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
