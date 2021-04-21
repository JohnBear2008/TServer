/*
 * @Author: your name
 * @Date: 2021-03-02 09:41:19
 * @LastEditTime: 2021-04-21 15:19:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\dict\rp.js
 */
module.exports = {
    material: {
        CU_OldMaterialId: 'productId',
        MaterialName: 'productName',
        MaterialSpec: 'productDescription',
        MaterialCategoryName: 'systemClass',
        UnitName: 'unit'
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
        isInland:'isInland'
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
    }
}