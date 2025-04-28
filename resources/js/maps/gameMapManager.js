function getLevelData(level) {
    switch (level) {
        case 1:
            return {
                map: summerLevel1Map,
                gameEntities: summerLevel1Entities,
                world: summerLevel1World
            };
        case 2:
            return {
                map: autumnLevel1Map,
                gameEntities: autumnLevel1Entities,
                world: autumnLevel1World
            };
        case 3:
            return {
                map: winterLevel1Map,
                gameEntities: winterLevel1Entities,
                world: winterLevel1World
            };
            //TODO : Créer les maps restantes !
        // case 4:
        //     return {
        //         map: summerLevel2Map,
        //         gameEntities: summerLevel2Entities,
        //         world: summerLevel2World
        //     };
        // case 5:
        //     return {
        //         map: autumnLevel2Map,
        //         gameEntities: autumnLevel2Entities,
        //         world: autumnLevel2World
        //     };
        // case 6:
        //     return {
        //         map: winterLevel2Map,
        //         gameEntities: winterLevel2Entities,
        //         world: winterLevel2World
        //     };
        // case 7:
        //     return {
        //         map: summerLevel3Map,
        //         gameEntities: summerLevel3Entities,
        //         world: summerLevel3World
        //     };
        // case 8:
        //     return {
        //         map: autumnLevel3Map,
        //         gameEntities: autumnLevel3Entities,
        //         world: autumnLevel3World
        //     };
        // case 9:
        //     return {
        //         map: winterLevel3Map,
        //         gameEntities: winterLevel3Entities,
        //         world: winterLevel3World
        //     };
        default:
            console.error("Level not found:", level);
            return null;
    }
}
