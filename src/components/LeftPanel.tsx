import React, { FC, useCallback, useEffect, useState } from "react";

interface LeftPanelProps {
    locationsList: string[];
}

const LeftPanel: FC<LeftPanelProps> = ({ locationsList }) => {

    const [savedLocations, setSavedLocations] = useState<string[]>([]);

    useEffect(() => {
        setSavedLocations([...locationsList]);
    }, [locationsList]);
    
    const renderSavedLocations = useCallback(() => {
        if (savedLocations.length === 0) {
          let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
          let locationsArr = savedLocationsList.split(',');
          return <>
            {locationsArr.map((item, index) => {
              return <div>{item}</div>
            })}
            </>
        } else {
          return <>
            {savedLocations.map((item, index) => {
              return <div>{item}</div>
            })}
            </>
        }
    }, [savedLocations]);

    return (
        <div className="float-left w-2/12 bg-red-200">
            {renderSavedLocations()}
        </div>
    );
};

export default LeftPanel;