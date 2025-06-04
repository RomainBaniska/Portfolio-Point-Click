

        // toileScreenProject3.addEventListener("click", () => {
        //     // destruction si existe
        //     const desc = projectDescriptions.get(toileScreenProject3);
        //     if (desc) {
        //         desc.destroy();
        //         projectDescriptions.delete(toileScreenProject3);
        //     }

        //     // On invisibilise les projets non sélectionnés
        //     toileScreenProject3.interactive = false;
        //     toileScreenProject1.visible = false;
        //     toileScreenProject2.visible = false;
        
        //     let targetX = toileScreen.x + (toileScreen.width / 2);
        
        //     // Premier Ticker qui fait glisser le screenProject3 vers la gauche
        //     let localTicker = new PIXI.Ticker();
        //     localTicker.add(() => {
        //         if (toileScreenProject3.x >= targetX) {
        //             toileScreenProject3.x -= 6;
        //         } else {
        //             localTicker.stop();
        //             console.log("fini!");
        
        //             // Deuxième Ticker qui agrandit screenProject3
        //             const targetWidth = toileScreen.width * 0.8;
        //             const targetHeight = toileScreen.height * 0.655;
        //             let scaleTicker = new PIXI.Ticker();
        //             scaleTicker.add(() => {
        //                 if (toileScreenProject3.width < targetWidth) {
        //                     toileScreenProject3.width += 10;
        //                     toileScreenProject3.height += (targetHeight / targetWidth) * 10;
        //                 } else {
        //                     toileScreenProject3.width = targetWidth;
        //                     toileScreenProject3.height = targetHeight;
        //                     scaleTicker.stop();

        //                     screenBackgroundContainer.addChild(introSlide);
        //                     // Troisième Ticker qui fait disparaitre le screenProject3
        //                     let alphaTicker = new PIXI.Ticker();
        //                     alphaTicker.add(() => {
        //                         if (toileScreenProject3.alpha > 0) {
        //                             toileScreenProject3.alpha -= 0.1;
        //                         } else {
        //                         alphaTicker.stop(); 
        //                         // screenBackgroundContainer.removeChild(toileScreenProject1);
        //                         screenBackgroundContainer.addChild(jsigneTitle);

        //                         // Ajout des logos d'intro
        //                         const screenFactor = toileScreen.width / 6000;

        //                         // HTML
        //                         logoHTML.scale.set(screenFactor);
        //                         logoHTML.x = toileScreen.x + (toileScreen.width / 2);
        //                         logoHTML.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
        //                         screenBackgroundContainer.addChild(logoHTML);

        //                         // JS
        //                         logoJS.scale.set(screenFactor);
        //                         logoJS.x = logoHTML.x - logoHTML.width;
        //                         logoJS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
        //                         screenBackgroundContainer.addChild(logoJS);

        //                         // PHP
        //                         logoPHP.scale.set(screenFactor);
        //                         logoPHP.x = logoJS.x - logoJS.width;
        //                         logoPHP.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
        //                         screenBackgroundContainer.addChild(logoPHP);

        //                         // CSS
        //                         logoCSS.scale.set(screenFactor);
        //                         logoCSS.x = logoHTML.x + logoHTML.width;
        //                         logoCSS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
        //                         screenBackgroundContainer.addChild(logoCSS);

        //                         // MongoDB
        //                         logoMongo.scale.set(screenFactor);
        //                         logoMongo.x = logoCSS.x + logoCSS.width;
        //                         logoMongo.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
        //                         screenBackgroundContainer.addChild(logoMongo);

        //                         setTimeout(() => {
        //                             launchProjectVideo(videoList2);
        //                         }, 3000);
        //                         }
        //                     });
        //                     alphaTicker.start();
        //                 }
        //             });
        //             scaleTicker.start();
        //         }
        //     });
        //     localTicker.start();
        // });