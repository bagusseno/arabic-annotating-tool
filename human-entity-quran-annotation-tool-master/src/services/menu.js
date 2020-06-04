export default async function getMenuData() {
  return [
    {
      title: 'Projects',
      key: 'projects',
      icon: 'lnr lnr-pencil',
      children: [
        {
          title: 'Create New Projects',
          key: 'Create',
          url: '/projects/create',
        },
        {
          title: 'Open Recent Projects',
          key: 'Recent',
          url: '/projects/recent',
        },
        // {
        //   title: 'Edit Projects',
        //   key: 'Edit',
        //   url: '/projects/edit',
        // },
        {
          title: 'Edit Projects',
          key: 'CardsBasicCards',
          url: '/cards/basic-cards',
        },
      ],
    },
    // {
    //   key: 'Method',
    //   url: '/projects/create/method',
    // },
  ]
}
