const Sideload = {
  // This object will contain all ids for replacement
  sideloads: {
    users: [],
    organizations: []
  },

  /**
   * @function clearUniqueIds
   * Clears the sideloads object
   */
  clearUniqueIds () {
    this.sideloads.users = []
    this.sideloads.organizations = []
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
       * more than 100 organization ids per page. The worst case scenario
       * should be ~5 requests per page.
       */
      let promises = [];

      let replaceData = (key) => {
        return new Promise((resolve, reject) => {
          console.log(`Getting ${key}`)
          client.request({
            type: 'GET',
            url: `/api/v2/${key}/show_many.json?ids=${this.sideloads[key]}`
          }).then((data) => {
            console.log(`${key} retrieved.`)
            this.sideloads[key] = data[key]
            resolve()
          }, (response) => {
            reject()
          })
        })
      }

      for (let key in this.sideloads) {
        if (this.sideloads[key].length) {
          promises.push(replaceData(key));
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
              if (object) result[column.value] = object.name
            } else if (Array.isArray(result[column.value])) {
              // Handle collaborators array
              let collaborators = []
              for (let id of result[column.value]) {
                let object = this.sideloads[column.sideload.type].find(object => {
                  return object['id'] == id
                })
                collaborators.push(object.name)
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
