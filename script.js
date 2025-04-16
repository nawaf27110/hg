// script.js
// ملاحظة: هنا نستخدم كائن questionsDatabase القادم من ملف questionsDatabase.js
// لذا تأكد أن ملف questionsDatabase.js قد تم تحميله قبل هذا الملف في الـ HTML.

/* ===============================================================================================
    1) المتغيرات العامة
   =============================================================================================== */
const v0 = 'examStateLocal';
const v1 = 'examFormData'; // تخزين بيانات الصفحة الأولى

let v2 = {};
const v3 = new Set();


/* ===============================================================================================
   بقية الأكواد كما هي (نفس الكود السابق) مع حذف الجزء الخاص بتعريف questionsDatabase.
   سيجد الكود كائن questionsDatabase معرفةً في ملف questionsDatabase.js
   =============================================================================================== */

/* هنا نتابع الأكواد نفسها: */

// لا نعيد تعريف questionsDatabase لأنه أصبح الآن في ملف مستقل.

// قاعدة البيانات أصبحت مستوردة من ملف آخر (عبر وسم <script> في الـHTML بالترتيب).

function validateAndGoNext() {
    const v4 = document.getElementById('v4').value.trim();
    const v5 = document.getElementById('v5').value.trim();
    const v6 = document.getElementById('educationDepartment').value.trim();
    const v151 = document.getElementById('v151').value;
    const v8 = document.getElementById('manualTotalScore').value;
    const v9 = document.getElementById('v9').value.trim();

    if (!v4 || !v5 || !v6 || !v151 || v8 === '' || !v9) {
        alert("الرجاء تعبئة جميع الحقول الإلزامية قبل المتابعة.");
        return;
    }

    saveFormState(); // حفظ بيانات الصفحة الأولى
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';

    updateTeacherName();
    updateExamType();
    updateManualTotalScore();
    updateEducationDepartment();
    updateSchoolName();
    updateDisplay();
}

function printExam() {
    window.print();
}

function updateTeacherName() {
  const v10 = document.getElementById('v4').value;

  if (v159) {
    // وضع البنات
    document.getElementById('teacherHeader').textContent =
      v10 ? 'معلمة المادة: ' + v10 : 'معلمة المادة:';
  } else {
    // وضع البنين
    document.getElementById('teacherHeader').textContent =
      v10 ? 'معلم المادة: ' + v10 : 'معلم المادة:';
  }
}

function updateEducationDepartment() {
    const v11 = document.getElementById('educationDepartment').value.trim();
    const v12 = document.getElementById('educationDepartmentHeader');
    if (v11) {
        v12.textContent = 'إدارة التعليم بمنطقة ' + v11;
    } else {
        v12.textContent = 'إدارة التعليم بمنطقة';
    }
}

function updateSchoolName() {
    const v13 = document.getElementById('v9').value.trim();
    document.getElementById('schoolHeader').textContent = v13 || "اسم المدرسة";
}

function updateAcademicYear() {
    updateDisplay();
}

function updateDisplay() {
    const v14 = document.getElementById('v5').value.trim();
    const v151 = document.getElementById('v151').value;
    const v16 = document.getElementById('academicYearDisplay');

    let v17 = '';

    if (v151 && v14) {
        v17 = `${v151} - فيزياء 1 أول ثانوي العام الدراسي ${v14} هـ الفصل الدراسي الأول`;
    } else if (v151 && !v14) {
        v17 = `${v151} - فيزياء 1 أول ثانوي العام الدراسي الفصل الدراسي الأول`;
    } else if (!v151 && v14) {
        v17 = `- فيزياء 1 أول ثانوي العام الدراسي ${v14} هـ الفصل الدراسي الأول`;
    } else {
        v17 = `- فيزياء 1 أول ثانوي العام الدراسي الفصل الدراسي الأول`;
    }

    if (v151 === 'اختبار نهائي') {
        v17 += ' - الدور الأول';
    }

    v16.textContent = v17;
}


function showSubtopics() {
    const v86 = document.getElementById('v86').value;
    const v19 = document.getElementById('v19');
    const v20 = document.getElementById('v20');
    const v27 = document.getElementById('questionList');

    v19.innerHTML = '<v24 value="">اختر القسم الفرعي</v24>';
    v27.innerHTML = '';
    v27.style.display = 'none';

    if (!v86 || !questionsDatabase[v86]) {
        v19.style.display = 'none';
        v20.style.display = 'none';
        return;
    }

    const v28 = questionsDatabase[v86].v138;
    if (!v28) {
        v19.style.display = 'none';
        v20.style.display = 'none';
        return;
    }

    v19.style.display = 'block';
    v20.style.display = 'block';

    for (let v139 in v28) {
        if (v28.hasOwnProperty(v139)) {
            let v24 = document.createElement('v24');
            v24.value = v139;
            v24.textContent = v28[v139].label;
            v19.appendChild(v24);
        }
    }
}

function showQuestionsForSubtopic() {
    const v25 = document.getElementById('v86').value;
    const v26 = document.getElementById('v19').value;
    const v27 = document.getElementById('questionList');

    v27.innerHTML = '';

    if (!v25 || !v26) {
        v27.style.display = 'none';
        return;
    }

    const v28 = questionsDatabase[v25].v138;
    const v29 = v28[v26];
    if (!v29 || !v29.v141) {
        v27.style.display = 'none';
        return;
    }

    let v30 = v29.v141.slice();
    // essay => 1 سطر, essay3 => 3 أسطر, essay10 => 10 أسطر
    const v31 = { mcq: 1, tf: 2, essay: 3, essay3: 3, essay10: 3 };
    v30.sort((a,b) => (v31[a.type]||99) - (v31[b.type]||99));

    if (v30.length === 0) {
        v27.innerHTML = '<p>لا توجد أسئلة متاحة</p>';
        v27.style.display = 'block';
        return;
    }

    let v146 = '<ul style="list-style: none; padding:0;">';
    v30.forEach(q => {
        let v33 = '';
        if (q.type === 'mcq') v33 = '[اختيار متعدد] ';
        else if (q.type === 'tf') v33 = '[صح / خطأ] ';
        else if (q.type === 'essay' || q.type === 'essay3' || q.type === 'essay10') v33 = '[مقالي] ';

        let v34 = v2[v25]?.includes(q.question);
        v146 += `
          <v87 style="margin-bottom:5px;">
            <strong>${v33 + q.question}</strong>
            <button style="float:left;"
                onclick="toggleQuestionFromList('${v25}','${v26}','${q.question}')">
              ${v34 ? 'إزالة' : 'إضافة'}
            </button>
            <div style="clear:both;"></div>
          </v87>
        `;
    });
    v146 += '</ul>';

    v27.innerHTML = v146;
    v27.style.display = 'block';
}

function toggleQuestionFromList(v25, v26, v88) {
    const v35 = questionsDatabase[v25].v138[v26];
    if (!v35) return;

    let v36 = v35.v141.find(q => q.question === v88);
    if (!v36) return;

    if (v36.type === 'mcq') {
        createMCQInPreview(v36.question, v25, v36.options, null);
    } else if (v36.type === 'tf') {
        createTFInPreview(v36.question, v25, null);
    } else if (v36.type === 'essay' || v36.type === 'essay3' || v36.type === 'essay10') {
        createEssayInPreview(v36.question, v25, null, null);
    }

    showQuestionsForSubtopic();
}


function toggleQuestion() {
    /* هذه الدالة يمكن تجاهلها أو تركها إن كان لديك عنصر <select> قديم */
}


function createMCQInPreview(v88, v86, optionsArray, selectElement) {
    const v37 = document.getElementById('v37');
    let v38 = v37.querySelector(`v87[data-question='${v88}']`);

    if (v38) {
        v38.remove();
        v3.delete(v88);
        if (v2[v86]) {
            v2[v86] = v2[v86].filter(q => q !== v88);
        }
        if (selectElement) {
            let v66 = selectElement.querySelector(`v24[value="${v88}"]`);
            if (v66) v66.textContent = v66.textContent.replace(' ✅','');
        }
        updateVisibilityAndCounts();
        saveStateToLocal();
        return;
    }

    let v87 = document.createElement('v87');
    v87.setAttribute('data-question', v88);
    v87.setAttribute('data-v86', v86);
    v87.setAttribute('data-type', 'mcq');

    let v62 = `<span class='delete-btn' onclick='deleteQuestion(this)'>حذف</span>`;
    let v63   = `<span class='edit-btn' onclick='editQuestion(this)'>تعديل</span>`;

    let v43 = `
        <div class="question-line">
            ${v62} ${v63}
            <strong>${v88}</strong>
        </div>
    `;

    let v97 = ['أ','ب','ج','د'];
    let v98 = '';
    for (let v99 = 0; v99 < 4; v99++) {
        let v47 = optionsArray[v99] || '';
        v98 += `
            <td class="letter-cell">${v97[v99]})</td>
            <td class="answer-cell">${v47}</td>
        `;
    }
    v87.innerHTML = v43 + `<table><tr>${v98}</tr></table>`;
    v37.appendChild(v87);

    if (window.MathJax) {
        window.MathJax.typesetPromise();
    }

    v3.add(v88);
    if (!v2[v86]) {
        v2[v86] = [];
    }
    v2[v86].push(v88);

    if (selectElement) {
        let v66 = selectElement.querySelector(`v24[value="${v88}"]`);
        if (v66) {
            v66.textContent += ' ✅';
        }
    }

    let v135 = v87.querySelectorAll('td');
    v135.forEach(cell => {
        scaleTextToFit(cell, 4);
    });

    updateVisibilityAndCounts();
    saveStateToLocal();
}


/* 
    *** تم التعديل هنا لإضافة جدول سؤال الصح والخطأ بعرض 50px للخلية الثانية ***
*/
function createTFInPreview(v88, v86, selectElement) {
    const v50 = document.getElementById('v50');
    let v51 = v50.querySelector(`v87[data-question='${v88}']`);
    if (v51) {
        v51.remove();
        v3.delete(v88);
        if (v2[v86]) {
            v2[v86] = v2[v86].filter(q => q !== v88);
        }
        if (selectElement) {
            let v66 = selectElement.querySelector(`v24[value="${v88}"]`);
            if (v66) {
                v66.textContent = v66.textContent.replace(' ✅','');
            }
        }
        updateVisibilityAndCounts();
        saveStateToLocal();
        return;
    }

    let v87 = document.createElement('v87');
    v87.setAttribute('data-question', v88);
    v87.setAttribute('data-v86', v86);
    v87.setAttribute('data-type', 'tf');

    let v62 = `<span class='delete-btn' onclick='deleteQuestion(this)'>حذف</span>`;
    let v63   = `<span class='edit-btn' onclick='editQuestion(this)'>تعديل</span>`;

    // جدول بخليتين: الأولى للسؤال، والثانية للأقواس بعرض 50px
    let v56 = `
      <table>
        <tr>
          <td style="width:auto; text-align:right;">${v88}</td>
          <td style="width:50px; text-align:center;"> &emsp;&emsp; </td>
        </tr>
      </table>
    `;

    v87.innerHTML = `${v62} ${v63} ${v56}`;
    v50.appendChild(v87);

    if (window.MathJax) {
        window.MathJax.typesetPromise();
    }

    v3.add(v88);
    if (!v2[v86]) {
        v2[v86] = [];
    }
    v2[v86].push(v88);

    if (selectElement) {
        let v66 = selectElement.querySelector(`v24[value="${v88}"]`);
        if (v66) {
            v66.textContent += ' ✅';
        }
    }

    updateVisibilityAndCounts();
    saveStateToLocal();
}


function createEssayInPreview(v88, v86, imageDataUrl=null, selectElement=null) {
    const v58 = document.getElementById('v58');

    // لو السؤال مكرر
    if (selectElement) {
        let v59 = v58.querySelector(`v87[data-question='${v88}']`);
        if (v59) {
            v59.remove();
            v3.delete(v88);
            if (v2[v86]) {
                v2[v86] = v2[v86].filter(q => q !== v88);
            }
            if (selectElement) {
                let v66 = selectElement.querySelector(`v24[value="${v88}"]`);
                if (v66) {
                    v66.textContent = v66.textContent.replace(' ✅','');
                }
            }
            updateVisibilityAndCounts();
            saveStateToLocal();
            return;
        }
    }

    // ننشئ الـ <v87> مع 5 أسطر فاضية تحت السؤال
    let v87 = document.createElement('v87');
    v87.setAttribute('data-question', v88);
    v87.setAttribute('data-v86', v86);
    v87.setAttribute('data-type', 'essay');

    let v62 = `<span class='delete-btn' onclick='deleteQuestion(this)'>حذف</span>`;
    let v63   = `<span class='edit-btn' onclick='editQuestion(this)'>تعديل</span>`;

    let v64 = '';
    if (imageDataUrl) {
        v64 = `
            <div class='essay-image-v117' data-scale='1' data-offset='0'>
                <v111 src='${imageDataUrl}' class='essay-image' />
                <div class='zoom-controls'>
                    <button onclick='zoomIn(this)'>تكبير</button>
                    <button onclick='zoomOut(this)'>تصغير</button>
                    <button onclick='moveImageRight(this)'>ازاحة يمين</button>
                    <button onclick='moveImageLeft(this)'>ازاحة يسار</button>
                </div>
            </div>
        `;
    }

    // أضف 5 أسطر فاضية
    let v65 = '<br>';

    v87.innerHTML = `
        ${v62} ${v63}
        <span class='essay-content'>${v88}</span>
        ${v64}
        ${v65}
    `;
    v58.appendChild(v87);

    if (window.MathJax) {
        window.MathJax.typesetPromise();
    }

    v3.add(v88);
    if (!v2[v86]) {
        v2[v86] = [];
    }
    v2[v86].push(v88);

    if (selectElement) {
        let v66 = selectElement.querySelector(`v24[value="${v88}"]`);
        if (v66) {
            v66.textContent += ' ✅';
        }
    }

    updateVisibilityAndCounts();
    saveStateToLocal();
}

function handleCustomTypeChange() {
    const v72 = document.getElementById('customQuestionType').value;
    const v68 = document.getElementById('v68');
    const v69 = document.getElementById('v69');
    const v70 = document.getElementById('v70');
    const v71 = document.getElementById('addCustomBtn');

    v68.style.display = 'none';
    v69.style.display = 'none';
    v70.style.display = 'none';
    v71.style.display = 'none';

    if (v72 === 'mcq') {
        v68.style.display = 'block';
        v71.style.display = 'block';
    } else if (v72 === 'tf') {
        v69.style.display = 'block';
        v71.style.display = 'block';
    } else if (v72 === 'essay') {
        v70.style.display = 'block';
        v71.style.display = 'block';
    }
}

function addCustomQuestion() {
    const v72 = document.getElementById('customQuestionType').value;
    if (!v72) return;

    if (v72 === 'mcq') {
        const v88 = document.getElementById('mcqQuestionInput').value.trim();
        const v74 = document.getElementById('mcqOption1').value;
        const v75 = document.getElementById('mcqOption2').value;
        const v76 = document.getElementById('mcqOption3').value;
        const v77 = document.getElementById('mcqOption4').value;
        if (!v88) return;
        createMCQInPreview(v88, 'custom', [v74,v75,v76,v77], null);

        document.getElementById('mcqQuestionInput').value = '';
        document.getElementById('mcqOption1').value = '';
        document.getElementById('mcqOption2').value = '';
        document.getElementById('mcqOption3').value = '';
        document.getElementById('mcqOption4').value = '';

    } else if (v72 === 'tf') {
        const v88 = document.getElementById('tfQuestionInput').value.trim();
        if (!v88) return;
        createTFInPreview(v88, 'custom', null);
        document.getElementById('tfQuestionInput').value = '';

    } else if (v72 === 'essay') {
        const v88 = document.getElementById('essayQuestionInput').value.trim();
        const v80 = document.getElementById('essayImageInput');
        const v81 = v80.files[0];

        if (!v88 && !v81) return;

        let v82 = Promise.resolve(null);
        if (v81) {
            v82 = new Promise(resolve => {
                const v83 = new FileReader();
                v83.onload = function(e) {
                    resolve(e.target.result);
                };
                v83.readAsDataURL(v81);
            });
        }

        v82.then(imageDataUrl => {
            createEssayInPreview(v88, 'custom', imageDataUrl, null);
            document.getElementById('essayQuestionInput').value = '';
            document.getElementById('essayImageInput').value = '';
        });
    }
}

function deleteQuestion(button) {
    let v87 = button.closest('v87');
    if (!v87) return;

    let v88 = v87.getAttribute('data-question');
    let v86 = v87.getAttribute('data-v86');

    v87.remove();
    v3.delete(v88);

    if (v2[v86]) {
        v2[v86] = v2[v86].filter(q => q !== v88);
    }

    updateVisibilityAndCounts();
    saveStateToLocal();
}

/* 
    *** تم التعديل هنا لدعم تعديل نص السؤال للـ TF مع الجدول (خليتان) ***
*/
function editQuestion(button) {
    let v87 = button.closest('v87');
    if (!v87) return;

    let v88 = v87.getAttribute('data-question');
    let v147 = v87.getAttribute('data-type');

    if (v147 === 'mcq') {
        let v102 = prompt("عدل نص السؤال:", v88);
        if (v102 === null) return;
        v102 = v102.trim() || v88;

        let v135 = v87.querySelectorAll('table td.answer-cell');
        let v92 = Array.from(v135).map(td => td.textContent.trim());
        let v93 = [];
        for (let v99=0; v99<v92.length; v99++) {
            let v95 = prompt(`عدل الخيار ${v99+1}:`, v92[v99]);
            if (v95===null) v95=v92[v99];
            v93.push(v95.trim());
        }

        v87.setAttribute('data-question', v102);
        let v96 = v87.querySelector('.question-line strong');
        if (v96) v96.textContent = v102;

        let v97 = ['أ','ب','ج','د'];
        let v98 = '';
        for (let v99=0; v99<4; v99++) {
            v98 += `
              <td class="letter-cell">${v97[v99]})</td>
              <td class="answer-cell">${v93[v99]}</td>
            `;
        }
        v87.querySelector('table').innerHTML = `<tr>${v98}</tr>`;

    } else if (v147 === 'tf') {
        // التعديل على نص السؤال في أول خلية
        let v102 = prompt("عدل نص السؤال:", v88);
        if (v102 === null) return;
        v102 = v102.trim() || v88;

        v87.setAttribute('data-question', v102);

        // خلية السؤال هي الخلية الأولى في الجدول
        let v101 = v87.querySelector('table tr td:first-child');
        if (v101) {
            v101.textContent = v102;
        }

    } else if (v147 === 'essay' || v147 === 'essay3' || v147 === 'essay10') {
        let v102 = prompt("عدل نص السؤال:", v88);
        if (v102 === null) return;
        v102 = v102.trim() || v88;
        v87.setAttribute('data-question', v102);

        let v103 = v87.querySelector('.essay-content');
        if (v103) v103.textContent = v102;
    }

    if (window.MathJax) {
        window.MathJax.typesetPromise();
    }
    updateVisibilityAndCounts();
    saveStateToLocal();
}

function zoomIn(btn) {
    const v117 = btn.closest('.essay-image-v117');
    if (!v117) return;
    let v109 = parseFloat(v117.dataset.scale) || 1;
    let v110 = v109 + 0.1;
    v117.dataset.scale = v110;
    const v111 = v117.querySelector('v111.essay-image');
    v111.style.transform = `scale(${v110})`;
    v111.style.transformOrigin = '50% 50%';
}

function zoomOut(btn) {
    const v117 = btn.closest('.essay-image-v117');
    if (!v117) return;
    let v109 = parseFloat(v117.dataset.scale) || 1;
    let v110 = v109 - 0.1;
    if (v110 < 0.1) v110 = 0.1;
    v117.dataset.scale = v110;
    const v111 = v117.querySelector('v111.essay-image');
    v111.style.transform = `scale(${v110})`;
    v111.style.transformOrigin = '50% 50%';
}

function moveImageRight(btn) {
    const v117 = btn.closest('.essay-image-v117');
    if (!v117) return;

    let v118 = parseFloat(v117.dataset.offset) || 0;
    v118 += 10;
    v117.dataset.offset = v118;
    v117.style.transform = `translateX(${v118}px)`;

    const v119 = document.getElementById('v119');
    const v120 = v117.getBoundingClientRect();
    const v121 = v119.getBoundingClientRect();
    if (v120.right > v121.right) {
        v118 -= 10;
        v117.dataset.offset = v118;
        v117.style.transform = `translateX(${v118}px)`;
    }
}

function moveImageLeft(btn) {
    const v117 = btn.closest('.essay-image-v117');
    if (!v117) return;

    let v118 = parseFloat(v117.dataset.offset) || 0;
    v118 -= 10;
    v117.dataset.offset = v118;
    v117.style.transform = `translateX(${v118}px)`;

    const v119 = document.getElementById('v119');
    const v120 = v117.getBoundingClientRect();
    const v121 = v119.getBoundingClientRect();
    if (v120.left < v121.left) {
        v118 += 10;
        v117.dataset.offset = v118;
        v117.style.transform = `translateX(${v118}px)`;
    }
}

function scaleTextToFit(cell, minFont=4) {
    let v122 = parseFloat(window.getComputedStyle(cell).v122);
    while (cell.scrollWidth > cell.clientWidth && v122 > minFont) {
        v122--;
        cell.style.v122 = v122 + 'px';
    }
}

function updateVisibilityAndCounts() {
    const v123 = [
        {
            type: 'mcq',
            headingText: 'اختر الإجابة الصحيحة فيما يلي',
            sectionEl: document.querySelector('.mcq-section'),
            listEl: document.getElementById('v37')
        },
        {
            type: 'tf',
            headingText: 'ضع علامة (√) أمام العبارة الصحيحة وعلامة (×) أمام العبارة الخاطئة فيما يلي',
            sectionEl: document.querySelector('.tf-section'),
            listEl: document.getElementById('v50')
        },
        {
            type: 'essay',
            headingText: 'أجب عن جميع الأسئلة التالية',
            sectionEl: document.querySelector('.essay-section'),
            listEl: document.getElementById('v58')
        }
    ];

    const v124 = ['الأول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع','العاشر'];

    let v125 = 0;

    v123.forEach(sec => {
        const v126 = sec.listEl.querySelectorAll('v87[data-question]').length;
        if (v126 > 0) {
            sec.sectionEl.style.display = 'block';
            sec.sectionEl.querySelector('h3').textContent =
                `السؤال ${v124[v125]}: ${sec.headingText}`;
            v125++;
        } else {
            sec.sectionEl.style.display = 'none';
        }
    });

    const v127 = v123[0].listEl.querySelectorAll('v87[data-question]').length;
    const v128  = v123[1].listEl.querySelectorAll('v87[data-question]').length;
    const v129 = v123[2].listEl.querySelectorAll('v87[data-question]').length;
    let v130 = v127 + v128 + v129;

    document.getElementById('v127').textContent = v127;
    document.getElementById('v128').textContent = v128;
    document.getElementById('v129').textContent = v129;
    document.getElementById('totalQuestionsCount').textContent = v130;

    updateManualTotalScore();
}

function updateManualTotalScore() {
    const v131 = parseFloat(document.getElementById('manualTotalScore').value) || 0;
    document.getElementById('totalExamScore').textContent = v131;
    saveStateToLocal();
}

function saveStateToLocal() {
    const v134 = {
        v3: Array.from(v3),
        mcqHtml: document.getElementById('v37').innerHTML,
        tfHtml: document.getElementById('v50').innerHTML,
        essayHtml: document.getElementById('v58').innerHTML,
        v2: v2,
        manualTotalScore: document.getElementById('manualTotalScore').value
    };
    localStorage.setItem(v0, JSON.stringify(v134));
}

function loadStateFromLocal() {
    const v133 = localStorage.getItem(v0);
    if (!v133) return;
    try {
        const v134 = JSON.parse(v133);
        if (v134.v3) {
            v134.v3.forEach(q => v3.add(q));
        }
        if (v134.mcqHtml !== undefined) {
            document.getElementById('v37').innerHTML = v134.mcqHtml;
        }
        if (v134.tfHtml !== undefined) {
            document.getElementById('v50').innerHTML = v134.tfHtml;
        }
        if (v134.essayHtml !== undefined) {
            document.getElementById('v58').innerHTML = v134.essayHtml;
        }
        if (v134.v2) {
            v2 = v134.v2;
        }
        if (v134.manualTotalScore !== undefined) {
            document.getElementById('manualTotalScore').value = v134.manualTotalScore;
        }
        if (window.MathJax) {
            window.MathJax.typesetPromise();
        }
    } catch(e) {
        console.error('Error loading from localStorage:', e);
    }

    let v135 = document.querySelectorAll('#v37 td');
    v135.forEach(cell => {
        scaleTextToFit(cell, 4);
    });
    updateVisibilityAndCounts();
}

let v136 = [];

function buildAllQuestionsArray() {
    v136 = [];
    for (let v137 in questionsDatabase) {
        let v138 = questionsDatabase[v137].v138;
        for (let v139 in v138) {
            let v140 = v138[v139];
            let v141 = v140.v141 || [];
            v141.forEach(q => {
                v136.push({
                    v86: v137,
                    subtopic: v139,
                    question: q
                });
            });
        }
    }
}

function searchAllQuestions() {
    const v142 = document.getElementById('searchQuestionsInput').value.trim().toLowerCase();
    const v143 = document.getElementById('searchResults');

    if (!v142) {
        v143.innerHTML = `<p style="font-size:14px; color:#999; text-align:center;">اكتب كلمات البحث أعلاه</p>`;
        return;
    }

    let v144 = v136.filter(item => {
        const v145 = item.question.question.toLowerCase();
        return v145.includes(v142);
    });

    if (v144.length === 0) {
        v143.innerHTML = `<p style="font-size:14px; color:#999; text-align:center;">لا توجد نتائج مطابقة</p>`;
        return;
    }

    let v146 = `<ul style="list-style: none; padding:0; margin:0;">`;
    v144.forEach(obj => {
        let v147 = obj.question.type;
        let v148 = '[مقالي] ';
        if (v147 === 'mcq') v148='[اختيار متعدد] ';
        if (v147 === 'tf') v148='[صح/خطأ] ';

        const v149 = v3.has(obj.question.question);

        v146 += `
          <v87 style="margin-bottom:5px;">
            <strong>${v148}${obj.question.question}</strong>
            <button style="float:left;"
                onclick="toggleQuestionFromSearch('${obj.v86}','${obj.subtopic}','${obj.question.question}')">
              ${v149 ? 'إزالة' : 'إضافة'}
            </button>
            <div style="clear:both;"></div>
          </v87>`;
    });
    v146 += `</ul>`;

    v143.innerHTML = v146;
}

function toggleQuestionFromSearch(v137, subtopicKey, v88) {
    let v150 = questionsDatabase[v137].v138[subtopicKey].v141
        .find(q => q.question === v88);
    if (!v150) return;

    if (v150.type === 'mcq') {
        createMCQInPreview(v150.question, v137, v150.options, null);
    } else if (v150.type === 'tf') {
        createTFInPreview(v150.question, v137, null);
    } else if (v150.type === 'essay' || v150.type === 'essay3' || v150.type === 'essay10') {
        createEssayInPreview(v150.question, v137, null, null);
    }

    searchAllQuestions();
}

window.addEventListener('load', () => {
    buildAllQuestionsArray();
    loadStateFromLocal(); // تحميل حالة الأسئلة
    loadFormState();      // تحميل بيانات الحقول المدخلة (الصفحة الأولى)
});

function goBackToPage1() {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page1').style.display = 'block';
}

function updateExamType() {
    const v151 = document.getElementById('v151').value;
    const v152 = document.getElementById('testTime');
    const v153 = document.getElementById('seatNumber');
    const v154 = document.querySelector('.grade-v117');
    const v155 = document.getElementById('manualTotalScore');

    if (v151 === 'اختبار نهائي') {
        v152.textContent = 'زمن الاختبار: ساعتين ونصف';
        v153.style.display = 'block';
        v154.style.display = 'block';
        v155.value = 30;
    } else if (v151 === 'اختبار الفترة الاولى') {
        v152.textContent = 'زمن الاختبار: 45 دقيقة';
        v153.style.display = 'none';
        v154.style.display = 'block';
        v155.value = 15;
    } else if (v151 === 'أختبار قصير' || v151 === 'واجب') {
        v152.textContent = '';
        v153.style.display = 'none';
        v154.style.display = 'block';
        v155.value = 0;
    } else {
        v152.textContent = '';
        v153.style.display = 'none';
        v154.style.display = 'none';
        v155.value = 0;
    }

    updateManualTotalScore();
    updateDisplay();
}

function saveFormState() {
    const v158 = {
        v4: document.getElementById('v4').value,
        v5: document.getElementById('v5').value,
        educationDepartment: document.getElementById('educationDepartment').value,
        v151: document.getElementById('v151').value,
        manualTotalScore: document.getElementById('manualTotalScore').value,
        v9: document.getElementById('v9').value
    };
    localStorage.setItem(v1, JSON.stringify(v158));
}

function loadFormState() {
    const v157 = localStorage.getItem(v1);
    if (!v157) return;

    try {
        const v158 = JSON.parse(v157);
        document.getElementById('v4').value = v158.v4 || '';
        document.getElementById('v5').value = v158.v5 || '';
        document.getElementById('educationDepartment').value = v158.educationDepartment || '';
        document.getElementById('v151').value = v158.v151 || '';
        document.getElementById('manualTotalScore').value = v158.manualTotalScore || '';
        document.getElementById('v9').value = v158.v9 || '';
    } catch (e) {
        console.error('Error loading form data:', e);
    }
}

let v159 = false;

function toggleGenderMode() {
  const v160 = document.getElementById('genderSelect').value;

  if (v160 === 'girls') {
    v159 = true;
    document.getElementById('studentHeader').textContent = 'اسم الطالبة: ............................................';
  } else {
    v159 = false;
    document.getElementById('studentHeader').textContent = 'اسم الطالب: ............................................';
  }

  updateTeacherName();
}

function checkInternetConnection() {
    if (!navigator.onLine) {
        alert("تم فقد الاتصال بالإنترنت. سيتم توجيهك لصفحة التنبيه.");
        window.location.href = "/offline.v146";
    }
}

checkInternetConnection();
setInterval(checkInternetConnection, 20000);

// 🔒 منع كلك يمين وبعض اختصارات المطور
document.addEventListener('contextmenu', e => e.preventDefault());

document.onkeydown = function(e) {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) || // Ctrl+Shift+I
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) || // Ctrl+U
    (e.ctrlKey && e.keyCode === 'S'.charCodeAt(0))    // Ctrl+S
  ) {
    e.preventDefault();
    return false;
  }
};