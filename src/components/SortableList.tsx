import { FC, useEffect, useState } from "react";
import { DndContext, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Sortable from "./Sortable";

interface SortableListProps {
    itemList: any[];
}

const SortableList: FC<SortableListProps> = ({itemList}) => {
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        setList([...itemList]);
    }, [itemList]);

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        if (active.id !== over.id) {
            setList((items: any) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
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
                {list.map((item, index) => {
                    return <Sortable key={`sortable-${item}-${index}`} item={item}/>
                })}
            </SortableContext>
        </DndContext>
    );
};

export default SortableList;