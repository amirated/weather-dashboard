import { FC } from "react";
import { FaList } from "react-icons/fa";

interface EmptyListViewProps {
}

const EmptyListView: FC<EmptyListViewProps> = ({}) => {
    return (
        <div className="text-gray-400 p-[20px]">
            <div className="text-3xl">
                <FaList />
            </div>
            <div className="text-1xl">
                Bookmark locations here
            </div>
        </div>
    );
};

export default EmptyListView;