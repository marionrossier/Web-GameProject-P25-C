function getLevelData(level) {
    switch (level) {
        case 1:
            return {
                map: summerLevel1Map,
                gameEntities: summerLevel1Entities,
                world: summerLevel1World
            };
        // case 2: return { map: summerLevel2Map, gameEntities: summerLevel2Entities, world: summerLevel2World };
        // case 3: etc.
        default:
            console.error("Level not found:", level);
            return null;
    }
}
