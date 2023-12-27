export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.admin.crud.user-manage-doctor', link: '/system/user-manage-doctor' },
                //     { name: 'menu.admin.crud.user-manage-patient', link: '/system/user-manage-patient' },
                //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    },
    { //Clinic
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
            {
                name: 'menu.admin.list-clinic', link: '/system/list-clinic'
            }
        ]
    },
    { //Specialty
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
            {
                name: 'menu.admin.list-specialty', link: '/system/list-specialty'
            }
        ]
    },
    { //handbook
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
            {
                name: 'menu.admin.list-handbook', link: '/system/list-handbook'
            }
        ]
    },
];

export const doctorMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient',
                // subMenus: [
                //     { name: 'menu.doctor.manage-patient.list-confirm-patient', link: '/doctor/list-confirm-patient' },
                //     // { name: 'menu.admin.crud.user-manage-patient', link: '/system/user-manage-patient' },
                // ]
            },
            {
                name: 'menu.doctor.list-patient-confirm', link: '/doctor/list-patient-confirm'
            },
        ]
            
    },
    
];