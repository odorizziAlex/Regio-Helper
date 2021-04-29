import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export const ConversationContext = createContext();

const ConversationContextProvider = props => {

  const [conversations, setConversations] = useState([
    {
      id: 1,
      userIds: [{id1: 2, id2: 1, rej: false, rejMsg:"", delId1: 0, delId2: 0}],
      postId: 1,
      postTitle: "Medikamente aus der Apotheke dringend benötigt",
      isRated: false,
      messages: [
        {
          id: 0,
          userId: 2,
          text: "(Peter hat ein Hilfsangebot gesendet)",
          timeData: "2020-09-21T14:59:00+02:00"
        },
        {
          id: 1,
          userId: 2,
          text: 
            "Hallo Hilde, ich würde dir gerne bei deinem Gesuche helfen. Profil ansehen",
          timeData: "2020-09-22T15:00:00+02:00"
        },
        {
          id: 2,
          userId: 1,
          text: 
          "Hallo Peter, vielen Dank für deine Nachricht. Das freut mich sehr, dass du mir helfen willst. Wie kommt es dazu, dass du jemandem wie mir helfen möchtest? ",
          timeData: "2020-09-22T15:00:00+02:00"
        },
        {
          id: 3,
          userId: 2,
          text: 
          "Danke für die Nachfrage. Ich bin ehrenamtlich bereits bei der Feuerwehr tätig und möchte gerade in so einer schwierigen Zeit auch weiter Menschen in Not meine Hilfe anbieten. Das ist für mich das mindeste, was ich aktuell machen kann - da müssen wir einfach alle zusammenhalten und einander helfen.",
          timeData: "2020-09-22T15:00:00+02:00"
        },
        {
          id: 4,
          userId: 1,
          text: 
          "Oh, das klingt ja super! Bei welcher Feuerwehr bist du denn tätig? Ich war früher auch bei der Feuerwehr tätig. Du hörst dich nach einem vernünftigen, jungen Menschen an - ich würde mich freuen wenn du mir Helfen würdest und wir unsere Kontaktdaten austauschen.",
          timeData: "2020-09-22T15:00:00+02:00"
        },
      ]
    },
    {
      id: 2,
      userIds: [{id1: 2, id2: 3, rej: false, rejMsg:"", delId1: 0, delId2: 0}],
      postId: 6,
      postTitle: "Nachhilfe in Mathe und Physik 8. Klasse",
      isRated: false,
      messages: [
      {
        id: 0,
        userId: 3,
        text: "(Michael hat ein Hilfsangebot gesendet)",
        timeData: "2020-09-21T14:59:00+02:00"
      },
      {
        id: 1,
        userId: 3,
        text: "Hi, habe gerade gesehen, du suchst jemanden der dir Nachhilfe in Physik gibt?",
        timeData: "2020-09-23T10:00:00+02:00"
      },
      ]
    },
    {
      id: 3,
      userIds: [{id1: 2, id2: 6, rej: false, rejMsg:"", delId1: 0, delId2: 0}],
      postId: 7,
      postTitle: "Wocheneinkauf",
      isRated: false,
      messages: [
      {
        id: 0,
        userId: 6,
        text: "(Christina hat ein Hilfsangebot gesendet)",
        timeData: "2020-09-21T14:59:00+02:00"
      },
      {
        id: 1,
        userId: 6,
        text: "Hi, du brauchst Hilfe bei dinem Wocheneinkauf?",
        timeData: "2020-09-21T15:00:00+02:00"
      },
      ]
    },
  ]);

  const isConvNotAlreadyExisting = (userId1, userId2, postId) => {
    let conv = conversations.filter(conversation => 
      conversation.userIds.find(el => 
        (el.id1 === userId1 || el.id1 === userId2)&&(el.id2 === userId1 || el.id2 === userId2)&&(conversation.postId === postId)));
    if(conv.length === 0){
      return true;
    }
    return false;
  }

  const addNewConversation = (id, firstName, userId1, userId2, post) => {
    let isConvNotExisting = isConvNotAlreadyExisting(userId1, userId2, post.id);
    if(isConvNotExisting){ 
      let newConv = {
        id: id,
        userIds: [{id1: userId1, id2: userId2, rej: false, delId1: 0, delId2: 0}],
        postId: post.id,
        postTitle: post.title,
        isRated: false,
        messages: [
          {
            id: 0,
            userId: userId1,
            text: "("+firstName+" hat ein Hilfsangebot gesendet)",
            timeData: moment().format()
          },
        ]
      }
      let newConvsList = [];
      let convsCopy = [...conversations];
      newConvsList = newConvsList.concat(newConv);
      newConvsList = newConvsList.concat(convsCopy);
      setConversations(newConvsList);
      return isConvNotExisting;
    }
  }

  const setRated = (conv, isRated) => {
    conv.isRated = isRated;
  }

  const addMessage = (conv, userId, message) => {
    let newMessage = {
      id: uuidv4(),
      userId: userId,
      text: message,
      timeData:  moment().format(),
    }
    conv.messages = conv.messages.concat([newMessage]);
  }

  const rejectConversation = (conv, msg) => {
    if(conv !== undefined){
      conv.userIds[0].rej = true;
      conv.userIds[0].rejMsg = msg;
    }
  }

  const deleteConversation = (conv, userId) => {
    if(conv.userIds[0].id1 === userId){
      conv.userIds[0].delId1 = 1;
    }else{
      conv.userIds[0].delId2 = 1;
    }
    submitDeletion(conv);
  }

  const submitDeletion = (conv) => {
    if(conv.userIds[0].delId1 === 1 && conv.userIds[0].delId2 === 1){
      setConversations(conversations.filter(conversation => conversation.id !== conv.id));
    }
  }

  const postDeleted = (post) => {
    let conv = conversations.find(conv => conv.postId === post.id);
    rejectConversation(conv, "Post wurde gelöscht");
  }

  return (
    <ConversationContext.Provider value={{ conversations, addNewConversation, setRated, addMessage, rejectConversation, deleteConversation, postDeleted }}>
        {props.children}
    </ConversationContext.Provider>
)
}

export default ConversationContextProvider;