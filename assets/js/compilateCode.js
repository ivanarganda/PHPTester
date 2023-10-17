import { getRandomInt } from "./random.js";
import { estrustureHandleRequest } from "./estrustureHandleRequest.js"; // Manipulate response of request code compilation
import { createIdUserSession , deleteBufferFiles } from "./sessions.js";

// Request functions
const requestCompilateCode = async( file )=>{   

    const response = await fetch( $('#url_request_output_code_compiled').text() + file , { mode:'cors' } );

    return response.ok ? response.text() : Promise.reject( response );
        
}

// Normal functions
const createLoaderBoard = ()=>{

    $('.board-right').addClass('spinner-wrapper');
    $('.board-right article').removeClass('board_output').addClass('spinner');

}

const removeLoaderBoard = ()=>{

    $('.board-right').removeClass('spinner-wrapper');
    $('.board-right article').addClass('board_output').removeClass('spinner');

}


export const startCompilation = ( board_code , isMobile )=>{

    createLoaderBoard();

    let startTime = new Date().getTime(); // Execution time startup
    
    let newfile = $('#url_php_File').text() + 'file_' + getRandomNameFile() + '.php';

    const data = new FormData();

    data.append( 'file' , newfile );
    data.append( 'sessionId' , createIdUserSession() );
    data.append( 'code' , $(board_code).val() );

    fetch( $('#url_request_create_file').text() , { mode:'cors' , method:'POST' , body:data } )

    .then( ( response => response.text() ) );

    setTimeout(()=>{

        compilateCode( newfile.replace( $('#url_php_File').text() , '' ) );

        let endTime = new Date().getTime(); // Execution time end

        let executionTime = ( endTime - startTime ) / 1000;
    
        console.log( executionTime - 1 ); // Remove 1 seconds due to remaining time of setTimeOut

        // Only this function for mobile, when user exect code compilation,
        if ( isMobile ){

            console.log( 'scrolling to output' );

            let windowHeight = $( window ).height();

            $(window).scrollTop( windowHeight );

        }

        removeLoaderBoard();
        deleteBufferFiles();

    }, 1000);

}

export const compilateCode= async( file )=>{

    const deleteFile = ( file )=>{

        const data = new FormData();

        data.append( 'file' , file );

        fetch( $('#url_request_delete_file').text() , { mode:'cors' , method:'POST' , body:data } )
        .then( response => { response.ok ? console.log('ok') : console.log( 'error' );})

    }

    requestCompilateCode( file )
    .then( output => {

        console.log( output );

        if ( output.includes( '<br />' ) ){ // The tipical error of php contains a curious br which is not so common like we see in html

            estrustureHandleRequest( output );

        } else {

            $('#board__output').html( output );

        }

        deleteFile( file );

    })
    .catch( ( error ) => { console.log( error ); 
        
        $('#board__output').html( error );

        deleteFile( file );
    
    })

}

export const getRandomNameFile = ()=>{

    let code = 'abcdefghijyz12345678910';

    let chars = 12;

    let name = '';

    while ( chars > 0 ){

        let randomNumbers = getRandomInt( 0 , code.length - 1 );

        name+=code[ randomNumbers ];

        chars--;

    }

    name+= 'file' + name;

    return decodeURIComponent(name);

}