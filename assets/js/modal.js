import { regexes } from "./regexes.js";
export const createModal = ( type , content_files = false )=>{

    // Types: 0 settings 1 info
    let title = [
        `<h3>Settings</h3>`,
        `<h3>You got pending previous session files temp</h3>` 
    ] , content = [
        ``,
        ``
    ], buttons = [
        `<button id='btn-modal__save' data-custom-value='' class='btn-modal btn-modal__save'>Save</button>
        <button id='btn-modal__cancel' data-custom-value='' class='btn-modal  btn-modal__cancel'>Cancel</button>`,
        `<button id='btn-modal__deleteBufferFiles' data-custom-value='' class='btn-modal btn-modal__delete'>Delete previous session</button>
        <button id='btn-modal__doNotRemind' data-custom-value='' class='btn-modal btn-modal__warn'>Do not show again</button>`
    ];

    if ( content_files ){
        
        let files = ``;
        content_files.forEach(item => {

            files += `<li>${item[0]}</li><br>`;

        })

        content[type] = `${files.replace(regexes['REGEX_IP_REPLACE'],'')}`;

    }

    $('.layout').append( `<div id="myModal" class="modal">
        <div class="modal-content">
            <span class="modal__close">X</span>
            <div class="modal-content__title">
                ${title[type]}
            </div>
            <ul class="modal-content__list">
                ${content[type]}
            </ul>
            <ul class="modal-content__buttons">
                ${buttons[type]}
            </ul>
        </div> 
    </div>` );

}