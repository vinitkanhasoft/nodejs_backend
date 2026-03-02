import Queue from 'bull';

export const createQueue = (name: string) => new Queue(name);