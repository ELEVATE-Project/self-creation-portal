const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 1690;

// app.use(express.static(path.join(__dirname+"/dist/self-creation-portal", 'browser')));

// app.get('*', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'www', 'index.html'));
//     res.sendFile(path.join(__dirname+"/dist/self-creation-portal/browser/",'index.html'));
//   });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// Serve static files from Angular build directory
const buildPath = path.join(__dirname, 'dist', 'self-creation-portal', 'browser');
app.use('/scp',express.static(buildPath));

// Fallback to index.html for SPA routing
app.get('/scp/*', (req, res) => {
  res.sendFile(path.join(buildPath+"/dist/self-creation-portal/browser/", 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
