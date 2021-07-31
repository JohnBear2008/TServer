module.exports = {
    material: {
        UID: 'UID',
        CU_OldMaterialId: 'productId',
        MaterialName: 'productName',
        MaterialSpec: 'productDescription',
        MaterialCategoryName: 'systemClass',
        UnitName: 'unit',
    },
    customer: {
        UID: 'UID',
        ContactAddress: 'address',
        BizPartnerName: 'customerName',
        ShortName: 'customerShortName',
        WorkTelNo: 'workPhone',
        FaxNo: 'fax',
        Postalcode: 'zipCode',
        LinkMan: 'contact',
        TelNo: 'mobilePhone',
        isInland: 'isInland'
    },
    person: {
        PersonId: 'staffId',
        PersonName: 'staffName',
        CU_MailingAddress: 'address',
        Phone: 'mobilePhone',
        HomePhone: 'homePhone',
        EducationName: 'education',
        Sex: 'sex',
        IDNo: 'identity',
        InductionDate: 'entryDate',
        Birthday: 'birthday',
        EducationName: 'education'
    },
    bom: {},
    installInfo: {
        productId: 'productId',
        partId: 'partId',
        Describe: 'locations',
        UnitQty: 'num',
        Remark: 'remark'
    },
    storeIn: {
        BillNo: "billId",
        RowNo: "rowId",
        CU_OldMaterialId: "productId",
        CU_OldMaterialSpec: "productName",
        MaterialId: "UID",
        Quantity: "num",
        Remark: "remark",
        WarehouseId: "warehouseId",
        WarehouseName: "warehouseName"
    },
    storeOut: {
        BillNo: "billId",
        RowNo: "rowId",
        CU_OldMaterialId: "productId",
        CU_OldMaterialSpec: "productName",
        MaterialId: "UID",
        Quantity: "num",
        Remark: "remark",
        WarehouseId: "warehouseId",
        WarehouseName: "warehouseName"
    },
    stock: {
        MaterialId: "UID",
        MaterialId: 'productId',
        Quantity: "num",
        WarehouseName: "warehouseName"
    }
}