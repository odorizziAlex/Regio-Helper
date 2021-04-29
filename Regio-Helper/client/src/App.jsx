import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContentArea from "./components/MainContentArea";
import PostContext from "./contexts/PostContext";
import UserContext from "./contexts/UserContext";
import ConversationContext from "./contexts/ConversationContext";

const App = () => (
    <UserContext>
        <PostContext>
            <ConversationContext>
                <Router>
                    <div className="App">
                        {/* <StyledAuth>
                    <Auth>
                        <Switch>
                            <Route exact path="/">
                                <Register />
                            </Route>
                            <Route exact path="/verify">
                                <Verify />
                            </Route>
                        </Switch>
                    </Auth>
                    <Info />
                </StyledAuth> */}
                        <StyledApp>
                            <Sidebar userId={2}/>
                            <MainContentArea userId={2}/>
                        </StyledApp>
                    </div>
                </Router>
            </ConversationContext>
        </PostContext>
    </UserContext>
);

export default App;

const StyledApp = styled.div`
    background: var(--light-grey);
    overflow: auto;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 280px auto;
`;

// const StyledAuth = styled(StyledApp)`
//     grid-template-columns: 550px auto;
// `;
