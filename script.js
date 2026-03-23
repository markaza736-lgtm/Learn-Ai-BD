let generatedOTP = null;

function sendOTP() {
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    if (!email.includes("@") || phone.length < 11) return alert("সঠিক ইমেইল ও ফোন দিন!");
    
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('otp-display').innerText = "আপনার কোড: " + generatedOTP;
    document.getElementById('reg-fields').classList.add('hidden');
    document.getElementById('otp-fields').classList.remove('hidden');
}

function verifyAndSignup() {
    const userInput = document.getElementById('otp-input').value.trim();
    if (userInput === generatedOTP) {
        localStorage.setItem('userLoggedIn', 'true');
        alert("ভেরিফিকেশন সফল!");
        location.reload();
    } else {
        alert("ভুল কোড! সঠিক কোড দিন। আপনার কোড ছিল: " + generatedOTP);
    }
}

function checkSession() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        document.getElementById('welcome-msg').innerText = "স্বাগতম! আপনি লগইন করেছেন।";
    }
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    location.reload();
}
