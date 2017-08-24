<template>
  <div class="content">
    <h1 id="examples">Advanced Search Examples</h1>
    <p>Examples of using Advanced Search are shown in this section.</p>
    <h2 id="exact-wording">Exact wording</h2>
    <img src="https://d26dzxoao6i3hh.cloudfront.net/items/0l2B113c3i0Q0O3l2P3d/Image%202017-06-17%20at%204.38.31%20PM.png?v=90de475a">
    <p>By default, submitting multiple keywords will return results where <strong>all</strong> of the words are present, in any order. To fetch only results with the exact phrasing, wrap the text in quotation marks like above.</p>
    <h2 id="term-exclusion">Term exclusion</h2>
    <img src="https://d26dzxoao6i3hh.cloudfront.net/items/1E10270N19150k1f3F0F/Image%202017-06-17%20at%204.38.45%20PM.png?v=a38c0492">
    <p>You can exclude a term if you are searching for another term. Just add <code>-{property}:{term}</code> where {property} is a field (like "assignee", or "tags" as in the example) and {term} is what you want to exclude. Don't forget the minus sign in front!</p>
    <h2 id="logical-and">Logical AND</h2>
    <img src="https://d26dzxoao6i3hh.cloudfront.net/items/22461k3s2V1s2a0r2x2f/Image%202017-06-17%20at%204.41.39%20PM.png?v=d4ada609">
    <p>You can search for results that contain all provided terms. Just add quotation marks around all the terms you want to include in the search, as in the example.</p>
    <h2 id="logical-or">Logical OR</h2>
    <img src="https://d26dzxoao6i3hh.cloudfront.net/items/0D3M40073F1d1K1C003j/Image%202017-06-17%20at%204.37.57%20PM.png?v=ec58b989">
    <p>You can search for results that include either term if you add <code>{property}:{term}</code> in the filter field.</p>
    <h2 id="wildcard-operator">Wildcard Operator</h2>
    <img src="https://d26dzxoao6i3hh.cloudfront.net/items/0P192Z1Q2f0P1G163k1D/Image%202017-06-17%20at%204.40.15%20PM.png?v=c70f5566">
    <p>You can search for part of a term. Just use the wildcard operator, <code>*</code>. For example, <code>photo*</code> will match photography, photographs, photos, etc.</p>
    <h2 id="shorthand-values">Shorthand values</h2>
    <img src="https://d26dzxoao6i3hh.cloudfront.net/items/00001t1r3Q1e431U0235/Image%202017-06-17%20at%204.36.03%20PM.png?v=79a0a40d">
    <img src="https://d26dzxoao6i3hh.cloudfront.net/items/310I2I3V373m3L1O0O3g/Image%202017-06-17%20at%204.36.22%20PM.png?v=0af7b6ed">
    <p>You can use the values <code>me</code> for any user filter field as an alias for your own name. Similarly, you can use the value <code>none</code> to search for results where there is no value, as in the example.</p>
  </div>
</template>

<script>
export default {
  name: 'examples'
}
</script>
