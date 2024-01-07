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
        console.log("Drag end call ", event);
        const {active, over} = event;
        console.log("ACTIVE: ", active.id);
        console.log("OVER: ", over.id);
        if (active.id !== over.id) {
            setList((items: any) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                console.log(arrayMove(items, activeIndex, overIndex));
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