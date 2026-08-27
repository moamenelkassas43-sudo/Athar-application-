// حفظ الفكرة محلياً وعرضها فوراً في الداشبورد
function submitIdea(e) {
    e.preventDefault();
    const input = document.getElementById('ideaInput');
    const fekraText = input.value.trim();

    if (fekraText !== '') {
        // جلب الأفكار المخزنة سابقاً أو إنشاء مصفوفة جديدة
        const existingIdeas = JSON.parse(localStorage.getItem('app_ideas') || '[]');
        
        // إضافة الفكرة الجديدة وبيانات الطالب
        const newIdea = {
            name: currentStudent.name || 'زائر',
            gender: currentStudent.gender === 'girl' ? 'بنت' : 'ولد',
            district: currentStudent.district || 'غير محدد',
            grade: currentStudent.grade || 'غير محدد',
            idea: fekraText,
            date: new Date().toLocaleString('ar-EG')
        };
        
        existingIdeas.push(newIdea);
        localStorage.setItem('app_ideas', JSON.stringify(existingIdeas));

        alert('شكراً لك 😍 تم إرسال الفكرة بنجاح!');
        input.value = '';
        document.getElementById('ideaModal').classList.remove('active');
        
        // تحديث عرض الأفكار في الداشبورد
        renderAdminIdeas();
    } else {
        alert('الرجاء كتابة الفكرة أولاً');
    }
}

// دالة لعرض الأفكار داخل لوحة التحكم
function renderAdminIdeas() {
    const adminPanel = document.getElementById('adminDashboard');
    const ideas = JSON.parse(localStorage.getItem('app_ideas') || '[]');
    
    let ideasHTML = `<div class="glass-panel" style="margin-top:20px;">
        <h4 style="color:var(--accent-color); margin-bottom:15px;"><i class="fa-solid fa-lightbulb"></i> الأفكار والمقترحات المرفوعة (${ideas.length})</h4>`;
    
    if(ideas.length === 0) {
        ideasHTML += `<p style="color:var(--text-sub);">لا توجد أفكار مرسلة حتى الآن.</p>`;
    } else {
        ideas.forEach((item, idx) => {
            ideasHTML += `
                <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:10px; margin-bottom:10px; border-right:3px solid var(--accent-color);">
                    <p><strong>الاسم:</strong> ${item.name} (${item.gender}) - <strong>الإدارة:</strong> ${item.district}</p>
                    <p><strong>الفكرة:</strong> ${item.idea}</p>
                    <small style="color:var(--text-sub);">${item.date}</small>
                </div>
            `;
        });
    }
    ideasHTML += `</div>`;
    
    // إضافة العناصر للداشبورد
    const existingList = document.getElementById('ideasAdminContainer');
    if(existingList) existingList.remove();
    
    const container = document.createElement('div');
    container.id = 'ideasAdminContainer';
    container.innerHTML = ideasHTML;
    adminPanel.appendChild(container);
}
