---
layout: default
title: References
---

<h2>References</h2>
<ul>
{% for ref in site.references %}
    <li><a href="{{ ref.url }}">{{ ref.title }}</a></li>
{% endfor %}
</ul>
