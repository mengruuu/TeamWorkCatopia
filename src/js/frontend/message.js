import "../../library/function.js";
const message_write_message_img_file_container = document.querySelector("label.message_write_message_img_file_container");
const message_write_img_container = document.querySelector("div.message_write_img_container");
const click_to_message_input_container = document.querySelector("input.click_to_message_input_container");
const message_write_message_container = document.querySelector("div.message_write_message_container");
const message_write_message_close = document.querySelector("div.message_write_message_close");
const message_write_background = document.querySelector("div.message_write_background");
const inputFile = document.querySelector("input[type = 'file']");
const message_write_message_content = document.querySelector("textarea.message_write_message_content");
const confirmPost = document.querySelector("#confirmPost");
const message_write_img_container_content = document.querySelector("div.message_write_img_container_content");




async function uploadMessageData() {
    const messageInfo =
        await fetch("./API/messageGetInfo.php")
        .then(res => res.json())
        .then(data => data); //獲取留言版的資訊

    //檢查會員是否登入
    login_check();
    const response =
        await fetch("./API/get_member_info.php")
        .then(res => res.json())
        .then(data => data); //取得會員資料
    // console.log("memberID: ", response[0].MEMBER_ID);

    const personalLikes =
        await fetch("./API/getMessageLikesAndComments.php", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(response[0].MEMBER_ID)
        })
        .then(res => res.json())
        .then(data => data);

    const personalComments =
        await fetch("./API/getComments.php")
        .then(res => res.json())
        .then(data => data);
    console.log("personalComments: ", personalComments);

    // const personalCommentsId =
    //     await fetch("./API/getCommentsId.php")
    //     .then(res => res.json())
    //     .then(data => data);

    // let personalCommentsPic = [];

    // for await(let id of personalCommentsId) {
    //     let personalId = id['RESPONSE&LIKE_MEMBER_ID']
    //     // console.log("personalCommentsId: ", personalId);
    //         await fetch("./API/getCommentsPic.php", {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json"
    //             },
    //             body: JSON.stringify(personalId)
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log("data[0] ", data[0]);
    //             // console.log("data[0].MEMBER_PICTURE: ", data[0].MEMBER_PICTURE);
    //             personalCommentsPic.push({
    //                 personalPic: data[0].MEMBER_PICTURE,
    //                 postId: id.POST_ID
    //             });
    //         });
    //     // console.log("pic[0].MEMBER_PICTURE: ", pic);
    //     // personalCommentsPic.push(pic[0].MEMBER_PICTURE);
    // }

    // console.log("personalCommentsPic: ", personalCommentsPic);

    // 顯示留言板的部分，使用Vue寫--------------------------------------------------------------------------------------
    const Feature = Vue.component('messageContent', {
        data() {
            return {
                isListShow: false,
                isFocus: false
            }
        },
        template: `
            <div :data_postId = "postId" :class = "{message_container: true, message_container_hide: isPostHide}" style = "background-image: url(./images/message/message_background_img.png);">
                <div :class = "{message_setting_container: true, message_setting_container_hide: settingIsHide}">
                    <div :class = "{message_setting_container_content: true}" @click = "listOpenOrClose">
                        <div></div>
                        <div></div>
                        <div></div>
                        <ul :class = "{message_setting_container_content_list: true, message_setting_container_content_list_show: isListShow}">
                            <li :class = "{message_setting_container_content_delete: true}" @click = "deletePost">刪除貼文</li>
                            <li :class = "{message_setting_container_content_delete: true}">編輯貼文</li>
                        </ul>
                    </div>
                </div>
                <div :class = "{message_user_and_time_and_like: true}">
                    <div :class = "{message_img_and_user_and_time: true}">
                        <img :class = "{message_user_img: true}" src = "./images/message/message_personal_example_photo.png">
                        <div :class = "{message_user_and_time: true}">
                            <p>{{ memberName }}</p>
                            <p>{{ postTime }}</p>
                        </div>
                    </div>
                    <div :class = "{message_like_container: true}" @click = changeLikeImg>
                        <div :class="{message_like: true, message_liked: personalLikes}"></div>
                        <p>+{{ postLike }}</p>
                    </div>
                </div>
                <div :class = "{message_content_and_comment: true}">
                    <div :class = "{message_content_text: true}">
                        <p>{{ postContent }}</p>
                    </div>
                    <img :class = "{message_content_img: true}" :src = postPicture>
                    <input :class = "{comment_input: true, message_focus_input: isFocus}" placeholder = "回應貼文..." @keyup = "inputComment" @focus = "inputFocus" @blur = "inputBlur">
                    <div :class = "{message_comment_container: true}" v-for = "(comment, index) in comments">
                        <img :class = "{message_comment_user_img: true}" :src = "comment.pic">
                        <p :class = "{message_comment_item: true}">{{ comment.comment }}</p>
                    </div>
                </div>
            </div>
        `,
        props: {
            memberId: {
                type: String
            },
            postLike: {
                type: String
            },
            postPicture: {
                type: String
            },
            postTime: {
                type: String
            },
            postContent: {
                type: String
            },
            postId: {
                type: String
            },
            index: {
                type: Number
            },
            isPostHide: {
                type: Boolean
            },
            personalLikes: {
                type: Boolean
            },
            memberName: {
                type: String
            },
            comments: {
                type: Array
            }
        },
        computed: {
            settingIsHide() {
                if (this.memberId === response[0].MEMBER_ID) {
                    return false;
                } else {
                    return true;
                }
            },
            personalPic() {
                let personalPicc = "";

                for(let i = 0; i < this.commentsPic.length; i = i + 1) {
                    if(this.commentsPic[i].postId === this.postId) {
                        // console.log("this.commentsPic[i].postId: ", this.personalpic[i].postId, "this.postId:", this.postId, "this.commentsPic[i].personalPic", this.personalpic[i].personalPic)
                        personalPicc = this.commentsPic[i].personalPic;
                        // this.personalpic.splice(i, 1);
                        break;
                    }
                };

                return personalPicc;
            }
            
        },
        methods: {
            listOpenOrClose() {
                if (this.isListShow) {
                    this.isListShow = false;
                }else {
                    this.isListShow = true;
                }

                if(this.messageSettingIsClicked) {
                    this.messageSettingIsClicked = false;
                }else {
                    this.messageSettingIsClicked = true;
                }
            },
            deletePost() {
                if (confirm("確定要刪除貼文？")) {
                    this.$emit('deletepost', this.postId);
                }else {
                    return;
                }
            },
            changeLikeImg() {
                if (this.personalLikes) {
                    this.$emit("changeLikeCounts", this.postId, Number(this.postLike) - 1, this.index);
                }else {
                    this.$emit("changeLikeCounts", this.postId, Number(this.postLike) + 1, this.index);
                }
            },
            inputComment(e) {
                if (e.keyCode === 13 && e.target.value) {
                    const inputValue = e.target.value;

                    e.target.value = "";
                    if(e.target.nextElementSibling) {
                        window.scrollTo({
                            top: e.target.parentElement.offsetTop + e.target.parentElement.offsetHeight - e.target.nextElementSibling.offsetHeight*2,
                            behavior: "smooth"
                        });
                    }
                    this.$emit("insertComment", inputValue, response[0].MEMBER_ID, this.postId, this.index);
                }
            },
            inputFocus() {
                this.isFocus = true;
            },
            inputBlur() {
                // console.log("blur事件被執行了");
                this.isFocus = false;
            },
            // personalPic() {
            //     let personalPicc = "";

            //     for(let i = 0; i < this.personalpic.length; i = i + 1) {
            //         if(this.personalpic[i].postId === this.postId) {
            //             console.log("this.commentsPic[i].postId: ", this.personalpic[i].postId, "this.postId:", this.postId, "this.commentsPic[i].personalPic", this.personalpic[i].personalPic)
            //             personalPicc = this.personalpic[i].personalPic;
            //             this.personalpic.splice(i, 1);
            //             break;
            //         }
            //     };

            //     return personalPicc;
            // }
        }
    });

    const vm = new Vue({
        el: "#message_app",
        template: `
            <div :class = "{message_and_comment_container: true}">
                <message-content v-for = "(message, index) in messageInfo" 
                    :memberId = "message.MEMBER_ID"
                    :memberName = "message.MEMBER_NAME"
                    :postLike = "message.POST_LIKE"
                    :postPicture = "message.POST_PICTURE"
                    :postTime = "message.POST_TIME"
                    :postContent = "message.POST_CONTENT"
                    :postId = "message.POST_ID"
                    :index = "index"
                    :key="index"
                    :isPostHide = "isPostHide"
                    :personalLikes = "isLiked(index)"
                    :comments = "updateComments(index)"
                    @deletepost = "deletePost"
                    @changeLikeCounts = "changelikecounts"
                    @insertComment = "insertcomment"
                />
            </div>
        `,
        data() {
            return {
                messageInfo: messageInfo,
                personalLikes: personalLikes,
                personalComments: personalComments,
                isPostHide: false
            }
        },
        methods: {
            async insertcomment(commentContent, memberId, postId, index) {
                const data = {
                    content: commentContent,
                    memberId: memberId,
                    postId: postId
                }
                await fetch("./API/insertComment.php", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(data => {
                        vm.personalComments = data;
                    });

                // await fetch("./API/getCommentsPic.php", {
                //         method: "POST",
                //         headers: {
                //             "content-type": "application/json"
                //         },
                //         body: JSON.stringify(memberId)
                //     })
                //     .then(res => res.json())
                //     .then(data => { console.log("personalCommentsPic: ", data[0].MEMBER_PICTURE);
                //         console.log("personalCommentsPicBefore: ", vm.personalCommentsPic);
                //         vm.personalCommentsPic.push(data[0].MEMBER_PICTURE);
                //         console.log("personalCommentsPicAfter: ", vm.personalCommentsPic);
                //     });

                this.updateComments(index);
            },
            deletePost(postID) {
                // setTimeout(function() {
                fetch("./API/deleteMessage.php", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(postID)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        vm.messageInfo = data;
                    });
                // }, 1000);
            },
            async changelikecounts(postID, updateLikeCounts, index) {
                const postIdAndUpdateLikeCounts = {
                    postID: postID,
                    updateLikeCounts: updateLikeCounts,
                    memberId: response[0].MEMBER_ID
                }

                await fetch("./API/updateLikeCounts.php", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(postIdAndUpdateLikeCounts)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        vm.messageInfo = data;
                    });

                await fetch("./API/getMessageLikesAndComments.php", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(response[0].MEMBER_ID)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log("data: ", data);
                        console.log("personalLikesBefore: ", vm.personalLikes);
                        vm.personalLikes = data;
                        console.log("data: ", data);
                        console.log("personalLikesAfter: ", vm.personalLikes);
                    });
            },
            isLiked(index) {
                let isLiked = false;

                for (let i = 0; i < this.personalLikes.length; i = i + 1) {
                    if (this.personalLikes[i].POST_ID === this.messageInfo[index].POST_ID && this.personalLikes[i].LIKE_MODE === "1") {
                        isLiked = true;
                        break;
                    }
                }

                return isLiked;
            },
            updateComments(index) {
                let comments = [];

                for (let i = 0; i < this.personalComments.length; i = i + 1) {
                    if (this.personalComments[i].POST_ID === this.messageInfo[index].POST_ID) {
                        if (this.personalComments[i].POST_RESPONSE_CONTENT) {
                            const data = {
                                id: this.personalComments[i]["RESPONSE&LIKE_MEMBER_ID"],
                                comment: this.personalComments[i].POST_RESPONSE_CONTENT,
                                pic: this.personalComments[i].MEMBER_PICTURE
                            }
                            comments.push(data);
                        }
                    }
                }

                return comments;
            }
        }
    });

    // po文章跟上傳圖片等部分-------------------------------------------------------------------------------------------
    let postInfo = {
        postContent: "",
        postImg: "",
        memberId: response[0].MEMBER_ID
    };

    function upLoadImg(srcEl, distEl) {
        srcEl.addEventListener("change", function () {
            const file = document.querySelector("input[type = 'file']").files[0];
            const readFile = new FileReader();




            distEl.classList.add("message_write_img_container_overflowY");
            readFile.readAsDataURL(file);
            readFile.addEventListener("load", function () {
                if (distEl.children[0].children[1]) {
                    distEl.children[0].children[1].remove();
                }

                distEl.children[0].insertAdjacentHTML("beforeend", `
                    <img class = "message_write_img_content" src = ${readFile.result}>
                `);

                postInfo.postImg = readFile.result;
                console.log(readFile.result);
            });
        });
    };

    function dragOverImg(message_write_message_content_container, el, newClass) {
        el.addEventListener("dragover", function (event) {
            event.preventDefault();
            el.classList.add(newClass);
        });

        // 拖曳檔案到內容區的時候，圖片上傳區就會顯示出來
        message_write_message_content_container.addEventListener("dragover", function (event) {
            event.preventDefault();
            message_write_img_container.classList.add("message_write_img_container_open");
        });

    }

    function droppedImg(srcEl, message_write_img_container) {
        // 拖曳檔案到圖片上傳區的時候，圖片就能上傳
        srcEl.addEventListener("drop", function (event) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            const readFile = new FileReader();




            message_write_img_container.classList.add("message_write_img_container_overflowY");
            readFile.readAsDataURL(file);
            readFile.addEventListener("load", function () {
                if (srcEl.children[1]) {
                    srcEl.children[1].remove();
                }

                srcEl.insertAdjacentHTML("beforeend", `
                    <img class = "message_write_img_content" src = ${readFile.result}>
                `);

                postInfo.postImg = readFile.result;
            });
        });
    }





    // 上傳圖片
    upLoadImg(inputFile, message_write_img_container);
    dragOverImg(message_write_img_container.parentElement, message_write_img_container.children[0], "message_write_img_container_open");
    droppedImg(message_write_img_container.children[0], message_write_img_container);

    // 點擊送出po文------------------------------------------------------------------------------------------------------
    confirmPost.addEventListener("click", function (event) {
        postInfo.postContent = message_write_message_content.value;
        if (postInfo.postContent === "" || postInfo.postImg === "") {
            alert("未發文或上傳圖片！");
        } else {
            fetch("./API/createPost.php", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(postInfo)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.alert("上傳成功");
                    location.href = "./message.html";
                })
        }

        event.target.classList.toggle("message_post_confirm_clicked");
    });

    // 按enter鍵送出po文
    // message_write_message_content.addEventListener("keyup", function(event) {
    //     postInfo.postContent = message_write_message_content.value;
    //     if(event.keyCode === 13) {
    //         if (postInfo.postContent === "" || postInfo.postImg === "") {
    //             alert("未發文或上傳圖片！");
    //         } else {
    //             fetch("./API/createPost.php", {
    //                     method: "POST",
    //                     headers: {
    //                         "content-type": "application/json"
    //                     },
    //                     body: JSON.stringify(postInfo)
    //                 })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     console.log(data);
    //                     window.alert("上傳成功");
    //                     location.href = "/TeamWorkCatopia/dist/message.html";
    //                 })
    //         }
    
    //         event.target.classList.toggle("message_post_confirm_clicked");
    //     }
    // });

    // 更改class以及刪除圖片等部分--------------------------------------------------------------------------------------------------------
    // 點擊上傳圖片按鈕後，顯示圖片上傳區
    message_write_message_img_file_container.addEventListener("click", function () {
        message_write_img_container.classList.add("message_write_img_container_open");
    });

    // 點擊發一則貼文後的效果
    click_to_message_input_container.addEventListener("click", function () {
        message_write_message_container.classList.add("message_write_message_container_open");
        message_write_background.style.display = "block";
    });

    // 點擊貼文關閉按鈕後的效果
    message_write_message_close.addEventListener("click", function () {
        message_write_message_container.classList.remove("message_write_message_container_open");
        message_write_background.style.display = "none";
    });

    // 點擊外面其他元素來關閉發文區
    document.querySelector("body").addEventListener("click", function (event) {
        if (message_write_message_container.classList.contains("message_write_message_container_open") && event.target === message_write_background) {
            message_write_message_container.classList.remove("message_write_message_container_open");
            message_write_background.style.display = "none";
        }
    }, true);

    // 點擊圖片右上方的X會做的事情
    message_write_img_container.children[0].addEventListener("click", function () {
        if (!(message_write_img_container.children[0].children[1])) {
            window.alert("目前沒有選擇圖片！");
        } else {
            if (window.confirm("確定要刪除圖片？")) {
                message_write_img_container.classList.remove("message_write_img_container_open");
                message_write_img_container.children[0].children[1].remove();
            } else {
                return;
            }
        }
    });
}

uploadMessageData();