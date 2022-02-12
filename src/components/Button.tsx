import React, { FC } from "react";

export interface ButtonProps {
    text: string;
    onClick: () => void
    disabled?: boolean
}

export const Button: FC<ButtonProps> = (props) => {

    return (
        <button
            disabled={props.disabled}
            onClick={() => props.onClick()}
            className="
                py-2
                px-4
                bg-primary-500
                disabled:opacity-70
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
