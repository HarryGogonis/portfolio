---
title: "Contact"
layout: page
path: "/contact"
---
<form action="https://formspree.io/hgogonis@gmail.com" method="POST">
  <label>
    Name
    <input
      type="text"
      name="name"
      placeholder="John Smith"
      autocomplete="name"
      autofocus
      required
    />
  </label>
  <label>
    Email
    <input
      type="email"
      name="_replyto"
      placeholder="john@example.com"
      autocomplete="email"
      required
    />
  </label>
  <label>
    Message
    <textarea
      type="text"
      name="message"
      placeholder="Message"
      rows="6"
    ></textarea>
  </label>
  <input type="hidden" name="_subject" value="New submission hgogonis.me" />
  <input type="hidden" name="_next" value="http://hgogonis.me/thanks/" />
  <button type="submit">Send</button>
</form>
