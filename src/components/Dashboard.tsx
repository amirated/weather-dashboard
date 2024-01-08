import { FC, useState } from "react";
import LeftPanel from "./LeftPanel";
import ContentPanel from "./ContentPanel";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = ({}) => {
    const [savedLocations, setSavedLocations] = useState();
    
    const updateSavedLocations = (list: any) => {
        setSavedLocations({...list});
    };

    return (
        <div className="flex relative h-full">
            <LeftPanel locationsList={savedLocations}/>
            <ContentPanel updateSavedLocations={updateSavedLocations} />
        </div>
    );
};

export default Dashboard;