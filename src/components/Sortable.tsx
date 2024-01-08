
import { FC } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";

interface SortableProps {
    item: any;
    handleOnClick: any;
}

const Sortable: FC<SortableProps> = ({item, handleOnClick}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: item});


  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  }

  return (
    <div className="h-[110px] w-[95%] bg-white rounded p-2 my-1" ref={setNodeRef} onClick={() => handleOnClick(item.key)} style={style} {...attributes} {...listeners}>
      <div className="flex">
        <RiDraggable className="text-gray-400 text-2xl"/>
        <div>
          {item.name}, {item.country}
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3">
          <div className="pl-6 text-gray-400">{item.description}</div>
          <div className="pl-6 mt-2 text-[1.5em]">{item.temperature.toFixed()}°C</div>
        </div>
        <div className="w-[50px] h-[50px] relative left-[10px]">
          <img
            src={`http://openweathermap.org/img/wn/${item.icon}.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
  
export default Sortable;