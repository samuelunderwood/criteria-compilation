---
layout: default
title: Room Types
---

<h2>Room Types</h2>
<ul>
{% for room in site.data.noise.room_types %}
    <li><a href="{{ room.name | slugify | prepend: '/rooms/' | relative_url }}">{{ room.name }}</a></li>
{% endfor %}
</ul>
