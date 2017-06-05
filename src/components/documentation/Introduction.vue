<template>
  <div class="content">
    <h1 id="introduction">Introduction</h1>
    <p>Data Manager is an application built on the Zendesk platform to make it easier to manage your data. Whether you need to find, export, import, or remove data, the Data Manager app makes it simple and easy. This application uses the Zendesk API to retrieve search results, import, and remove data, and a backend server generates the file export.</p>
    <p>Groups, Organizations, Tickets, and Users are resources that utilize the <a href="https://support.zendesk.com/hc/en-us/articles/217385687-Zendesk-Support-advanced-search" target="blank">Advanced Search</a> engine. Advanced Search allows agents to construct complex search queries, but this application handles this complexity for you by dynamically constructing the search query as you enter information into the search filters. Automations, Macros, Triggers, and Views use a more simpler (and less powerful) Support metadata search engine that allows search by title only. Articles use the Guide search engine, which allows more flexibility than the Support metadata search engine but less options than Advanced Search.</p>
    <h2 id="features">Features</h2>
    <p>There are variations in features between all resources due to the nature of the Zendesk API. Below is a basic feature list broken down by navigation item:</p>
    <ul>
      <li><strong>Articles</strong></li>
      <p>Articles utilize the Guide search engine which allows search for articles by keyword, category, section, labels, locale, and date created/updated ranges. Deleted articles are archived and can be restored in the Guide user interface (<a href="https://support.zendesk.com/hc/en-us/articles/235721587" target="blank">here for more info</a>). There is no bulk delete articles endpoint, so each article deletion will result in 1 API call. Export functionality enabled.</p>
      <li><strong>Automations</strong></li>
      <p>Automations utilize the Support metadata search engine which allows search by title and filtering by active/inactive automations. You can also sort automations by alphabetical, date created, date updated, or position order. Results can be ordered either ascending or descending. The following sideloads are supported: app installations, permissions, hourly usage, daily usage, weekly usage, and monthly usage. The bulk delete endpoint is supported, and export functionality is enabled.</p>
      <li><strong>Groups</strong></li>
      <p>Groups utilize the Advanced Search engine which allows search by name and date created/updated ranges. There is no bulk delete groups endpoint, so each group deletion will result in 1 API call. Export functionality enabled.</p>
      <li><strong>Macros</strong></li>
      <p>Macros utilize the Support metadata search engine which allows search by title and filtering by accessibility, activeness/inactiveness, category, group id, and viewability. You can also sort macros alphabetically, by date created/updated, or position. Results can be ordered either ascending or descending. The following sideloads are supported: app installations, permissions, hourly usage, daily usage, weekly usage, and monthly usage. The bulk delete endpoint is supported, and export functionality is enabled.</p>
      <li><strong>Organizations</strong></li>
      <p>Organizations utilize the Advanced Search engine which allows search by name, date created/updated ranges, notes, details, and tags. You can also sort organizations by date created/updated. Results can be ordered either ascending or descending. The bulk delete endpoint is supported, and export functionality is enabled.</p>
      <li><strong>Tickets</strong></li>
      <p></p>
    </ul>
    <h2 id="limitations">Limitations</h2>
    <p>List all limitations <strong>here</strong>.</p>
    <h3>Third level</h3>
    <p>Quisque ante lacus, malesuada ac auctor vitae, congue <a href="#">non ante</a>. Phasellus lacus ex, semper ac tortor nec, fringilla condimentum orci. Fusce eu rutrum tellus.</p>
    <ol>
      <li>Donec blandit a lorem id convallis.</li>
      <li>Cras gravida arcu at diam gravida gravida.</li>
      <li>Integer in volutpat libero.</li>
      <li>Donec a diam tellus.</li>
      <li>Aenean nec tortor orci.</li>
      <li>Quisque aliquam cursus urna, non bibendum massa viverra eget.</li>
      <li>Vivamus maximus ultricies pulvinar.</li>
    </ol>
    <blockquote>Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero hendrerit ipsum, ut blandit est tellus sit amet turpis.</blockquote>
    <p>Quisque at semper enim, eu hendrerit odio. Etiam auctor nisl et <em>justo sodales</em> elementum. Maecenas ultrices lacus quis neque consectetur, et lobortis nisi molestie.</p>
    <p>Sed sagittis enim ac tortor maximus rutrum. Nulla facilisi. Donec mattis vulputate risus in luctus. Maecenas vestibulum interdum commodo.</p>
    <dl>
      <dt>Web</dt>
      <dd>The part of the Internet that contains websites and web pages</dd>
      <dt>HTML</dt>
      <dd>A markup language for creating web pages</dd>
      <dt>CSS</dt>
      <dd>A technology to make HTML look better</dd>
    </dl>
    <p>Suspendisse egestas sapien non felis placerat elementum. Morbi tortor nisl, suscipit sed mi sit amet, mollis malesuada nulla. Nulla facilisi. Nullam ac erat ante.</p>
    <h4>Fourth level</h4>
    <p>Nulla efficitur eleifend nisi, sit amet bibendum sapien fringilla ac. Mauris euismod metus a tellus laoreet, at elementum ex efficitur.</p>
    <pre>&lt;!DOCTYPE html&gt;
  &lt;html&gt;
    &lt;head&gt;
      &lt;title&gt;Hello World&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra nec nulla vitae mollis.&lt;/p&gt;
    &lt;/body&gt;
  &lt;/html&gt;</pre>
    <p>Maecenas eleifend sollicitudin dui, faucibus sollicitudin augue cursus non. Ut finibus eleifend arcu ut vehicula. Mauris eu est maximus est porta condimentum in eu justo. Nulla id iaculis sapien.</p>
    <table>
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Three</td>
          <td>Four</td>
        </tr>
        <tr>
          <td>Five</td>
          <td>Six</td>
        </tr>
        <tr>
          <td>Seven</td>
          <td>Eight</td>
        </tr>
        <tr>
          <td>Nine</td>
          <td>Ten</td>
        </tr>
        <tr>
          <td>Eleven</td>
          <td>Twelve</td>
        </tr>
      </tbody>
    </table>
    <p>Phasellus porttitor enim id metus volutpat ultricies. Ut nisi nunc, blandit sed dapibus at, vestibulum in felis. Etiam iaculis lorem ac nibh bibendum rhoncus. Nam interdum efficitur ligula sit amet ullamcorper. Etiam tristique, leo vitae porta faucibus, mi lacus laoreet metus, at cursus leo est vel tellus. Sed ac posuere est. Nunc ultricies nunc neque, vitae ultricies ex sodales quis. Aliquam eu nibh in libero accumsan pulvinar. Nullam nec nisl placerat, pretium metus vel, euismod ipsum. Proin tempor cursus nisl vel condimentum. Nam pharetra varius metus non pellentesque.</p>
    <h5>Fifth level</h5>
    <p>Aliquam sagittis rhoncus vulputate. Cras non luctus sem, sed tincidunt ligula. Vestibulum at nunc elit. Praesent aliquet ligula mi, in luctus elit volutpat porta. Phasellus molestie diam vel nisi sodales, a eleifend augue laoreet. Sed nec eleifend justo. Nam et sollicitudin odio.</p>
    <h6>Sixth level</h6>
    <p>Cras in nibh lacinia, venenatis nisi et, auctor urna. Donec pulvinar lacus sed diam dignissim, ut eleifend eros accumsan. Phasellus non tortor eros. Ut sed rutrum lacus. Etiam purus nunc, scelerisque quis enim vitae, malesuada ultrices turpis. Nunc vitae maximus purus, nec consectetur dui. Suspendisse euismod, elit vel rutrum commodo, ipsum tortor maximus dui, sed varius sapien odio vitae est. Etiam at cursus metus.</p>
  </div>
</template>

<script>
export default {
  name: 'introduction'
}
</script>
