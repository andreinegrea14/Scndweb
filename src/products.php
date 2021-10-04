<?php

$servername = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password);

if($conn -> connect_error){
    die ("Connection failed: " . $conn->connect_error);
}
echo "Connected succesfully";

abstract class Product {
    protected $sku, $name, $price;
  

    public function __construct($sku, $name, $price){
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
    }
    public function getSKU (){
        return $this->sku;
    }

    public function setSKU ($sku){
        if ((is_string($sku) && strlen($sku) > 1 ) || is_numeric($sku)){
            $this->sku = $sku;
        }
    }
    public function getName (){
        return $this->name;
    }

    public function setName ($name){
        if ((is_string($name) && strlen($name) > 1 ) || is_numeric($name)){
            $this->name = $name;
        }
    }
    public function getPrice (){
        return $this->price;
    }

    public function setPrice ($price){
        if (is_numeric($price)){
            $this->price = $price;
        }
    }


}

class DVD extends Product{
    private $size;
    public function __construct($sku,$name,$price, $size){
        parent:: __construct($sku, $name, $price);
        $this->size = $size;
       }
       public function getSize (){
        return $this->size;
    }

    public function setSize ($size){
        if (is_numeric($size)){
            $this->size = $size;
        }
    }
   
}

class Book extends Product {
   private $weight;
   public function __construct($sku,$name,$price, $weight){
    parent:: __construct($sku, $name, $price);
    $this->weight = $weight;
   }

   public function Sku($sku){
    if ($this->sku == $sku){
        return true;
    }
    return false;
 }

   public function getWeight (){
    return $this->weight;
}

    public function setWeight ($weight){
    if (is_numeric($weight)){
        $this->weight = $weight;
    }
}
}

class Furniture extends Product{
   private $height, $width, $length;
   public function __construct($sku,$name,$price, $height, $width, $length){
    parent:: __construct($sku, $name, $price);
    $this->height = $height;
    $this->width = $width;
    $this->length = $length;
   }
   public function getHeight (){
    return $this->height;
}

    public function setHeight ($height){
    if (is_numeric($height)){
        $this->height = $height;
    }
}

    public function getWidth (){
        return $this->width;
    }

    public function setWidth ($width){
        if (is_numeric($width)){
            $this->width = $width;
        }
    }

    public function getLength (){
        return $this->lentgh;
    }

    public function setLength ($length){
        if (is_numeric($length)){
            $this->length = $length;
        }
    }
}

class ProductsList{
   private $listOfProducts = array(); //may be public here
   private $noOfProducts = 0;
   private $stack = null;

   public function addProductsToList(Product $product){
    
    //    if($this->noOfProducts < $this->listOfProducts->length){
    //        $this->listOfProducts[$this->noOfProducts]=$product;
    //        $this->noOfProducts++;
    $listOfProducts = array_push($stack, $product);

       }


   public function deleteProduct($sku){
   
      for($i = 0; $i < $this->noOfProducts; $i++){
           if($this->listOfProducts[$i]->Sku()){
            //  $this->listOfProducts[$i]->unset();
             unset($this->listOfProducts[$i]);
             break;
           }
           for($i=0; $i < $this->noOfProducts - 1; $i++){
            $this->listOfProducts[$i]=$this->listOfProducts[$i+1];
        }
        $this->noOfProducts--;
      }
   }
}
?>