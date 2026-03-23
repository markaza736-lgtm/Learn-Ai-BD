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
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    
    // স্ক্রিনে কোডটি দেখানো (যাতে আপনি কপি করতে পারেন)
    document.getElementById('otp-display').innerText = "আপনার ভেরিফিকেশন কোড: " + generatedOTP;
    
    // ইনপুট বক্স পাল্টানো
    document.getElementById('reg-fields').classList.add('hidden');
    document.getElementById('otp-fields').classList.remove('hidden');
}

// ভেরিফাই করা
function verifyAndSignup() {
    const userInput = document.getElementById('otp-input').value;
    
    // এখানে লজিক আরও সহজ করে দিলাম যাতে ভুল না হয়
    if (userInput == generatedOTP) {
        const user = {
            email: document.getElementById('reg-email').value,
            role: (document.getElementById('reg-email').value === "admin@learnaibid.com") ? 'admin' : 'user'
        };
        
        // সেশন সেভ করা
        localStorage.setItem('userSession', JSON.stringify(user));
        alert("ভেরিফিকেশন সফল! স্বাগতম।");
        location.reload(); // পেজটি রিফ্রেশ হবে এবং ড্যাশবোর্ড দেখাবে
    } else {
        alert("ভুল কোড! আবার চেষ্টা করুন।");
    }
}

// সেশন চেক (অটো লগইন)
function checkSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
        const user = JSON.parse(session);
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        
        // যদি আপনার অ্যাডমিন বা ড্যাশবোর্ডের আইডি থাকে তবে সেগুলো এখানে আপডেট হবে
        if(user.role === 'admin') {
            const adminLink = document.getElementById('admin-link');
            if(adminLink) adminLink.classList.remove('hidden');
        }
    }
}

// লগ আউট
function logout() {
    localStorage.removeItem('userSession');
    location.reload();
}
