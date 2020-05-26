export default interface IMessage {
  value: unknown;
  parse: (data: Uint8Array) => void;
  getPayload: () => string;
  getName: () => string;
}
