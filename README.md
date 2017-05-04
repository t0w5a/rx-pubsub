RxPubSub
=====

1.  install the npm dependencies: 
```
npm install
``` 
2.  run the webpack server:
```
npm start
```
3. access the `index.html` file [http://localhost:8080/index.html](http://localhost:8080/index.html)

4. create in the console new `RxPubSub` object and check its methods and properties:
```
var pubsub = new RxPubSub();
var eventName = 'testEvent';
var sub1 = pubsub.subscribe(eventName, (data) => {
    console.log('1st subscriber receives data: ', data);
});
var sub2 = pubsub.subscribe(eventName, (data) => {
    console.log('2nd subscriber receives data: ', data);
});

pubsub.publish(eventName, {testProp: 'test Value'});

// 1st subscriber receives data: 
// Object {testProp: "test Value"}
// 2nd subscriber receives data: 
// Object {testProp: "test Value"}

var sub3 = pubsub.subscribe(eventName, (data) => {
    console.log('3rd subscriber receives data: ', data);
});

// 3rd subscriber receives data:
// Object {testProp: "test Value"}
```