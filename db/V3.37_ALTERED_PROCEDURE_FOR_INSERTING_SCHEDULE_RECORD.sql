IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'INSERT_SCHEDULE_RECORD')
	DROP PROC INSERT_SCHEDULE_RECORD

GO
CREATE PROCEDURE INSERT_SCHEDULE_RECORD
    @IDDOCTOR INT, @IDPATIENT INT, @START_DATETIME DATETIME, @END_DATETIME DATETIME
AS
BEGIN
	IF (SELECT COUNT(*) FROM SCHEDULE WHERE @IDDOCTOR=IDDOCTOR AND @START_DATETIME=START_DATETIME) > 0 RETURN -1
	IF @START_DATETIME <= GETDATE() RETURN 0
	IF @IDDOCTOR = @IDPATIENT RETURN -2
	IF @START_DATETIME > @END_DATETIME RETURN -3

	INSERT INTO SCHEDULE (IDDOCTOR, IDPATIENT, START_DATETIME, END_DATETIME) VALUES(@IDDOCTOR, @IDPATIENT, @START_DATETIME, @END_DATETIME);
	RETURN 1
END;
