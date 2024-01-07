import React, { FC } from "react";

interface HeaderProps {
    title: string;
}

const Header: FC<HeaderProps> = ({title}) => {
    return (
        <div className="w-screen h-[80px] bg-white grid content-center p-10 text-2xl font-semibold text-gray-500 shadow-lg border-b-2">
            {title}
        </div>
    );
};

export default Header;