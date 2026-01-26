window.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const switchBtn = document.getElementById("switchBtn");
  const switchText = document.getElementById("switchText");
  const authTitle = document.getElementById("authTitle");

  let isLogin = true;

  switchBtn.addEventListener("click", () => {
    isLogin = !isLogin;

    loginForm.classList.toggle("active");
    signupForm.classList.toggle("active");

    authTitle.textContent = isLogin ? "Login" : "Sign Up";
    switchText.textContent = isLogin
      ? "Don’t have an account?"
      : "Already have an account?";
    switchBtn.textContent = isLogin ? "Sign Up" : "Login";
  });

  const sections = Array.from(document.querySelectorAll("section"));
  let currentIndex = 0;
  let isScrolling = false;
  let allowSnap = true;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isScrolling = true;
    currentIndex = index;

    sections[index].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setTimeout(() => {
      isScrolling = false;
    }, 600);
  }

  window.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling || !allowSnap) return;

      if (e.deltaY > 0) {
        scrollToSection(currentIndex + 1);
      } else if (e.deltaY < 0) {
        scrollToSection(currentIndex - 1);
      }
    },
    { passive: true }
  );

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  scrollTopBtn.addEventListener("click", () => {
    allowSnap = false;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setTimeout(() => {
      currentIndex = 0;
      allowSnap = true;
    }, 700);
  });

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display =
      window.scrollY > 200 ? "block" : "none";
  });

});

