import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";
import styled from "styled-components";
import Post from "./Post";
import Dropdown from "./Dropdown";
import CustomDropdown from "../Request/Dropdown";
import { allZipCodes as zipCodes } from "../../data/zipCodes";

const Overview = ({ loggedInUser }) => {
    const { posts } = useContext(PostContext);

    const [location, setLocation] = useState(zipCodes[0]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [newestFirst, setNewestFirst] = useState(true);
    const ownId = 2;

    /**
     * Filter results when search term changes
     */
    useEffect(() => {
        if (location === "Alle anzeigen") {
            setFilteredPosts(posts);
            return;
        }
        setFilteredPosts(
            posts.filter((post) => post.zipCode.indexOf(location) !== -1),
        );
    }, [location]);

    const sortByDateAsc = () => {
        setFilteredPosts(
            filteredPosts.sort((a, b) => a.created_at - b.created_at),
        );
        setNewestFirst(false);
    };

    const sortByDateDesc = () => {
        setFilteredPosts(
            filteredPosts.sort((a, b) => b.created_at - a.created_at),
        );
        setNewestFirst(true);
    };

    return (
        <StyledArea>
            <StyledTitle>Alle Hilfsgesuche</StyledTitle>
            <FilterWrapper>
                <Dropdown
                    newestFirst={newestFirst}
                    setNewestFirst={setNewestFirst}
                    sortByDateAsc={sortByDateAsc}
                    sortByDateDesc={sortByDateDesc}
                />
                <CustomDropdown
                    currentItem={location}
                    setCurrentItem={setLocation}
                    options={zipCodes}
                    isLight={true}
                    padding="20px"
                    width="100%"
                />
            </FilterWrapper>
            <PostsWrapper>
                {filteredPosts.length === 0
                    ? "Keine Beiträge gefunden..."
                    : filteredPosts.map((post) => (
                          <Link key={post.id} to={`/gesuche/${post.id}`}>
                              {post.userId === ownId ? (
                                  <Post
                                      loggedInUser={loggedInUser}
                                      isOwnPost={true}
                                      post={post}
                                  />
                              ) : (
                                  <Post
                                      loggedInUser={loggedInUser}
                                      post={post}
                                  />
                              )}
                          </Link>
                      ))}
            </PostsWrapper>
        </StyledArea>
    );
};

export default Overview;

const StyledArea = styled.div`
    padding: 30px;
`;

const FilterWrapper = styled.div`
    display: flex;
`;

const PostsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 30px;
    row-gap: 30px;
    margin-top: 50px;

    @media screen and (max-width: 1150px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const StyledTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 20px;
`;
