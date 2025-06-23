const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./args.plugin");
  return yarg;
};

describe("Test on args.plugin", () => {

  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values ", async () => {
    const argv = await runCommand(["-b", "5"]);
    //   console.log(argv);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  test("should return with coustom values", async ()  => {

    const argv = await runCommand(["-b","7","-s","-n 7","-d files"])
    console.log(argv);
    expect(argv).toEqual(expect.objectContaining({
      b: 7,
      base: 7,
      s: true,
      show: true,
      n: ' 7',
      d: ' files',
      l: 10,
      limit: 10,
    }));

  });
});
