IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name ='ADD_DESCRIPTION')
BEGIN
	DROP PROC ADD_DESCRIPTION
END
GO
CREATE PROCEDURE ADD_DESCRIPTION
@ID_USER INT,@DESCRIPTION NVARCHAR(1000),@CURE NVARCHAR(500),@DATE_VISIT DATETIME
AS
BEGIN
   IF EXISTS(SELECT * FROM MEDICAL_CARD INNER JOIN SCHEDULE
    ON SCHEDULE.ID=MEDICAL_CARD.ID_VISIT
    WHERE IDPATIENT=@ID_USER AND START_DATETIME=@DATE_VISIT AND DESCRIPTION IS NOT NULL)
    RETURN 0;
    ELSE 
	BEGIN
BEGIN TRANSACTION;
    UPDATE MEDICAL_CARD
    SET DESCRIPTION=@DESCRIPTION,
    CURE=@CURE
    WHERE  ID_VISIT=(SELECT ID FROM SCHEDULE WHERE IDPATIENT=@ID_USER AND START_DATETIME=@DATE_VISIT);
    COMMIT TRANSACTION;
    RETURN 1;
END;
END;
