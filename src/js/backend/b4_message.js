async function upLoadData() {
    const messageData 
        = await fetch("./API/b4_message.php")
                .then(res => res.json())
                .then(data => data);
    // console.log(messageData);

    const vm = new Vue({
        el: "#message_backend_app",
        data() {
            return {
                messageData: messageData 
            }
        },
        template: `
            <div class="backend_table">
                <table>
                    <tr class="table_title">
                        <td>貼文編號</td>
                        <td>會員編號</td>
                        <td>會員信箱</td>
                        <td>貼文時間</td>
                        <td>顯示狀態</td>
                        <td>圖片</td>
                        <td>讚數</td>
                        <td>貼文內容</td>
                    </tr>
                    <tr v-for = "(data, index) in messageData">
                        <td>{{ data.POST_ID }}</td>
                        <td>{{ data.MEMBER_ID }}</td>
                        <td>{{ data.MEMBER_MAIL }}</td>
                        <td>{{ data.POST_TIME }}</td>
                        <td>正常</td>
                        <td><img :src = "data.POST_PICTURE"></td>
                        <td>{{ data.POST_LIKE }}</td>
                        <td>{{ data.POST_CONTENT }}</td>
                    </tr>
                </table>
            </div>
        `,
    });
};

upLoadData();