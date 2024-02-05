import { useState, useRef, useCallback, useEffect } from 'react';
import nextTick from 'next-tick';

type QueueStats = {
  numPending: number;
  numInFlight: number;
  numDone: number;
}

type QueueTaskResult = {
  id: any;
  task(): Promise<any>;
  result?: Promise<any>;
  stats?: QueueStats;
}

type Queue = {
  add: (task: QueueTaskResult) => void;
  stats: QueueStats;
}

type QueueOpts = {
  concurrency?: number;
  done?: (result: QueueTaskResult) => void | Promise<void>;
  drain?: () => void;
  inflight?: (task: QueueTaskResult) => void;
  isPaused?: boolean;
}

const useRnAsyncQueue = (opts: QueueOpts): Queue => {
  const { done, drain, inflight, isPaused } = opts;
  let { concurrency } = opts;
  if (concurrency < 1) concurrency = Infinity;

  const [stats, setStats] = useState({
    numPending: 0,
    numInFlight: 0,
    numDone: 0,
  });

  const drained = useRef(true);
  const inFlight = useRef([] as QueueTaskResult[]);
  const pending = useRef([] as QueueTaskResult[]);

  useEffect(() => {
    if(isPaused) return;
    if (
      stats.numDone > 0 &&
      drain &&
      inFlight.current.length === 0 &&
      pending.current.length === 0 &&
      !drained.current
    ) {
      drained.current = true;
      return nextTick(drain);
    }

    while (
      inFlight.current.length < concurrency &&
      pending.current.length > 0
    ) {
      drained.current = false;
      const task = pending.current.shift();
      inFlight.current.push(task);
      setStats((stats) => {
        return {
          ...stats,
          numPending: stats.numPending - 1,
          numInFlight: stats.numInFlight + 1,
        };
      });
      inflight && inflight({ ...task, stats });
      const result = task.task();
      result
        .then(() => {
          inFlight.current.pop();
          setStats((stats) => {
            return {
              ...stats,
              numInFlight: stats.numInFlight - 1,
              numDone: stats.numDone + 1,
            };
          });
          done && done({ ...task, result, stats });
        })
        .catch(() => {
          inFlight.current.pop();
          setStats((stats) => {
            return {
              ...stats,
              numInFlight: stats.numInFlight - 1,
              numDone: stats.numDone + 1,
            };
          });
          done && done({ ...task, result, stats });
        });
    }
  }, [concurrency, done, drain, inflight, stats]);

  const add = useCallback((task: QueueTaskResult) => {
    pending.current.push(task);
    setStats((stats) => {
      return {
        ...stats,
        numPending: stats.numPending + 1,
      };
    });
  }, []);

  return { add, stats };
}

export { useRnAsyncQueue };
export type { Queue, QueueOpts, QueueStats, QueueTaskResult };
