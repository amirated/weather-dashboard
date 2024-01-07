import { FC, useState } from "react";
import LeftPanel from "./LeftPanel";
import ContentPanel from "./ContentPanel";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = ({}) => {
    const [savedLocations, setSavedLocations] = useState<string[]>([]);
    
    const updateSavedLocations = (list: string[]) => {
        setSavedLocations([...list]);
    };

    return (
        <div className="flex relative h-full">
            <LeftPanel locationsList={savedLocations}/>
            <ContentPanel updateSavedLocations={updateSavedLocations} />
        </div>
    );
};

export default Dashboard;