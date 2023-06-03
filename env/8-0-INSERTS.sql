USE INVENTORY_UTT;

SET @MSG = NULL;
SET @USER_G = 'USER_GROUP';
SET @APP_G = 'APP_GROUP';

-- USER GROUP
-- * DEV
-- * ADM
-- * LAB_ADM
-- * PROF
-- * STU
-- * USER

-- APP GROUP
-- * WEB
-- * APP
-- * DBA

CALL SET_ASSET(
    'DEV',
    'DEVELOPER',
    'USER_GROUP',
    NULL,
    NULL,
    'Developers, ',
    NULL,
    NULL,
    NULL,
    NULL,
    TRUE,
    @MSG
);

CALL SET_USER(
	'API',
	'C#/API',
    'Credentials for API',
    '8udw153r_',
	'DBA',
    TRUE,
    @MSG
);