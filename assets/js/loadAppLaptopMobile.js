import { startCompilation } from "./compilateCode.js";
import { createIdUserSession } from "./sessions.js";
export const loadAppLaptopMobile = ( isMobile )=>{

    const getCurrentDate = ()=>{

        const date = new Date();
        let day = date.getDay() , month = date.getMonth() , year = date.getFullYear(),
              hour = date.getHours() , minutes = date.getMinutes() , seconds = date.getSeconds() , miliseconds = date.getMilliseconds();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hour = hour < 10 ? '0' + hour : hour;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        miliseconds = miliseconds < 10 ? '0' + miliseconds : miliseconds;
        miliseconds = miliseconds < 100 ? miliseconds + '0' : miliseconds;


        return `${day}-${month}-${year}-${hour}:${minutes}:${seconds}:${miliseconds}`;
            
    }

    const changeColor = ( type )=>{

        return {
            'color': type == 0 ? '#98b978' : '#7fff00'
        }
    
    }

    const deleteMultipleLines = ( board_code , squaresToRemove ) =>{

        board_code.value = board_code.value.slice( 0 , squaresToRemove[0][0] ) + board_code.value.slice( squaresToRemove[0][1] );

        console.log( board_code.value );

    }

    const recoveryData = ()=>{

        // Get the last element of array modified data to recovery it
         console.log( createIdUserSession() );

    }
    
    const resetTextarea = ( board_code )=>{
    
        let lines = board_code.value.split('\n');
    
        console.log( lines.length );
    
        if ( lines.length == 1 ){
    
            $(board_code).val('').val(`<?php
            `);
    
        }

        board_code.value.replace( /\s+/g , '' );
        board_code.value = board_code.value.slice(0,6);
    
    }

    const storeScrollPosition = () => {

        scrollTop = board_code.scrollTop;

    };

    // Helper function to restore the scroll position
    const restoreScrollPosition = () => {

        board_code.scrollTop = scrollTop;

    };
    
    const scrollBothLinesAndCode = ( activeContainer , pasiveContainer )=>{
    
            // Active container is who gonna make a scroll as pasive container makes what active makes
            /* For example: when I scroll down or up on board lines which is on side left of web page, he is the active as pasive is board code where I write the code*/
        
            let scrollPosition = $(activeContainer).scrollTop();
        
            let scrollThreshold = 10;
    
            if (scrollPosition > $(pasiveContainer).scrollTop() + scrollThreshold) {
                // Scroll down action
                console.log("Scrolling down");
                $(pasiveContainer).scrollTop( $(pasiveContainer).scrollTop() + 35 );
            
            } else if (scrollPosition < $(pasiveContainer).scrollTop() - scrollThreshold) {
                // Scroll up action
                isScrollingUp = true;
                console.log("Scrolling up");
                $(pasiveContainer).scrollTop( $(pasiveContainer).scrollTop() - 35 );
            
            }

            console.log( isScrollingUp );
    
    }   

    // It´s gonna be used to find available variables associated which You have written
    const searchAvailableVariables = ( e )=>{
        
        const pattern = /\$[a-zA-Z_]\w*\s/g;
        const matches = board_code.value.match(pattern);
        if ( matches ){

            const matches_unique = new Set( matches );

            const matches_unique_array = Array.from( matches_unique );

            console.log( matches_unique_array );

            let optionsList = ``;

            matches_unique_array.forEach( options => {
                optionsList+=`<option value='${options}'>${options}</option>`;
            });

            return optionsList;

        }

    }

    const autocomplete = ( e )=>{

        let start = e.target.selectionStart , end = e.target.selectionEnd;

        let lastCharacter = e.target.value[ end - 1 ];

        let isAutocompleting = false;

        let letter = '';

        if ( e.keyCode == 8 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 ){

            return true;

        } else {

            if ( lastCharacter === '(' ){

                letter = ')';
                isAutocompleting = true;

            }

            if ( lastCharacter === '{' ){

                letter = '}';
                isAutocompleting = true;
                
            }

            if ( lastCharacter === '$' ){
                // Make a list of available variables to autocomplete
                console.log( 'Listing available variables' );

                isAutocompleting = false

            }

        }

        if ( isAutocompleting ){

            board_code.value = board_code.value.substring(0, start) + letter + board_code.value.substring( end );

            let currentCursorPosition = start - 1;

            board_code.setSelectionRange( currentCursorPosition + 2   , currentCursorPosition + 2 );

            e.target.selectionStart = currentCursorPosition + 2;
            e.target.selectionEnd = currentCursorPosition + 2;

        }

    }
    
    const calculateLines = ( lines , board_lines )=>{
    
        let totalLines = '';
    
        lines.forEach( ( line , index ) => {
            totalLines+=`${(index+1)}<br>`;
        });
    
        $(board_lines).html(totalLines);
        
        if ( isTyping ){
    
           $(board_lines).scrollTop( $(board_lines)[0].scrollHeight + 20 );
        
        }
    
    }
    
    const changeSize = ( board_code , board_lines )=>{
    
        console.log( currentSizeFont );
    
        let style = ''+( 1.3 + (currentSizeFont/10 )) +'rem';
    
        $(board_code).css('font-size', style );
        $(board_lines).css('font-size', style );
    
    }
    
    // Declare variables
    const board_code = document.querySelector('#board__code');
    const boadrs = document.querySelector('.board');
    const btn_compilate = document.querySelector('#buttons__btn-compilate');
    const board_lines = !isMobile ? document.querySelector('#board__lines') : document.querySelector('#board__lines-mobile');
    const btn_low_size = document.querySelector('#btn-low-size');
    const btn_up_size = document.querySelector('#btn-up-size');
    const btn_copy_code = document.querySelector('#buttons__btn-copy-code');
    
    let currentSizeFont = 0; // current font size letter
    
    let isTyping = false

    let squaresToRemove = [];
    let isScrollingUp = false;
    let isMousingUp = false;
    let isHoldingCtrlZ = false;

    let currentIdSession = createIdUserSession();
    let arrayModifiedData = [];

    let scrollTop = 0;
    
    resetTextarea( board_code );
    
    $(board_code).on('keydown',(event)=>{

        console.log( event.keyCode );

        let start = event.target.selectionStart;
        let end = event.target.selectionEnd;

        // Key F4 to compilate code
        if ( event.keyCode === 115 ){

            event.preventDefault();

            $(btn_compilate).css(changeColor(0));
    
            startCompilation( board_code , isMobile );

            $(btn_compilate).css(changeColor(1));

            return false;

        }
        
        
        if ( event.keyCode === 9 ){
    
            event.preventDefault();

            // Insert two spaces at the cursor position
            board_code.value = board_code.value.substring(0, start) + '  ' + board_code.value.substring( end );
            
            // Set the cursor position after the inserted spaces
            event.target.selectionStart = event.target.selectionEnd = start + 2;
    
        }    

        if ( event.keyCode === 8 ){

            event.preventDefault();

            if ( board_code.value.length > 1) {
                // Remove the last character from the string
                let newText = board_code.value.slice( 0, start - 1 ) + board_code.value.slice( start , board_code.value.length  );

                let currentCursorPosition = start - 1;

                board_code.value = newText;

                if ( squaresToRemove.length != 0 ){

                    deleteMultipleLines( board_code , squaresToRemove );

                    squaresToRemove = [];

                    isMousingUp = false;

                }

                board_code.setSelectionRange( currentCursorPosition , currentCursorPosition );

                event.target.selectionStart = currentCursorPosition;
                event.target.selectionEnd = currentCursorPosition;

            }

        }

        // Detect both left , up , down and right arrow
        if ( event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 ){

            squaresToRemove[0] = [ start , end ]; 

            console.log( $(board_lines).scrollTop() );

        }

        if ( event.keyCode === 90 && event.ctrlKey ){

            event.preventDefault();

            recoveryData();

            isHoldingCtrlZ = true;

            return false;

        }

        console.log( squaresToRemove );

        isTyping = true; 

        calculateLines( event.target.value.split('\n') , board_lines );
    
    })

    $(board_code).on('mouseup',(event)=>{

        let start = event.target.selectionStart;

        let end = event.target.selectionEnd;

        squaresToRemove[0] = [ start , end ];

        console.log( squaresToRemove );

        isMousingUp = true;

    });
    
    $(board_code).on('keyup',(event)=>{
    
        event.preventDefault();

        isHoldingCtrlZ = false;

        isTyping = true;

        autocomplete( event );
    
        calculateLines( event.target.value.split('\n') , board_lines );

        if ( arrayModifiedData.length > 200 ){ arrayModifiedData = []; }

        arrayModifiedData.push( `${createIdUserSession()}_${getCurrentDate()}.txt` );

        console.log( arrayModifiedData );

    })
    
    // Button to compilate code
    $(btn_compilate).on('click',()=>{
    
        $(btn_compilate).css(changeColor(0));
    
        startCompilation( board_code , isMobile );

        $(btn_compilate).css(changeColor(1));
    
    })
    
    // Buttons to size letter font
    $(btn_low_size).on('click',()=>{
    
        if ( currentSizeFont == 0 ){
            return false;
        }
    
        currentSizeFont--;
    
        changeSize( boadrs , board_lines );
    
    })
    
    $(btn_up_size).on('click',()=>{
    
        currentSizeFont++;
    
        changeSize( boadrs , board_lines );
    
    })
    
    // Copy clipboard code
    $(btn_copy_code).on('click',()=>{
    
        // Select the content inside the contenteditable div
        const range = document.createRange();
        range.selectNodeContents(board_code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // Execute the copy command
        document.execCommand('copy');
    
        $(btn_copy_code).html('Copied');
    
    })
    
    
    $(board_lines).on('scroll',()=>{

        storeScrollPosition(); // Store the current scroll position
        scrollBothLinesAndCode(board_lines, board_code);
        restoreScrollPosition(); // Restore the scroll position
    
    })
    
    $(board_code).on('scroll',()=>{
    
        storeScrollPosition(); // Store the current scroll position
        scrollBothLinesAndCode(board_code, board_lines);
        restoreScrollPosition(); // Restore the scroll position
    
    })

}