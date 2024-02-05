type QueueStats = {
    numPending: number;
    numInFlight: number;
    numDone: number;
};
type QueueTaskResult = {
    id: any;
    task(): Promise<any>;
    result?: Promise<any>;
    stats?: QueueStats;
};
type Queue = {
    add: (task: QueueTaskResult) => void;
    stats: QueueStats;
};
type QueueOpts = {
    concurrency?: number;
    done?: (result: QueueTaskResult) => void | Promise<void>;
    drain?: () => void;
    inflight?: (task: QueueTaskResult) => void;
    isPaused?: boolean;
};
declare const useRnAsyncQueue: (opts: QueueOpts) => Queue;
export { useRnAsyncQueue };
export type { Queue, QueueOpts, QueueStats, QueueTaskResult };
