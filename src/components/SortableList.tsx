import { FC, useEffect, useState } from "react";
import { DndContext, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import { IoIosArrowForward } from "react-icons/io";

interface SortableListProps {
    itemList: any[];
    handleListChange: any;
    handleItemClick: any;
}

const SortableList: FC<SortableListProps> = ({itemList, handleListChange, handleItemClick}) => {
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        setList([...itemList]);
    }, [itemList]);

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        if (active && over && active.id !== over.id) {
            setList((items: any) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                let newList = arrayMove(items, activeIndex, overIndex);
                handleListChange(newList);
                return arrayMove(items, activeIndex, overIndex);
            })
        }
    };
    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={list}
                strategy={verticalListSortingStrategy}
            >
                <div className="overflow-y-auto h-full">
                    <div className="h-[40px] text-gray-500 font-semibold py-2">
                        My locations
                    </div>
                    {list.map((item, index) => {
                        return <div className="grid-row w-[100%] bg-blue-50" onClick={() => handleItemClick(item.key)}>
                            <Sortable key={`sortable-${item}-${index}`} item={item} />
                            <div className="float-right relative top-[-66px] cursor-pointer">
                                <IoIosArrowForward />
                            </div>
                        </div>
                    })}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default SortableList;