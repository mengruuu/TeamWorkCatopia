function addProduct(){ 
    
    // console.log($('.img_fluid').attr("src"));
    // console.log( $('.img_fluid')[2].src );
    // console.log($('.img_fluid'))
    // if(!$('.img_fluid')[1].src){
    //     $('.img_fluid')[1].src = ""
    // }
    let pic = []
    $('.img_fluid').each(function(index,element){
            pic.push(element.src);
    });
    
    $.ajax({            
        method: "POST",
        url: "./API/b3_product_push.php",
        data:{
            productName:$('#product_name').val(),
            productType: $('#product_type').val(),
            productFeature: $('#product_feature').val(),
            // productPicture1: $('.img_fluid').attr("src"),
            productPicture1: pic[0],
            productPicture2: pic[1],
            productPicture3: pic[2],
            productPicture4: pic[3],
            // productPicture4: $('.img_fluid')[3].src,
            productContent: $('#product_content').val(),
            productPrice: $('#product_price').val(),
        },            
        dataType: "json",
        success: function (response) {   
            console.log(response);
            alert("新增成功");
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
            // if(input.files[0].type == 'image/jpeg' || input.files[0].type =='image/png'){
            if(count <= 4) {
                // console.log("y");
                if (input.files) {
                    while (index < count) {
                        if(input.files[index].type == 'image/jpeg' || input.files[index].type =='image/png'){
                            var reader = new FileReader();
                            reader.onload = (e) => {
                                this.preview_list.push(e.target.result);
                                // console.log(e.target.result)
                            }
                            this.image_list.push(input.files[index]);
                            reader.readAsDataURL(input.files[index]);
                            // console.log(input.files[index].type)
                            index++;
                        } else {
                            alert("只支援jpg");
                            break;
                        }
                    }
                }
            }else{console.log("n");
                alert('超過4張圖片')
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

const itemType = [
    {
        "theType": "食品",
        "theFeature": [
            {
                "theOption": "骨骼"
            },
            {
                "theOption": "毛髮"
            },
        ]
    },
    {
        "theType": "用品",
        "theFeature": [
            {
                "theOption": "外出包包"
            },
            {
                "theOption": "小窩"
            },
            {
                "theOption": "抓板"
            },
            {
                "theOption": "食器"
            },
            {
                "theOption": "貓砂盆"
            },
            {
                "theOption": "胸背帶"
            }
        ]
    },
    {
        "theType": "玩具",
        "theFeature": [
            {
                "theOption": "單貓"
            },
            {
                "theOption": "人貓"
            },
        ]
    },
    {
        "theType": "裝飾品",
        "theFeature": [
            {
                "theOption": "衣服"
            },
            {
                "theOption": "頭套"
            }
        ]
    },
    {
        "theType": "盲抽",
        "theFeature": [
            {
                "theOption": "299"
            },
            {
                "theOption": "399"
            }
        ]
    }
];

// let itemType = theTypeIndex;
// const theTypeIndex = ['food', 'use', 'toy', 'cloth', 'gacha'];


Vue.component('Select', {
    props: ['options', 'label', 'value'],
    methods: {
        isTheOption(item) {
            console.log(this.lable)
            if (this.label == 'theOption') {
                return item['theOption']
            } else {
                return eval(`item.${this.label}`);
            }
        },
    },
    computed: {
        index: {
            get() { return this.value },
            set(val) {
                this.$emit('input', val);
            },
        },
    },
    template: `
        <select v-model="index" data-name="isTheOption(item)">
            <option v-for="(item,index) in options" :value="index">{{isTheOption(item)}}</option>
        </select>
    `,
});

// console.log(theTypeIndex);

new Vue({
    el: '#which_product_type_app',
    data: {
        theTypeIndex: 0,
        theFeatureIndex: 0,
    },
    watch: {
        theTypeIndex() {
            this.theFeatureIndex = 0;
        },
    },
    computed: {
        itemType() {
            return itemType
        },
        theFeatures() {
            return itemType[this.theTypeIndex].theFeature
        },
        // zips() {
        //     return this.areas[this.areaIndex]['zip']
        // },
    },
    template: `
        <div class="product_push_block">
            <p class="product_push_block_title">商品種類:</p>
            <p class="product_push_block_text">
            <Select v-model="theTypeIndex" :options="itemType" label="theType" id="product_type"></Select>
            <Select v-model="theFeatureIndex" :options="theFeatures" label="theOption" id="product_feature"></Select>
            </p>
        </div>
    `,
});