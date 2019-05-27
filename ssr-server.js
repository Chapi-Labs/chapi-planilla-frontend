const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express()

  server.get('/payroll/new', (req, res) => {
    const actualPage = '/payroll_new';
    app.render(req, res, actualPage, {});
  })
  server.get("/employee/list", (req, res) => {
    const actualPage = "/employee_list";
    app.render(req, res, actualPage, {});
  });
  server.get("/company/list", (req, res) => {
    const actualPage = "/company_list";
    app.render(req, res, actualPage, {});
  });
   server.get("/payroll/type", (req, res) => {
     const actualPage = "/payroll_type";
     app.render(req, res, actualPage, {});
   });
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
