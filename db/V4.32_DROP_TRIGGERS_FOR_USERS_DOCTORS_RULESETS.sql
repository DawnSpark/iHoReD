IF EXISTS (SELECT * FROM sys.objects WHERE [name] = N'LOGG_DOCTORS' AND [type] = 'TR')
BEGIN
      DROP TRIGGER LOGG_DOCTORS
END;

IF EXISTS (SELECT * FROM sys.objects WHERE [name] = N'LOGG_USERS' AND [type] = 'TR')
BEGIN
      DROP TRIGGER LOGG_DOCTORS
END;

IF EXISTS (SELECT * FROM sys.objects WHERE [name] = N'LOGG_RULESETS' AND [type] = 'TR')
BEGIN
      DROP TRIGGER LOGG_DOCTORS
END;