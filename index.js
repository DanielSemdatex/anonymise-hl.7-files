const fs = require( 'fs' );
const path = require( 'path' );
const HL7 = require('hl7-standard');
const util = require("util");
let fileContent
//let hl7 = new HL7

const fileDir = "C:\\Users\\dboiko\\IdeaProjects\\anonymise-hl.7-files\\unmodifiedFiles";
let familyName
const readFile = util.promisify(fs.readFile);
let a =  0;

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
            a++
            const originalSerialNumber = hl7.get('PID.3.1');
            console.log(originalSerialNumber)
            changePatientData (hl7, a, randomSerialNumber())
            const newSerialNumber = hl7.get('PID.3.1');
            console.log("neue Seriennummer " + newSerialNumber)

            console.log()
            const familyName = hl7.get('PID');
            console.log(JSON.stringify(familyName))
            const finalizedHL7 = hl7.build();

            fs.writeFileSync(filePath, finalizedHL7, 'utf8');
            replaceAll(originalSerialNumber,newSerialNumber)
        }}
    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
    }

})(); // Wrap in parenthesis and call now

function changePatientData (hl7, a, c) {
    hl7.set('PID.5.1', 'Test' + a);
    hl7.set('PID.5.2', 'Test' + a)
    hl7.set('PID.7', '19991212')
    hl7.set('PID.3.1', 'model:U228/serial:'+ c)
}

function randomSerialNumber() {
    let c = (Math.floor(Math.random() * (999999 - 0o00001) + 0o00001));
    return c
}

function replaceAll(originalSerialNumber,newSerialNumber) {
var re = new RegExp(originalSerialNumber, 'g');

addd = fileContent.replace(re, newSerialNumber);

return addd.replace(new RegExp(originalSerialNumber, 'g'), replace);
}
