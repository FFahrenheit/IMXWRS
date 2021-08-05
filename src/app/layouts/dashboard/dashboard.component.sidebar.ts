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
        name: "Remarked waivers",
        route: ['waivers', 'remarked']
    }
];

export const adminSidebar = [
    {
        name: "Waivers log",
        route: ['waivers', 'all']
    },
    {
        name: "Pending authorizations",
        route: ['authorizations', 'pending']
    },
    {
        name: "My approved WR",
        route: ['authorizations', 'approved']
    },
    {
        name: "Overall performance",
        route: ['performance', 'dashboard']
    },
    {
        name: "Individual performance",
        route: ['performance', 'users']
    }
];