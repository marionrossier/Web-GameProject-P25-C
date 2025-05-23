// const map = new RandomMap();
// const generated = map.generateMaze();
//
// /*
// tableInLoglog(generated);
//
// function tableInLoglog(table) {
//     for (let i = 0; i < HEIGHT; i++) {
//         let row = "";
//         for (let j = 0; j < WIDTH; j++) {
//             row += table[i * WIDTH + j] + " ";
//         }
//         console.log(row);
//     }
// }
//
// */
//
//
// //exemple de pack de texture
// const testworldSkin = ["white", "green", "red", "black", "yellow"];
//
// //exemple de map brute
// const mapTable = [
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
// ];
//
// const gameEntities = {
//     enemies: {
//         enemy1 : new Enemy(1, 21, 2, 21, 2, this, 0),
//         enemy2 : new Enemy(2, 2, 15, 16, 2, this, 0)
//     },
//     lives:{
//         life1 : new Life(0, 19, 7, this)
//     },
// };
//
// world = 1;
//
// outsideSkin = new OutsideSkin(world);
// waySkin = new WaySkin(world);
// treeSkin = new TreeSkin(world);
//
// let app = new Motor(2, mapTable, outsideSkin, waySkin, treeSkin, gameEntities, 0);
//
// // Déclenche l'exécution
// /*main doit etre donné :
//     -un tableau
//     -un pack de texture avec couleur : 0 chemin, 1 mur, 2 vie, 3 ennemies, 4 souris, 5 Chemin pour image obstacle
//     -et size    ( a mettre a 0 si le tableau est en 25 sur 17 avec 40 SizePixel
//                 et a mettre a 1 si le tableau est en 1000 sur 700 avec 1 SizePixel) */
//
