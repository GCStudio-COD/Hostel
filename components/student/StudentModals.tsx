'use client';

import React from 'react';
import { OutPassModal } from './modals/OutPassModal';
import { MaintenanceModal } from './modals/MaintenanceModal';
import { PaymentModal } from './modals/PaymentModal';

export function StudentModals() {
  return (
    <>
      <OutPassModal />
      <MaintenanceModal />
      <PaymentModal />
    </>
  );
}
