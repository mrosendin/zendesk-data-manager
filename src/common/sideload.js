if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);
      var len = o.length >>> 0;

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      var thisArg = arguments[1];
      var k = 0;

      while (k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        k++;
      }
      return undefined;
    }
  });
}

const Sideload = {
  // This object will contain all ids for replacement
  sideloads: {
    users: [],
    organizations: [],
    ticket_forms: []
  },

  /**
   * @function clearUniqueIds
   * Clears the sideloads object
   */
  clearUniqueIds () {
    this.sideloads.users = []
    this.sideloads.organizations = []
    this.sideloads.ticket_forms = []
  },

  /**
   * @function replaceIdsWithNames
   * @param {Object[]} results
   * @param {Object[]} columns
   * @returns {Object[]} results
   * Replace the specified columns' ids with names (from bulk endpoints)
   */
  replaceIdsWithNames (results, columns) {
    this.clearUniqueIds()
    return new Promise((resolve, reject) => {

      // Go through the 100 or less results and extract unique ids
      results.forEach(result => {
        columns.forEach(column => {
          // Check the uniqueness and truthiness (non-nullness)
          if (this.sideloads[column.sideload.type].indexOf(result[column.value]) == -1 && result[column.value] && typeof result[column.value] == 'number') {
            this.sideloads[column.sideload.type].push(result[column.value])
          } else if (Array.isArray(result[column.value])) {
            // Handle collaborators
            for (let id of result[column.value]) {
              if (this.sideloads[column.sideload.type].indexOf(result[column.value]) == -1 && result[column.value]) {
                this.sideloads.users.push(id)
              }
            }
          }
        })
      })

      /**
       * Make the API calls. There should be no more than roughly ~400 user ids
       * per page (depending on uniqueness of collaborators), but there will be no
       * more than 100 organization and ticket form ids per page. The worst case
       * scenario should be ~5 requests per page.
       */
      let promises = [];

      let replaceData = (key, array) => {
        this.sideloads[key] = []
        return new Promise((resolve, reject) => {
          console.log(`Getting ${key}`)
          let i, j, temparray, chunk = 100
          let current = 0, amount = Math.ceil(array.length / chunk)
          for (i = 0, j = array.length; i < j; i += chunk) {
            temparray = array.slice(i, i + chunk)
            client.request({
              type: 'GET',
              url: `/api/v2/${key}/show_many.json?ids=${temparray}`
            }).then((data) => {
              this.sideloads[key]= this.sideloads[key].concat(data[key])
              current += 1
              if (current == amount) {
                console.log(`${key} retrieved.`)
                resolve()
              }
            }, (response) => {
              reject()
            })
          }
        })
      }

      for (let key in this.sideloads) {
        if (this.sideloads[key].length) {
          promises.push(replaceData(key, this.sideloads[key].slice()));
        }
      }

      Promise.all(promises).then(() => {
        // Then replace ids in the results with names
        console.log("Mapping the names for results.")
        results = results.map((result) => {
          columns.forEach(column => {
            // Check the type of the value, because it may have already been
            // converted to a name in the first page of search results
            if (typeof result[column.value] == 'number') {
              let object = this.sideloads[column.sideload.type].find(object => {
                return object['id'] === result[column.value];
              })
              if (object) {
                result[column.value] = object.name
                if (column.value == 'requester_id') result['requester_email'] = object.email
              }
            } else if (Array.isArray(result[column.value])) {
              // Handle collaborators array
              let collaborators = []
              for (let id of result[column.value]) {
                let object = this.sideloads[column.sideload.type].find(object => {
                  return object['id'] == id
                })
                if (object) collaborators.push(object.name)
              }
              result[column.value] = collaborators.join(', ')
            }
          })
          return result
        })
        resolve(results)
      }, (response) => {
        reject()
      })
    })
  }
}

export default Sideload
