new Vue({
    el: '#app', //語法=> 屬性:屬性值,
    data: { 
        isBlackListPopup:false
    },
    methods: {  //函數(方法)大部分放這裡!               
        blackListAdd(e){  // 事件聆聽功能一定有帶參數，所以要放這，一定會帶事件物件!!
            // this.show = 'flex'; // 綁定style
            this.isBlackListPopup = true
        },
        blackListRemove(e){  // 事件聆聽功能
            // this.show = 'none'; // 綁定style
            this.isBlackListPopup = false
        }
    },
    computed: {  //函數(方法)也可以放這裡! 但是放在這裡的函數，不能傳參數，一定要傳回值(return)

    },
});
