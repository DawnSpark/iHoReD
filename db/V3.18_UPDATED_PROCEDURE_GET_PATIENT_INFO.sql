BEGIN TRANSACTION;
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_PATIENT_INFO')
BEGIN
	DROP PROC GET_PATIENT_INFO
END
GO
CREATE PROCEDURE GET_PATIENT_INFO
@ID_USER int
AS
BEGIN
SELECT FIRSTNAME, LASTNAME, BIRTHDAY, PHONE, BLOOD_TYPES.BLOOD_TYPE 
FROM ((USERS INNER JOIN USER_INFO ON USERS.IDUsers=USER_INFO.ID)INNER JOIN BLOOD_TYPES ON USER_INFO.BLOOD_TYPE=BLOOD_TYPES.ID)
	WHERE IDUsers=@ID_USER
END;
COMMIT;

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GET_PATIENT_INFO')
BEGIN
	DROP PROC GET_PATIENT_INFO
END
GO
CREATE PROCEDURE GET_PATIENT_INFO
@ID_USER int
AS
BEGIN
SELECT FIRSTNAME, LASTNAME, BIRTHDAY, PHONE, BLOOD_TYPES.BLOOD_TYPE 
FROM ((USERS INNER JOIN USER_INFO ON USERS.IDUsers=USER_INFO.ID)INNER JOIN BLOOD_TYPES ON USER_INFO.BLOOD_TYPE=BLOOD_TYPES.ID)
	WHERE IDUsers=@ID_USER
END;