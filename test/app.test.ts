
import { ServerApp } from '../src/presentation/server-app';

describe('test app.ts', () => { 
    
    test('should call serveer.run with values true', async () => {
        const serverRunMock = jest.fn();
        
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.js', "-b", "10", "-l", "5", "-n", "test-file", "-d", "test-destination"];

        await import ('../src/app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: false,
            fileDestination: 'test-destination',
            fileName: 'test-file',
        });
    }); 
    

 }) 