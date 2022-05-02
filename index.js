const Memcached = require('memcache-promise');

const memcached = new Memcached('localhost:11211', {
  poolSize: 10,
});

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  const params = req.query;
  const key = params.key;
  res.send('Hello World!', JSON.stringify(params, null,2));
});

let count = 0;

app.post('/set', (req, res) => {
  console.log("set");
  const params = req.body;
  const key = params.key;
  const value = params.value;
  memcached.set(key, value, 1000).then(() => {
    console.log("Ok")
    res.send('OK');
  }).catch((e) => {
    console.error(e)
    res.send(e);
  })
  console.log("End")
});

let i = 0;

app.get('/val/:value', (req, res) => {
  const params = req.params;
  const value = params.value;
  i++;
  const time = Date.now();
  memcached.get(value).then((data) => {
    const endTime = Date.now();
    const diff = (endTime - time) / 1000;
    console.log(i + " Time: " + diff);

    if (diff > 1) {
      console.log(i + " Error: " + diff);
      console.log('.............................')
      count++;
    }
    res.send(data);
  }).catch((e) => {
    console.error(e)
    res.send(e);
  })
  
});

const memcacheGet = (key) => new Promise((resolve, reject) => {
  const time = Date.now();
  const n = i++;
  memcached.get(key).then((data) => {
    const endTime = Date.now();
    const diff = (endTime - time) / 1000;
    console.log(n + "Time: " + diff);

    if (diff > 1) {
      console.log(n + "Error: " + diff);
      console.log('.............................')
      count++;
    }
    resolve(data);
  }).catch((e) => {
    reject(e);
  })
})

app.get('/val/:value/:it', (req, res) => {
  const ops = [];

  for (let i = 0; i < req.params.it; i++) {
    ops.push(memcacheGet(req.params.value));
  }

  Promise.all(ops).then(() => {
    console.log("End")
    res.send("End" + count);
  }).catch((e) => {
    console.error(e)
    res.send(e);
  });
})


app.get('/count', (req, res) => {
  res.send({
    count: count
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})