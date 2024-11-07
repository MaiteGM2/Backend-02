import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),              
      winston.format.timestamp(),              
      winston.format.align(),                
      winston.format.printf(({ timestamp, level, message, codeStatus }) => { 
        return `${timestamp} [${level}]: ${message} | Status Code: ${codeStatus}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%-app.log',  
        datePattern: 'YYYY-MM-DD',       
        maxFiles: '7d',                  
        level: 'info'                     // 'info' o superior
      })
    ]
});

export default logger;