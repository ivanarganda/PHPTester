import { loadAppLaptopMobile } from "./loadAppLaptopMobile.js";
import { deleteBufferFiles } from "./sessions.js";
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

            let files = ``;
            array_files.forEach(item => {
                files += `<li>${item[0]}</li><br>`;
            });

            $('.layout').append(`<div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="modal-content__close">&times;</span>
                    <ul class="modal-content__list">
                        ${files}
                    </ul>
                    <ul class="modal-content__buttons">
                        <button id='deleteBufferFiles'>Delete temp files</button>
                    </ul>
                </div>
            
            </div>`);

            $('#deleteBufferFiles').on('click',()=>{
                deleteBufferFiles();
                $('#myModal').html('').hide();
            })

            $('.modal-content__close').on('click',()=>{
                $('#myModal').html('').hide();
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