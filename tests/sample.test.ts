describe("Vitest", () => {
  beforeAll(() => {
    console.log("テストファイル開始前");
  });
  afterAll(() => {
    console.log("テストファイル終了後");
  });

  beforeEach(() => {
    console.log("テスト開始前");
  });
  afterEach(() => {
    console.log("テスト終了後");
  });

  test("マッチャー", () => {
    expect(1 + 1).toBe(2);

    expect({ foo: "bar" }).toEqual({ foo: "bar" });
    expect([1, 2, 3]).toStrictEqual([1, 2, 3]);

    expect(undefined).toBeUndefined();
    expect("foo").toBeDefined();

    expect(true).toBeTruthy();
    expect(false).toBeFalsy();

    expect(null).toBeNull();
    expect("foo").not.toBeNull();

    expect("foo").toHaveLength(3);
    expect([1, 2, 3]).toHaveLength(3);

    expect({ foo: "bar", baz: "hoge" }).toHaveProperty("foo");
    expect(["foo", "bar"]).toContain("foo");
    expect([{ foo: "bar" }, { foo: "hoge" }]).toContainEqual({ foo: "bar" });
    expect("foo12345").toMatch(/foo\d{5}/);

    class CustomError extends Error {}

    const throwError = (message: string) => {
      throw new CustomError(message);
    };
    expect(() => throwError("")).toThrow(); // エラーになることを検証
    expect(() => throwError("")).toThrow(CustomError); // 送出したエラーの型判定
  });

  test.each`
    unitPrice | quantity | expected
    ${100}    | ${1}     | ${100}
    ${150}    | ${2}     | ${300}
    ${200}    | ${0}     | ${0}
  `(
    "パラメタライズドテスト:$unitPrice * $quantity = $expected",
    ({ unitPrice, quantity, expected }) => {
      expect(unitPrice * quantity).toBe(expected);
    }
  );

  test("モック", () => {
    const mockFn = vi.fn((a: number) => a * 10);
    mockFn(1);
    mockFn(2);

    expect(mockFn.mock.calls).toHaveLength(2);

    expect(mockFn.mock.calls[0][0]).toBe(1); // 1回目の呼出の引数
    expect(mockFn.mock.calls[1][0]).toBe(2); // 2回目の呼出の引数

    expect(mockFn.mock.results[0].value).toBe(10); // 1回目の呼出の戻り値
    expect(mockFn.mock.results[1].value).toBe(20); // 1回目の呼出の戻り値
  });

  test("Expectマッチャーユーティリティ", () => {
    const obj = {
      foo: "bar",
      count: 10,
      id: "123-456",
      nested: { hoge: true, fuga: false },
      array: [1, 2, 3],
    };
    expect(obj).toEqual({
      foo: expect.any(String), // String
      count: expect.anything(), // 値は何でもOK
      id: expect.stringMatching(/\d{3}-\d{3}/), // 正規表現
      nested: expect.objectContaining({ hoge: true }), // 指定したkey-valueが含まれていること
      array: expect.arrayContaining([1, 2]), // 配列に要素が含まれていること
    });
  });

  test.skip("スナップショットテスト", () => {
    const html = `<div class="container">
    <article>
      <p class="title">UI生成結果</p>
    </article>
  </div>`;
    expect(html).toMatchSnapshot();
  });
});
