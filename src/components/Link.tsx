import React, { FC, PropsWithChildren } from "react";
import { Link as GatsbyLink } from "gatsby";

export interface LinkProps {
    to: string;
}

export const Link: FC<PropsWithChildren<LinkProps>> = (props) => {
    const isRelativeLink = props.to.startsWith("/");

    if (isRelativeLink) {
        return (
            <GatsbyLink
                to={props.to}
                className="
                    text-primary-500
                    font-semibold
                    hover:text-primary-600
                    transition-colors
                    duration-300">
                {props.children}
            </GatsbyLink>
        );
    }

    return (
        <a
            href={props.to}
            className="
                    text-primary-500
                    font-semibold
                    hover:text-primary-600
                    transition-colors
                    duration-300">
            {props.children}
        </a>
    )
};
