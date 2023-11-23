import { describe, test, expect } from "vitest";
import { intercept } from "../src/server/intercept";

describe(intercept, () => {
  test("should call send mail when only in production by default", () => {});
  test("should honor custom shouldIntercept", () => {});
  test("should add email to intercept cache", () => {});
  test("should await asynchronous send mail", () => {});
  test("should honor custom preview url", () => {});
  test("should always call sendMail if forceSend is true", () => {});
  test("should return object with behavior type and result", () => {});
});
