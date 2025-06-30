import { createInflate } from "zlib";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";
import { after, mock } from "node:test";

describe('server app test', () => { 

    const options = {
        base:3,
        limit:10,
        showTable:false,
        fileDestination: 'trest-destination' ,
        fileName:'test-file-namne',
    };

    beforeEach(()=> {
        jest.clearAllMocks();
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });
test('should create server App instance', () => {
    
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp );
    expect(typeof ServerApp.run).toBe('function');

});


test('should run server app with options ', () => {


    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenLastCalledWith('File created!');

    expect(createTableSpy).toHaveBeenCalledTimes (1);
    expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit});

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
        fileContent: expect.any(String),
        fileDestination: options.fileDestination,
        fileName: options.fileName,
    });

});

test('should run with custom values mocked', () => {

    const logmock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2');;
    const saveFileMock = jest.fn().mockReturnValue(true);
   


    console.log =logmock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options );

    expect(logmock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({base: options.base, limit: options.limit});
    expect(logErrorMock).not.toHaveBeenCalledWith('File not created!');
    expect(saveFileMock).toHaveBeenCalledWith({fileContent: '1 x 2 = 2', fileDestination: options.fileDestination, fileName: options.fileName });

    
});




 });