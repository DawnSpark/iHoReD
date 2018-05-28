IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='ADD_DISEASE')
BEGIN
	DROP PROC ADD_DISEASE
END
GO
CREATE PROCEDURE ADD_DISEASE
@ID_USER INT,@DATE_VISIT DATETIME,@ID_DISEASE INT
AS
BEGIN
 IF EXISTS(SELECT * FROM PATIENT_DISEASES INNER JOIN SCHEDULE
       ON   SCHEDULE.ID=PATIENT_DISEASES.ID_VISIT
       WHERE IDPATIENT=@ID_USER AND ID_DISEASE=@ID_DISEASE AND PATIENT_DISEASES.END_DATETIME IS NULL)
       RETURN 0;
       ELSE 
	BEGIN
BEGIN TRANSACTION;
       INSERT INTO PATIENT_DISEASES(ID_VISIT,ID_DISEASE)
       SELECT ID, @ID_DISEASE
       FROM SCHEDULE
       WHERE START_DATETIME=@DATE_VISIT AND IDPATIENT=@ID_USER;
COMMIT TRANSACTION;
RETURN 1;
END;
END;

------------------------------------------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='ADD_ALLERGY')
BEGIN
	    DROP PROC ADD_ALLERGY
END
GO
CREATE PROCEDURE ADD_ALLERGY
@ID_USER INT,@DATE_VISIT DATETIME,@ID_ALLERGY INT
AS
BEGIN
 IF EXISTS(SELECT * FROM USERS_ALLERGIES INNER JOIN SCHEDULE
     ON SCHEDULE.ID=USERS_ALLERGIES.ID_VISIT
     WHERE IDPATIENT=@ID_USER AND ALLERGY_ID=@ID_ALLERGY AND USERS_ALLERGIES.END_DATETIME IS NULL)
     RETURN 0;
     ELSE 
	BEGIN
  BEGIN TRANSACTION;
     INSERT INTO USERS_ALLERGIES(ID_VISIT,ALLERGY_ID)
     SELECT ID, @ID_ALLERGY
     FROM SCHEDULE
     WHERE START_DATETIME=@DATE_VISIT AND IDPATIENT=@ID_USER;
COMMIT TRANSACTION;
RETURN 1;
END;
END;
