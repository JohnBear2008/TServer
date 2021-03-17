/*
 * @Author: your name
 * @Date: 2021-01-29 15:32:56
 * @LastEditTime: 2021-03-17 13:51:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\sqlDict.js
 */
const addMaterial = "insert into comMaterialGroup ( MaterialId,MaterialName,MaterialCategoryId,HasComboProd,UnitId,X_Supplier,X_MatVersion,MaterialSpec) values ( ${MaterialId}, ${MaterialName}, ${MaterialCategoryId}, ${HasComboProd}, ${UnitId}, ${X_Supplier}, ${X_MatVersion}, ${MaterialSpec})"

const getProductsSelector = "select MaterialSpec as value,MaterialSpec+','+MaterialName AS 'option',MaterialId as token from comMaterialGroup"

const getMaterial = "select * from ( select ta.MaterialId,ta.MaterialName,ta.MaterialSpec,ta.CU_OldMaterialId,tb.MaterialCategoryName,tc.UnitName from comMaterialGroup ta ,comMaterialCategory tb,comUnit tc where ta.MaterialCategoryId=tb.MaterialCategoryId and ta.UnitId=tc.UnitId ) TA"

module.exports = {
    addMaterial: addMaterial,
    getProductsSelector: getProductsSelector,
    getMaterial: getMaterial
}