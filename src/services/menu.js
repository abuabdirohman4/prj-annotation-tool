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
          title: '',
          key: 'Edit',
          url: '/edit',
        },
        {
          title: 'Open Recent Projects',
          key: 'Recent',
          url: '/recent',
        },
      ],
    },
  ]
}
