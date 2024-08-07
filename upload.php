<?php
// Directory to save uploaded files
$target_dir = "uploads/";

// Ensure the directory exists
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Generate a unique ID for the file
$uniqueId = uniqid();
$fileName = basename($_FILES["fileToUpload"]["name"]);
$target_file = $target_dir . $uniqueId . "_" . $fileName;

// Flag to check if upload is successful
$uploadOk = 1;

// Get the file extension
$fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

// Allow certain file formats (Lua and Luau files only)
$allowedTypes = array("lua", "luau");

if (!in_array($fileType, $allowedTypes)) {
    echo "Sorry, only LUA and LUAU files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// If everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file " . htmlspecialchars($fileName) . " has been uploaded.";
        echo "<br>File URL: <a href='uploads/$uniqueId" . "_" . $fileName . "'>Click here to access your file</a>";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
