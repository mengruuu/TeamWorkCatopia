Vue.component("backendProduct", {
  template: `
    <div class="backend_table">
        <table>
            <tr class="table_title">
                <td class="number">問題序號</td>
                <td>問題</td>
                <td>回答</td>
                <td>編輯/備註</td>
            </tr>
    
            <tr v-for="(item, index) in questionData">
                <td class="number">{{item.QUESTION_ID}}</td>
                <td>{{item.QUESTION_CONTENT}}</td>
                <td>{{item.ANSWER_CONTENT}}</td>
                <td class="number"><a @click=toQuestionContent(index) href="./b7_question_edit.html" ><img src="../images/backend/edit.png"></a></td>
            </tr>
        </table>
    </div>
    `,
  data() {
    return {
      questionData: [],
    };
  },
  methods: {
    toQuestionContent(index) {
      localStorage.setItem(
        "questionContent",
        JSON.stringify(this.questionData[index])
      );
    },
  },

  mounted() {
    $.getJSON("./API/b7_question.php").then((res) => {
      console.log(res);
      this.questionData = res;
    });
  },
});
new Vue({
  el: "#question_app",
  data: {},
});
