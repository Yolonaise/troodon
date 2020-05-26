import { IMessage } from "../interfaces/message.interface.ts";

export default class Test2Message implements IMessage {
  value: string = "";

  constructor() {
    this.value = "a new test message 2";
  }

  getName(): string {
    return "Test2";
  }

  getPayload(): string {
    return this.value;
  }

  parse(data: Uint8Array): void {
    this.value = new TextDecoder().decode(data);
  }
}
