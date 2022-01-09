function addProduct(){
    $.ajax({            
        method: "POST",
        url: "./API/b3_product_push.php",
        data:{
            productName:$('#product_name').val(),
            productType: $('#product_type').val(),
            productFeature: $('#product_feature').val(),
            productPicture1: $('#product_picture').val(),
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
            // console.log($('.mb-0')); 
            // showCate(response);                
        },
        error: function(exception) {
            alert("數據載入失敗: " + exception.status);
        }
    });
}


//上傳圖片
new Vue({
    el: '#add_product_app',
    data() {
        return {
            preview: null,
            image: null,
            preview_list: [],
            image_list: [],
        }
    },
    methods: {
        previewMultiImage(event) {
            let input = event.target;
            let count = input.files.length;
            let index = 0;
            if(input.files[0].type == 'image/jpeg' || input.files[0].type =='image/png'){
                // console.log("y");
                if (input.files) {
                    while (count--) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            this.preview_list.push(e.target.result);
                        }
                        this.image_list.push(input.files[index]);
                        reader.readAsDataURL(input.files[index]);
                        // console.log(input.files[index].type)
                        index++;
                    }
                }
            }else{console.log("n");
                alert('僅支援jpg及png')
            }
        },
    },
})

// let data = [{"food": ["骨骼", "毛髮"]}, {"use": ["a", "b"]}, {"toy": ["f", "g"]}, {"cloth": ["h", "q"]}];
// let itemType = document.querySelector("#product_type"); console.log(itemType.value);
// let product_feature =document.querySelector("#product_feature");

// itemType.addEventListener("change", function() {
//     if(this.value === "food") {
        
//     }
// });

const itemType = [{
    
}]