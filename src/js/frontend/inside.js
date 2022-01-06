let big_img = document.getElementsByClassName("big_img");
      let small_img = document.getElementsByClassName("small_img");

      small_img[0].style = 'transform: scale(1.1);border:1px solid;border-radius: 5px;';
      for( let i=0; i < small_img.length; i++){
      small_img[i].addEventListener("click", function(){
        big_img[0].src = small_img[i].src;
        for(let i=0; i < small_img.length; i++){
          small_img[i].style='';
        }
        this.style = 'transform: scale(1.1);border:1px solid;border-radius: 5px;';
      });
      };

