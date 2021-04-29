import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Overview from "./Overview/Overview";
import Messages from "./Messages/Messages";
import Map from "./Map/Map";
import Profile from "./Profile/Profile";
import DetailPost from "./Overview/DetailPost";
import EditProfile from "./Profile/EditProfile";
import CreateRequest from "./Request/CreateRequest";
import { UserContext } from "../contexts/UserContext";

const MainContentArea = ({userId}) => {
    const { users } = useContext(UserContext);
    const loggedInUser = users.find((user) => user.id === userId);


    return (
        <>
            <Route exact path="/">
                <Overview loggedInUser={loggedInUser}/>
            </Route>
            <Route path="/gesuche/:postId">
                <DetailPost loggedInUser={loggedInUser}/>
            </Route>
            <Route exact path="/karte">
                <Map loggedInUser={loggedInUser}/>
            </Route>
            <Route exact path="/nachrichten/:postId?">
                <Messages loggedInUser={loggedInUser}/>
            </Route>
            <Route exact path="/profil/:userId">
                <Profile loggedInUser={loggedInUser}/>
            </Route>
            <Route path="/editProfile">
                <EditProfile loggedInUser={loggedInUser}/>
            </Route>
            <Route exact path="/createRequest">
                <CreateRequest loggedInUser={loggedInUser}/>
            </Route>
            <Route exact path="/createRequest/:postId/edit">
                <CreateRequest loggedInUser={loggedInUser}/>
            </Route>
        </>
    );
};

export default MainContentArea;
