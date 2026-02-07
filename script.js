// --- কনফিগারেশন এবং স্কিমা (Data Structure) ---
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

// --- লোড হলে যা হবে ---
document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
});

// --- সাইডবার রেন্ডার ---
function renderSidebar() {
    const list = document.getElementById("categoryList");
    list.innerHTML = "";
    
    for (const [key, data] of Object.entries(schemas)) {
        const li = document.createElement("li");
        li.innerHTML = `
            <button onclick="selectCategory('${key}')" class="w-full text-left p-2 rounded hover:bg-emerald-50 text-emerald-800 font-medium transition flex items-center gap-2">
                <i class="fas ${data.icon}"></i> ${data.label}
            </button>
        `;
        list.appendChild(li);
    }
}

// --- মোবাইল মেনু টগল ---
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("hidden");
    document.getElementById("sidebar").classList.toggle("active");
}

// --- ক্যাটাগরি সিলেক্ট ---
function selectCategory(key) {
    currentCategory = key;
    document.getElementById("currentTitle").innerText = schemas[key].label;
    document.getElementById("introView").classList.add("hidden");
    document.getElementById("actionButtons").classList.remove("hidden");
    document.getElementById("actionButtons").classList.add("flex");
    
    // মোবাইলে সাইডবার হাইড করা
    if(window.innerWidth < 768) {
        document.getElementById("sidebar").classList.add("hidden");
    }

    renderFormInputs();
    showSection('list'); // ডিফল্টভাবে লিস্ট দেখাবে
}

// --- ভিউ সেকশন কন্ট্রোল ---
function showSection(section) {
    document.getElementById("formView").classList.add("hidden");
    document.getElementById("listView").classList.add("hidden");
    
    if (section === 'form') {
        document.getElementById("formView").classList.remove("hidden");
    } else {
        document.getElementById("listView").classList.remove("hidden");
        loadTableData();
    }
}

// --- ডাইনামিক ফর্ম ইনপুট তৈরি ---
function renderFormInputs() {
    const form = document.getElementById("dataForm");
    form.innerHTML = "";
    
    schemas[currentCategory].fields.forEach(field => {
        const div = document.createElement("div");
        div.className = "flex flex-col";
        div.innerHTML = `
            <label class="mb-1 text-sm font-semibold text-gray-600">${field.label}</label>
            <input type="${field.type}" name="${field.key}" required 
                class="p-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500 transition w-full"
                placeholder="${field.label} লিখুন...">
        `;
        form.appendChild(div);
    });

    // সাবমিট বাটন
    const btnDiv = document.createElement("div");
    btnDiv.className = "md:col-span-2 mt-2";
    btnDiv.innerHTML = `
        <button type="submit" class="w-full bg-emerald-600 text-white p-3 rounded font-bold hover:bg-emerald-700 transition">
            <i class="fas fa-save"></i> তথ্য সংরক্ষণ করুন
        </button>
    `;
    form.appendChild(btnDiv);
}

// --- ডাটা সেভ (Local Storage) ---
function handleFormSubmit(e) {
    e.preventDefault();
    if (!currentCategory) return;

    const formData = new FormData(e.target);
    const dataObj = {};
    formData.forEach((value, key) => dataObj[key] = value);

    // আগের ডাটা আনা
    let storedData = JSON.parse(localStorage.getItem(currentCategory)) || [];
    storedData.push(dataObj);

    // সেভ করা
    localStorage.setItem(currentCategory, JSON.stringify(storedData));
    
    alert("তথ্য সফলভাবে সেভ হয়েছে!");
    e.target.reset();
    showSection('list');
}

// --- টেবিল ডাটা লোড ---
function loadTableData() {
    const thead = document.getElementById("tableHeader");
    const tbody = document.getElementById("tableBody");
    const noData = document.getElementById("noDataMsg");
    
    thead.innerHTML = "";
    tbody.innerHTML = "";
    
    let data = JSON.parse(localStorage.getItem(currentCategory)) || [];

    if (data.length === 0) {
        noData.classList.remove("hidden");
        return;
    }
    noData.classList.add("hidden");

    // হেডার তৈরি
    let fields = schemas[currentCategory].fields;
    fields.forEach(f => {
        const th = document.createElement("th");
        th.className = "p-3 border-b";
        th.innerText = f.label;
        thead.appendChild(th);
    });
    // ডিলিট কলাম
    const thAction = document.createElement("th");
    thAction.className = "p-3 border-b text-right";
    thAction.innerText = "অ্যাকশন";
    thead.appendChild(thAction);

    // বডি তৈরি
    data.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-gray-50 border-b";
        
        fields.forEach(f => {
            const td = document.createElement("td");
            td.className = "p-3";
            td.innerText = item[f.key] || "-";
            tr.appendChild(td);
        });

        // ডিলিট বাটন
        const tdAction = document.createElement("td");
        tdAction.className = "p-3 text-right";
        tdAction.innerHTML = `
            <button onclick="deleteItem(${index})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        `;
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
    });
}

// --- ডিলিট ফাংশন ---
function deleteItem(index) {
    if(confirm("আপনি কি নিশ্চিত এই তথ্যটি মুছে ফেলতে চান?")) {
        let data = JSON.parse(localStorage.getItem(currentCategory)) || [];
        data.splice(index, 1);
        localStorage.setItem(currentCategory, JSON.stringify(data));
        loadTableData();
    }
}

// --- JSON ডাউনলোড ---
function downloadJson() {
    if (!currentCategory) return;
    
    const data = localStorage.getItem(currentCategory);
    if (!data || data === "[]") {
        alert("ডাউনলোড করার মতো কোনো তথ্য নেই!");
        return;
    }

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentCategory}_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
