import React, { createContext, useState } from 'react'
import PostImage1 from "../images/postimage1.jpeg";
import PostImage2 from "../images/postimage2.jpeg";
import PostImage3 from "../images/postimage3.jpeg";

export const PostContext = createContext();

const PostContextProvider = props => {

    const [posts, setPosts] = useState([
        {
            id: 1,
            userId: 1,
            title: 'Medikamente aus der Apotheke dringend benötigt',
            description: 'Grüß Gott, ich bin Hilde und Rentnerin aus Regensburg. Da ich aufgrund einer Vorerkrankung und meines Alters zur Risikogruppe zähle, kann ich meine dringend benötigten Medikamente leider nicht in der Apotheke abholen. Es fällt mir wirklich nicht leicht, um Hilfe zu bitten, aber in so unsicheren Zeiten bleibt mir nichts anderes übrig. Für deinen Einsatz bin ich dir sehr dankbar!',
            zipCode: '93047 Innenstadt',
            created_at: '1591480800000',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }, { id: 2, image: PostImage2 }, { id: 3, image: PostImage3 }
            ],
            shoppingItems: []
        },
        {
            id: 2,
            userId: 3,
            title: 'Einkaufen',
            description: 'Brauchen Hilfe bei Einkäufen und ggf. Bankgeschäften von 4 Personen, die gemeinsam unter Quarantäne stehen',
            zipCode: '93051 Galgenberg',
            created_at: '1591135200000',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }, { id: 2, image: PostImage2 }, { id: 3, image: PostImage3 }
            ],
            shoppingItems: []
        },
        {
            id: 3,
            userId: 4,
            title: 'Suche Helfer für Wocheneinkauf',
            description: 'Regelmäßige Einkäufe 1-2 Wochen',
            zipCode: '93055 Ostenviertel',
            created_at: '1590962400000',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }, { id: 2, image: PostImage2 }, { id: 3, image: PostImage3 }
            ],
            shoppingItems: []
        },
        {
            id: 4,
            userId: 5,
            title: 'Kuchen!!!',
            description: 'Bei mir gibts Kuchen',
            zipCode: '93049 Westenviertel',
            created_at: '1590962400000',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }
            ],
            shoppingItems: []
        },
        {
            id: 5,
            userId: 6,
            title: 'Romme-Partner gesucht',
            description: 'Hallo, da ich alleinlebend bin und sonst keinen Kontakt mehr zu meiner Familie habe, würde ich mich freuen, hier jemanden zu finden, der mit mir ab und zu eine Runde Romme spielen würde.',
            zipCode: '93051 Galgenberg',
            created_at: '1590616800000',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }, { id: 2, image: PostImage2 }, { id: 3, image: PostImage3 }
            ],
            shoppingItems: []
        },
        {
            id: 6,
            userId: 2,
            title: 'Nachhilfe in Mathe und Physik 8. Klasse',
            description: 'Hallo, mein Sohn tut sich gerade sehr schwer in den Fächern Mathe und Physik (Gymnasium). Deshalb suche ich eine Nachhilfe, welche 1x wöchentlich mit ihm den Stoff vertiefen könnte.',
            zipCode: '93047 Innenstadt',
            created_at: '1590357600000',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }, { id: 2, image: PostImage2 }, { id: 3, image: PostImage3 }
            ],
            shoppingItems: []
        },
        {
            id: 7,
            userId: 2,
            title: 'Wocheneinkauf',
            description: 'Ich gehöre wegen diverser Erkrankungen zur Risikogruppe. Meine letzte Einkaufshilfe geht  wieder arbeiten und hat daher leider keine Zeit mehr für mich. Deshalb suche ich nun dringend eine neue Einkaufshilfe',
            zipCode: '93047 Innenstadt',
            created_at: '1590271200000',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }, { id: 2, image: PostImage2 }, { id: 3, image: PostImage3 }
            ],
            shoppingItems: ["Milch", "Brot", "Butter", "Nutella 150g"]
        },
        {
            id: 8,
            userId: 6,
            title: 'Dies ist ein ganz langer Titel, mithilfe dessen sich herausstellen soll, wie sich der Titel und die Metainformationen des Posts au der Detailansicht verhalten.',
            description: 'test',
            zipCode: '93051 Galgenberg',
            created_at: '1590271200011',
            reported: [],
            requests: [
                { id: 1, image: PostImage1 }, { id: 2, image: PostImage2 }, { id: 3, image: PostImage3 }
            ],
            shoppingItems: []
        },
    ]);

    const setPostReported = (post, userId) => {
        let newId = { id: userId };
        post.reported = post.reported.concat(newId);
    }

    const deletePost = (postId) => {
        setPosts(posts.filter((item) => item.id !== postId));
    }

    return (
        <PostContext.Provider value={{ posts, setPosts, setPostReported, deletePost }}>
            {props.children}
        </PostContext.Provider>
    )

}

export default PostContextProvider;