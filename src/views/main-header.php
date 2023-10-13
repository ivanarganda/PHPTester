<?php require_once "parameters.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHPTester</title>
    <link rel="icon" type="image/png" href="<?=URI; ?>assets/imgs/php.jpg">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=URI; ?>assets/styles/main.css">
</head>
<body>

    <!-- REQUESTES -->
    <div hidden>
        <span id='sessionId'><?=$_SESSION['id']?></span>
        <span id='url_request_create_file'><?=URI . 'src/public/createFile.php'?></span>
        <span id='url_request_parse_output_msg'><?=URI . 'src/public/parseOutputMessage.php'?></span>
        <span id='url_request_versions_php'><?=URI . 'src/public/getVersionsPHP.php'?></span>
        <span id='url_request_change_version'><?=URI . 'src/public/changeVersion.php'?></span>
        <span id='url_request_output_code_compiled'><?=URI . PHP_FILE?></span>
        <span id='url_request_delete_file'><?=URI . 'src/public/deleteFile.php'?></span>
        <span id='url_php_File'><?=URL_PHP_FILE?></span>
    </div>