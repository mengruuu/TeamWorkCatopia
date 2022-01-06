//先把資料抓出來
title = "";
async function doQuery() {
await $.ajax({
  method: "GET",
  url: "API/knowledege.php",
  data: {
    
  },
  dataType: "json",
  success: function (response) {
      console.log(response);
    let title = [];
    let content = [];
    let picture = [];
    for(let i = 0; i < response.length; i++){
        title.push(response[i].ARTICLE_TITLE);
        content.push(response[i].ARTICLE_CONTENT);
        picture.push(response[i].ARTICLE_PICTURE);
    }
    Vue.component('knowledge_first_block_contentbhox_in_1_1',{
        template: ` 
                 <div class="knowledge_first_block_contentbhox">
                    <div class="knowledge_first_block_contentbhox_in">
                        <img src="${picture[0]}" alt="">
                        <div class="knowledge_first_block_contentbhox_in_text">
                            <p>${title[0]}</p>
                            <p>${content[0]}</p>
                        </div>
                    </div>
                </div>`,
    });
    Vue.component('knowledge_first_block_contentbhox_in_1_2',{
        template: ` <div class="knowledge_first_block_contentbhox_in">
                        <img src="${picture[1]}" alt="">
                        <div class="knowledge_first_block_contentbhox_in_text">
                            <p>${title[1]}</p>
                            <p>${content[1]}</p>
                        </div>
                    </div>`,
    });
    Vue.component('knowledge_first_block_contentbhox_in_1_3',{
        template: ` <div class="knowledge_first_block_contentbhox_in">
                        <img src="${picture[2]}" alt="">
                        <div class="knowledge_first_block_contentbhox_in_text">
                            <p>${title[2]}</p>
                            <p>${content[2]}</p>
                        </div>
                    </div>`,
    });
    Vue.component('knowledge_first_block_contentbhox_in_2_1',{
        template: ` <div class="knowledge_sec_block_contentbhox_in">
                        <img src="${picture[3]}" alt="">
                        <div class="knowledge_sec_block_contentbhox_in_text">
                            <p>${title[3]}</p>
                            <p>${content[3]}</p>
                        </div>
                    </div>`,
    });
    Vue.component('knowledge_first_block_contentbhox_in_2_2',{
        template: ` <div class="knowledge_sec_block_contentbhox_in">
                        <img src="${picture[4]}" alt="">
                        <div class="knowledge_sec_block_contentbhox_in_text">
                            <p>${title[4]}</p>
                            <p>${content[4]}</p>
                        </div>
                    </div>`,
    });
    Vue.component('knowledge_first_block_contentbhox_in_2_3',{
        template: ` <div class="knowledge_sec_block_contentbhox_in">
                        <img src="${picture[5]}" alt="">
                        <div class="knowledge_sec_block_contentbhox_in_text">
                            <p>${title[5]}</p>
                            <p>${content[5]}</p>
                        </div>
                    </div>`,
    });

    let vm = new Vue({
        el:"#knowledge_content",
    })
},
error: function (exception) {
    alert("發生錯誤: " + exception.status);
  },
});
}
document.addEventListener('load', doQuery());