import React, { FC } from "react";

export interface PageProps {
    children: JSX.Element | JSX.Element[];
    header: string;
    area?: string;
    subHeader?: string;
}

export const Page: FC<PageProps> = (props) => {

    return (
        <div className="container mx-auto p-5">
            <header className="mb-10">
                <div className="mb-2">
                    {!props.area ? null : (
                        <p className="mb-2 text-sm leading-6 font-semibold text-primary-500">
                            {props.area}
                        </p>
                    )}

                    <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {props.header}
                    </h1>
                </div>

                {!props.subHeader ? null : (
                    <p className="mt-2 text-lg text-slate-600 font-semibold">
                        {props.subHeader}
                    </p>
                )}
            </header>

            {props.children}
        </div>
    );
};
