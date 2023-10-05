import { startCompilation } from "./compilateCode.js";
export const loadAppLaptopMobile = ( isMobile )=>{

    console.log( );

    const changeColor = ( type )=>{

        return {
            'color': type == 0 ? '#98b978' : '#7fff00'
        }
    
    }
    
    const resetTextarea = ( board_code )=>{
    
        let lines = board_code.value.split('\n');
    
        console.log( lines.length );
    
        if ( lines.length == 1 ){
    
            $(board_code).val('').val(`<?php
            `);
    
        }
    
    }
    
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
            console.log("Scrolling up");
            $(pasiveContainer).scrollTop( $(pasiveContainer).scrollTop() - 35 );
        
        }
    
    }
    
    const calculateLines = ( lines , board_lines )=>{
    
        let totalLines = '';
    
        lines.forEach( ( line , index ) => {
            totalLines+=`${(index+1)}<br>`;
        });
    
        $(board_lines).html(totalLines);
        
        if ( !isTyping ){
    
           $(board_lines).scrollTop( $(board_lines)[0].scrollHeight );
        
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
    
    let isTyping = false;
    
    resetTextarea( board_code );
    
    $(board_code).on('keydown',(event)=>{
    
        if ( event.keyCode === 9 ){
    
            event.preventDefault();
            // event.target.value+='  ';
            const target = event.target;
            const start = target.selectionStart;

            console.log( start );

            const end = target.selectionEnd; // add what there is ahead to space
            const value = target.value;

            // Insert two spaces at the cursor position
            target.value = value.substring(0, start) + '  ' + value.substring( end );
            
            // Set the cursor position after the inserted spaces
            target.selectionStart = target.selectionEnd = start + 2;
    
        }
        
        isTyping = true; 
    
    })
    
    $(board_code).on('keyup',(event)=>{
    
        event.preventDefault();
    
        isTyping = true;
    
        calculateLines( event.target.value.split('\n') , board_lines );
    
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
    
        scrollBothLinesAndCode( board_lines , board_code );
    
    })
    
    $(board_code).on('scroll',()=>{
    
        scrollBothLinesAndCode( board_code , board_lines );
    
    })

}