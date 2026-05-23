(function() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  const backendURL = "/api/contact";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = 'Sending...';
    feedback.style.color = 'black';

    const payload = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      feedback.style.color = 'crimson';
      feedback.textContent = 'Please fill in all fields.';
      return;
    }

    try {
      const resp = await fetch(backendURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      if (resp.ok && data.ok) {
        feedback.style.color = 'green';
        feedback.textContent = 'Message sent! I will reply soon.';
        console.log("Email queued with ID:", data.id); // log the Resend message ID
        form.reset();
      } else {
        feedback.style.color = 'crimson';
        feedback.textContent = data.error || 'Failed to send message.';
      }
    } catch (err) {
      console.error(err);
      feedback.style.color = 'crimson';
      feedback.textContent = 'Network error. Please try again later.';
    }
  });
})();
