import React, { useState } from "react";
import styled from "styled-components";
import OverviewIcon from "../../assets/overview-icon.svg";
import MessageIcon from "../../assets/message-icon.svg";
import MapIcon from "../../assets/location-icon.svg";
import { ButtonIcon } from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";

const MenuItems = ({loggedInUser}) => {
    const [activeItem, setActiveItem] = useState("/");

    const menuItems = [
        {
            title: "Hilfsgesuche",
            icon: OverviewIcon,
            slug: "/",
        },
        {
            title: "Karte",
            icon: MapIcon,
            slug: "/karte",
        },
        {
            title: "Nachrichten",
            icon: MessageIcon,
            slug: "/nachrichten",
        },
        {
            title: "Profil",
            // icon: ProfileIcon,
            icon: loggedInUser.image,
            slug: "/profil/"+loggedInUser.id,
        },
    ];

    const toggleActive = (slug) => {
        setActiveItem(slug);
    };

    return (
        <div>
            {menuItems.map((menuItem, index) => {
                const active = menuItem.slug === activeItem;
                return (
                    <MenuLink to={menuItem.slug} key={index}>
                        <MenuItem
                            onClick={() => toggleActive(menuItem.slug)}
                            active={active}
                        >
                            <ButtonIcon src={menuItem.icon} />
                            {menuItem.title}
                        </MenuItem>
                    </MenuLink>
                );
            })}
        </div>
    );
};

export default MenuItems;

const MenuItem = styled.span`
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
    background: ${(props) => (props.active ? "var(--light-grey)" : "")};
    color: var(--black);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-bottom: 20px;
    cursor: pointer;

    &:hover {
        background: var(--light-grey);
    }
`;

const MenuLink = styled(Link)`
    text-decoration: none;
`;
