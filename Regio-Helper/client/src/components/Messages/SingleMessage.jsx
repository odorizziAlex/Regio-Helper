import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const SingleMessage = ({ img,link,userName,timestamp,message }) => {
    return (
        <MessageWrapper>
            <Image src={img} />
            <div>
                <ArrowLink to={link}>
                    <Username>{userName}</Username>
                    <Timestamp>{timestamp}</Timestamp>
                </ArrowLink>
                <Text>{message.text}</Text>
               
            </div>
        </MessageWrapper>
    );
};

export default SingleMessage;

const MessageWrapper = styled.div`
    display: flex;

    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const ArrowLink = styled(Link)`
    text-decoration: none;
`;

const Image = styled.img`
    max-width: 50px;
    max-height: 50px;
    border-radius: 50%;
    border: 2px solid white;
    margin-right: 20px;
`;

const Username = styled.h4`
    display: inline-blocK;
    font-size: 18px;
    margin-right: 5px;
`;

const Timestamp = styled.span`
    color: var(--dark-grey);
    font-size: 12px;
`;

const Text = styled.p`
    color: var(--dark-grey);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
`;