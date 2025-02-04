---
layout: reference
title: "{{ reference.name }}"
permalink: "/references/{{ reference.id }}/"
---

{% for ref in site.data.noise.references %}
  {% if ref.id == page.title %}
    <h1>{{ ref.name }}</h1>
    <h2>Recommended Noise Levels</h2>
    <ul>
      {% for room in site.data.noise.room_types %}
        {% for rec in room.recommendations %}
          {% if rec.reference_id == ref.id %}
            <li>{{ room.name }}: {{ rec.recommended_level }}</li>
          {% endif %}
        {% endfor %}
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
