Repo to understand APIs and microservices

### How to start node package?

```bash
npm install
```

To check if it's installed the node package?

```bash
npm -v
```

#### To install express

```bash
npm install express
```

## Key learnings

Since your project is already set to "type": "module", let’s fix your file properly.

🔁 Replace require with import

Change this:

```bash
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
```

To this:

```bash
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
```

### Why was I getting this?
Why You’re Getting This Error

Your package.json contains:

```"type": "module"```

That tells Node.js v20:

“Treat all .js files as ES Modules.”

But your code is written using CommonJS syntax:

const express = require('express');

And in ES module mode:

❌ require() is NOT allowed
✅ You must use import


**Conclusion**
So if I remove that one line everything goes back to the require thing then?

```"type": "module"```
in Package.json

```bash
{
  "type": "module",
  "name": "api-microservices",
  "version": "1.0.0",
  "description": "Repo to understand APIs and microservices",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "mongoose": "^8.23.0"
  }
}
```

After editing the package.json always

1.  Stop the server
2.  Restart the Node