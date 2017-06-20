import config from './config.js'
import Sideload from './sideload.js'

if (![].includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}

export default function format (results, type, columns) {
  console.log(`Formatting ${results.length} results.`)
  return new Promise((resolve, reject) => {
    // Basic formatting
    results.forEach((result, index) => {
      for (let key in result) {
        if (key === 'id' && type !== null) {
          let base = `https://${config.currentAccount.subdomain}.zendesk.com`
          if (type === 'articles') result.url = `${base}/hc/articles/${result.id}-${result.title.split(' ').join('-')}`
          else if (type === 'organizations') result.url = `${base}/agent/organizations/${result.id}`
          else if (type === 'tickets') result.url = `${base}/agent/tickets/${result.id}`
          else if (type === 'users') result.url = `${base}/agent/users/${result.id}`
          else result.url = `${base}/agent/admin/${type}/${result.id}`
        }
        if (['actions', 'restriction', 'execution', 'conditions'].includes(key)) result[key] = JSON.stringify(result[key])  // format array of objects
        if (key === 'custom_fields') {
          result[key].map(customField => {
            result[`custom_field_${customField.id}`] = customField.value
          })
        }
        if (key === 'via') result.channel = result.via.channel
        if (['user_fields', 'organization_fields'].includes(key)) {
          for (let fieldKey in result[key]) {
            result[fieldKey] = result[key][fieldKey]
          }
        }
        if (Array.isArray(result[key])) result[key] = result[key].join(', ')
        if (key === 'created_at' || key === 'updated_at') result[key] = new Date(result[key]).toLocaleString()
      }
    })

    // Sideloading, if enabled
    if (config.settings.sideloads && results.length) {
      console.log("Sideloading enabled.")
      let sideloadableColumns = []
      columns.forEach(column => {
        if (column.selected && column.hasOwnProperty('sideload')) {
          sideloadableColumns.push(column)
        }
      })
      console.log("Starting Sideload.replaceIdsWithNames.")
      Sideload.replaceIdsWithNames(results, sideloadableColumns).then(results => {
        console.log("Resolving promise in processResults.")
        resolve(results)
      }).catch(error => {
        console.log(error)
        reject()
      })
    } else {
      resolve(results)
    }
  })
}
