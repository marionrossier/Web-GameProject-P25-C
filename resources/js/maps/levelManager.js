function getLevelData(level) {
    switch (level) {
        case 1: {
            const level = new SummerLevel1();
            return {
                map: level.summerLevel1Map,
                gameEntities: level.summerLevel1Entities,
                world: level.summerLevel1World
            };
        }
        case 2: {
            const level = new AutumnLevel1();
            return {
                map: level.autumnLevel1Map,
                gameEntities: level.autumnLevel1Entities,
                world: level.autumnLevel1World
            };
        }
        case 3: {
            const level = new WinterLevel1();
            return {
                map: level.winterLevel1Map,
                gameEntities: level.winterLevel1Entities,
                world: level.winterLevel1World
            };
        }
        case 4: {
            const level = new SummerLevel2();
            return {
                map: level.summerLevel2Map,
                gameEntities: level.summerLevel2Entities,
                world: level.summerLevel2World
            };
        }
        case 5: {
            const level = new AutumnLevel2();
            return {
                map: level.autumnLevel2Map,
                gameEntities: level.autumnLevel2Entities,
                world: level.autumnLevel2World
            };
        }
        case 6: {
            const level = new WinterLevel2();
            return {
                map: level.winterLevel2Map,
                gameEntities: level.winterLevel2Entities,
                world: level.winterLevel2World
            };
        }
        case 7: {
            const level = new SummerLevel3();
            return {
                map: level.summerLevel3Map,
                gameEntities: level.summerLevel3Entities,
                world: level.summerLevel3World
            };
        }
        case 8: {
            const level = new AutumnLevel3();
            return {
                map: level.autumnLevel3Map,
                gameEntities: level.autumnLevel3Entities,
                world: level.autumnLevel3World
            };
        }
        case 9: {
            const level = new WinterLevel3();
            return {
                map: level.winterLevel3Map,
                gameEntities: level.winterLevel3Entities,
                world: level.winterLevel3World
            };
        }
        default:
            console.error("Level not found:", level);
            return null;
    }
}
