document.addEventListener('DOMContentLoaded', function () {
  // البحث عن النموذج بطريقته القديمة أو بأول نموذج بالصفحة
  const form = document.getElementById('ideaForm') || document.querySelector('form');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // تحديد زر الإرسال تلقائياً للحفاظ على شكله الحالي
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
    const originalBtnText = submitBtn ? submitBtn.innerText : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'جاري الإرسال...';
    }

    // تجميع البيانات من العناصر القديمة كما هي
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // إرسال البيانات بصيغة JSON متوافقة مع Formspree
      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('تم إرسال فكرتك بنجاح! شكرًا لمشاركتك. ✨');
        form.reset();
      } else {
        const errorData = await response.json();
        alert('حدث خطأ أثناء الإرسال، يرجى التأكد من ملء جميع الحقول المطلوبة.');
      }
    } catch (error) {
      alert('تعذر الاتصال بالسيرفر. يرجى التحقق من الاتصال بالإنترنت والمحاولة مجدداً.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });
});
