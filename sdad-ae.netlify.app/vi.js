document.getElementById('number').addEventListener('input', function (e) {
    var cardNumber = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, ''); // إزالة المسافات والرموز غير الرقمية

    // كشف نوع البطاقة بناءً على رقم البطاقة
    var cardImage = '';
    
    if (/^4/.test(cardNumber)) {
        cardImage = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg'; // صورة Visa
    } else if (/^5[1-5]/.test(cardNumber)) {
        cardImage = 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'; // صورة MasterCard
    } else if (/^3[47]/.test(cardNumber)) {
        cardImage = 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg'; // صورة American Express
    } else if (/^6(?:011|5)/.test(cardNumber)) {
        cardImage = 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Discover_Card_logo.svg'; // صورة Discover
    } else if (/^3(?:0[0-5]|[68])/ .test(cardNumber)) {
        cardImage = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Diners_Club_Logo4.svg'; // صورة Diners Club
    } else if (/^(?:2131|1800|35\d{3})/.test(cardNumber)) {
        cardImage = 'https://upload.wikimedia.org/wikipedia/commons/1/16/JCB_logo.svg'; // صورة JCB
    } else if (/^62/.test(cardNumber)) {
        cardImage = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/UnionPay_logo.svg'; // صورة UnionPay
    } else {
        cardImage = '';
    }

    // تحديث الصورة
    var cardImageElem = document.getElementById('card-image');
    
    if (cardImage) {
        cardImageElem.src = cardImage;
        cardImageElem.style.display = 'inline'; // عرض الصورة
    } else {
        cardImageElem.style.display = 'none'; // إخفاء الصورة إذا لم يتم التعرف على البطاقة
    }
});
