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
      <p>Tickets utilize the Advanced Search engine which allows search by ticket id, date created/updated ranges, date solved/due, assignee, submitter, requester, subject, description, status, ticket type, priority, group, tags, channel, commenter, collaborators, custom field value, and brand. Autocomplete functionality is available for the assignee, submitter, requester, commenter, collaborator(s), and organization filter fields. You can also sort tickets by date created/updated, commented, priority, status, or ticket type. Results can be ordered either ascending or descending. The bulk delete endpoint is supported, and export functionality is enabled.</p>
      <li><strong>Triggers</strong></li>
      <p>Triggers utilize the Support metadata search engine which allows search by title and filtering by active/inactive triggers. You can also sort automations by alphabetical, date created, date updated, or position order. Results can be ordered either ascending or descending. The following sideloads are supported: app installations, permissions, hourly usage, daily usage, weekly usage, and monthly usage. The bulk delete endpoint is supported, and export functionality is enabled.</p>
      <li><strong>Users</strong></li>
      <p>Users utilize the Advanced Search engine which allows search by name, role, email, group, organizations, date created/updated ranges, notes, details, external id, phone, and tags. Autocomplete functionality is available for the name and organization filter fields. You can also sort users by date created/updated. Results can be ordered either ascending or descending. The bulk delete endpoint is supported, and export functionality is enabled.</p>
      <li><strong>Views</strong></li>
      <p>Views utilize the Support metadata search engine which allows search by title and filtering by accessibility and group id. You can also sort views by alphabetical, date created, date updated, or position order. Results can be ordered either ascending or descending. The following sideloads are supported: app installations and permissions. The bulk delete endpoint is supported, and export functionality is enabled.</p>
      <li><strong>Import</strong></li>
      <p>The import functionality allows exported CSV or JSON files to be imported into your Zendesk account. For more information, view the section on <router-link to="/importing-data">importing data</router-link>.</p>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'introduction'
}
</script>
