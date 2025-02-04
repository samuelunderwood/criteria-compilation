---
layout: default
title: Room Types
---

<h2>Room Types</h2>
<ul>
{% for room in site.rooms %}
    <li><a href="{{ room.url }}">{{ room.title }}</a></li>
{% endfor %}
</ul>
