export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
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
           
            
            
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Clinic
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            },
            
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Specialty
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            },
            
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //handbook
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            },
            
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];

export const doctorMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            }
        ]
            
    },
    
];