import { NextPage } from 'next';
import React from 'react';
import SettingsLayout from '../../components/Settings/SettingsLayout';
import SettingsMain from '../../components/Settings/SettingsMain';
import useRouteGuard from '../../hooks/useRouteGuard';
import { Permission } from '../../hooks/useUser';

const SettingsMainPage: NextPage = () => {
  useRouteGuard(Permission.ADMIN);
  return (
    <SettingsLayout>
      <SettingsMain />
    </SettingsLayout>
  );
};

export default SettingsMainPage;
