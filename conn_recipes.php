<?php
// Allow from any origin. Required headers
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  $cnx = mysqli_connect("localhost","root","","recipes");
  // Check connexion
  if (mysqli_connect_errno()) {
     die("Connection failed: " . mysqli_connect_error());
  };
  // Impun setul de caractere utf8
  mysqli_set_charset($cnx,"utf8");
  ?>