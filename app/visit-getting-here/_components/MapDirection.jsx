"use client";

export default function GoogleMapEmbed() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1076988535183!2d106.99003827457094!3d-6.24953709373891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698de0759410a1%3A0xf8dd1536debbcbd1!2sMega%20Bekasi%20Hypermall!5e0!3m2!1sen!2sid!4v1733219628850!5m2!1sen!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
