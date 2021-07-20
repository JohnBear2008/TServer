/*
 * @Author: your name
 * @Date: 2021-01-29 15:32:56
 * @LastEditTime: 2021-05-25 14:09:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\sqlDict.js
 */
const addMaterial = "insert into comMaterialGroup ( MaterialId,MaterialName,MaterialCategoryId,HasComboProd,UnitId,X_Supplier,X_MatVersion,MaterialSpec) values ( ${MaterialId}, ${MaterialName}, ${MaterialCategoryId}, ${HasComboProd}, ${UnitId}, ${X_Supplier}, ${X_MatVersion}, ${MaterialSpec})"

const getProductsSelector = "select MaterialSpec as value,MaterialSpec+','+MaterialName AS 'option',MaterialId as token from comMaterialGroup"

const getMaterial = "select * from ( select ta.MaterialId as UID,ta.MaterialName,ta.MaterialSpec,ta.CU_OldMaterialId,ta.CU_OldMaterialSpec,ta.MaterialUsedStateId,ta.CreatorId,ta.CreateTime,ta.LastOperatorId,ta.LastOperateTime,tb.MaterialCategoryId,tb.MaterialCategoryName,tc.UnitId,tc.UnitName,td.MaterialUsedStateName from comMaterialGroup ta ,comMaterialCategory tb,comUnit tc,comMaterialUsedState td where ta.MaterialUsedStateId='ACTIVE' and MaterialTypeId='T0001' and ta.MaterialCategoryId=tb.MaterialCategoryId and ta.UnitId=tc.UnitId AND ta.MaterialUsedStateId=td.MaterialUsedStateId ) TA"

const getCustomer = "select * from ( SELECT DISTINCT  ta.BizPartnerId as UID,ta.BizPartnerId,case ta.CU_GNGW  WHEN 0 then '国内' WHEN 12 then '国外' end as isInland ,tb.BizPartnerName,tb.ShortName,tb.ContactAddress,tb.WorkTelNo,tb.FaxNo,tb.Postalcode,tc.LinkMan,tc.TelNo from comCustomer ta left join comBusinessPartner tb  on ta.BizPartnerId=tb.BizPartnerId left join comCustomerAddr tc on ta.BizPartnerId=tc.BizPartnerId  ) TA "

const getPerson = "select * from ( SELECT ta.PersonId AS UID,ta.PersonId,ta.PersonName,case ta.Sex  WHEN 0 then '男' WHEN 1 then '女' end as Sex ,ta.Birthday,ta.Phone,ta.HomePhone,ta.OrigHomeplace,ta.CU_MailingAddress,tb.IDNo,tb.InductionDate,td.EducationName,tc.DeptName FROM comGroupPerson ta,comPerson tb,comDepartment tc,hrmEducation td WHERE  ta.PersonId=tb.PersonId AND tb.DeptId=tc.DeptId AND ta.HighestEduId=td.EducationId AND  tb.ServiceStatus=15 AND  tc.DeptName not in ('董事长室') ) TA"

const getBom = "select * from BOMSubMatInfo"

const getInstallInfo = "SELECT * FROM (SELECT TAA.BOMKeyId,TAA.SubMaterialId,TAA.UnitQty,TAA.Describe,TAA.Remark,TAA.productId,TC.CU_OldMaterialId AS partId  FROM (SELECT TA.BOMKeyId,TA.SubMaterialId,TA.UnitQty,TA.Describe,TA.Remark,TB.CU_OldMaterialId AS productId FROM (SELECT ta.BOMKeyId,ta.SubMaterialId,ta.UnitQty,tb.Describe,tb.Remark FROM BOMSubMatInfo ta LEFT JOIN BOMSubMatInstallInfo tb ON ta.BOMKeyId=tb.BOMKeyId AND ta.RowNo=tb.ParentRowCode) TA LEFT JOIN comMaterialGroup TB ON TA.BOMKeyId=TB.MaterialId ) TAA LEFT JOIN comMaterialGroup TC ON TAA.SubMaterialId =TC.MaterialId ) A WHERE SubMaterialId <> '' AND productId IS NOT null"

const getStoreHistoryRPIn = "SELECT * FROM ( SELECT ta.BillNo,ta.BillDate,ta.IOProperty,ta.ChangeTypeId,ta.WarehouseId,ta.FromBillNo,ta.PersonId,ta.Remark,ta.CurrentState,taa.MaterialId,taa.Quantity,tb.CU_OldMaterialId,tb.CU_OldMaterialSpec,tb.CU_type FROM dbo.stkWareHouseIn AS ta INNER JOIN dbo.stkWareHouseInDetail AS taa ON ta.BillNo = taa.BillNo INNER JOIN dbo.comMaterial AS tb ON taa.MaterialId = tb.MaterialId  WHERE ta.IOProperty=0 and ta.Remark like '%维修耗用%') A"

module.exports = {
    addMaterial: addMaterial,
    getProductsSelector: getProductsSelector,
    getMaterial: getMaterial,
    getCustomer: getCustomer,
    getPerson: getPerson,
    getBom: getBom,
    getInstallInfo: getInstallInfo,
    getStoreHistoryRPIn: getStoreHistoryRPIn
}