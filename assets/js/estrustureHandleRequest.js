import { regexes } from "./regexes.js";

const getLine = ( delimiter , output ) =>{

    // return output.split( delimiter )[1].trim().replace( /(\/\w+)+(.[a-zA-Z0-9]+)(on line)/g , '' ).replace('<br />','');
    return output.split( delimiter )[1].trim().replace( regexes['REGEX_URL_REPLACE'] , '').replace('<br />','');

}

const getMessage = ( delimiter , output ) =>{

    return output.split( delimiter )[0] + ' line ';

}

const requestEstrustureHandleRequest = async( output )=>{

    const data = new FormData();

    data.append( 'output' , output );

    const response = await fetch( $('#url_request_parse_output_msg').text() , { mode:'cors' , method:'POST' , body:data } );

    return response.ok ? response.text() : Promise.reject( response );

}

export const estrustureHandleRequest = async( output )=>{

    output = output.replace( /<b>|<\/b>/g , '' );

    console.log( output );

    requestEstrustureHandleRequest( output )
    .then( delimiter =>{

        // from the output message manipulate the line by three less that so the script php does not take accound the three first lines ( try{} )
        let line = 3 - parseInt(getLine( delimiter , output ).replace( 'on line' , '' ));

        line = Math.abs(line);

        let message = getMessage( delimiter , output );

        console.log( line );

        $('#board__output').html( message + line );

    })
    .catch( error => { console.log( error ); $('#board__output').html( error ); })

}