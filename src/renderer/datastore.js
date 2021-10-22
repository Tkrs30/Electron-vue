import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const dbFactory = file =>
  new Datastore({
    filename: `${path.join(remote.app.getPath('userData'))}/data/${file}`,
    autoload: '',
  })

const db = {
  users: dbFactory('users.db'),
  token: dbFactory('token.db'),
  mytoken: dbFactory('mytoken.db')
}

var rec = { name: 'bigbounty', age: 16 }
db.mytoken.insert(rec, function (err, newrec) {
})

export default db
