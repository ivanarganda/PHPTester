<?php require_once "src/views/main-header.php"; ?>
<div class='layout'>
    <section class='layout__navbar'>
        <div class='navbar__title'>
            <h4>PHPTester</h4>
        </div>
    </section>
    <section class='boards__buttons'>
        <ul>
            <li class='buttons__recovery' id='buttons__recovery'>
                <label for='recovery__previous'><i class='glyphicon glyphicon-chevron-left'></i></label>
                <button hidden id='recovery__previous'></button>
                <label for='recovery__next'><i class='glyphicon glyphicon-chevron-right'></i></label>
                <button hidden id='recovery__next'></button>
            </li>
            <li><button id='btn-low-size'>a</button><button id='btn-up-size'>A</button></li>
            <li><i class='glyphicon glyphicon-copy' id='buttons__btn-copy-code'>Copy</i></li>
            <li>
                <i class='glyphicon glyphicon-play' id='buttons__btn-compilate'></i>
            </li>
            <li>
                Version PHP
                <select id="buttons_droppown-list-versionsPHP">
                </select>
            </li>
        </ul>
    </section>
    <div class='layout__boards' disabled>
        <div id='board__lines' cols='2' class='board__lines'>
            <span class='line'>1</span> 
            <!-- It gonna be used for lines of code -->
        </div>&nbsp;
        <section class='board board-left'>
            <div class='board-left__dropownlist-autocompletecode' id='board-left__dropownlist-autocompletecode'></div>
            <div id='board__lines-mobile' cols='2' class='board__lines-mobile'>
                <span class='line'>1</span> 
                <!-- It gonna be used for lines of code -->
            </div>
            <textarea name='board__code' contenteditable='true' class='board__code' id='board__code'>
            <?php echo htmlentities("<?php"); ?>
            </textarea>
        </section>
        <section class='board board-right'>
            <article name='board__output' class='board_output' id='board__output'>   
            </article>
        </section>
    </div>
</div>
<?php require_once 'src/views/footer.php'; ?>