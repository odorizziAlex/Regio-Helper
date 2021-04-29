
import React, { createContext, useState } from 'react'
import ImgChristina from "../images/postimage1.jpeg";
import ImgPascal from "../images/postimage2.jpeg";
import ImgThomas from "../images/postimage3.jpeg";
import ImgHilde from "../images/hilde.jpeg";
import ImgMichael from "../images/michael.jpeg";
import ImgPeter from "../images/peter.jpeg";
import { v4 as uuidv4 } from 'uuid';


export const UserContext = createContext();

const UserContextProvider = props => {

    const [users] = useState([
        {
            id: 1,
            firstName: 'Hilde',
            email: 'hilde.mustermann@beispiel.de',
            qualifications: [{ id: 1, title: "Köchin" }],
            zipCode: '93047 Innenstadt',
            image: ImgHilde,
            posts: [{ id: 1 }],
            accepted_conversations: [{ id: 1 }],
            requested_posts: [],
            new_conversation_message: [],
            bio: 'Hallo, mein Name ist Hilde und ich bin gebürtige Münchenerin. Mein Mann Michael und ich wohnen seit zwanzig Jahren zusammen in der wunderschönen Innenstadt von Regensurg. Ich bin auf der Suche nach zuverlässigen und hilfsbereiten jungen Menschen, die mir bei meinen alltäglichen Besorgungen unter die Arme greifen können. Mein Mann und ich sind nicht mehr die sportlichsten und freuen uns über jede Unterstützung, die wir bekommen können! ',
            created_at: '24.06.2020',
            help_count: 0,
            rating: 0,
            comments: [
                {
                    id: 1,
                    rating: 5,
                    comment: "Sehr freundlich und zuverlässig. Hat sich sehr bemüht."
                },
            ]
        },
        {
            id: 2,
            firstName: 'Peter',
            email: 'peter.mustermann@beispiel.de',
            qualifications: [{ id: 1, title: "Feuerwehrmann" }, { id: 2, title: "Ehrenamt" }, { id: 3, title: "Hilfsbereit" }, { id: 4, title: "Hashmaps" }],
            zipCode: '93047 Innenstadt',
            image: ImgPeter,
            posts: [{ id: 6 }, { id: 7 }],
            accepted_conversations: [{ id: 1 }],
            requested_posts: [{ id: 1 }],
            new_conversation_message: [{ id: 2 }, { id: 1 }, { id: 3 }],
            bio: 'Hallo, mein Name ist Peter und ich bin ehrenamtlich bei der Feuerwehr tätig. Nun möchte ich in der aktuellen Situation meine Freizeit nutzen und Menschen in der Not auch hier meine Hilfe anbieten. ',
            created_at: '24.06.2020',
            help_count: 12,
            rating: 4,
            comments: [{
                id: 1,
                rating: 5,
                comment: "Sehr freundlich und zuverlässig. Hat sich sehr bemüht."
            },
            {
                id: 2,
                rating: 4,
                comment: "Hat etwas gestresst gewirkt, aber alles in allem war der Peter sehr freundlich und zuverlässig."
            },
            {
                id: 3,
                rating: 4,
                comment: "Ist leider etwas zu spät gekommen und hat die Rechnung für den Einkauf verloren. Aber das kann jedem mal passieren."
            },
            {
                id: 4,
                rating: 5,
                comment: "Super netter Kerl Kann mich nicht beschweren."
            },]
        },
        {
            id: 3,
            firstName: 'Michael',
            email: 'michael.mustermann@beispiel.de',
            qualifications: [{ id: 1, title: "Schreiner" }, { id: 2, title: "Habe Transporter" }, { id: 3, title: "Hilfsbereit" },],
            zipCode: '93051 Galgenberg',
            image: ImgMichael,
            posts: [{ id: 2 }],
            accepted_conversations: [{ id: 2 }],
            requested_posts: [{ id: 6 }],
            new_conversation_message: [],
            bio: 'Keine Informationen angegeben.',
            created_at: '28.06.2020',
            help_count: 2,
            rating: 0,
            comments: [{
                id: 1,
                rating: 1,
                comment: "Sehr unhöflich und ist zu spät gekommen..."
            },
            {
                id: 2,
                rating: 1,
                comment: "Nicht zu empfehlen - ist nicht aufgetaucht."
            }]
        },
        {
            id: 4,
            firstName: 'Thomas',
            email: 'thomas.mustermann@beispiel.de',
            qualifications: [],
            zipCode: '93055 Ostenviertel',
            image: ImgThomas,
            posts: [{ id: 3 }],
            accepted_conversations: [],
            requested_posts: [],
            new_conversation_message: [],
            bio: 'Keine Informationen angegeben.',
            created_at: '30.06.2020',
            help_count: 0,
            rating: 0,
            comments: []
        },
        {
            id: 5,
            firstName: 'Pascal',
            email: 'pascal.mustermann@beispiel.de',
            qualifications: [],
            zipCode: '93049 Westenviertel',
            image: ImgPascal,
            posts: [{ id: 4 }],
            accepted_conversations: [],
            requested_posts: [],
            new_conversation_message: [],
            bio: 'Keine Informationen angegeben.',
            created_at: '19.06.2020',
            help_count: 0,
            rating: 0,
            comments: []
        },
        {
            id: 6,
            firstName: 'Christina',
            email: 'christina.mustermann@beispiel.de',
            qualifications: [],
            zipCode: '93051 Galgenberg',
            image: ImgChristina,
            posts: [{ id: 5 }, { id: 8 }],
            accepted_conversations: [{ id: 3 }],
            requested_posts: [{ id: 7 }],
            new_conversation_message: [],
            bio: 'Keine Informationen angegeben.',
            created_at: '03.07.2020',
            help_count: 0,
            rating: 5,
            comments: []
        },
    ]);

    const addAcceptedConversationId = (user, convId) => {
        let newId = { id: convId };
        user.accepted_conversations = user.accepted_conversations.concat([newId]);
    }

    const removeAcceptedConversationId = (user, convId) => {
        user.accepted_conversations = user.accepted_conversations.filter(conv => conv.id !== convId);
    }

    const deletePostIdFromRequestedPostsAllUsers = (postId) => {
        for (let i = 0; i < users.length; i++) {
            users[i].requested_posts = users[i].requested_posts.filter((post) => post.id !== postId);
        }
    }

    const removePostFromLists = (user, postId) => {
        user.posts = user.posts.filter(post => post.id !== postId);
        deletePostIdFromRequestedPostsAllUsers(postId);
    }

    const updateNewMessageList = (user, convId) => {
        let newId = { id: convId };
        user.new_conversation_message = user.new_conversation_message.concat([newId]);
    }

    const addComment = (user, comment, rating) => {
        let newComment = {
            id: uuidv4(),
            rating: rating,
            comment: comment
        }
        user.comments = user.comments.concat([newComment]);
    }

    const toggleNewMessage = (user, convId) => {
        user.new_conversation_message = user.new_conversation_message.filter(newMsg => newMsg.id !== convId)
    }

    const addRequestedPostId = (user, postId) => {
        let newId = { id: postId };
        user.requested_posts = user.requested_posts.concat([newId]);
    }

    const addCreatedPostId = (user, postId) => {
        let newId = { id: postId };
        user.posts = user.posts.concat([newId]);
    }

    const removePostFromRequestedPosts = (user, postId) => {
        user.requested_posts = user.requested_posts.filter(post => post.id !== postId)
    }

    const updateUserInformation = (user, name, email, zipCode, description, qualificationList) => {
        user.firstName = name;
        user.email = email;
        user.zipCode = zipCode;
        user.bio = description;
        user.qualifications = qualificationList;
    }

    const changeProfileImage = (user, dataURL) => {
        user.image = dataURL;
    }

    return (
        <UserContext.Provider value={{ users, addAcceptedConversationId, removeAcceptedConversationId, updateNewMessageList, addComment, toggleNewMessage, removePostFromLists, addRequestedPostId, addCreatedPostId, removePostFromRequestedPosts, updateUserInformation, changeProfileImage }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;