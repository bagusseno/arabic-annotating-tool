export default async function getMenuData() {
  return [
    {
      title: 'Projects',
      key: 'dashboards',
      icon: 'lnr lnr-pencil',
      children: [
        {
          title: 'Create New Projects',
          key: 'dashboardAnalytics',
          url: '/dashboard/analytics',
        },
        {
          title: 'Open Recent Projects',
          key: 'tablesAntd',
          url: '/tables/antd',
        },
        {
          title: 'Edit Projects',
          key: 'extraAppsWordpressAdd',
          url: '/extra-apps/wordpress-add',
        },
        {
          title: 'Al Quran',
          key: 'cardsBasicCards',
          url: '/cards/basic-cards',
        },
      ],
    },
  ]
}
