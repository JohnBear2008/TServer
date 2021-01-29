const addMaterial = "insert into comMaterialGroup ( MaterialId,MaterialName,MaterialCategoryId,HasComboProd,UnitId,X_Supplier,X_MatVersion,MaterialSpec) values (?,?,?,?,?,?,?,?)"

module.exports = {
    addMaterial: addMaterial
}