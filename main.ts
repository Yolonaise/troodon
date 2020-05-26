import RabbitFactory from "./engine/factory.ts";
import TestMessage from "./test/test.message.ts";
import Test2Message from "./test/test2.message.ts";
import TopicProducer from "./engine/producers/topic.producer.ts";
import Consumer from "./engine/consumers/consumer.base.ts";

console.log("Create container");

var container = new RabbitFactory({
  host: "localhost",
  port: 5672,
  username: "rabbitmq",
  password: "rabbitmq",
});

console.log("Create producer...");
var producer1 = await container.getProducer(TopicProducer, TestMessage);
var producer2 = await container.getProducer(TopicProducer, Test2Message);

var consumer1 = await container.getConsumer(Consumer, TestMessage);
var consumer2 = await container.getConsumer(Consumer, TestMessage);

var consumer3 = await container.getConsumer(Consumer, Test2Message);
var consumer4 = await container.getConsumer(Consumer, Test2Message);

await consumer1.consume((msg: TestMessage) => {
  console.log(msg);
});
await consumer2.consume((msg: TestMessage) => {
  console.log(msg);
});

await consumer3.consume((msg: Test2Message) => {
  console.log(msg);
});
await consumer4.consume((msg: Test2Message) => {
  console.log(msg);
});

console.log("sending message...");
await producer1.send(new TestMessage());
await producer2.send(new Test2Message());
