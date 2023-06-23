USE INVENTORY_UTT;

SET @MSG = NULL;

CALL SET_USER(
	'Tonatiuh.Lopez',
	'Tonatiuh',
    'Lopez',
    SHA2('8udw153r_', 256),
	'DEV',
    'DBA',
    TRUE,
    @MSG
);
SELECT @MSG;

CALL SET_USER_CONTACT(
	'Tonatiuh.Lopez',
    '0319125293',
    NULL,
    'ltonatiuh.011@gmail.com',
    'Tonatiuh.Lopez@exelaonline.com',
    '6631226015',
    NULL,
    'Blvd. Bellas Artes, 19842.',
    'DBA',
    TRUE,
    @MSG
);
SELECT @MSG;

CALL SET_ASSET(
    'TEST',
    'ABC',
    'MODEL',
    'BR1',
    NULL,
    'DESCRIPTION - UPDATE',
    NULL,
    NULL,
    NULL,
    'DBA',
    TRUE,
    @MSG
);
CALL SET_ASSET(
    'LOC_A',
    'ABC_LOC',
    'LOCATION',
    NULL,
    NULL,
    'DESCRIPTION - UPDATE',
    NULL,
    NULL,
    NULL,
    'DBA',
    TRUE,
    @MSG
);
SELECT @MSG;

CALL SET_INVENTORY(
    1,
    'ABCXXXX124',
    'DESCRIPTION',
    'INV_2',
    NOW(),
    NULL,-- 'MD1',-- 'TEST',
    'LOC_A',
    'TEST123-xx',
    'CONDITION TEST - UPDATE',
    'DBA',
    TRUE,
    @msg
);
SELECT @msg;

CALL SET_LOAN_MODE(
	'TEST_MODE',
	'hh',
    25,
    'DBA',
    TRUE,
	@msg
);
SELECT @msg;

SET @m_id = null;
CALL SET_LOAN(
    1,
    'COMMENT - UPDATE',
    NULL,
    NOW() + 1,
    'TEST_MODE',
    'STS_TEST',
    'Tonatiuh Lopez',
    'Tonatiuh.User',
    '6631226015',
    'ltonatiuh.011@gmail.com',
    'DBA',
    TRUE,
    @m_id,
    @msg
);
SELECT @msg result, @m_id id;

SET @m_id_dtl = null;
CALL SET_LOAN_DTL(
    null,
    @m_id,
    1,
    'Object 1',
	'LOANED',
    'DBA',
    TRUE,
    @m_id_dtl,
	@msg
);
SELECT @msg, @m_id_dtl DTL_ID;

CALL SET_LOAN_LOCATION(
	@m_id,
    'LOC_A',
    'Ubication for test',
    'DBA',
    true,
    @msg
);
SELECT @msg;

CALL GET_ASSET_GROUP(
	NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    false,
    @msg
);
SELECT @msg;

CALL GET_USER(
	NULL,
    'T',
    TRUE,
    @msg
);

CALL GET_INVENTORY(
	NULL,
    NULL,
    NULL, -- 'TEST',
    NULL,
    NULL,
    NULL,
    NULL,
    false,
    @msg
);

CALL GET_LOAN(
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    FALSE,
    @msg
);

CALL GET_LOAN_DTL(
	NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
	NULL,
	TRUE,
    @msg
);

select * from LOAN_DTL;

SELECT * FROM USER;

SELECT IF(
    AUTH_USER('MASTER.USER', SHA2('DEV_PASSWORD', 256)),
    'OK',
    'NO_AUTH'
);

SELECT
	CONCAT('public const string ', routine_name, ' = "', routine_name, '";') as NAMES
FROM
    information_schema.routines
WHERE
    routine_type = 'PROCEDURE'
AND routine_schema = 'INVENTORY_UTT';

update
	INVENTORY
set
	LOCATION_CODE = null
where
    CUSTOM_ID IN (
		  '10-0464', '10-0465', '10-0466',
		  '10-0467', '10-0468', '10-0469',
		  '10-0470', '10-0471', '13-0592',
		  '14-0009', 'FAM-0245', 'FAM-0246', 'FAM-0247'
	) or INVENTORY_ID = 2;

SELECT * FROM VW_INVENTORY WHERE LOCATION_GROUP <> 'LOCATION';

# SET FOREIGN_KEY_CHECKS = 0;
#
#
#
# SET FOREIGN_KEY_CHECKS = 1;