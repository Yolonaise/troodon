export const TOPIC_TYPE: string = 'topic'; 

export function getExchangeName(value: string): string {
  return `${value}-exchange`;
}

export function getTopicName(value: string): string {
  return `${value}_topic`;
}

export function getQueueName(value: string, id: string): string {
  return `${value}-${id}-queue`;
}


