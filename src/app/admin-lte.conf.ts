export const adminLteConf = {
  skin: 'green',
  isSidebarLeftCollapsed: true,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  isSidebarLeftMini: false,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal',
  sidebarLeftMenu: [
    { label: 'MAIN NAVIGATION', separator: true },
    { label: 'Dashboard', route: '/home', iconClasses: 'fa fa-road', pullRights: [{ text: 'New', classes: 'label pull-right bg-green' }] },
    {
      label: 'Kunjungan Pasien', iconClasses: 'fa fa-files-o', pullRights: [{ text: '6', classes: 'label pull-right bg-red' }],
      children: [
        { label: 'Rawat Jalan', route: 'home/kunjungan/rawatjalan' },
        { label: 'Rawat Inap', route: 'home/kunjungan/rawatinap' },
        { label: 'IGD', route: 'home/kunjungan/rawatjalan' },
        { label: 'Laboratorium', route: 'home/kunjungan/rawatinap' },
        { label: 'Radiologi', route: 'home/kunjungan/rawatinap' },
        { label: 'Operasi', route: 'home/kunjungan/rawatinap' }

      ]
    },
    {
      label: 'Remunerasi', iconClasses: 'fa fa-money', pullRights: [{ text: '1', classes: 'label pull-right bg-yellow' }],
      children: [
        { label: 'Pagu Remunerasi', route: 'home/kunjungan/rawatjalan' }

      ]
    },
    // {label: 'Layout', iconClasses: 'fa fa-th-list', children: [
    //     {label: 'Configuration', route: 'layout/configuration'},
    //     {label: 'Custom', route: 'layout/custom'},
    //     {label: 'Header', route: 'layout/header'},
    //     {label: 'Sidebar Left', route: 'layout/sidebar-left'},
    //     {label: 'Sidebar Right', route: 'layout/sidebar-right'},
    //     {label: 'Content', route: 'layout/content'}
    //   ]},
    { label: 'COMPONENTS', separator: true }
    // {label: 'Accordion', route: 'accordion', iconClasses: 'fa fa-tasks'},
    // {label: 'Alert', route: 'alert', iconClasses: 'fa fa-exclamation-triangle'},
    // {label: 'Boxs', iconClasses: 'fa fa-files-o', children: [
    //     {label: 'Default Box', route: 'boxs/box'},
    //     {label: 'Info Box', route: 'boxs/info-box'},
    //     {label: 'Small Box', route: 'boxs/small-box'}
    //   ]},
    // {label: 'Dropdown', route: 'dropdown', iconClasses: 'fa fa-arrows-v'},
    // {label: 'Form', iconClasses: 'fa fa-files-o', children: [
    //     {label: 'Input Text', route: 'form/input-text'}
    // ]},
    // {label: 'Tabs', route: 'tabs', iconClasses: 'fa fa-th'}
  ]
};
