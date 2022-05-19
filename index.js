//jshint esversion:8
//jshint node:true
const fs = require( 'fs' );
const path = require( 'path' );
const HL7 = require('hl7-standard');
const util = require("util");


const fileDir = "C:\\Users\\dboiko\\IdeaProjects\\anonymise-hl.7-files\\unmodifiedFiles";
let familyName
const readFile = util.promisify(fs.readFile);

// Make an async function that gets executed immediately
(async ()=>{
    // Our starting point
    try {
        // Get the files as an array
        const files = await fs.promises.readdir( fileDir );

        // Loop them all with the new for...of
        for( const file of files ) {
            const filePath = `${fileDir}\\${file}`;
            const fileContent = await readFile(filePath);
            let hl7 = new HL7(fileContent.toString());
            hl7.transform(err => {
                if (err) throw err;
                // code here
            });
            const familyName = hl7.getSegments('PID.1');
            console.log(familyName)

    }}
    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
        }

})(); // Wrap in parenthesis and call now
