IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_WORKED_HOURS')
	DROP PROC GET_WORKED_HOURS
GO
CREATE PROCEDURE GET_WORKED_HOURS
	@DOCTOR_ID INT,
	@DATE DATETIME,
	@WORKED_HOURS DECIMAL (4,2) OUTPUT
AS
BEGIN
	SET @WORKED_HOURS = (SELECT COALESCE(SUM(VISIT_TIME)/60., 0) FROM (SELECT (DATEDIFF(MINUTE, START_DATETIME, END_DATETIME)) AS VISIT_TIME FROM SCHEDULE 
	WHERE DAY(START_DATETIME) = DAY(@DATE) AND IDDOCTOR = @DOCTOR_ID) TOTAL_TIME)
END;
-----------------------------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_SALARY_RATE')
	DROP PROC GET_SALARY_RATE
GO
CREATE PROCEDURE GET_SALARY_RATE
	@DOCTOR_ID INT,
	@DATE DATETIME,
	@RATE DECIMAL (8,2) OUTPUT
AS
BEGIN
	SET @RATE = (SELECT TOP 1 RATE FROM SALARY_RATES INNER JOIN DOCTORS ON SALARY_RATES.PROFFESION_ID=DOCTORS.IDPROFESSION
	WHERE PERIOD_START <= @DATE AND DOCTORS.IDDoctors = @DOCTOR_ID)
END;
------------------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_SALARY_COEFFICIENT')
	DROP PROC GET_SALARY_COEFFICIENT
GO
CREATE PROCEDURE GET_SALARY_COEFFICIENT
	@DOCTOR_ID INT,
	@DATE DATETIME,
	@COEFFICIENT DECIMAL (4,2) OUTPUT
AS
BEGIN
	SET @COEFFICIENT = (SELECT TOP 1 COEFFICIENT FROM SALARY_COEFFICIENTS INNER JOIN DOCTORS ON SALARY_COEFFICIENTS.DOCTOR_ID=DOCTORS.IDDoctors
	WHERE PERIOD_START <= @DATE AND DOCTORS.IDDoctors = @DOCTOR_ID
	ORDER BY PERIOD_START DESC)
END;
-------------------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_SALARY_STATISTICS_FOR_DAY')
	DROP PROC GET_SALARY_STATISTICS_FOR_DAY
GO
CREATE PROCEDURE GET_SALARY_STATISTICS_FOR_DAY
	@DOCTOR_ID INT,
	@DATE DATETIME
AS
BEGIN

	DECLARE @WORKED_HOURS DECIMAL (4,2)
	EXEC GET_WORKED_HOURS @DOCTOR_ID, @DATE, @WORKED_HOURS OUTPUT

	DECLARE @RATE DECIMAL (8,2)
	EXEC  GET_SALARY_RATE @DOCTOR_ID, @DATE, @RATE OUTPUT

	DECLARE @COEFFICIENTS DECIMAL (4,2)
	EXEC GET_SALARY_COEFFICIENT @DOCTOR_ID, @DATE, @COEFFICIENTS OUTPUT;

	SELECT @DATE, @WORKED_HOURS, @RATE, @COEFFICIENTS, @WORKED_HOURS * @RATE * @COEFFICIENTS
END;
