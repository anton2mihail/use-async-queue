# use-rn-async-queue

A React Hook implementing a queue for sync or async tasks for React Native, with optional
concurrency limit.

## Usage

- Create a queue with some concurrency. Default concurrency is 8. Set to
  `Infinity` or less than 1 for no concurrency limit.
- Register for notifications as tasks are processed and finished.
- Add tasks to it. A task is an object with an `id` (some unique value that
  makes sense for your use case -- a number, a url, etc.) and a `task` (a
  function that returns a Promise).

```javascript
import { QueueTaskResult, useRnAsyncQueue } from 'use-rn-async-queue';

// Example shows a task fetching a url, but a task can be any operation.
const url = 'some url';

const inflight = (task) => {
  console.log(`starting ${task.id}`);
  console.dir(stats); // { numPending: 0, numInFlight: 1, numDone: 0}
};

const done = async (task: QueueTaskResult) => {
  const result = await task.result;
  console.log(`finished ${task.id}: ${result}`);
  console.dir(stats); // { numPending: 0, numInFlight: 0, numDone: 1}
};

const drain = () => {
  console.log('all done');
  console.dir(stats); // { numPending: 0, numInFlight: 0, numDone: 1}
};

const { add, stats } = useRnAsyncQueue({
  concurrency: 1,
  inflight,
  done,
  drain,
});

add({
  id: url,
  task: () => {
    return fetch(url).then((res) => res.text());
  },
});
console.dir(stats); // { numPending: 1, numInFlight: 0, numDone: 0}
```

## TODO

- [x] return numInFlight, numRemaining, numDone
- [x] catch
- [x] pending/inflight
- [x] inflight callback
- [x] drain callback
- [ ] timeouts
- [ ] start, stop methods
- [ ] use events instead of/in addition to callbacks
- [x] pausing the queue

## More to be added
