$(document).ready(function () {
  // Show/Hide password functionality
  $("#togglePassword").click(function () {
    const passwordField = $("#password");
    const type = passwordField.attr("type") === "password" ? "text" : "password";
    passwordField.attr("type", type);
    $(this).text(type === "password" ? "👁️" : "🙈"); // Toggle icon
  });

  // Allow only digits in phone input
  $("#phone").on("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10); // Only numbers, max 10 digits
  });

  // Form submission and validation
  $("#userForm").submit(function (e) {
    e.preventDefault();

    // Get values from form fields
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val().trim();
    const confirmPassword = $("#confirmPassword").val().trim();
    const messageBox = $("#messageBox");

    // Clear previous messages
    messageBox.removeClass("error success").hide();

    // Check if all fields are filled
    if (!name || !email || !phone || !password || !confirmPassword) {
      showMessage("All fields are required!", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Invalid email format!", "error");
      return;
    }

    // Validate phone number: exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      showMessage("Phone number must be exactly 10 digits!", "error");
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      showMessage("Password must be at least 6 characters and include uppercase, lowercase, and a number.", "error");
      return;
    }

    // Confirm passwords match
    if (password !== confirmPassword) {
      showMessage("Passwords do not match!", "error");
      return;
    }

    // All validations passed
    showMessage("Form submitted successfully!", "success");
    this.reset();
    $("#togglePassword").text("👁️");
  });

  // Function to display validation messages
  function showMessage(msg, type) {
    $("#messageBox").text(msg).addClass(type).fadeIn();
  }
});
