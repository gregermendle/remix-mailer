import { ChildProcess } from "node:child_process";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { intercept } from "../src/server/intercept";

const mocks = vi.hoisted(() => {
  return {
    open: vi.fn().mockImplementation(() => new ChildProcess()),
  };
});

describe(intercept, () => {
  vi.mock("open", () => {
    return {
      default: mocks.open,
    };
  });

  beforeEach(() => {
    mocks.open.mockClear();
  });

  test("should call send mail when only in production by default", async () => {
    const mockFn = vi.fn();
    const { sendMail } = intercept(mockFn);
    await sendMail({ html: "test email" });
    expect(mockFn).not.toBeCalled();
  });

  test("should honor custom shouldIntercept", async () => {
    const mockFn = vi.fn();
    const { sendMail } = intercept(() => {}, { shouldIntercept: mockFn });
    await sendMail({ html: "test email" });
    expect(mockFn).toBeCalledWith({ html: "test email" });
  });

  test("should add email to intercept cache", async () => {
    const { interceptCache, sendMail } = intercept(() => {});
    await sendMail({ html: "test email" });
    const entries = Object.entries(interceptCache);
    expect(entries).toHaveLength(1);
    expect(entries[0][0]).toBeTypeOf("string");
    expect(entries[0][1]).toEqual({
      html: "test email",
    });
  });

  test("should honor custom preview url", async () => {
    const { interceptCache, sendMail } = intercept(() => {}, {
      previewUrl: "http://localhost:1234",
    });
    await sendMail({ html: "test email" });
    const [[id]] = Object.entries(interceptCache);
    expect(mocks.open).toBeCalledWith(`http://localhost:1234?preview=${id}`);
  });

  test("should always call sendMail if forceSend is true", async () => {
    const mockFn = vi.fn<[]>();
    const { sendMail } = intercept(mockFn);
    await sendMail({ html: "test email", forceSend: true });
    expect(mockFn).toBeCalledWith({ html: "test email" });
  });

  test("should return object with behavior type and result", async () => {
    const { sendMail } = intercept(() => "my result");
    const sendResult = await sendMail({ html: "test email", forceSend: true });
    expect(sendResult).toEqual({
      type: "send",
      result: "my result",
    });

    const interceptResult = await sendMail({
      html: "test email",
    });
    expect(interceptResult.type).toEqual("intercept");
    expect(interceptResult.result).toBeInstanceOf(ChildProcess);
  });
});
