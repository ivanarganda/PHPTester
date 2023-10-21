import { loadAppLaptopMobile } from "./loadAppLaptopMobile.js";
import { createModal } from "./modal.js";
import { createIdUserSession, deleteBufferFiles } from "./sessions.js";
// Common functions which will be useful in both mobile and pc
// Request functions
const requestVersions = async()=>{

    const response = await fetch( $('#url_request_versions_php').text() , { mode:'cors' } );

    return response.ok ? response.text() : Promise.reject( response );

}

const requestChangeVersion = async( version )=>{

    const data = new FormData();

    data.append( 'version' , version );

    const response = await fetch( $('#url_request_change_version').text() , { mode:'cors' , method:'POST' , body:data } );

    return response.ok ? response.json() : Promise.reject( response );

}

const requestCheckingBufferFiles = async()=>{

    const response = await fetch( $('#url_request_buffer_files_data').text() , { mode:'cors' } );

    return response.json();

}

const requestCheckingReminder = async()=>{
    const response = await fetch( $('#url_request_check_reminder').text() , { mode:'cors' } );
    return await response.json();
}

const getReminder = async()=>{

    return new Promise((resolve)=>{

        resolve(requestCheckingReminder());

    }) 

};

// normal functions
const changeVersion = ( version )=>{

    requestChangeVersion( version )
    .then( ( response )=>{
        console.log( response );
    })
    .catch( ( error )=>{ console.log( error ); } )

}

const loadVersions = ()=>{

    requestVersions()
    .then( ( versions )=>{
        console.log( versions );
        $('#buttons_droppown-list-versionsPHP').html( versions );
    })
    .catch( ( error )=>{
        console.log( error );
    })
}

// Once user starts app , it will order him , in case he has remaning files session data saved, to delete them
const checkBufferFiles = ()=>{

    const files_buffer = requestCheckingBufferFiles();

    files_buffer.then( ( data ) => { 

        let array_files = data.filter( (x) => { return x != '' });

        if ( array_files.length !== 0  ){

            createModal( 1 , array_files ); // modal for info

            const responseReminder = getReminder();

            responseReminder.then((res)=>{ 

                console.log( res );
                
                if ( res === 'existReminder' ){

                    $('#myModal').html('').hide();

                }
            
            });

            $('#btn-modal__deleteBufferFiles').on('click',()=>{

                deleteBufferFiles();
                $('#myModal').html('').hide();

            })

            $('.modal__close').on('click',()=>{

                $('#myModal').html('').hide();

            })

            // Create a temp file reminder to as user refresh browser again, wether this one exists, it wont show modal again
            $('#btn-modal__doNotRemind').on('click',()=>{

                let reminder = createIdUserSession() + '_reminder_.txt';
                console.log( reminder );

                const data = new FormData;

                data.append( 'filename' , reminder );

                fetch( $('#url_request_create_no_reminder').text() , { mode:'cors' , method:'POST' , body:data  } )
                .then( response => response.text()  )
                .then( ( file )=>{ console.log(file); $('#myModal').html('').hide(); } )
 
            })

        }

    })

}

const checkDeviceUsing = ()=>{

    const updateWidthDisplay = ()=>{

        var widthDisplay = $(window);
        widthDisplay.textContent = window.innerWidth;
        console.log( widthDisplay.textContent );
        return widthDisplay.textContent;

    }

    // Add an event listener for the window's resize event
    window.addEventListener("resize", updateWidthDisplay);

    // Initialize the width display

    var isMobile = false;

    // Check the user agent string for common mobile keywords
    var mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 'opera mini', 'windows phone', 'windows mobile', 'symbian', 'mobile', 'mini', 'palm', 'smartphone'];
    var userAgent = navigator.userAgent.toLowerCase();

    for (var i = 0; i < mobileKeywords.length; i++) {
        if (userAgent.indexOf(mobileKeywords[i]) > -1) {
            isMobile = true;
            break;
        }
    }

    if ( isMobile && updateWidthDisplay() < 700 ) {

        console.log("You are using a mobile device.");
        loadAppLaptopMobile( true );

    } else {

        loadAppLaptopMobile( false );
        console.log("You are using a PC , laptop or tablet.");

    }

}

// Onchange event in droppown list php version
$('#buttons_droppown-list-versionsPHP').on('change',(event)=>{

    if ( event.target.value == '' ){ 
        return false; 
    }

    changeVersion( event.target.value );

})

checkDeviceUsing();
loadVersions();
checkBufferFiles();