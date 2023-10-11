import { getRandomInt } from "./random.js";
import { estrustureHandleRequest } from "./estrustureHandleRequest.js"; // Manipulate response of request code compilation

const requestCompilateCode = async( file )=>{   

    const response = await fetch( $('#url_request_output_code_compiled').text() + file , { mode:'cors' } );

    return response.ok ? response.text() : Promise.reject( response );
        
}

export const startCompilation = ( board_code , isMobile )=>{

    let startTime = new Date().getTime(); // Execution time startup
    
    let newfile = getGeneratedFile();

    const data = new FormData();

    data.append( 'file' , newfile );
    data.append( 'code' , $(board_code).val() );

    fetch( $('#url_request_create_file').text() , { mode:'cors' , method:'POST' , body:data } )

    .then( ( response => response.text() ) );

    setTimeout(()=>{

        compilateCode( newfile.replace( '../../Data/' , '' ) );

        let endTime = new Date().getTime(); // Execution time end

        let executionTime = ( endTime - startTime ) / 1000;
    
        console.log( executionTime - 1 );

        // Only this function for mobile, when user exect code compilation,
        if ( isMobile ){

            console.log( 'scrolling to output' );

            let windowHeight = $( window ).height();

            $(window).scrollTop( windowHeight );

        }

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

        if ( output.includes( '<br />' ) ){

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

export const getGeneratedFile = ()=>{

    let code = 'abcdefghijyz12345678910';

    let chars = 12;

    let nameFile = '';

    while ( chars > 0 ){

        let randomNumbers = getRandomInt( 0 , code.length - 1 );

        nameFile+=code[ randomNumbers ];

        chars--;

    }

    nameFile+= 'file' + nameFile;

    return decodeURIComponent('../../Data/' + nameFile + '.php');

}