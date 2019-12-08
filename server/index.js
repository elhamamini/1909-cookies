const express = require('express');
const chalk = require('chalk');
const path = require('path');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const { db, models } = require('./db/index.js');

const { User } = models;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

// app.use((req, res, next) => {
//   if (req.cookies.uuid) {
//     User.findByPk(req.cookies.uuid)
//       .then(userOrNull => {
//         if (userOrNull) {
//           req.loggedIn = true;
//           next();
//         } else {
//           next();
//         }
//       })
//       .catch(e => {
//         console.error(e);
//         next();
//       });
//   }
// });
// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });
// app.get('/whoami', (req, res, next) => {
//   if (req.loggedIn) {
//     res.send(req.user);
//   } else {
//     res.status(401).send('error');
//   }
// });
// app.post('/login', (req, res, next) => {
//   const { username, password } = req.body;
//   User.findOne({
//     where: {
//       username,
//       password
//     }
//   })
//     .then(userOrNull => {
//       if (userOrNull) {
//         res.cookie('uuid', userOrNull.id, {
//           path: '/',
//           expires: moment
//             .utc()
//             .add(1, 'day')
//             .toDate()
//         });
//         res.status(202).send('succses');
//       } else {
//         res.status(401).send('failure');
//       }
//     })
//     .catch(e => res.status(500).send('internal error'));
// });

app.use(express.static(path.join(__dirname, '../dist')));

db.sync({ force: true })
  .then(() => {
    User.create({
      username: 'elhamfarvid@gmail.com',
      password: '12345'
    });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        chalk.greenBright(`Server is listening on http://localhost:${PORT}`)
      );
    });
  })
  .catch(e => {
    console.error(e);
  });
