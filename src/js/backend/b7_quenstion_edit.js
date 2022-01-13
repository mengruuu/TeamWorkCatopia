value = JSON.parse(localStorage.getItem("questionContent"));
const vm = new Vue({
  el: "#question_edit_container_app",
  data() {
    return {
      quenstion: value.QUESTION_CONTENT,
      ans: value.ANSWER_CONTENT,
      idNumber: value.QUESTION_ID,
    };
  },
  methods: {
    submit() {
      $.ajax({
          method: "GET",
          url: "./API/b7_question_edit.php",
          data: {
            question: this.quenstion,
            answer: this.ans,
            question_id: this.idNumber,
          },
          dataType: "text",
          success: function (response) {
          console.log('回傳成功');
          },
          error: function (exception) {
            alert("發生錯誤: " + exception.status);
          },
        });
    },
    drop(){
      confirm("確定要刪除？")
      $.ajax({
          method: "GET",
          url: "./API/b7_question_edit_delete.php",
          data: {
            question_id: this.idNumber,
          },
          dataType: "text",
          success: function (response) {
          //  console.log(question);
          alert('刪除成功');
          location.href="./b7_question.html";
          },
          error: function (exception) {
            alert("發生錯誤: " + exception.status);
          },
        });
    }
  },
});