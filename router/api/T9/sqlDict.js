const addMaterial = "insert into comMaterialGroup ( MaterialId,MaterialName,MaterialCategoryId,HasComboProd,UnitId,X_Supplier,X_MatVersion,MaterialSpec) values ( ${MaterialId}, ${MaterialName}, ${MaterialCategoryId}, ${HasComboProd}, ${UnitId}, ${X_Supplier}, ${X_MatVersion}, ${MaterialSpec})"

const getProductsSelector = "select MaterialSpec as value,MaterialSpec+','+MaterialName AS 'option',MaterialId as token from comMaterialGroup"

const getMaterial = "select MaterialId,MaterialName from comMaterialGroup"

module.exports = {
    addMaterial: addMaterial,
    getProductsSelector: getProductsSelector,
    getMaterial: getMaterial
}