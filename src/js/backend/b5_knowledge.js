Vue.component("backendKnowledge", {
  template: `
<div class="backend_table">
    <table>
        <tr class="table_title">
            <td class="number">文章序號</td>
            <td>文章圖片</td>
            <td>文章標題</td>
            <td>文章內容</td>
            <td>編輯/修改</td>
        </tr>
        <tr v-for="(item, index) in knowledgeData">
            <td class="number">{{item.ARTICLE_ID}}</td>
            <td><img :src = item.ARTICLE_PICTURE></td>
            <td>{{item.ARTICLE_TITLE}}</td>
            <td>{{item.ARTICLE_CONTENT}}</td>
            <td class="number"><a @click=toKnowledgeContent(index) href="./b5_knowledge_edit.html" ><img src="../images/backend/edit.png"></a></td>
        </tr>
    </table>
</div>
`,
  data() {
    return {
      knowledgeData: [],
    };
  },
  methods: {
    toKnowledgeContent(index) {
      localStorage.setItem(
        "toKnowledgeContent",
        JSON.stringify(this.knowledgeData[index])
      );
    },
  },

  mounted() {
    $.getJSON("./API/b5_knowledge.php").then((res) => {
      this.knowledgeData = res;
    });
  },
});
new Vue({
  el: "#back_knowledge_management_app",
  data: {},
});
