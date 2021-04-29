import React from "react";
import styled from "styled-components";
import MetaMapIcon from "../../assets/location-pin-icon.svg";
import MetaClockIcon from "../../assets/clock-icon.svg";
import moment from "moment";

const SlideInPost = ({ post }) => {
    return (
        <StyledPost>
            <MetaWrapper>
                <PostMeta>
                    <MetaIcon src={MetaMapIcon} /> {post.zipCode.substring(0, 5)}
                </PostMeta>
                <PostMeta>
                    <MetaIcon src={MetaClockIcon} />
                    {`${moment(parseInt(post.created_at)).format(
                        "DD.MM.YYYY",
                    )}`}
                </PostMeta>
            </MetaWrapper>
            <StyledTitle>{post.title}</StyledTitle>
        </StyledPost>
    );
};

export default SlideInPost;

const StyledPost = styled.div`
    text-decoration: none;
    padding: 20px;
    background: var(--light-grey);
    border-radius: 10px;
    float: left;
    box-sizing: border-box;
    cursor: pointer;
    border: 2px solid white;
    transition: all 0.2s;
    width: 100%;

    &:hover {
        border: 2px solid var(--primary);
    }
`;

const MetaWrapper = styled.div`
    display: flex;
`;

const PostMeta = styled.span`
    display: flex;
    align-items: center;
    color: var(--dark-grey);
    border-radius: 5px;
    background: white;
    padding: 3px 5px;

    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const MetaIcon = styled.img`
    width: 20px;
    margin-right: 5px;
`;

const StyledTitle = styled.h3`
    display: block;
    display: -webkit-box;
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
    height: 50px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;
