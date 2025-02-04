---
layout: default
title: References
---

<h2>References</h2>
<ul>
{% for ref in site.data.noise.references %}
    <li><a href="{{ ref.id | prepend: '/references/' | relative_url }}">{{ ref.name }}</a></li>
{% endfor %}
</ul>
