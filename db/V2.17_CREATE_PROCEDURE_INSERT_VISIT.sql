IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'INSERT_VISIT')
	DROP PROC INSERT_VISIT

GO
CREATE PROCEDURE INSERT_VISIT
    @IDDOCTOR INT, @IDPATIENT INT, @DAY DATE, @HOUR TIME(0)
AS
BEGIN
	INSERT INTO VISITS (IDDOCTOR, IDPATIENT, DAY, HOUR) VALUES(@IDDOCTOR, @IDPATIENT, @DAY, @HOUR);
END;