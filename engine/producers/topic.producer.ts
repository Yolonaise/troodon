import IMessage from "../../interfaces/message.interface.ts";
import Producer from "./base.producer.ts";
import { AmqpChannel } from "../../deps.ts";
import {
  getExchangeName,
  TOPIC_TYPE,
  getTopicName,
} from "../helpers/name.helper.ts";

export default class TopicProducer<T extends IMessage> extends Producer<T> {
  constructor(name: string, channel: AmqpChannel) {
    super(name, channel);
  }

  async init(): Promise<any> {
    await this.channel.declareExchange({
      exchange: getExchangeName(this.name),
      type: TOPIC_TYPE,
      durable: true,
    });
  }

  async send(msg: T): Promise<any> {
    await super.internalSend(
      {
        exchange: getExchangeName(this.name),
        routingKey: getTopicName(this.name),
      },
      msg,
    );
  }
}
