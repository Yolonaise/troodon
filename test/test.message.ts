import { IMessage } from "../interfaces/message.interface.ts";

export default class TestMessage implements IMessage {
  value: string = "";

  constructor() {
    this.value = "a new test message";
  }

  getName(): string {
    return "Test";
  }

  getPayload(): string {
    return this.value;
  }

  parse(data: Uint8Array): void {
    this.value = new TextDecoder().decode(data);
  }
}
