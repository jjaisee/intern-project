const AdminBroExpress = require('admin-bro-expressjs');
const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const mongoose = require('mongoose');

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
  logo:"../images/logo.png",
  companyName: 'LetzGet2gether',
  softwareBrothers: false,   // if Software Brothers logos should be shown in the sidebar footer
  favicon:'../images/favicon.ico'
  }
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'lovejs'
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  cookieName: process.env.ADMIN_COOKIE_NAME || 'adminbro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersuperlongpassworddddddddddddddddddddd',
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
    return null
  }
});

module.exports = router;
