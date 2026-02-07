/* ===============================
   SIDEBAR + OVERLAY CONTROL
================================ */

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function toggleMenu() {
    sidebar.classList.toggle("sidebar-open");
    overlay.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
}

function closeMenu() {
    sidebar.classList.remove("sidebar-open");
    overlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

/* ===============================
   DATA SCHEMAS
================================ */

const schemas = {
    mosjid: {
        label: "মসজিদ ডাটা",
        icon: "fa-mosque",
        fields: [
            { key: "mosjidName", label: "মসজিদের নাম", type: "text" },
            { key: "imamName", label: "ইমামের নাম", type: "text" },
            { key: "location", label: "অবস্থান", type: "text" },
            { key: "imamPhone", label: "ইমামের ফোন", type: "tel" },
            { key: "imamEmail", label: "ইমামের ইমেইল", type: "email" },
            { key: "presidentName", label: "সভাপতির নাম", type: "text" },
            { key: "presidentPhone", label: "সভাপতির ফোন", type: "tel" },
            { key: "mapLink", label: "গুগল ম্যাপ লিংক", type: "url" }
        ]
    },
    imam: {
        label: "ইমাম ডাটা",
        icon: "fa-user-tie",
        fields: [
            { key: "name", label: "নাম", type: "text" },
            { key: "fatherName", label: "পিতার নাম", type: "text" },
            { key: "bloodGroup", label: "রক্তের গ্রুপ", type: "text" },
            { key: "education", label: "শিক্ষাগত যোগ্যতা", type: "text" },
            { key: "mobile", label: "মোবাইল নাম্বার", type: "tel" },
            { key: "address", label: "ঠিকানা", type: "text" },
            { key: "assignedMosjid", label: "মসজিদের নাম", type: "text" }
        ]
    },
    jubok: {
        label: "যুবক ডাটা",
        icon: "fa-walking",
        fields: [
            { key: "name", label: "নাম", type: "text" },
            { key: "fatherName", label: "পিতার নাম", type: "text" },
            { key: "bloodGroup", label: "রক্তের গ্রুপ", type: "text" },
            { key: "profession", label: "পেশা", type: "text" },
            { key: "address", label: "ঠিকানা", type: "text" },
            { key: "mobile", label: "মোবাইল নাম্বার", type: "tel" },
            { key: "email", label: "ইমেইল (অপশনাল)", type: "email" },
            { key: "dob", label: "জন্ম তারিখ", type: "date" }
        ]
    },
    gorib: {
        label: "গরীব ও দুস্থ",
        icon: "fa-hands-helping",
        fields: [
            { key: "name", label: "নাম", type: "text" },
            { key: "guardianName", label: "পিতা/স্বামীর নাম", type: "text" },
            { key: "address", label: "ঠিকানা", type: "text" },
            { key: "mobile", label: "মোবাইল নাম্বার", type: "tel" }
        ]
    },
    shikkhok: {
        label: "শিক্ষক ডাটা",
        icon: "fa-chalkboard-teacher",
        fields: [
            { key: "name", label: "নাম", type: "text" },
            { key: "fatherName", label: "পিতার নাম", type: "text" },
            { key: "bloodGroup", label: "রক্তের গ্রুপ", type: "text" },
            { key: "mobile", label: "মোবাইল নাম্বার", type: "tel" },
            { key: "email", label: "ইমেইল", type: "email" },
            { key: "address", label: "ঠিকানা", type: "text" }
        ]
    },
    prosason: {
        label: "প্রশাসন",
        icon: "fa-user-shield",
        fields: [
            { key: "name", label: "নাম", type: "text" },
            { key: "rank", label: "পদবী", type: "text" },
            { key: "mobile", label: "মোবাইল নাম্বার", type: "tel" },
            { key: "address", label: "ঠিকানা", type: "text" }
        ]
    },
    poribar: {
        label: "পরিবার ডাটা",
        icon: "fa-users",
        fields: [
            { key: "headName", label: "পরিবার প্রধানের নাম", type: "text" },
            { key: "memberCount", label: "সদস্য সংখ্যা", type: "number" },
            { key: "memberNames", label: "সদস্যদের নাম (কমা দিয়ে)", type: "text" },
            { key: "address", label: "ঠিকানা", type: "text" }
        ]
    }
};

let currentCategory = null;

/* ===============================
   INIT
================================ */

document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
});

/* ===============================
   SIDEBAR RENDER
================================ */

function renderSidebar() {
    const list = document.getElementById("categoryList");
    list.innerHTML = "";

    Object.entries(schemas).forEach(([key, data]) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <button onclick="selectCategory('${key}')"
                class="w-full text-left p-2 rounded hover:bg-emerald-50 flex gap-2 items-center">
                <i class="fas ${data.icon}"></i>
                <span>${data.label}</span>
            </button>
        `;
        list.appendChild(li);
    });
}

/* ===============================
   CATEGORY SELECT
================================ */

function selectCategory(key) {
    currentCategory = key;

    document.getElementById("currentTitle").innerText = schemas[key].label;
    document.getElementById("introView").classList.add("hidden");

    const actions = document.getElementById("actionButtons");
    actions.classList.remove("hidden");
    actions.classList.add("flex");

    if (window.innerWidth < 768) closeMenu(); // mobile auto close

    renderFormInputs();
    showSection("list");
}

/* ===============================
   VIEW CONTROL
================================ */

function showSection(section) {
    document.getElementById("formView").classList.add("hidden");
    document.getElementById("listView").classList.add("hidden");

    if (section === "form") {
        document.getElementById("formView").classList.remove("hidden");
    } else {
        document.getElementById("listView").classList.remove("hidden");
        loadTableData();
    }
}

/* ===============================
   FORM RENDER
================================ */

function renderFormInputs() {
    const form = document.getElementById("dataForm");
    form.innerHTML = "";

    schemas[currentCategory].fields.forEach(field => {
        const div = document.createElement("div");
        div.innerHTML = `
            <label class="text-sm font-semibold mb-1">${field.label}</label>
            <input type="${field.type}" name="${field.key}" required
                class="p-2 border rounded w-full">
        `;
        form.appendChild(div);
    });

    const btn = document.createElement("div");
    btn.className = "md:col-span-2";
    btn.innerHTML = `
        <button type="submit"
            class="w-full bg-emerald-600 text-white p-3 rounded font-bold">
            তথ্য সংরক্ষণ করুন
        </button>
    `;
    form.appendChild(btn);
}

/* ===============================
   FORM SUBMIT
================================ */

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((v, k) => data[k] = v);

    const stored = JSON.parse(localStorage.getItem(currentCategory)) || [];
    stored.push(data);
    localStorage.setItem(currentCategory, JSON.stringify(stored));

    alert("তথ্য সফলভাবে সংরক্ষণ হয়েছে");
    e.target.reset();
    showSection("list");
}

/* ===============================
   TABLE LOAD
================================ */

function loadTableData() {
    const thead = document.getElementById("tableHeader");
    const tbody = document.getElementById("tableBody");
    const noData = document.getElementById("noDataMsg");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    const data = JSON.parse(localStorage.getItem(currentCategory)) || [];

    if (data.length === 0) {
        noData.classList.remove("hidden");
        return;
    }
    noData.classList.add("hidden");

    schemas[currentCategory].fields.forEach(f => {
        const th = document.createElement("th");
        th.className = "p-2 border";
        th.innerText = f.label;
        thead.appendChild(th);
    });

    const thAction = document.createElement("th");
    thAction.innerText = "অ্যাকশন";
    thAction.className = "p-2 border";
    thead.appendChild(thAction);

    data.forEach((item, index) => {
        const tr = document.createElement("tr");

        schemas[currentCategory].fields.forEach(f => {
            const td = document.createElement("td");
            td.className = "p-2 border";
            td.innerText = item[f.key] || "-";
            tr.appendChild(td);
        });

        const tdAction = document.createElement("td");
        tdAction.className = "p-2 border text-center";
        tdAction.innerHTML = `
            <button onclick="deleteItem(${index})" class="text-red-600">
                <i class="fas fa-trash"></i>
            </button>
        `;
        tr.appendChild(tdAction);

        tbody.appendChild(tr);
    });
}

/* ===============================
   DELETE ITEM
================================ */

function deleteItem(index) {
    if (!confirm("এই তথ্যটি মুছে ফেলতে চান?")) return;

    const data = JSON.parse(localStorage.getItem(currentCategory)) || [];
    data.splice(index, 1);
    localStorage.setItem(currentCategory, JSON.stringify(data));
    loadTableData();
}

/* ===============================
   DOWNLOAD JSON
================================ */

function downloadJson() {
    const data = localStorage.getItem(currentCategory);
    if (!data || data === "[]") {
        alert("ডাটা নেই");
        return;
    }

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentCategory}.json`;
    a.click();

    URL.revokeObjectURL(url);
}
