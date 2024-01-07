import React, { FC } from "react";
import { MdOutlineManageSearch } from "react-icons/md";

interface EmptyContentProps {
}

const EmptyContent: FC<EmptyContentProps> = ({}) => {
    return (
        <div className="text-gray-400 p-[100px]">
            <div className="text-8xl">
                <MdOutlineManageSearch />
            </div>
            <div className="text-4xl pl-2">
                Search the location to know the weather
            </div>
        </div>
    );
};

export default EmptyContent;