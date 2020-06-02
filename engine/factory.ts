import { AmqpChannel, connect, AmqpConnection } from "../deps.ts";
import { IMessage } from "../interfaces/message.interface.ts";
import { IConfiguration } from "../interfaces/configuration.interface.ts";
import { Producer }from "./producers/base.producer.ts";
import { Consumer} from "./consumers/consumer.base.ts";

export class RabbitFactory {
  private connection?: AmqpConnection;
  private config?: IConfiguration;
  private channel?: AmqpChannel; 
  
  constructor(config: IConfiguration) {
    this.config = config;
  }

  async tryConnection(): Promise<AmqpChannel> {
    try {
      if (this.connection && !this.channel) {
        this.channel = await this.connection.openChannel();
      }
      else if (!this.connection) {
        
          this.connection = await connect({
            hostname: this.config?.host,
            port: this.config?.port,
            username: this.config?.username,
            password: this.config?.password,
          });
          this.channel = await this.connection.openChannel();
        } 
      }
      catch (err) {
        console.log(err);
        throw err;
    }
    return this.channel;
  }

  async getProducer<M extends IMessage, P extends Producer<M>>(
    producerType: new (name: string, channel: AmqpChannel) => P,
    msgType: new () => M,
  ): Promise<Producer<M>> {
    const channel = await this.tryConnection();
    if (!channel) {
      throw "channel is not cleared";
    }

    const result = new producerType(new msgType().getName(), channel);
    await result.init();
    return result;
  }

  async getConsumer<M extends IMessage, P extends Consumer<M>>(
    consumerType: new (
      msgBuilder: new () => M,
      name: string,
      channel: AmqpChannel,
    ) => P,
    msgType: new () => M,
  ): Promise<Consumer<M>> {
    const channel = await this.tryConnection();
    if (!channel) {
      throw "channel is not cleared";
    }

    const result = new consumerType(msgType, new msgType().getName(), channel);
    await result.init();
    return result;
  }
}
