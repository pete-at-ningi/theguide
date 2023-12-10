export default [
  {
    title: 'Personal Information',
    sub: 'Basic information about this client.',
    data: [
      [
        {
          key: 'title',
          label: 'Title',
          type: 'select',
          options: ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr'],
        },
      ],
      [
        { key: 'first_name', label: 'First Name', type: 'text' },
        { key: 'middle_name', label: 'Middle Name', type: 'text' },
      ],
      [{ key: 'last_name', label: 'Last Name', type: 'text' }],

      [{ key: 'email', label: 'Email', type: 'email' }],
    ],
  },
  {
    title: 'Address Details',
    sub: 'Client address records and history.',
    data: [
      [
        { key: 'first_name', label: 'First Name', type: 'text' },
        { key: 'middle_name', label: 'Middle Name', type: 'text' },
      ],
      [{ key: 'last_name', label: 'Last Name', type: 'text' }],
      [{ key: 'email', label: 'Email', type: 'email' }],
    ],
  },
];
