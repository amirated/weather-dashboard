import { FC, useCallback } from "react";
import SortableList from "./SortableList";
import EmptyListView from "./EmptyListView";
import { LocationListType, ObjectType } from "../Types";

interface LeftPanelProps {
    locationsList: LocationListType;
    updateCurrentLocation: (location: string) => void;
}

const LeftPanel: FC<LeftPanelProps> = ({ locationsList, updateCurrentLocation }) => {
    const handleListChange = (newList: LocationListType) => {
        let savedLocationsListJSONString = JSON.stringify(newList);
        localStorage.setItem('savedLocationsList', savedLocationsListJSONString);
    };

    const renderSavedLocations = useCallback(() => {
        if (!locationsList || Object.keys(locationsList).length === 0) {
            let savedLocationsListString = localStorage.getItem('savedLocationsList');
            if (!savedLocationsListString || savedLocationsListString === "" || savedLocationsListString === "{}" || savedLocationsListString === "[]") {
                return <EmptyListView />;
            } else {
                let savedLocationsList: ObjectType = JSON.parse(savedLocationsListString);
                let locationsArr: LocationListType = [];
                locationsArr = Object.values(savedLocationsList);
                return <SortableList itemList={locationsArr} handleListChange={handleListChange} handleItemClick={updateCurrentLocation} />
            }
        } else {
            let locationsArr: LocationListType = [];
            locationsArr = Object.values(locationsList);
            return <SortableList itemList={locationsArr} handleListChange={handleListChange} handleItemClick={updateCurrentLocation} />
        }
    }, [locationsList]);

    return (
        <div className="float-left w-3/12 bg-gray-200 pl-4">
            {renderSavedLocations()}
        </div>
    );
};

export default LeftPanel;