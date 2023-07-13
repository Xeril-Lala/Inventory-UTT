USE INVENTORY_UTT;

SET @MSG = NULL;
SET @USER_G = 'USER_GROUP';
SET @APP_G = 'APP_GROUP';

-- * Inserting User Groups

CALL SET_ASSET(
    'DEV', 'DEVELOPMENT', 'USER_GROUP',
    NULL, NULL,
    'Developers, Development & Testing',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'ADMIN', 'ADMINISTRATOR', 'USER_GROUP',
    NULL, NULL,
    'Master Administrators & Super Users',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'LAB_ADMIN', 'LABORATORY', 'USER_GROUP',
    NULL, NULL,
    'Laboratory ',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'LAB_ADMIN', 'LABORATORY', 'USER_GROUP',
    NULL, NULL,
    'Laboratory Users',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'PROF', 'PROFESSOR', 'USER_GROUP',
    NULL, NULL,
    'Professors & Others',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'STU', 'STUDENT', 'USER_GROUP',
    NULL, NULL,
    'Just Students',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'USER', 'USER', 'USER_GROUP',
    NULL, NULL,
    'Common Users',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

-- * Inserting Application Groups

CALL SET_ASSET(
    'APP', 'APPLICATION', 'APP_GROUP',
    NULL, NULL,
    'Application & Service',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'DBA', 'DATABASE', 'APP_GROUP',
    NULL, NULL,
    'DATABASE & DBAs',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

CALL SET_ASSET(
    'WEB', 'WEB_APP', 'APP_GROUP',
    NULL, NULL,
    'Web Application & Web Utilities',
    NULL, NULL, NULL,
    'DBA', TRUE, @MSG
);

-- * Inserting Users

CALL SET_USER(
	'DEV',
	'Development',
    'User',
    SHA2('DEV_PASSWORD', 256),
    'DEV',
	'DBA',
    TRUE,
    @MSG
);

CALL SET_USER(
	'API',
	'C#/API',
    'Credentials for API',
    SHA2('API_PASSWORD', 256),
    'WEB',
	'DBA',
    TRUE,
    @MSG
);

CALL SET_USER(
	'DBA',
	'Data Base',
    'Administrator',
    SHA2('8udw153r_', 256),
    'DBA',
	'DBA',
    TRUE,
    @MSG
);

CALL SET_USER(
	'REACT_APP',
	'UTT',
    'INVENTORY',
    SHA2('REACT_PASSWORD', 256),
    'WEB',
	'DBA',
    TRUE,
    @MSG
);

CALL SET_USER(
	'MASTER.USER',
	'MASTER',
    'USER',
    SHA2('8udw153r_@123', 256),
    'ADMIN',
	'DBA',
    TRUE,
    @MSG
);

-- * Inserting Loan Modes

CALL SET_LOAN_MODE(
    'RESGUARDO',
    'YYYY',
    1,
    'DBA',
    TRUE,
    @MSG
);

CALL SET_LOAN_MODE(
    'PRESTAMO',
    NULL,
    NULL,
    'DBA',
    TRUE,
    @MSG
);

CALL SET_LOAN_MODE(
    'MOBILIARIO',
    'YYYY',
    1,
    'DBA',
    TRUE,
    @MSG
);