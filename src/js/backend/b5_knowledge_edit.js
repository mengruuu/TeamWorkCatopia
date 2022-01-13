value = JSON.parse(localStorage.getItem("toKnowledgeContent"));
const vm = new Vue({
  el: "#knowledge_push_container_app",
  data() {
    return {
      title: value.ARTICLE_TITLE,
      content: value.ARTICLE_CONTENT,
      idNumber: value.ARTICLE_ID,
      preview_list: '',
    };
  },
  methods: {
    previewMultiImage(){
      let input = event.target;
      if(input.files[0].type == 'image/jpeg' || input.files[0].type =='image/png'){
        var reader = new FileReader();
        reader.onload = (e) => {
        this.preview_list = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      } else {
        alert("只支援jpg");
      }
    },
    upDated() {
      $.ajax({
        method: "POST",
        url: "./API/b5_knowledge_edit.php",
        data: {
          title: this.title,
          content: this.content,
          img: this.preview_list,
          idNumber: this.idNumber
        },
        dataType: "text",
        success: function (response) {
          alert("修改成功");
          location.href="./b5_knowledge.html";
        },
        error: function (exception) {
          alert("數據載入失敗: " + exception.status);
        },
      });
    },
  },
});