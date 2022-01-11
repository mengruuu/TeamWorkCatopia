const vm = new Vue({
    el: "#question_push_container_app",
    data() {
      return {
        quenstion: "",
        ans: "",
      };
    },
    methods: {
      submit() {
        confirm("確認新增嗎？");
        $.ajax({
          method: "POST",
          url: "./API/b7_question_push.php",
          data: {
            question: this.quenstion,
            answer: this.ans,
          },
          dataType: "text",
          success: function (response) {
            //  console.log(question);
            alert("新增成功");
            location.href="./b7_question.html";
          },
          error: function (exception) {
            alert("發生錯誤: " + exception.status);
          },
        });
      },
    },
  });