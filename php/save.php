<?php

$img = $_POST['basedata'];

// delete the header of the string img .. 
$img = str_replace('data:image/png;base64,','',$img);
// replace all space in the string with '+' .. 
$img = str_replace(' ','+',$img);

// decoder the string of  the img .. 
$data = base64_decode($img);
// generate photo name in the images folder .. 
$imagepath = '../images/new'.rand(1000,1000000).'.png';
// create the image in the folder .. 
file_put_contents($imagepath, $data);
echo $imagepath;

?>