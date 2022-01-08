function addProduct(){
    $.ajax({            
        method: "POST",
        url: "./API/b3_product_push.php",
        data:{
            productName:$('#product_name').val(),
            productType: $('#product_type').val(),
            productFeature: $('#product_feature').val(),
            // productPicture1: $().val(),
            // productPicture2: $().val(),
            // productPicture3: $().val(),
            // productPicture4: $().val(),
            productContent: $('#product_content').val(),
            productPrice: $('#product_price').val(),

            // console.log( $('#product_name').val() )
        },            
        dataType: "text",
        success: function (response) {   
            console.log("新增成功");      
            // showCate(response);                
        },
        error: function(exception) {
            alert("數據載入失敗: " + exception.status);
        }
    });
}

// product get