//點擊時呼叫ajax
$(".ai_answe_button").click(function () {
  $.ajax({
    method: "GET",
    url: "API/question.php",
    data: {
      question: $("#get_question").val(),
    },
    dataType: "json",
    success: function (response) {
      // let ans = response.ANSWER_CONTENT;
      console.log(response);
      if ($("#get_question").val() === "" || response.length === 0) {
        $("#ai_answer").html("請再詳細描述");
      } else {
        $("#ai_answer").html(response[0].ANSWER_CONTENT);
      }
    },
    error: function (exception) {
      alert("發生錯誤: " + exception.status);
    },
  });
});
//placeholder
$(":text")
  .focus(function () {
    $(this).attr("placeholder", "");
  })
  .blur(function () {
    if ($(this).val() == "") {
      $(this).attr("placeholder", "輸入您的問題..");
    }
  });

//手風琴
(function () {
  const title = document.querySelectorAll(
    "div.more_question_question_and_answer_title"
  );
  const content = document.querySelector(
    "div.more_question_question_and_answer_content > p"
  );
  const ai_container = document.querySelector("div.ai_container");
  const ai_answer = document.querySelector("div.ai_answer");
  const more_question_contact_button = document.querySelector(
    "button.more_question_contact_button"
  );
  const more_question_background = document.querySelector(
    "div.more_question_background"
  );

  for (let i = 0; i < title.length; i = i + 1) {
    const height = title[i].nextElementSibling.children[0].offsetHeight;
    title[i].addEventListener("click", function () {
      this.classList.toggle("more_question_question_and_answer_title_open");

      this.nextElementSibling.classList.toggle(
        "more_question_question_and_answer_content_open"
      );
      if (
        this.nextElementSibling.classList.contains(
          "more_question_question_and_answer_content_open"
        )
      ) {
        this.nextElementSibling.style.height = `${height}px`;
      } else {
        this.nextElementSibling.style.height = `0px`;
      }
    });
  }

  ai_container.addEventListener("click", function () {
    ai_answer.classList.toggle("ai_answer_open");
    more_question_background.classList.toggle("more_question_background_open");
  });

  ai_answer.addEventListener("click", function (event) {
    event.stopImmediatePropagation();
  });

  // 點擊more_question_contact_button前往聯絡頁面
  more_question_contact_button.addEventListener("click", function () {
    window.location.href = "/dist/contact.html";
  });

  // 點擊空白處來關閉ai_answer對話框
  document.querySelector("body").addEventListener(
    "click",
    function (event) {
      if (
        ai_answer.classList.contains("ai_answer_open") &&
        event.target === more_question_background
      ) {
        ai_answer.classList.remove("ai_answer_open");
        more_question_background.classList.remove(
          "more_question_background_open"
        );
        document.querySelector(".ai_answer p").innerHTML = "您有什麼問題呢？";
        let question = document.querySelector("input");
        question.value = "";
        question.setAttribute("placeholder", "輸入您的問題..");
      }
    },
    true
  );
})();
