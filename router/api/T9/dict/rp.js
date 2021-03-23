/*
 * @Author: your name
 * @Date: 2021-03-02 09:41:19
 * @LastEditTime: 2021-03-23 12:39:20
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
        ContactAddress: 'address',
        BizPartnerName: 'customerName',
        ShortName: 'customerShortName',
        WorkTelNo: 'workPhone',
        FaxNo: 'fax',
        Postalcode: 'zipCode',
        LinkMan: 'contact',
        TelNo: 'mobilePhone',
    },
    person: {
        PersonId: 'staffId',
        PersonName: 'staffName',
        CU_MailingAddress: 'address',
        Phone: 'mobilePhone',
        HomePhone: 'homePhone',
        EducationName: 'education',
        Sex: 'sex'
    }
}