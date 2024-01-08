import React, { FC } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

interface ErrorViewProps {
}

const ErrorView: FC<ErrorViewProps> = ({}) => {
    return (
        <div className="text-gray-400 p-[100px]">
            <div className="text-8xl">
                <MdOutlineErrorOutline />
            </div>
            <div className="text-4xl pl-2">
                Location not found
            </div>
        </div>
    );
};

export default ErrorView;