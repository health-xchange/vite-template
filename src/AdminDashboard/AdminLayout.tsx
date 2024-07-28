import { useState } from 'react';
import { Container, Grid, GridCol, Group } from '@mantine/core';
import { AdminSideNav } from './AdminSideNav/AdminSideNav';
import { TableSelection } from './Table/Table';

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState('users');
  return (
    <Group pt={60}>
      <Grid gutter="sm">
        <GridCol span="content">
          <AdminSideNav activeTab={activeTab} onTabChange={setActiveTab} />
        </GridCol>
        <GridCol span="auto" mt="xl" ml={300}>
          <Container>
            <TableSelection />
          </Container>
        </GridCol>
      </Grid>
    </Group>
  );
}
