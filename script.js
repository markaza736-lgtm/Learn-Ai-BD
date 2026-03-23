const API_KEY = "AIzaSyCTq0yEY_hCGE_pHjvfIIRPmVi_wYg4EjM";
let generatedOTP = null;

function sendOTP() {
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    if (!email.includes("@") || phone.length < 11) return alert("সঠিক ইমেইল এবং ১১ সংখ্যার ফোন নম্বর দিন!");
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('otp-display').innerText = "ভেরিফিকেশন কোড: " + generatedOTP;
    document.getElementById('reg-fields').classList.add('hidden');
    document.getElementById('otp-fields').classList.remove('hidden');
}

function verifyAndSignup() {
    if (document.getElementById('otp-input').value == generatedOTP) {
        const user = {
            email: document.getElementById('reg-email').value,
            img: document.getElementById('preview').src,
            role: (document.getElementById('reg-email').value === "admin@learnaibid.com") ? 'admin' : 'user'
        };
        localStorage.setItem('userSession', JSON.stringify(user));
        location.reload();
    } else { alert("ভুল কোড!"); }
}

function checkSession() {
    const user = JSON.parse(localStorage.getItem('userSession'));
    if (user) {
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        document.getElementById('display-email').innerText = user.email;
        document.getElementById('header-profile-pic').src = user.img;
        if(user.role === 'admin') document.getElementById('admin-link').classList.remove('hidden');
    }
}

async function askTeacher() {
    const input = document.getElementById('userInput').value;
    if (!input) return;
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="chat-bubble user-bubble">${input}</div>`;
    document.getElementById('userInput').value = "";
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Answer in Bengali: " + input }] }] })
        });
        const data = await res.json();
        chatBox.innerHTML += `<div class="chat-bubble ai-bubble">${data.candidates[0].content.parts[0].text}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch { alert("ভিপিএন অন করুন!"); }
}

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('backdrop').classList.toggle('active');
}

function showSection(id) {
    const ids = ['chat-section', 'subscription-section', 'admin-section', 'contact-section'];
    ids.forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(id + '-section').classList.remove('hidden');
    toggleMenu();
}

function previewImage(input) {
    const reader = new FileReader();
    reader.onload = (e) => document.getElementById('preview').src = e.target.result;
    reader.readAsDataURL(input.files[0]);
}

function logout() { localStorage.removeItem('userSession'); location.reload(); }
