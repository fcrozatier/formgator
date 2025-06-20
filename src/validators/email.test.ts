import { describe, it } from "node:test";
import assert from "../assert.ts";
import { failParse, safeParse, succeed } from "../definitions.ts";
import { email } from "./email.ts";

describe("email()", async () => {
  it("should accept valid inputs", () => {
    const data = new FormData();
    data.append("input", "gautier@example.com");
    data.append("multiple", "gautier@example.com, gautier@example.net");
    data.append("empty", "");

    assert.deepEqualTyped(email()[safeParse](data, "input"), succeed("gautier@example.com"));
    assert.deepEqualTyped(
      email({ minlength: 19 })[safeParse](data, "input"),
      succeed("gautier@example.com"),
    );
    assert.deepEqualTyped(
      email({ maxlength: 19 })[safeParse](data, "input"),
      succeed("gautier@example.com"),
    );
    assert.deepEqualTyped(
      email({ pattern: /^.+@example\.com$/v })[safeParse](data, "input"),
      succeed("gautier@example.com"),
    );
    assert.deepEqualTyped(email()[safeParse](data, "empty"), succeed(null));
    assert.deepEqualTyped(
      email({ multiple: true })[safeParse](data, "multiple"),
      succeed(["gautier@example.com", "gautier@example.net"]),
    );
    assert.deepEqualTyped(
      email({ multiple: true, pattern: /^gautier@.+$/v })[safeParse](data, "multiple"),
      succeed(["gautier@example.com", "gautier@example.net"]),
    );
    assert.deepEqualTyped(email({ multiple: true })[safeParse](data, "empty"), succeed([]));
  });

  it("should refuse invalid inputs", () => {
    const data = new FormData();
    data.append("input", "invalid");
    data.append("multiple", "a@b\nc@d");
    data.append("empty", "");
    data.append("ok", "gautier@example.com");

    assert.deepEqualTyped(email()[safeParse](data, "missing"), failParse("type", {}));
    assert.deepEqualTyped(
      email({ required: true })[safeParse](data, "empty"),
      failParse("required", {}),
    );
    assert.deepEqualTyped(email()[safeParse](data, "input"), failParse("invalid", {}));
    assert.deepEqualTyped(
      email({ multiple: true })[safeParse](data, "input"),
      failParse("invalid", {}),
    );
    assert.deepEqualTyped(
      email({ multiple: true })[safeParse](data, "multiple"),
      failParse("invalid", {}),
    );
    assert.deepEqualTyped(
      email({ minlength: 20 })[safeParse](data, "ok"),
      failParse("minlength", {}, { minlength: 20 }),
    );
    assert.deepEqualTyped(
      email({ maxlength: 18 })[safeParse](data, "ok"),
      failParse("maxlength", {}, { maxlength: 18 }),
    );
    assert.deepEqualTyped(
      email({ pattern: /^.+@example\.net$/v })[safeParse](data, "ok"),
      failParse("pattern", {}, { pattern: /^.+@example\.net$/v }),
    );
    assert.deepEqualTyped(
      email({ multiple: true, pattern: /^.+@example\.net$/v })[safeParse](data, "ok"),
      failParse("pattern", {}, { pattern: /^.+@example\.net$/v }),
    );
  });
});
