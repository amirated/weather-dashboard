
import { FC } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import WeatherCard from './WeatherCard';
import { CSS } from "@dnd-kit/utilities";

interface SortableProps {
    item: any;
}

const Sortable: FC<SortableProps> = ({item}) => {
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
    <div className="h-[100px] w-[100px] bg-red-500 p-2 my-1" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* <WeatherCard weatherData={item} /> */}
      {item}
    </div>
  );
}
  
export default Sortable;