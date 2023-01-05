// import * as fs                          from "fs";
// import * as __                          from "./tools/__";
// import * as report                      from "./tools/logger"
// import * as server_الكافي                  from "./server/الكافي";
// import * as server_وسائل_الشيعة             from "./server/وسائل‌الشيعة";
// import * as server_نهج_البلاغة              from "./server/نهج‌البلاغة";
// import * as server_مستدرك_الوسائل           from "./server/مستدرك‌الوسائل";
// import * as storage                     from "./tools/storage";
// import * as tools                       from "./tools/tools";
// import * as TS                          from "./types/types";
// import * as WS                          from "worker_threads";

// // .. ====================================================================

// let tmpFolder = "tmp/";
// let db: TS.db;

// // .. for: await picker_maker();
// let copy_db: TS.db;
// let path = "source/mix-collection.json";
// // .. read mix-db
// let mix_db: TS.db = JSON.parse( fs.readFileSync( path, 'utf8' ) );
// let copy_mix_db: TS.db = JSON.parse( fs.readFileSync( path, 'utf8' ) );

// // .. ====================================================================

// async function run () {

//     let n_pad;

//     // n_pad = await server_الكافي.ignite( "Cached", n_pad || 1 );
//     // n_pad = await server_وسائل_الشيعة.ignite( "Cached", n_pad || 15414 );
//     // n_pad = await server_نهج_البلاغة.ignite( "Cached", n_pad || 51282 );
//     // n_pad = 55792 // .. نهج‌الفصاحة => n_pad = 55792;
//     // n_pad = server_مستدرك_الوسائل.ignite( "Scratch", n_pad );
//     // n_pad = 55792 // .. مستدرك‌الوسائل => n_pad = 80913;

//     // let نهج_الفصاحة_db = JSON.parse( fs.readFileSync( "db/نهج‌الفصاحة.json", 'utf8' ) );
//     // let مستدرك_الوسائل_db = JSON.parse( fs.readFileSync( "db/مستدرك‌الوسائل.json", 'utf8' ) );

//     // // .. merge all DBs
//     // db = [ 
//     //     ...server_الكافي.db,
//     //     ...server_وسائل_الشيعة.db, 
//     //     ...server_نهج_البلاغة.db,
//     //     ...نهج_الفصاحة_db,
//     //     ...مستدرك_الوسائل_db
//     // ];

//     // let R = await __.getFinalR( db );
//     // // .. get db-s
//     // await __.db_db( db, R );

//     // copy_db = JSON.parse( JSON.stringify( مستدرك_الوسائل_db ) )
//     // await picker_maker( مستدرك_الوسائل_db );


//     // mix_db = mix_db.filter( x => !x.d || 
//     //     !(
//     //         x.d.toString().includes( "الكافي" ) ||
//     //         x.d.toString().includes( "كافى" ) ||
//     //         x.d.toString().includes( "كافي" ) ||
//     //         x.d.toString().includes( "کافی" ) ||
//     //         x.d.toString().includes( "کافي" ) ||
//     //         x.d.toString().includes( "نهج البلاغه" ) 
//     //     ) 
//     // );
//     // storage.saveData( mix_db, "db", "more" );


// }

// // .. ====================================================================

// // .. remove duplicated items from mix-collection based on new-born DB
// async function picker_maker ( db: TS.db ) {

//     let time = new Date().getTime();

//     // .. return cached
//     if ( fs.existsSync( path ) ) {

//         // .. prepare DBs
//         db = tools.addTmpProps( db );
//         mix_db = tools.addTmpProps( mix_db );
//         console.log(mix_db.length);

//         for ( let i in mix_db ) {
//             if ( !(Number(i) % 50) ) report.timer( Number(i), mix_db.length, time, 4 )
//             await pick_make_one( mix_db[i], db );
//         }

//         // .. save DBs
//         storage.saveData( copy_mix_db, "source", "mix-collection" );
//         storage.saveData( copy_db, "db", "مستدرك‌الوسائل" );

//         console.log(copy_mix_db.length);

//     }
//     else console.log( "mix-db not Found!" );

// }

// // .. ====================================================================

// async function pick_make_one ( item: TS.db_item, db: TS.db ) {

//     let R = await tools.R_Searcher( item, db, true );

//     let org: TS.db_item;
//     let patch: TS.db_item;

//     if ( R.length ) {

//         R = R.reduce( (selected, nextOne) => {
//             if ( nextOne[2] > selected[0][2] ) selected = [nextOne];
//             return selected;
//         } , [[0,0,0]] );

//         org = copy_db.find( x => x.n === R[0][1] );
//         patch = copy_mix_db.find( x => x.n === R[0][0] );

//         // .. transfer some data
//         if ( !org.b && patch.b ) org.b = patch.b;
//         if ( org.c === null && patch.c !== null ) org.c = patch.c;

//         // .. remove this cell
//         copy_mix_db.splice( copy_mix_db.findIndex( x => x.n === R[0][0] ), 1 );

//     }

// }

// // .. ====================================================================

// // .. major init function
// ( async function self_ignite () {
//     // .. reset terminal
//     console.clear();
//     // .. create title
//     report.notify();
//     // .. actual steps goes here:
//     await run();
//     // .. wait a bit
//     await new Promise( _ => setTimeout( _, 700 ) );
//     // .. end of the application
//     report.notify( null, true );
//     report.clock();
//     // .. done.
// } )();

// // .. ====================================================================


// ! need to import 1 as 1 in all sure
// ! save zip path : /home/unifino/Documents/Moshaf/MoshafTracker/node_modules/npm-build-zip/index.js

import * as fs                          from "fs";
import * as QS from "../db/Q/Quran"

// console.log( QS.Quran );
// console.log( QS.Page );

let Quran: string[][][] = [];
let QO: string[] = [];


let tmpPage = [];
// .. build Pages
for ( let i=0; i<QS.Page.length-1; i++ ) {
    tmpPage = [];
    // .. write ayat-s
    for ( let x=QS.Page[i]; x<=QS.Page[i+1]-(i===603?0:1); x++ ) {
        // .. add BSM Except of first one and Other One
        if ( QS.Quran[x].ayah === 1 && QS.Quran[x].sura !== 1 )
            tmpPage.push( [ QS.Quran[x].sura === 9 ? "X" : "A" ] );
        // .. add ayat to the tmpPage
        tmpPage.push( QS.Quran[x].simple.split( " " ) );
        if ( QS.Quran[x].sajdeh ) tmpPage[ tmpPage.length -1 ].push( "S" );
    }
    // .. register the page
    Quran.push( tmpPage );
}

let list: { text: string, qty: number }[] = [];
let newList: { text: string, qty: number }[] = [];
let li: number;

// .. find low QTY values
let low_and_special_qty_words: string[] = [];
for ( let page_x in Quran ) {
    for ( let ayah_x in Quran[ page_x ] ) {
        for ( let word_x in Quran[ page_x ][ ayah_x ] ) {
            li = list.findIndex( y => y.text === Quran[ page_x ][ ayah_x ][ word_x ] );
            !~li ?
                list.push( { text: Quran[ page_x ][ ayah_x ][ word_x ], qty: 1 } ) :
                list[ li ].qty++;
        }
    }
}

// .. make a new List and update old one
for ( let x of list ) x.qty < 3 || x.text === "A" || x.text === "X" || x.text === "S" ? 
    low_and_special_qty_words.push( x.text ) : newList.push(x);

// .. replace code instead of text and build the output of Quran
let tmpAssist_1: string;
let tmpAssist_2: string;
for ( let page_x in Quran ) {
    tmpAssist_1 = "";
    for ( let ayah_x in Quran[ page_x ] ) {
        for ( let word_x in Quran[ page_x ][ ayah_x ] ) {
            if ( !low_and_special_qty_words.includes( word_x ) ) {
                li = newList.findIndex( y => y.text === Quran[ page_x ][ ayah_x ][ word_x ] );
                if ( ~li ) Quran[ page_x ][ ayah_x ][ word_x ] = li + "";
            }
            tmpAssist_2 = Quran[ page_x ][ ayah_x ].join( " " );
        }
        tmpAssist_2 = Quran[ page_x ][ ayah_x ].join( " " );
        tmpAssist_1 += tmpAssist_2 + ",";
    }
    QO.push( tmpAssist_1 );
}

fs.writeFileSync( 
    "../../../Desktop/testC.json", 
    JSON.stringify( { L: newList.reduce( (p,c)=>{ p.push(c.text); return p; },[]), Q: QO } )
)
