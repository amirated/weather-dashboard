import { FC, useState } from "react";
import LeftPanel from "./LeftPanel";
import ContentPanel from "./ContentPanel";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = ({}) => {
    const [savedLocations, setSavedLocations] = useState();
    const [currentLocation, setCurrentLocation] = useState<string>();
    
    const updateSavedLocations = (list: any) => {
        setSavedLocations({...list});
    };
    
    const updateCurrentLocation = (location: string) => {
        setCurrentLocation(location);
    };

    return (
        <div className="flex relative h-full">
            <LeftPanel updateCurrentLocation={updateCurrentLocation} locationsList={savedLocations}/>
            <ContentPanel updateSavedLocations={updateSavedLocations} selectedLocationKey={currentLocation} />
        </div>
    );
};

export default Dashboard;