import { IMessage } from "../../interfaces/message.interface.ts";
import { AmqpChannel, BasicPublishArgs } from "../../deps.ts";

export abstract class Producer<T extends IMessage> {
  readonly name: string;
  readonly channel: AmqpChannel;

  constructor(name: string, channel: AmqpChannel) {
    this.name = name;
    this.channel = channel;
  }

  abstract init(): Promise<any>;
  abstract send(msg: T): Promise<any>;

  async internalSend(header: BasicPublishArgs, msg: T): Promise<any> {
    await this.channel.publish(
      header,
      { contentType: "application/json" },
      new TextEncoder().encode(msg.getPayload()),
    );
  }
}
