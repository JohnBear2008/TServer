/*
 * @Author: your name
 * @Date: 2021-01-29 15:32:56
 * @LastEditTime: 2021-03-23 12:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\sqlDict.js
 */
const addMaterial = "insert into comMaterialGroup ( MaterialId,MaterialName,MaterialCategoryId,HasComboProd,UnitId,X_Supplier,X_MatVersion,MaterialSpec) values ( ${MaterialId}, ${MaterialName}, ${MaterialCategoryId}, ${HasComboProd}, ${UnitId}, ${X_Supplier}, ${X_MatVersion}, ${MaterialSpec})"

const getProductsSelector = "select MaterialSpec as value,MaterialSpec+','+MaterialName AS 'option',MaterialId as token from comMaterialGroup"

const getMaterial = "select * from ( select ta.MaterialId as UID,ta.MaterialId,ta.MaterialName,ta.MaterialSpec,ta.CU_OldMaterialId,tb.MaterialCategoryName,tc.UnitName from comMaterialGroup ta ,comMaterialCategory tb,comUnit tc where ta.MaterialUsedStateId='ACTIVE' and MaterialTypeId='T0001' and ta.MaterialCategoryId=tb.MaterialCategoryId and ta.UnitId=tc.UnitId ) TA"

const getCustomer = "select * from ( SELECT DISTINCT  ta.BizPartnerId as UID,ta.BizPartnerId,case ta.CU_GNGW  WHEN 0 then '国内' WHEN 12 then '国外' end as isInland ,tb.BizPartnerName,tb.ShortName,tb.ContactAddress,tb.WorkTelNo,tb.FaxNo,tb.Postalcode,tc.LinkMan,tc.TelNo from comCustomer ta,comBusinessPartner tb,comCustomerAddr tc WHERE ta.BizPartnerId=tb.BizPartnerId AND ta.BizPartnerId=tc.BizPartnerId  ) TA"

const getPerson = "select * from ( SELECT ta.PersonId AS UID,ta.PersonId,ta.PersonName,case ta.Sex  WHEN 0 then '男' WHEN 1 then '女' end as Sex ,ta.Birthday,ta.Phone,ta.HomePhone,ta.OrigHomeplace,ta.CU_MailingAddress,td.EducationName,tc.DeptName FROM comGroupPerson ta,comPerson tb,comDepartment tc,hrmEducation td WHERE ta.PersonId=tb.PersonId AND tb.DeptId=tc.DeptId AND ta.HighestEduId=td.EducationId and tc.DeptName not in ('董事长室') ) TA"

module.exports = {
    addMaterial: addMaterial,
    getProductsSelector: getProductsSelector,
    getMaterial: getMaterial,
    getCustomer: getCustomer,
    getPerson: getPerson
}