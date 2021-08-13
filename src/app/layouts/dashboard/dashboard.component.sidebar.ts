export const userSidebar = [
    {
        name: "Waivers log",
        route: ['waivers', 'all']
    },
    {
        name: "New WR",
        route: ['create', 'new'],
    },
    {
        name: "My activities",
        route: ['tasks', 'assigned']
    },
    // {
    //     name: "My activities",
    //     route: ['tasks', 'pending']
    // },
    {
        name: "My waiver requests",
        route: ['waivers', 'status']
    },
    {
        name: "Rejected waivers",
        route: ['waivers', 'remarked']
    }
];

export const adminSidebar = [
    {
        name: "Waivers log",
        route: ['waivers', 'all']
    },
    {
        name: "Pending acknowledgments",
        route: ['authorizations', 'pending']
    },
    {
        name: "Recent acknowledgments",
        route: ['authorizations', 'approved']
    },
    {
        name: "Overall performance",
        route: ['stats', 'overall']
    },
    {
        name: "Individual performance",
        route: ['stats', 'individual']
    }
];