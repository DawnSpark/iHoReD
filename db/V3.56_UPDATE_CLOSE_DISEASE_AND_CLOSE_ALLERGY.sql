IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='CLOSE_DISEASE')
BEGIN
	DROP PROC CLOSE_DISEASE
END
GO
CREATE PROCEDURE CLOSE_DISEASE
@ID_USER INT,@ID_DISEASE INT,@START_VISIT_TIME DATETIME
    AS
    BEGIN
      IF EXISTS(SELECT * FROM PATIENT_DISEASES INNER JOIN SCHEDULE
      ON SCHEDULE.ID=PATIENT_DISEASES.ID_VISIT
      WHERE IDPATIENT=@ID_USER AND ID_DISEASE=@ID_DISEASE AND PATIENT_DISEASES.END_DATETIME IS NOT NULL)
      RETURN 0;
      ELSE 
	BEGIN
			BEGIN TRANSACTION;
			UPDATE PATIENT_DISEASES
			SET END_DATETIME=(SELECT SCHEDULE.ID FROM SCHEDULE WHERE START_DATETIME=@START_VISIT_TIME AND IDPATIENT=@ID_USER)
			WHERE ID_DISEASE=@ID_DISEASE AND ID_VISIT=(SELECT SCHEDULE.ID FROM SCHEDULE JOIN PATIENT_DISEASES ON SCHEDULE.ID=PATIENT_DISEASES.ID_VISIT
			WHERE IDPATIENT=@ID_USER AND ID_DISEASE=@ID_DISEASE);
			COMMIT TRANSACTION;
			RETURN 1;
	END;
	END
        GO
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='CLOSE_ALLERGY')
BEGIN
	DROP PROC CLOSE_ALLERGY
END
GO
CREATE PROCEDURE CLOSE_ALLERGY
@ID_USER INT,@ID_ALLERGY INT,@START_VISIT_TIME DATETIME
AS
BEGIN
    IF EXISTS(SELECT * FROM USERS_ALLERGIES INNER JOIN SCHEDULE
    ON SCHEDULE.ID=USERS_ALLERGIES.ID_VISIT
    WHERE IDPATIENT=@ID_USER AND ALLERGY_ID=@ID_ALLERGY AND USERS_ALLERGIES.END_DATETIME IS NOT NULL)
    RETURN 0;
    ELSE 
 BEGIN
    BEGIN TRANSACTION;
    UPDATE USERS_ALLERGIES 
    SET END_DATETIME=(SELECT SCHEDULE.ID FROM SCHEDULE WHERE START_DATETIME=@START_VISIT_TIME AND IDPATIENT=@ID_USER)
    WHERE ALLERGY_ID=@ID_ALLERGY AND ID_VISIT=(SELECT SCHEDULE.ID FROM SCHEDULE JOIN USERS_ALLERGIES ON SCHEDULE.ID=USERS_ALLERGIES.ID_VISIT
    WHERE IDPATIENT=@ID_USER AND ALLERGY_ID=@ID_ALLERGY);
		COMMIT TRANSACTION;
		RETURN 1;
	END;
	END;

	
