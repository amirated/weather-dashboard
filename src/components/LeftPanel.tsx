import React, { FC, useCallback, useEffect, useState } from "react";
import SortableList from "./SortableList";

interface LeftPanelProps {
    locationsList: string[];
}

const LeftPanel: FC<LeftPanelProps> = ({ locationsList }) => {
    const renderSavedLocations = useCallback(() => {
        if (locationsList.length === 0) {
            let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
            let locationsArr = savedLocationsList.split(',');
            return <SortableList itemList={locationsArr}/>
        } else {
            return <SortableList itemList={locationsList}/>
        }
    }, [locationsList]);

    return (
        <div className="float-left w-3/12 bg-gray-200 pl-4">
            {renderSavedLocations()}
        </div>
    );
};

export default LeftPanel;