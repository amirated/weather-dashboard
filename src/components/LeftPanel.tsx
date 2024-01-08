import { FC, useCallback } from "react";
import SortableList from "./SortableList";
import EmptyListView from "./EmptyListView";

interface LeftPanelProps {
    locationsList: any;
}

const LeftPanel: FC<LeftPanelProps> = ({ locationsList }) => {
    const renderSavedLocations = useCallback(() => {
        if (!locationsList || Object.keys(locationsList).length === 0) {
            let savedLocationsListString = localStorage.getItem('savedLocationsList');
            if (!savedLocationsListString || savedLocationsListString === "" || savedLocationsListString === "{}") {
                return <EmptyListView />;
            } else {
                let savedLocationsList: any = JSON.parse(savedLocationsListString);
                let locationsArr: any[] = [];
                locationsArr = Object.values(savedLocationsList);
                return <SortableList itemList={locationsArr}/>
            }
        } else {
            let locationsArr: any[] = [];
            locationsArr = Object.values(locationsList);
            return <SortableList itemList={locationsArr}/>
        }
    }, [locationsList]);

    return (
        <div className="float-left w-3/12 bg-gray-200 pl-4">
            {renderSavedLocations()}
        </div>
    );
};

export default LeftPanel;