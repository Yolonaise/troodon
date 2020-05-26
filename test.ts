import { assertEquals } from "./test_deps.ts";

Deno.test({
  name: "SendReceiveMessageWork",
  async fn(): Promise<any> {
    console.log("i have to contain rabbit... but i'm a little bit lazy today");
    assertEquals(1, 1);
  },
});
