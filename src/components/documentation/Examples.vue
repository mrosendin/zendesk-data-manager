<template>
  <div class="content">
    <h1 id="examples">Advanced Search Examples</h1>
    <p>Examples of using Advanced Search are shown in this section.</p>
    <h2 id="exact-wording">Exact wording</h2>
    <img src="http://f.cl.ly/items/2I2e2w2X2V430N2D0m3c/exact-wording.png">
    <p>By default, submitting multiple keywords will return results where <strong>all</strong> of the words are present, in any order. To fetch only results with the exact phrasing, wrap the text in quotation marks like above.</p>
    <h2 id="term-exclusion">Term exclusion</h2>
    <img src="http://f.cl.ly/items/280W400k3y2i1j2K1r2U/term-exclusion.png">
    <p>You can exclude a term if you are searching for another term. Just add <code>-{property}:{term}</code> where {property} is a field (like "assignee", or "tags" as in the example) and {term} is what you want to exclude. Don't forget the minus sign in front!</p>
    <h2 id="logical-and">Logical AND</h2>
    <img src="http://f.cl.ly/items/0a3n3R0R0E0D2R2x2Y3A/logical-and.png">
    <p>You can search for results that contain all provided terms. Just add quotation marks around all the terms you want to include in the search, as in the example.</p>
    <h2 id="logical-or">Logical OR</h2>
    <img src="http://f.cl.ly/items/2r0Y3u2C0S2t0b1L0t01/logical-or.png">
    <p>You can search for results that include either term if you add <code>{property}:{term}</code> in the filter field.</p>
    <h2 id="wildcard-operator">Wildcard Operator</h2>
    <img src="http://f.cl.ly/items/280W400k3y2i1j2K1r2U/term-exclusion.png">
    <p>You can search for part of a term. Just use the wildcard operator, <code>*</code>. For example, <code>photo*</code> will match photography, photographs, photos, etc.</p>
    <h2 id="shorthand-values">Shorthand values</h2>
    <img src="http://f.cl.ly/items/3X2w312l1Q0z0N310h0J/shorthand-values-1.png">
    <img src="http://f.cl.ly/items/182p0C371U1M1I381Z2X/shorthand-values-2.png">
    <p>You can use the values <code>me</code> for any user filter field as an alias for your own name. Similarly, you can use the value <code>none</code> to search for results where there is no value, as in the example.</p>
  </div>
</template>

<script>
export default {
  name: "examples"
};
</script>
