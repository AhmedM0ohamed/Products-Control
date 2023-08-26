// function addProduct(){
//     if(validateProductName()){
//         var product = {
//             name : productNameInput.value,
//             price : productPriceInput.value,
//             category : productCategoryInput.value,
//             description : productDescription.value
//         };
        
//         products.push(product);
//         localStorage.setItem('myProducts' , JSON.stringify(products));
//         formClean();
//         displayProducts(products);
//     }
//     else{
//         alert('name invalid');
//     }
// }
// function validateProductName(){
//     var regex = /^[A-Z][a-z]{3,8}$/;
//     if(regex.test(productNameInput.value) == true){
//         productNameInput.classList.remove('is-invalid');
//         productNameInput.classList.add('is-valid');
//         return true;
//     }
//     else{
//         productNameInput.classList.remove('is-valid');
//         productNameInput.classList.add('is-invalid');
//         return false;
//     }
// }

var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCount = document.getElementById('productCount');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var tableBody = document.getElementById('tableBody');
var addButton = document.getElementById('buttonAdd');
var updateButton = document.getElementById('buttonUpdate');
var nameSearchButton = document.getElementById('productSearchName');
var categorySearchButton = document.getElementById('productSearchCategory');
var products ;
var temp;
var searchCategory = 'name';

if(localStorage.getItem('products') != null){
    products = JSON.parse(localStorage.getItem('products'));
    displayProducts(products);
}
else{
    products = [];
}

function addProduct(){
    var count = productCount.value;
    if(count == ''){
        count = 1;
    }
    if(validate()){
        for(var i = 0 ; i<count ; i++){
            var prodcut = {
                name : productName.value,
                price : productPrice.value,
                category : productCategory.value,
                description : productDescription.value
            }
            if(prodcut.name == "" && prodcut.price == "" && prodcut.category == "" && prodcut.description == "" ){
            }
            else{
                products.push(prodcut);
                localStorage.setItem('products' , JSON.stringify(products));
                displayProducts(products);
            }
        }
        clearForm();
    }
    else{
        alert('can\'t add');
    }
    
}

function displayProducts(list){
    var cartona = ``;
    for(var i = 0 ; i < list.length ; i++){
        cartona += `<tr>
            <td>${i}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
            <td>${list[i].description}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick = "updateProduct(${i})">update</button></td>
            <td><button class="btn btn-sm btn-outline-danger" onclick = "deleteProduct(${i})">delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = cartona;
}

function clearForm(){
    productCount.classList.remove('d-none');
    updateButton.classList.add("d-none");
    addButton.classList.remove("d-none");
    productName.value = '';
    productPrice.value = '';
    productCount.value = '';
    productCategory.value = '';
    productDescription.value = '';
}

function searchProduct(value){
    var searchProducts =[];
    for(var i = 0 ; i < products.length ; i++){
        if(searchCategory == 'name'){
            if(products[i].name.toLowerCase().includes(value.toLowerCase()) == true){
                searchProducts.push(products[i]);
            }
        }
        else{
            if(products[i].category.toLowerCase().includes(value.toLowerCase()) == true){
                searchProducts.push(products[i]);
            }
        }
    }
    displayProducts(searchProducts);
}

function deleteProduct(index){
    products.splice(index , 1);
    localStorage.setItem('products' , JSON.stringify(products));
    displayProducts(products);
}

function updateProduct(index){
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDescription.value = products[index].description;
    addButton.classList.add("d-none");
    updateButton.classList.remove("d-none");
    temp = index;
    scroll({
        top:0 ,
        behavior: "smooth",
    });
    productCount.classList.add('d-none');
}

function update(){
    var prodcut = {
        name : productName.value,
        price : productPrice.value,
        category : productCategory.value,
        description : productDescription.value
    }
    clearForm();
    updateButton.classList.add("d-none");
    addButton.classList.remove("d-none");
    products.splice(temp , 1 , prodcut);
    localStorage.setItem('products' , JSON.stringify(products));
    displayProducts(products);
}

function deleteProducts(){
    products.splice(0, products.length);
    localStorage.remove('products');
    displayProducts(products);
}

function nameSearch(){
    searchCategory = 'name';
    nameSearchButton.classList.remove('d-none');
    categorySearchButton.classList.add('d-none');
}

function categorySearch(){
    searchCategory = 'category';
    nameSearchButton.classList.add('d-none');
    categorySearchButton.classList.remove('d-none');
}

function validate(){
    var regex = /^[a-z]{6,8}[0-9]{0,2}$/i;
    if( regex.test(productName.value) == true ){
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        return true;
    }
    else{
        productName.classList.remove('is-valid');
        productName.classList.add('is-invalid');
        return false;
    }
}