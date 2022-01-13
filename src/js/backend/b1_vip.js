Vue.component("backendVip", {
  template: `
<div class="backend_table">
    <table>
        <tr class="table_title">
            <td class="number">會員ID</td>
            <td>會員姓名</td>
            <td>會員電話</td>
            <td>會員信箱</td>
            <td>註冊時間</td>
        </tr>

        <tr v-for="(item, index) in vipData">
            <td class="number">{{item.MEMBER_ID}}</td>
            <td>{{item.MEMBER_NAME}}</td>
            <td>{{item.MEMBER_PHONE}}</td>
            <td>{{item.MEMBER_MAIL}}</td>
            <td>{{item.REGISTER_TIME}}</td>
        </tr>
    </table>
</div>
`,
  data() {
    return {
      vipData: [],
    };
  },
  mounted() {
    $.getJSON("./API/b1_vip.php").then((res) => {
      this.vipData = res;
    });
  },
});
new Vue({
  el: "#vip_app",
  data: {},
});
