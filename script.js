const TARGET_PHONE = "01229430939";
let selectedStars = 0;

document.addEventListener("DOMContentLoaded", () => {
    
    // تهيئة الأيقونات
    if (window.lucide) lucide.createIcons();

    // ١. شاشة البداية
    const startBtn = document.getElementById("startBtn");
    const welcomeSection = document.getElementById("welcomeSection");
    const unionForm = document.getElementById("unionForm");

    startBtn?.addEventListener("click", () => {
        welcomeSection.classList.add("hidden");
        unionForm.classList.remove("hidden");
    });

    // ٤. التقييم بالنجوم
    const starButtons = document.querySelectorAll("#starRating button");
    starButtons.forEach(star => {
        star.addEventListener("click", () => {
            selectedStars = Number(star.dataset.value);
            starButtons.forEach(s => {
                s.classList.toggle("active", Number(s.dataset.value) <= selectedStars);
            });
        });
    });

    // ٥. حفظ البيانات
    const saveDataBtn = document.getElementById("saveDataBtn");
    const saveMessage = document.getElementById("saveMessage");

    saveDataBtn?.addEventListener("click", () => {
        saveMessage.classList.remove("hidden");
        setTimeout(() => {
            saveMessage.classList.add("hidden");
        }, 3000);
    });

    // ٦. الإرسال النهائي وتجهيز الواتساب + ٧. عرض الشهادة
    unionForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName")?.value.trim();
        const grade = document.getElementById("grade")?.value.trim();
        const position = document.querySelector('input[name="position"]:checked')?.value || "";
        const committee = document.querySelector('input[name="committee"]:checked')?.value || "";
        const teamRole = document.querySelector('input[name="teamRole"]:checked')?.value || "";
        const activityField = document.querySelector('input[name="activityField"]:checked')?.value || "";
        const hobby = document.getElementById("hobby")?.value.trim();
        const unionKnowledge = document.getElementById("unionKnowledge")?.value.trim();
        const referrer = document.getElementById("referrer")?.value.trim();
        const momenReview = document.getElementById("momenReview")?.value.trim();

        // تجهيز نص الرسالة
        const whatsappMessage = `📋 *تسجيل جديد في منصة اتحاد الطلاب*

👤 *الاسم بالكامل:* ${fullName}
🎓 *الصف الدراسي:* ${grade}
🏅 *المنصب:* ${position}
📚 *اللجنة:* ${committee}

⚙️ *أسئلة الفريق:*
- اختيار الفريق: ${teamRole}
- المجال المحبب: ${activityField}
- الهواية: ${hobby}
- معرفته بالاتحاد: ${unionKnowledge}
- الشخص الذي عرفه بالاتحاد: ${referrer}

⭐ *تقييم مؤمن القصاص:* ${selectedStars} نجوم
📝 *الرأي:* ${momenReview || "لا يوجد"}`;

        // فتح الواتساب برقم المستقبل المحدد
        const formattedPhone = TARGET_PHONE.startsWith("0") ? "2" + TARGET_PHONE : TARGET_PHONE;
        window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

        // ٧. الشهادة
        document.getElementById("certStudentName").textContent = fullName;
        document.getElementById("certificateSection").classList.remove("hidden");
        document.getElementById("certificateSection").scrollIntoView({ behavior: "smooth" });
    });
});
