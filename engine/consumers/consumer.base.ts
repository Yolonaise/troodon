import IMessage from "../../interfaces/message.interface.ts";
import { 
  AmqpChannel,
  v4,
  BasicDeliver,
  BasicProperties
} from "../../deps.ts";
import { getQueueName, getExchangeName, getTopicName } from "../helpers/name.helper.ts";

export default class Consumer<M extends IMessage> {
  readonly name: string;
  readonly channel: AmqpChannel;
  readonly uuid: string;
  readonly msgBuilder: new () => M;
  
  constructor(msgBuilder: new () => M, name: string, channel: AmqpChannel) {
    this.name = name;
    this.channel = channel;
    this.uuid = v4.generate();
    this.msgBuilder = msgBuilder;
  }

  async init(): Promise<any> {
    await this.channel.declareQueue({
      durable: false,
      queue: getQueueName(this.name, this.uuid),
    });

    await this.channel.bindQueue({
      exchange: getExchangeName(this.name),
      queue:  getQueueName(this.name, this.uuid),
      routingKey: getTopicName(this.name),
    });
  }

  buildMessage(args: BasicDeliver, props: BasicProperties, data: Uint8Array) : M {
    let msg = new this.msgBuilder();
    
    return msg;
  }

  async consume(handler: (msg: M) => void): Promise<any> {
    await this.channel.consume(
      { queue: getQueueName(this.name, this.uuid) },
      (args, props, data) => handler(this.buildMessage(args, props, data))
    );
  }
}
