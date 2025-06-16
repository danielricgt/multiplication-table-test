import { SaveFile } from "../../../src/domain/use-cases/save-file.use-case";
import fs from "fs";

describe("save file test", () => {
  const options = {
    fileContent: "test content",
    fileDestination: "custom-outputs",
    fileName: "table custon-name",
  };

  const customFilePath = `${options.fileDestination}/${options.fileName}.txt`;
  afterEach(() => {
    const outputFolderExist = fs.existsSync("outputs");
    if (outputFolderExist) fs.rmSync("outputs", { recursive: true });

    const customOutputFolderExist = fs.existsSync(options.fileDestination);
    if (customOutputFolderExist) fs.rmSync(options.fileDestination, { recursive: true });
  });

  test("should save file with the default values", () => {
    const saveFile = new SaveFile();
    const filepath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options);
    // console.log(result);
    const checkFile = fs.existsSync(filepath);
    const fileContent = fs.readFileSync(filepath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(options.fileContent).toBe(fileContent);
  });

  test("should save a file with custom values", () => {
    const saveFile = new SaveFile();
    const result = saveFile.execute(options);

    const checkFile = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy() ;
    expect(fileContent).toBe(options.fileContent);
  });
});
