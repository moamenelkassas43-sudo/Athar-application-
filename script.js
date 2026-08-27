document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('ideaForm');
  const statusMessage = document.getElementById('status-message');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // 1. تحديث حالة الزر والواجهة أثناء الإرسال
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'جاري الإرسال...';
    
    if (statusMessage) {
      statusMessage.style.display = 'none';
      statusMessage.className = '';
    }

    // 2. تجميع البيانات من النموذج
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // 3. محاولة الإرسال الحديث عبر Fetch بترميز JSON الصريح
      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // نجاح الإرسال
        if (statusMessage) {
          statusMessage.className = 'success';
          statusMessage.innerText = 'تم إرسال فكرتك بنجاح! شكرًا لمشاركتك. ✨';
          statusMessage.style.display = 'block';
        } else {
          alert('تم إرسال فكرتك بنجاح! شكرًا لمشاركتك. ✨');
        }
        form.reset();
      } else {
        throw new Error('فشل الاستجابة من السيرفر');
      }
    } catch (error) {
      // 4. في حالة وجود أي خطأ، يتم الاعتماد على طريقة الإرسال المباشر (القديمة) لضمان عدم ضياع الرسالة
      console.warn('جاري التراجع للطريقة التقليدية للارسال...', error);
      
      // إنشاء نموذج مؤقت واستبدال طريقة الإرسال ليعمل تلقائياً
      form.removeEventListener('submit', arguments.callee);
      form.submit();
    } finally {
      // إرجاع الزر لحالته الأصلية
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  });
});

