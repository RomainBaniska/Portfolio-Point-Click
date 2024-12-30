
export async function loadTexts() {

    // const { menuContainer, menuCoverDialogue } = sprites;

    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    const responseStyle = { fontFamily: 'arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};


    function textConfig(textContent) {
        const guybrushText = new PIXI.Text(textContent, dialogueStyle);
        guybrushText.anchor.set(0.5);
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve');
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?');
    const wakeUpText3 = textConfig('Bon si on a fini, moi j\'ai du travail');
    const OkText = textConfig('Ok !');

    // Doit retourner un array
    function responseConfig(responseContent, yPosition) {
        const playerResponse = new PIXI.Text(responseContent, responseStyle);
        playerResponse.y = yPosition;
        return playerResponse; 
    }
    
    // const response1 = responseConfig('OK c\'est good !', 0);
    // const response2 = responseConfig('Non je ne suis pas d\'accord', response1.height);

    // Tableau pour stocker les réponses
    const responses = [];

    // function addResponse(content) {
    //     let positionY = 0;
    //     if (responses.length > 0) {
    //          // Si des réponses existent déjà, la nouvelle réponse se place après la dernière
    //          const lastResponse = responses[responses.length - 1];
    //          // on prend à partir du point y de la lastresponse et on y ajoute sa hauteur
    //          positionY = lastResponse.y + lastResponse.height; // Positionner en dessous
    //     }

    //     // Crée la réponse et l'ajoute au tableau 
    //     const newResponse = responseConfig(content, positionY);
    //     responses.push(newResponse);

    //     // Ajoute la réponse à l'écran (par exemple à votre container principal)
    //     menuCoverDialogue.addChild(newResponse);
    // }

        // Ajouter des réponses
    // addResponse("OK c'est good !");
    // addResponse("Non je ne suis pas d'accord");
    // addResponse("Peut-être que tu as raison...");

    const wakeUpResponses = [
        {
            text: "Allons voir ce qui se passe dehors.",
            action: () => skipDialogue(houseContainer, guybrush, OkText, 4000)
            ,
            // action: () => console.log("Action : Guybrush sort de la maison"),
        },
        {
            text: "J'ai besoin d'un café avant tout.",
            action: () => console.log("Action : Guybrush va chercher un café"),
        },
        {
            text: "Pourquoi je suis encore ici ?",
            action: () => console.log("Action : Guybrush se pose des questions existentielles"),
        },
        {
            text: "Bye bye zobi",
            action: () => console.log("Action : Guybrush se pose des questions existentielles"),
        },
    ];


    return {
        wakeUpText,
        wakeUpText2,
        wakeUpText3,
        responses,
        wakeUpResponses,
        // response1,
        // response2
    };

}