
export async function loadTexts(sprites) {

    // Sprites
    const { houseContainer, houseSprite, itemClicked, lavabo, trash, poster, menuItemCoffePod, coffeMachine, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChair, goldkey, gamingChairAR, guybrushIUL, guybrushIUR, boutdemetalShine, menuItemMetalStrip, menuItemTabletPack, ordi, ordiRun, reveil, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue, glasswater, chest, menuItemGoldKey, menuItemGlassWaterEmpty, menuItemGlassWater, menuItemGlassCoffe,
        menuButton,
        menuButton2,
        menuButton3,
        menuButton4,
        menuButton5,
        menuButton6,
        menuButton7,
        menuButton8,
        menuButton9,
     } = sprites;

     
    // Heure actuelle
    let currentDate = null;
    let currentHour =  null;
    let currentMinutes =  null;
    let currentTimeHourMinutes = "";

    // Initialisation de la variable de text affiché à l'écran
    let currentText = null;
    // Initialisation de la variable de la séquence de texte affichée à l'écran
    let currentTextSequence = null;
    // Initialisation de la variable du time-out du texte affiché à l'écran
    let currentTextTimeout;  
    // Initialisation de la variable des time-outs de la séquence de textes - On stocke tous les setTimeout actifs dans un tableau, pour pouvoir les annuler plus tard si besoin
    let currentTextSequenceTimeouts = [];

    // FontSizes
    const generalFontSize = window.innerHeight * 0.02624;
    const titleFontSize = window.innerHeight * 0.04;
    const menuResponsesFontSize = window.innerHeight * 0.031;
    const wrapWidth = Math.min(820, window.innerHeight);
    const wrapWidthTitle = Math.min(900, window.innerHeight);
    // console.log(window.innerHeight);

    //////////// METHODES PERMETTANT LE SKIP DU TEXTE ET DES SEQUENCES DE TEXTE LORS D'ACTION SUR LES SPRITES ////////////
    

    // Styles
    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: generalFontSize * 1.1, fill: '#31ACD3', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 600, lineHeight: 40, align: 'center'}; // Romain-Guybrush Style
    const dialogueStyleLong = { fontFamily: 'MonkeyIsland, arial', fontSize: generalFontSize, fill: '#31ACD3', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: wrapWidth, lineHeight: 40, align: 'center'}; // Romain bulle style
    const titleStyle = { fontFamily: 'ChelseaMarket, arial', fontSize: titleFontSize, fill: '#000000', stroke: { color: 'black', width: 1 }, wordWrap: true, wordWrapWidth: wrapWidthTitle, lineHeight: 40, align: 'center'}; // Titre style
    const titleStyle2 = { fontFamily: 'ChelseaMarket, arial', fontSize: titleFontSize, fill: '#000000', stroke: { color: 'black', width: 1 }, wordWrap: true, wordWrapWidth: wrapWidthTitle * 0.2, lineHeight: 40, align: 'center'}; // Titre style evanescent
    const dialogueStyle2 = { fontFamily: 'MonkeyIsland, arial', fontSize: generalFontSize * 1.1, fill: '#FFFFFF', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 800, lineHeight: 40}; // Player style
    const responseStyle = { fontFamily: 'arial', fontSize: /*menuResponsesFontSize */ 20, fill: '#772a76', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 800, lineHeight: 40}; // Style des réponses lors du dialogue


    // Textes hors action & dialogue
    const wakeUpText = new PIXI.Text({ text: 'Non mais je rêve', style: dialogueStyle });
    const wakeUpText2 = new PIXI.Text({ text: 'T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?', style: dialogueStyle });
    const wakeUpText3 = new PIXI.Text({ text: 'Bon si on a fini, moi j\'ai du travail', style: dialogueStyle });
    const startDialogue = new PIXI.Text({ text: 'Oui ?', style: dialogueStyle });


    // DIALOGUE PLAYER - ROMAIN . TABLEAUX DES REPONSES DE ROMAIN
    const wakeUpResponses = [
        {
            text: "Qui es-tu ?",
            guybrushResponse: "Moi c'est Romain Cabanis, enchanté. Ou du moins son avatar",
            reset: true,
            exit: false
        },
        {
            text: "Je suis ici pour voir un portfolio, qu'as-tu à me montrer ?",
            guybrushResponse: "Attends je vais dérouler l'écran tu vas comprendre",
            unrollScreen: true,
            reset: true,
            exit: false
        },
        {
            text: "Etrange comme Portfolio, pourquoi ça ressemble à un jeu vidéo ?",
            guybrushResponse: "C'est pas tes oignons",
            reset: true,
            exit: false
        },
        {
            text: "Bye bye zobi",
            guybrushResponse: "Ouais ouais à plus tard",
            reset: true,
            exit: true,
            // rerollScreen: true,
        }
    ];

    // TEXTE OU ACTION DU JOUEUR LORS DU CLIC SUR UN SPRITE AVEC UN MENUBUTTON ACTIF
    // Actions réalisées initialisées à false
    let coffePicked = false;
    // On regroupe nos boutons d'action
    const menuButtonsArray = [menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9]; 
    // Pour tous les sprites interactifs...
    const interactableSprites = [guybrushSO, guybrushLD, lavabo, trash, coffeMachine, poster, toilePoulie, toilePoulieRun, reveil, ordi, ordiRun, gamingChair, glasswater, menuItemGlassWater, menuItemGlassWaterEmpty, menuItemGlassCoffe, chest, goldkey, menuItemMetalStrip, menuItemGoldKey, boutdemetalShine, menuItemTabletPack, menuItemCoffePod];
    // ... Chacun possède des actions
    const spriteBehaviors = {
        guybrushSO: {
            donner: "",
            ouvrir : "Hmm, non",
            fermer: "Hmm, non",
            prendre: "ça m'étonnerait qu'il rentre dans ma poche",
            regarder: ["Il semble être le maître de ces lieux", "De toute évidence il est extrêmement musclé", "Pourtant, je ne vois aucune haltère dans cette maison", "Curieux..."],
            parler: "",
            utiliser: "",
            pousser: "Non, il pèse une tonne et je pense pas qu'il apprécierait",
            tirer: "Si je veux l'éloigner de son ordinateur, je dois trouver un autre moyen",
        },
        lavabo: {
            donner: "",
            ouvrir : "Hmm, non",
            fermer: "Hmm, non",
            prendre: "ça m'étonnerait qu'il rentre dans ma poche",
            regarder: ["Le siphon est à moitié obstrué par des mégots de clope", "Beuuurk... Mais qui est ce type ?"],
            parler: "",
            utiliser: "",
            pousser: "Hmm, non",
            tirer: "J'ai pas envie d'arracher son mobilier",
        },
        guybrushLD: {
            donner: "",
            ouvrir : "Hmm, non",
            fermer: "Hmm, non",
            regarder: "il dort profondément",
            parler: ["Eh ho !",
                "Rien à faire, il ronfle comme un cochon"
            ],
            pousser: ["Si je le bouscule un peu trop, j'ai peur qu'il le prenne mal à son réveil",
                "Et puis avec autant de muscles il doit peser au moins une tonne"
            ],
            tirer: ["Si je le bouscule un peu trop, j'ai peur qu'il le prenne mal à son réveil",
                "Et puis avec autant de muscles il doit peser au moins une tonne"
            ],
            utiliser: "",
        },
        toilePoulieRun: {
            donner: "",
            ouvrir : "Hmm, non",
            fermer: "Hmm, non",
            prendre: "Pas sûr qu'il apprécie si j'embarque son petit home cinema",
            regarder: "",
            parler: "Je ferais mieux de me contenter de regarder la projection",
            utiliser: "Je ferais mieux de me contenter de regarder la projection",
            pousser: "Hmm, non",
            tirer: "Hmm, non",
        },
        ordiRun: {
            donner: "",
            ouvrir: "Vu l'âge des composants, je pense que même un tamagochi a une meilleure puissance de calcul",
            fermer: "Ça ne m'avancera à rien",
            prendre: [
                "Excellente idée... Je vais voler son outil de travail à ce pauvre type",
                "Avec un peu de chance je pourrais en tirer 30 euros sur leboncoin...",
                "...Non merci même pas en rêve."
            ],
            regarder: "Sous l'écran il y a une interstice qui semble pouvoir accueillir une disquette",
            parler:  [
                "Coucou ma petite machine",
                "Il serait pas grand temps pour toi de passer sur Windows 2000 ?",
            ],
            utiliser: "Je ne peux pas y accéder tant qu'il travaille dessus",
            pousser: "ça ne m'avancera pas à grand chose",
            tirer: "ça ne m'avancera pas à grand chose",            
        },
        ordi: {
            donner: "",
            ouvrir: "Vu l'âge des composants, je pense que même un tamagochi a une meilleure puissance de calcul",
            fermer: "Ça ne m'avancera à rien",
            prendre: "Me trimballer cette épave ? Non merci.",
            regarder: [
                "Pas de lecteur CD, en revanche il semble pouvoir accueillir une disquette",
                "Mais de quelle année date ce truc ?"
            ],
            parler:  [
                "Alexa ? Siri ? Allume toi !",
                "Rien ne se passe."
            ],
            utiliser: "L'ordi est éteint et je ne vois pas comment l'allumer",
            pousser: "ça ne m'avancera pas à grand chose",
            tirer: "ça ne m'avancera pas à grand chose",  
        },
        reveil: {
            donner: "",
            ouvrir: "Hmm, non",
            fermer: "Hmm, non",
            prendre: "Pas envie de me trimballer ça",
            regarder: ["1"], // Action changeante dynamiquement
            parler: "Hmm, non",
            utiliser: "Je pourrais démarrer l'alarme manuellement mais j'ai peur de tout dérégler",
            pousser: "Hmm, non",
            tirer: "Hmm, non",            
        },
        glasswater: {
            donner: "Hmm, non",
            ouvrir: "Hmm, non",
            fermer: "Hmm, non",
            prendre: "Je vais prendre ça",
            regarder: "Le verre est rempli d'eau",
            parler: "Ça ne m'avancera à rien",
            utiliser: [
                "Non merci je n'ai pas soif",
                "D'ailleurs maman m'a toujours dit de ne jamais boire dans le verre d'un inconnu",
                "Surtout si le liquide est bleu comme les balloches d'un moine"
            ],
            pousser: "Hmm, non",
            tirer: "Hmm, non",
        },
        gamingChair: {
            donner: "Hmm, non",
            ouvrir: "Hmm, non",
            fermer: "Hmm, non",
            prendre: "Hmm, non",
            regarder: "Le skaï du fauteuil est tellement usé qu'il en tombe des miettes sur le sol",
            parler: "Je ne parle pas aux fauteuils",
            utiliser: [
                "Non merci",
                "Savoir que l'individu qui habite cette cabane passe littéralement TOUTES ses journées les fesses collées sur ce fauteuil ne me tente pas du tout."
            ],
            pousser: "Je le trouve déjà très bien là où il est",
            tirer: "Je le trouve déjà très bien là où il est",
        },
        chest: {
            donner: "Hmm, non",
            ouvrir: "Le coffre est verrouillé",
            fermer: "Il est déjà fermé",
            prendre: "Je ne peux pas l'atteindre",
            regarder: [
                "Le coffre semble verrouillé avec une serrure électronique",
                "'SwitchBot'... Le type de serrure intelligente qui s'ouvre à distance"
            ],
            parler: [
                "Sésame, ouvre toi !",
                "... Bien essayé"
            ],
            utiliser: "Je ne peux ni l'atteindre, ni l'ouvrir de mes mains",
            pousser: "Hmm, non",
            tirer: "Hmm, non",
        },
        coffeMachine: {
            donner: "",
            ouvrir: "Hmm, je l'ouvrirai quand j'aurai de quoi la remplir",
            fermer: "Elle est déjà fermée",
            prendre:  [
                '"Il faut prendre le problème à bras-le-corps" qu\'il disait',
                "Non merci. Si je veux du café, autant le faire à la machine directement"
            ],
            regarder: () => {
                if (!coffeMachine.waterFilled && !coffeMachine.coffeFilled) {
                    return [
                        "La machine à expresso, du nectar pour les jeunes cadres dynamiques",
                        "Actuellement elle n'a pas de capsule et le réservoir d'eau est vide"
                    ];
                } else if (coffeMachine.waterFilled && !coffeMachine.coffeFilled) {
                    return [
                        "La machine à expresso, du nectar pour les jeunes cadres dynamiques",
                        "J'ai mis de l'eau dans la machine"
                    ];
                } else if (!coffeMachine.waterFilled && coffeMachine.coffeFilled) {
                    return [
                        "La machine à expresso, du nectar pour les jeunes cadres dynamiques",
                        "J'ai inséré la capsule mais sans eau, même le meilleur café ne pourra pas couler."
                    ];
                } else if (coffeMachine.waterFilled && coffeMachine.coffeFilled && !coffeMachine.poisoned) {
                    return [
                        "La machine à expresso, du nectar pour les jeunes cadres dynamiques",
                        "Je pourrais lancer la machine mais il manque encore quelque chose"
                    ];
                } else if (coffeMachine.poisoned) {
                    return [
                        "Qui veut un petit verre de Turbo Sommeil ?",
                        "Il est pas impossible que j'aie pété la machine avec ces carabistouilles"
                    ];
                }
            },
            parler: "what else ?",
            utiliser: () => { 
                if (menuItemCoffePod.isActive) {
                    coffeMachine.coffeFilled = true;
                    return "Ne dit-on pas que c'est dans les vieilles capsules qu'on fait les meilleurs cafés ?";
                } else if (menuItemGlassWater.isActive) {   
                    coffeMachine.waterFilled = true;
                    return "J'ai rempli le réservoir d'eau de la machine";     
                } else if (coffeMachine.waterFilled && !coffeMachine.coffeFilled) {
                    return [
                        "Si j'étais british, j'aurais pu me contenter d'un nuage de lait avec de eau chaude",
                        "Mais fort heureusement pour moi, je bronze au soleil et je parle plus d'une seule langue"
                    ]
                } else if (coffeMachine.coffeFilled && !coffeMachine.waterFilled) {
                    return "Il manque de l'eau dans la machine";
                } else if (coffeMachine.coffeFilled && coffeMachine.waterFilled && menuItemTabletPack.isActive) {
                    coffeMachine.poisoned = true;
                    return [
                        "Bonne idée, s'il fait une petite sieste je pourrai accéder à son ordinateur",
                        "Ceci dit j'ai peur que caféine annule l'effet du somnifère",
                        "Bon autant mettre toute la tablette. De toute façon, à part faire un gros dodo qu'est-ce qu'il risque ?",
                        "Il ne me reste plus qu'à lancer la machine"
                    ]
                } else if (coffeMachine.coffeFilled && coffeMachine.waterFilled && !coffeMachine.poisoned) {
                    return "Hmmm... J'ai comme l'impression qu'il manque quelque chose";
                } else if (coffeMachine.coffeFilled && coffeMachine.waterFilled && coffeMachine.poisoned) {
                    return ""
                } else {
                    return "Je me ferais bien un café, mais elle est vide pour le moment";
                }
            },
            pousser: "Hmm, non",
            tirer: "Hmm, non",
        },
        goldkey: {
            donner: "Ça ne m'avancera à rien",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: [
                "Toi, dans ma poche",
                "Je me demande ce qu'elle peut bien ouvrir ?"
            ],
            regarder: "une petite clé dorée est posée sur l'armoire",
            parler: "Hmm, non",
            utiliser: "Ça ne m'avancera à rien",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",            
        },
        trash: {
            donner: "Ça ne m'avancera à rien",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: () => { 
                if (!coffePicked) {
                    coffePicked = true;
                    return [
                "Il y a une petite capsule de café usagée au fond de la poubelle",
                "Je vais la récupérer"
            ];
            } else {
                return "Plus je ne vois rien d'autre d'intéressant dans ce tas d'ordures";
            }
            },
            regarder: [
                "Une petite corbeille à papier remplie de déchets alimentaires",
                "Je me disais bien que ce petit fumet de pourri ne venait pas de nulle part"
            ],
            parler: "Hmm, non",
            utiliser: "Ça ne m'avancera à rien",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",            
        },
        poster: {
            donner: "Ça ne m'avancera à rien",
            ouvrir: "J'aime bien l'idée, mais le displate semble bien accroché",
            fermer: "Ça ne m'avancera à rien",
            prendre: [
                "Même si j'avais besoin de décorer mon logement, j'aimerais éviter qu'il ait l'air d'une chambre d'ado de 15 ans",
                "Sérieusement, le type qui habite ici a la 30aine passée, mais il ne semble pas avoir passé l'âge",
                "Hahaha...",
                "Bon on a évité le pire, ça aurait pu être un displate de One Piece"
            ],
            regarder: [
                "Un displate de ce qui semble être un moine armé d'un sabre de lumière suivi par un petit robot en forme de corbeille à bascule",
                "Etrangement, le displate n'est pas simplement collé au mur, mais vissé à une plaque métallique"
            ],
            parler: "Je sens une perturbation dans la force...",
            utiliser: "Ça ne m'avancera à rien",
            pousser: "Impossible, il est solidement fixé",
            tirer: "Impossible, il est solidement fixé",            
        },
        boutdemetalShine: {
            donner: "Ça ne m'avancera à rien",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: "ça pourra toujours m'être utile",
            regarder: "Un bout de métal assez fin s'est détaché du meuble lorsque j'ai refermé le tiroir",
            parler: "Hmm, non",
            utiliser: "Hmm, non",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
        },
        menuItemGoldKey: {
            donner: "",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: "",
            regarder: "Je me demande ce qu'elle peut bien ouvrir ?",
            parler: "Ça ne m'avancera à rien",
            utiliser: "",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
            item: true,
        },
        menuItemGlassWater: {
            donner: "",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: "",
            regarder: "Le verre est rempli d'eau",
            parler: "Ça ne m'avancera à rien",
            utiliser: "",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
            item: true,
        },
        menuItemGlassCoffe: {
            donner: "",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: "",
            regarder: "Un cocktail fait maison aux mille saveurs",
            parler: "Ça ne m'avancera à rien",
            utiliser: "",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
            item: true,
        },
        menuItemGlassWaterEmpty: {
            donner: "",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: "",
            regarder: "Le verre est vide",
            parler: "Ça ne m'avancera à rien",
            utiliser: "",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
            item: true,            
        },
        menuItemMetalStrip: {
            donner: "",
            ouvrir: "Ça ne m'avancera à rien",
            fermer: "Ça ne m'avancera à rien",
            prendre: "",
            regarder: "Un bout de métal plat qui s'est décroché du tiroir",
            parler: "Ça ne m'avancera à rien",
            utiliser: "",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
            item: true,            
        },
        menuItemTabletPack: {
            donner: "",
            ouvrir: "Tant que je n'ai pas trouvé quoi en faire je préfère ne pas les éparpiller",
            fermer: "Ça ne m'avancera à rien",
            prendre: "",
            regarder: [
                "Donormyl Ultra©",
                '"Pour un sommeil profond comme le tunnel de Morphée"',
                "Médicament à ne pas prendre avant 15 ans...",
                "...ni avant de compléter le rituel Dafu Mamé",
                "Wow ça a l'air puissant",

            ],
            parler: "Ça ne m'avancera à rien",
            utiliser: "",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
            item: true, 
        },
        menuItemCoffePod: {
            donner: "",
            ouvrir:   [
                "Merci, fouiller dans cette corbeille était déjà une expérience très désagréable",
                "Et j'ai pas non plus envie d'avoir du café périmé plein les mains",
            ],
            fermer: "Ça ne m'avancera à rien",
            prendre: "",
            regarder: [
                "Une capsule de café qui ne semble avoir été percée qu'une fois",
                "Sur youtube j'ai vu un gars que pour économiser, il utilisait au moins 4 à 5 fois la même infusion",
                "Non ce n'est pas de être un rat, on appelle ça 'consommer avec parcimonie'"
            ],
            parler: "Ça ne m'avancera à rien",
            utiliser: "",
            pousser: "Ça ne m'avancera à rien",
            tirer: "Ça ne m'avancera à rien",
            item: true, 
        },
    };

    // Pour tous les sprites interactifs à l'écran
    interactableSprites.forEach(interactableSprite => {
                    // On définit tous les sprites interactifs comme "non cliqué" au départ
                    interactableSprite.clicked = false;

                    // Lorsqu'on clic sur un sprite, il devient ".clicked === true"
                    interactableSprite.on('click', async () => {
                            // On empêche plusieurs clics simultanés, si le sprite est déjà cliqué, on retourne
                            if (!interactableSprite.clicked) {
                                interactableSprite.clicked = true;
                            }
                            await spriteActionPlayerText();

                        // Une fois le sprite cliqué, on le repasse immédiatement en false
                        interactableSprite.clicked = false;
                        // console.log (interactableSprite.label, interactableSprite.clicked, 'exécuté');
                    });
    });

    // Méthode permettant d'ajouter divers ajout de texte en fonction du sprite cliqué
    async function spriteActionPlayerText() {
        const activatedMenuButton = menuButtonsArray.find(button => button.isActive === true); // Cherche quel est le bouton d'action actif
        const clickedSprite = interactableSprites.find(sprite => sprite.clicked === true); // Cherche quel est le sprite cliqué
    
        // Si un bouton d'action est actif et qu'un sprite interagissable est cliqué
        if (activatedMenuButton && clickedSprite) {
            // On récupère le comportement spécifique pour ce sprite et cette action
            const spriteName = clickedSprite.label; // Le nom du sprite
            const action = activatedMenuButton.action; // L'action associée au menuButton activé
            
            // Si le sprite fait partie des sprites interagissables et qu'il possède une action (même si cette action est vide)
            if (spriteBehaviors[spriteName] && (spriteBehaviors[spriteName][action] || spriteBehaviors[spriteName][action] === "")) {
          
                            // EXCEPTION de comportement pour le sprite réveil-matin avec l'action "regarder"
                            if (spriteBehaviors[spriteName][action] === spriteBehaviors.reveil.regarder) {
                            currentDate = new Date();
                            currentHour =  currentDate.getHours();
                            currentMinutes =  currentDate.getMinutes();
                            currentTimeHourMinutes = `${currentHour}:${currentMinutes}`;
                            
                            if (currentHour >= 11 && currentHour < 22) {
                                spriteBehaviors.reveil.regarder = [
                                    `Le réveil-matin indique ${currentTimeHourMinutes}`,
                                    "Et il dort toujours ???"
                                ];
                            } else if (currentHour >= 22 || currentHour < 6) {
                                spriteBehaviors.reveil.regarder = [
                                    `Le réveil-matin indique ${currentTimeHourMinutes}`,
                                    "Hmmm, il fait encore nuit, normal qu'il dorme à cette heure"
                                ];
                            } else {
                                // Entre 6h et 11h
                                spriteBehaviors.reveil.regarder = [
                                    `Le réveil-matin indique ${currentTimeHourMinutes}`,
                                    "Il ne devrait pas tarder à se réveiller"
                                ];
                            }
                        }
                
                        // Alors on définit l'action qui va être exécutée (ex spriteBehaviors.ordi.utiliser)
                        const actionEvent = spriteBehaviors[spriteName][action];

                        // Si cette action n'est pas un simple TEXTE, mais une véritable ACTION COMPLEXE (fonction)
                        if (typeof actionEvent === "function") {
                            const result = actionEvent();
                            if (Array.isArray(result)) {
                                await displayTextSequence(result, 3000);
                            } else if (typeof result === "string") {
                                await displayText(result, 3000);
                            }

                        // Si l'actionEvent n'est pas un simple TEXTE, mais un plusieurs LIGNES DE TEXTES
                        } else if (Array.isArray(actionEvent)) {
                            await displayTextSequence(actionEvent, 3000); // On affiche la séquence entière

                        // Si l'actionEvent est une simple ligne de TEXTE, alors on l'affiche
                        } else {
                            await displayText(actionEvent, 3000); // On affiche le texte
                            // activatedMenuButton.isActive === false;
                        }

            // Si le sprite n'a pas d'action prévue...
            } else {
                    await displayText("Non, ça ne marchera pas.", 3000); 
            }

        } 
    }

  
    // METHODE QUI AFFICHE LES REACTIONS DU JOUEUR 
    function displayText(text, time) {
        //Annuler toute séquence active
        currentTextSequenceTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        currentTextSequenceTimeouts = [];
        if (currentTextSequence) {
            currentTextSequence.destroy();
            currentTextSequence = null;
        }
            
        // Annule le précédent timeout s’il existe
        if (currentTextTimeout) {
            clearTimeout(currentTextTimeout);
        }

        // Détruit la précédente ligne de réaction (Seulement Ok s'il n'y a qu'une ligne de réaction)
        if (currentText) {
            currentText.destroy();
        }
        currentText = new PIXI.Text({ text: text, style: dialogueStyle2 });
        currentText.anchor.set(0.5);
        currentText.zIndex = 99;
        currentText.x = houseContainer.width / 2 ;
        currentText.y = houseContainer.y + (houseContainer.height * 0.3);
        houseContainer.addChild(currentText);

        // Lance un nouveau timeout et stocke son identifiant
        currentTextTimeout = setTimeout(() => {
                        currentText.destroy();
                        currentText = null;
                        currentTextTimeout = null;
                    }, time);
    }

    // METHODE QUI AFFICHE LES REACTIONS DU JOUEUR SI IL Y EN A PLUS D'UNE
    async function displayTextSequence(textSequence, time) {

        // Annule et nettoie les anciens timeouts
        currentTextSequenceTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        currentTextSequenceTimeouts = [];

        // Détruit le texte en cours s'il existe
        if (currentText) {
            currentText.destroy();
            currentText = null;
        }

         // Vérifie et annule une séquence précédente si elle existe
        if (currentTextSequence) {
            currentTextSequence.destroy();
            currentTextSequence = null;
        }

        // Affiche chaque texte du tableau avec un délai entre chaque
        textSequence.forEach((text, index) => {
        const timeoutId = setTimeout(() => {
            // Supprime l’ancien texte s’il y en a un
            if (currentTextSequence) {
                currentTextSequence.destroy();
            }
            
            // Crée et affiche le nouveau texte
            currentTextSequence = new PIXI.Text({ text: text, style: dialogueStyle2 });
            currentTextSequence.anchor.set(0.5);
            currentTextSequence.zIndex = 99;
            currentTextSequence.x = houseContainer.width / 2;
            currentTextSequence.y = houseContainer.y + (houseContainer.height * 0.3);
            houseContainer.addChild(currentTextSequence);

            // Auto-destruction du texte affiché après `time` ms
            const destroyId = setTimeout(() => {
                if (currentTextSequence) {
                    currentTextSequence.destroy();
                    currentTextSequence = null;
                }
            }, time);

            currentTextSequenceTimeouts.push(destroyId); // Stocke ce timeout aussi

        }, index * (time + 300));
        currentTextSequenceTimeouts.push(timeoutId);
    });
        
    }

    return {
        wakeUpText,
        wakeUpText2,
        wakeUpText3,
        startDialogue,
        wakeUpResponses,
        responseStyle,
        dialogueStyle,
        dialogueStyle2,
        dialogueStyleLong,
        titleStyle,
        titleStyle2,
    };

}