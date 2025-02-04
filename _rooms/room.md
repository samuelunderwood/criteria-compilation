---
layout: room
title: "{{ room.name }}"
permalink: "/rooms/{{ room.name | slugify }}/"
---

{% for room in site.data.noise.room_types %}
  {% if room.name == page.title %}
    <h1>{{ room.name }}</h1>
    <h2>Recommendations</h2>
    <ul>
      {% for rec in room.recommendations %}
        {% assign ref = site.data.noise.references | where: "id", rec.reference_id | first %}
        <li>{{ rec.recommended_level }} - <a href="{{ ref.id | prepend: '/references/' | relative_url }}">{{ ref.name }}</a></li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
