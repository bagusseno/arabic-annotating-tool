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
          url: '/create',
        },
        {
          title: 'Open Recent Projects',
          key: 'Recent',
          url: '/recent',
        },
        {
          title: 'Edit Projects',
          key: 'Edit',
          url: '/edit',
        },
      ],
    },
  ]
}
