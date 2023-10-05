<?php require_once "src/views/main-header.php"; ?>
<div class='layout'>
    <section class='layout__navbar'>
        <div class='navbar__title'>
            <h4>PHPTester</h4>
        </div>
    </section>
    <section class='boards__buttons'>
        <ul>
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
            <div id='board__lines-mobile' cols='2' class='board__lines-mobile'>
                <span class='line'>1</span> 
                <!-- It gonna be used for lines of code -->
            </div>
            <textarea name='board__code' contenteditable='true' class='board__code' id='board__code'>
            <?php echo htmlentities("<?php"); ?>
            </textarea>
        </section>
        <section class='board board-right'>
            <article name='board__output' class='board__output' id='board__output'>   
            </article>
        </section>
    </div>
    <!-- it will be shown when display as mobile -->
    <!-- <div class='layout__boards-mobile'>
        <section class='board-movile board-left'>
            <div id='board__lines-mobile' cols='2' class='board__lines'>
                1
            </div>&nbsp;
            <textarea name='board__code' contenteditable='true' class='board__code' id='board__code-mobile'>
            <?php echo htmlentities("<?php"); ?>
            </textarea>
        </section>
        <section class='board-movile board-right'>
            <article name='board__output' class='board__output' id='board__output-mobile'>   
            </article>
        </section>
    </div> -->
</div>
<?php require_once 'src/views/footer.php'; ?>