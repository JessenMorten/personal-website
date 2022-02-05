import React, { FC } from "react";

export interface ButtonProps {
    text: string;
    onClick: () => void
}

export const Button: FC<ButtonProps> = (props) => {

    return (
        <button
            onClick={() => props.onClick()}
            className="
                py-2
                px-4
                bg-primary-500
                text-white
                font-semibold
                rounded-xl
                shadow-md
                hover:bg-primary-600
                focus:outline-none
                focus:ring-2
                focus:ring-primary-400
                focus:ring-opacity-75
                transition-colors
                duration-300">
            {props.text}
        </button>
    );
};
