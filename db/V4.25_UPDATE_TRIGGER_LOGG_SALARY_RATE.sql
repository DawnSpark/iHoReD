IF EXISTS (SELECT * FROM sys.objects WHERE [name] = N'LOGG_SALARY_RATE' AND [type] = 'TR')
BEGIN
      DROP TRIGGER LOGG_SALARY_RATE
END;

GO
CREATE TRIGGER LOGG_SALARY_RATE
ON SALARY_RATES
AFTER UPDATE
AS
BEGIN;
SELECT * INTO #DELETED  FROM DELETED 
SELECT * INTO #INSERTED FROM INSERTED  
DECLARE @COL_NAME VARCHAR(20)
DECLARE COLUMN_CURSOR CURSOR FOR
SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'SALARY_RATES' AND TABLE_SCHEMA='dbo'

OPEN COLUMN_CURSOR

FETCH NEXT FROM COLUMN_CURSOR INTO @COL_NAME

WHILE (@@FETCH_STATUS <> -1)
BEGIN
DECLARE @QUERY  NVARCHAR(1000) = N'SELECT DELETED.'+ @COL_NAME + ',' + 'INSERTED.' + @COL_NAME +' 
     FROM #DELETED DELETED
     INNER JOIN #INSERTED INSERTED ON Inserted.ID = DELETED.ID
     WHERE DELETED.'+ @COL_NAME + ' != INSERTED.' + @COL_NAME,
     @ROW_COUNT INT


EXEC SP_EXECUTESQL @QUERY 

SELECT @ROW_COUNT = @@ROWCOUNT

IF @ROW_COUNT > 0
  BEGIN
DECLARE @OLD NVARCHAR(20);
DECLARE @NEW NVARCHAR(20);
BEGIN
DECLARE @OLD_QUERY NVARCHAR(100);
DECLARE @NEW_QUERY NVARCHAR(100);
DECLARE @USER INT;
SET @OLD_QUERY = N'SELECT TOP 1 @OLD = DELETED.' + @COL_NAME + ' FROM ' + '#DELETED DELETED';
SET @NEW_QUERY = N'SELECT TOP 1 @NEW = INSERTED.' + @COL_NAME + ' FROM ' + '#INSERTED INSERTED';

(SELECT @USER = CONTEXT_INFO   
FROM SYS.DM_EXEC_SESSIONS
WHERE SESSION_ID = @@SPID)

SELECT @USER = ID_USER FROM USER_UPDATE;
PRINT @USER;
EXEC SP_EXECUTESQL @OLD_QUERY, N'@OLD NVARCHAR(20) OUT', @OLD OUT
EXEC SP_EXECUTESQL @NEW_QUERY, N'@NEW NVARCHAR(20) OUT', @NEW OUT

PRINT @OLD;
PRINT @NEW;

INSERT INTO LOGGER(OLD, NEW, COLUMN_NAME, TABLE_NAME, DATE_OF_UPDATE, USER_ID) VALUES(@OLD, @NEW, @COL_NAME, 'SALARY_RATES', GETDATE(), @USER);
END 
  END

FETCH NEXT FROM COLUMN_CURSOR INTO @COL_NAME

END

DROP TABLE #DELETED 
DROP TABLE #INSERTED
DROP TABLE USER_UPDATE

CLOSE COLUMN_CURSOR
DEALLOCATE COLUMN_CURSOR

END;
GO


