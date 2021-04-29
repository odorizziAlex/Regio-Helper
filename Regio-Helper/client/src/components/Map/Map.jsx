import React, { useState, useEffect } from "react";
import CustomDropdown from "../Request/Dropdown";
import styled from "styled-components";
import MapBackground from "../../images/map-placeholder.png";
import MapSlideIn from "./MapSlideIn";
import { allZipCodes as zipCodes } from "../../data/zipCodes";

const Map = ({ loggedInUser }) => {
    const [location, setLocation] = useState(zipCodes[0]);
    const [isVisible, setIsVisible] = useState(false);
    const [zipCode, setZipCode] = useState("");

    const toggleSlideIn = (zipCode) => {
        setIsVisible((prevState) => !prevState);
        setZipCode(zipCode);
    };

    /**
     * Set location in dropdown once it closes
     */
    useEffect(() => {
        if (isVisible) return;
        setLocation(zipCodes[0]);
    }, [isVisible]);

    /**
     * Filter results when search term changes
     */
    useEffect(() => {
        if (location === "Alle anzeigen") {
            // setFilteredPosts(posts);
            return;
        }
        toggleSlideIn(location);
    }, [location]);

    return (
        <>
            {isVisible && <Overlay onClick={() => toggleSlideIn("")} />}
            <MapWrapper image={MapBackground}>
                {/* <StyledSearch placeholder="Gebe eine Postleitzahl (PLZ) ein..." /> */}
                <CustomDropdown
                    currentItem={location}
                    setCurrentItem={setLocation}
                    options={zipCodes}
                    isLight={true}
                    padding="20px"
                    width="100%"
                />

                <Marker onClick={() => toggleSlideIn("93051 Galgenberg")}>
                    3
                </Marker>
                <Marker2 onClick={() => toggleSlideIn("93047 Innenstadt")}>
                    3
                </Marker2>
                <Marker3 onClick={() => toggleSlideIn("93049 Westenviertel")}>
                    1
                </Marker3>
            </MapWrapper>
            <MapSlideIn
                isVisible={isVisible}
                toggleSlideIn={() => toggleSlideIn("")}
                zipCode={zipCode}
            />
        </>
    );
};

export default Map;

const MapWrapper = styled.div`
    position: relative;
    background: ${(props) => (props.image ? `url(${props.image})` : "")};
    background-size: cover;
    background-position: center center;
    padding: 30px;
`;

const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
`;

const Marker = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 2px solid var(--primary);
    background: #ff3b5526;
    width: 150px;
    height: 150px;
    font-size: 24px;
    font-weight: 600;
    border-radius: 50%;
    position: absolute;
    right: 35%;
    bottom: 25%;
    cursor: pointer;
    padding: 20px;
`;

const Marker2 = styled(Marker)`
    right: 50%;
    bottom: 60%;
`;

const Marker3 = styled(Marker)`
    width: 70px;
    height: 70px;
    right: 80%;
    bottom: 65%;
`;
