USE INVENTORY_UTT;

DROP VIEW IF EXISTS VW_ASSET_GROUP;
CREATE VIEW VW_ASSET_GROUP AS
SELECT
    M.ASSET_CODE CHILD_CODE,
    M.VALUE CHILD_VALUE,
    M.KEY1 CHILD_GROUP,
    M.KEY2 CHILD_SGROUP,
    M.KEY3 CHILD_AGROUP,
    M.DESC1 CHILD_DESC,
    M.BIN DATA,
    B.ASSET_CODE PARENT_CODE,
    B.VALUE PARENT_VALUE,
    B.KEY1 PARENT_GROUP,
    B.KEY2 PARENT_SGROUP,
    B.KEY3 PARENT_AGROUP,
    B.DESC1 PARENT_DESC,
    M.STATUS,
    M.CREATED_ON,
    M.CREATED_BY,
    M.UPDATED_ON,
    M.UPDATED_BY
FROM
    ASSET B RIGHT JOIN ASSET M ON M.KEY2 = B.ASSET_CODE;
SELECT * FROM VW_ASSET_GROUP;

DROP VIEW IF EXISTS VW_USER;
CREATE VIEW VW_USER AS
SELECT
    U.USERNAME,
    U.NAME, U.LASTNAME,
    U.GROUP_CODE,
    G.VALUE GROUP_VALUE,
    G.KEY1 USER_GROUP, G.KEY2 USER_SGROUP,
    G.KEY3 USER_AGROUP, G.DESC1 GROUP_DESC,
    UC.KEY1, UC.KEY2,
    UC.EMAIL1, UC.EMAIL2,
    UC.PHONE1, UC.PHONE2,
    UC.ADDRESS, U.STATUS,
    U.CREATED_ON, U.CREATED_BY,
    U.UPDATED_ON, U.UPDATED_BY
FROM
    USER U  JOIN ASSET G ON U.GROUP_CODE = G.ASSET_CODE
            LEFT JOIN USER_CONTACT UC ON U.USERNAME = UC.USERNAME;
SELECT * FROM VW_USER;

DROP VIEW IF EXISTS VW_INVENTORY;
CREATE VIEW VW_INVENTORY AS
SELECT
    I.INVENTORY_ID, I.CUSTOM_ID,
    I.DESCRIPTION, I.NAME,
    I.ACQUISITION_DT, I.SERIAL,
    I.CONDITION_USE, I.STATUS,
    I.CREATED_ON, I.CREATED_BY,
    I.UPDATED_ON, I.UPDATED_BY,
    I.LOCATION_CODE,
    A.VALUE LOCATION_VALUE,
    A.KEY1 LOCATION_GROUP, A.KEY1 LOCATION_SGROUP,
    A.KEY3 LOCATION_AGROUP, A.DESC1 LOCATION_DESCRIPTION,
    I.MODEL_CODE, AG.CHILD_VALUE MODEL_VALUE,
    AG.CHILD_GROUP MODEL_GROUP, AG.CHILD_AGROUP MODEL_ALTERNATIVE,
    AG.CHILD_DESC MODEL_DESC, AG.PARENT_CODE BRAND_CODE,
    AG.PARENT_VALUE BRAND_VALUE, AG.PARENT_GROUP BRAND_GROUP,
    AG.PARENT_SGROUP BRAND_SUB_GROUP, AG.PARENT_AGROUP BRAND_ALTERNATIVE,
    AG.PARENT_DESC BRAND_DESCRIPTION
FROM
    INVENTORY I LEFT JOIN VW_ASSET_GROUP AG ON I.MODEL_CODE = AG.CHILD_CODE
    LEFT JOIN ASSET A ON I.LOCATION_CODE = A.ASSET_CODE;
SELECT * FROM VW_INVENTORY;

DROP VIEW IF EXISTS VW_LOAN;
CREATE VIEW VW_LOAN AS
SELECT
    L.LOAN_ID, L.COMMENTS,
    L.LOAN_DT, L.RETURN_DT,
    L.LOAN_MODE, L.LOAN_STATUS,
    L.RESPONSIBLE, L.RESPONSIBLE_KEY,
    L.RESPONSIBLE_CONTACT1, L.RESPONSIBLE_CONTACT2,
    LM.LM_CODE, LM.DURATION_UNIT, LM.DURATION,
    LL.DESCRIPTION, LL.LOCATION_CODE,
    A.VALUE LOCATION_VALUE, A.KEY1 LOCATION_GROUP,
    A.KEY2 LOCATION_SGROUP, A.KEY3 LOCATION_AGROUP,
    A.DESC1 LOCATION_DESCRIPTION,
    L.STATUS, L.CREATED_ON, L.CREATED_BY,
    L.UPDATED_ON, L.UPDATED_BY
FROM
    LOAN L JOIN LOAN_MODE LM ON L.LOAN_MODE = LM.LM_CODE
    LEFT JOIN LOAN_LOCATION LL ON L.LOAN_ID = LL.LOAN_ID
    LEFT JOIN ASSET A on LL.LOCATION_CODE = A.ASSET_CODE;
SELECT * FROM VW_LOAN;

DROP VIEW IF EXISTS VW_LOAN_DTL;
CREATE VIEW VW_LOAN_DTL AS
SELECT
    LD.LOAN_DTL_ID, LD.DESCRIPTION LOAN_DTL_DESC,
    LD.LOAN_STATUS LOAN_DTL_STS, LD.LOAN_ID,
    VL.COMMENTS, VL.LOAN_DT,
    VL.RETURN_DT, VL.LOAN_MODE,
    VL.LOAN_STATUS LOAN_STS, VL.LM_CODE,
    VL.DURATION_UNIT, VL.DURATION, VL.DESCRIPTION LOAN_DESC,
    VL.LOCATION_CODE, VL.LOCATION_VALUE,
    VL.LOCATION_GROUP, VL.LOCATION_SGROUP,
    VL.LOCATION_AGROUP, VL.LOCATION_DESCRIPTION,
    VL.RESPONSIBLE, VL.RESPONSIBLE_KEY,
    VL.RESPONSIBLE_CONTACT1, VL.RESPONSIBLE_CONTACT2,
    LD.INVENTORY_ID, VI.CUSTOM_ID, VI.DESCRIPTION,
    VI.NAME, VI.ACQUISITION_DT, VI.SERIAL,
    VI.LOCATION_CODE INVENTORY_LOCATION, VI.CONDITION_USE, VI.MODEL_CODE,
    VI.MODEL_VALUE, VI.MODEL_GROUP,
    VI.MODEL_ALTERNATIVE, VI.MODEL_DESC,
    VI.BRAND_CODE, VI.BRAND_VALUE, VI.BRAND_GROUP,
    VI.BRAND_SUB_GROUP, VI.BRAND_ALTERNATIVE, VI.BRAND_DESCRIPTION,
    LD.STATUS, LD.CREATED_ON, LD.CREATED_BY,
    LD.UPDATED_ON, LD.UPDATED_BY
FROM
    LOAN_DTL LD JOIN VW_LOAN VL ON LD.LOAN_ID = VL.LOAN_ID
    JOIN VW_INVENTORY VI ON VI.INVENTORY_ID = LD.INVENTORY_ID;
SELECT * FROM VW_LOAN_DTL;