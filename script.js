$(document).ready(function () {
  // Show/Hide password functionality
  $("#togglePassword").click(function () {
    const passwordField = $("#password");
    const type = passwordField.attr("type") === "password" ? "text" : "password";
    passwordField.attr("type", type);
    $(this).text(type === "password" ? "👁️" : "🙈");
  });

  // Form submit and validation
  $("#userForm").submit(function (e) {
    e.preventDefault();

    // Get input values
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val().trim();
    const messageBox = $("#messageBox");

    // Clear previous messages
    messageBox.removeClass("error success").hide();

    // Validation Rules

    // 1. All fields required
    if (!name || !email || !phone || !password) {
      showMessage("All fields are required!", "error");
      return;
    }

    // 2. Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Invalid email format!", "error");
      return;
    }

    // 3. Phone number = 10 digits
    if (!/^\d{10}$/.test(phone)) {
      showMessage("Phone number must be exactly 10 digits!", "error");
      return;
    }

    // 4. Password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      showMessage("Password must be at least 6 characters and include uppercase, lowercase, and a number.", "error");
      return;
    }

    // All checks passed
    showMessage("Form submitted successfully!", "success");
    this.reset();
    $("#togglePassword").text("👁️"); // Reset icon
  });

  // Function to show message
  function showMessage(msg, type) {
    $("#messageBox").text(msg).addClass(type).fadeIn();
  }
});
