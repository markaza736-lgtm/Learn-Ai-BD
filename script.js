const API_KEY = "AIzaSyCTq0yEY_hCGE_pHjvfIIRPmVi_wYg4EjM"; 
let generatedOTP = null;

// OTP পাঠানো
function sendOTP() {
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    
    if (!email.includes("@") || phone.length < 11) {
        return alert("সঠিক ইমেইল এবং ১১ সংখ্যার ফোন নম্বর দিন!");
    }

    // ৪ সংখ্যার একটি র‍্যান্ডম কোড তৈরি
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    
    // স্ক্রিনে কোডটি দেখানো
    const otpBox = document.getElementById('otp-display');
    if(otpBox) {
        otpBox.innerText = "আপনার ভেরিফিকেশন কোড: " + generatedOTP;
    } else {
        alert("আপনার কোডটি হলো: " + generatedOTP);
    }
    
    // ইনপুট বক্স পাল্টানো
    document.getElementById('reg-fields').classList.add('hidden');
    document.getElementById('otp-fields').classList.remove('hidden');
}

// ভেরিফাই করা
function verifyAndSignup() {
    const userInput = document.getElementById('otp-input').value.trim();
    
    // এখানে .toString() ব্যবহার করে দুটোর টাইপ সমান করে দিলাম
    if (userInput == generatedOTP) {
        const user = {
            email: document.getElementById('reg-email').value,
            role: (document.getElementById('reg-email').value === "admin@learnaibid.com") ? 'admin' : 'user'
        };
        
        localStorage.setItem('userSession', JSON.stringify(user));
        alert("ভেরিফিকেশন সফল! স্বাগতম।");
        location.reload(); 
    } else {
        alert("ভুল কোড! সঠিক কোডটি দিন। আপনার কোড ছিল: " + generatedOTP);
    }
}

// সেশন চেক (অটো লগইন)
function checkSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        
        const user = JSON.parse(session);
        const emailDisplay = document.getElementById('display-email');
        if(emailDisplay) emailDisplay.innerText = user.email;
    }
}

// লগ আউট
function logout() {
    localStorage.removeItem('userSession');
    location.reload();
}
